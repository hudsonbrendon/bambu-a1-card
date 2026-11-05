import { KEYS, PLATFORMS, TRAY_KEYS, type EntityKey, type PrinterState } from "../const";
import type { BambuCardConfig, HassObject, HassState, ResolvedEntities, Tray } from "../types";

const GONE = new Set(["unavailable", "unknown", ""]);

/** The printer device plus its AMS / external-spool devices (via_device or same config entry). */
export function relatedDevices(hass: HassObject | undefined, deviceId: string): Set<string> {
  const devices = hass?.devices ?? {};
  const entries = new Set(devices[deviceId]?.config_entries ?? []);
  const ids = new Set([deviceId]);
  for (const d of Object.values(devices)) {
    if (d.via_device_id === deviceId || d.config_entries?.some((c) => entries.has(c))) ids.add(d.id);
  }
  return ids;
}

/** Card keys -> entity ids: by translation_key on the printer's devices, then config overrides. */
export function resolveEntities(hass: HassObject | undefined, config: BambuCardConfig): ResolvedEntities {
  const resolved: ResolvedEntities = {};
  const trays: string[] = [];
  if (config.device) {
    const devices = relatedDevices(hass, config.device);
    for (const entry of Object.values(hass?.entities ?? {})) {
      if (!entry.platform || !PLATFORMS.includes(entry.platform) || !devices.has(entry.device_id ?? "")) continue;
      const domain = entry.entity_id.split(".")[0];
      const tk = entry.translation_key ?? "";
      if (domain === "sensor" && tk === "tray") {
        trays.push(entry.entity_id);
        continue;
      }
      for (const [key, [keyDomain, ...tks]] of Object.entries(KEYS)) {
        if (keyDomain === domain && (tks as string[]).includes(tk) && !resolved[key as EntityKey]) {
          resolved[key as EntityKey] = entry.entity_id;
        }
      }
    }
  }
  trays.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  TRAY_KEYS.forEach((key, i) => {
    if (trays[i]) resolved[key] = trays[i];
  });
  return { ...resolved, ...(config.entities ?? {}) };
}

export function computeState(hass: HassObject | undefined, e: ResolvedEntities): PrinterState {
  const st = (key: EntityKey) => (e[key] ? hass?.states[e[key]!]?.state : undefined);
  const status = st("print_status");
  if (st("online") === "off" || status === "offline") return "offline";
  if (status === undefined || GONE.has(status)) return "unavailable";
  if (st("print_error") === "on") return "error";
  switch (status) {
    case "running":
      return "printing";
    case "prepare":
    case "init":
    case "slicing":
      return "preparing";
    case "pause":
      return "paused";
    case "failed":
      return "failed";
    case "finish":
      return "finished";
    default:
      return "idle";
  }
}

/** Normalise an AMS slot from either integration (`#RRGGBBAA` / `RRGGBBAA`, remain -1 / null...). */
export function parseTray(stateObj?: HassState): Tray {
  const a = stateObj?.attributes ?? {};
  const state = stateObj?.state ?? "unavailable";
  const type = typeof a.type === "string" && !/^(empty|\?)$/i.test(a.type) ? a.type : undefined;
  const empty = !stateObj || a.empty === true || GONE.has(state) || /^empty$/i.test(state) || (!type && state === "?");
  const hex = String(a.color ?? "").replace("#", "");
  const color = /^[0-9a-f]{6}/i.test(hex) && !/^0{8}$/.test(hex) ? `#${hex.slice(0, 6)}` : undefined;
  const raw = a.remain === null || a.remain === undefined || a.remain === "" ? NaN : Number(a.remain);
  const remain = Number.isFinite(raw) && raw >= 0 && a.remain_enabled !== false ? Math.min(100, Math.round(raw)) : null;
  const name = typeof a.name === "string" && a.name !== "?" ? a.name : typeof a.sub_brands === "string" ? a.sub_brands : state;
  return { entity_id: stateObj?.entity_id, empty, color, type, name, remain, active: a.active === true };
}

/** Use an external estimate of the remaining % (spools without RFID always report 100). */
export function withRemain(tray: Tray, source?: HassState): Tray {
  const value = source ? Number(source.state) : NaN;
  if (!source || source.state === "" || !Number.isFinite(value)) return tray;
  return { ...tray, remain: Math.max(0, Math.min(100, Math.round(value))), remain_entity_id: source.entity_id };
}

/** Minutes from a duration sensor in h / min / s. */
export function toMinutes(stateObj?: HassState): number | null {
  const value = Number(stateObj?.state);
  if (!stateObj || !Number.isFinite(value)) return null;
  const unit = String(stateObj.attributes.unit_of_measurement ?? "min");
  return unit === "h" ? value * 60 : unit === "s" ? value / 60 : value;
}
