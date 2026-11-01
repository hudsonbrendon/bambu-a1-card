import type { EntityKey } from "./const";

export interface HassState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
}

export interface EntityRegistryEntry {
  entity_id: string;
  platform?: string;
  translation_key?: string | null;
  device_id?: string | null;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
  via_device_id?: string | null;
  config_entries?: string[];
}

export interface HassObject {
  states: Record<string, HassState>;
  entities?: Record<string, EntityRegistryEntry>;
  devices?: Record<string, DeviceRegistryEntry>;
  locale?: { language?: string };
  language?: string;
  themes?: { darkMode?: boolean };
  formatEntityState?: (stateObj: HassState) => string;
  hassUrl?: (path: string) => string;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ): Promise<unknown>;
}

export interface ShortcutConfig {
  name?: string;
  icon?: string;
  /** `domain.service`, e.g. `script.turn_on` or `script.preheat_pla`. */
  service: string;
  service_data?: Record<string, unknown>;
  target?: Record<string, unknown>;
}

export interface BambuCardConfig {
  type: string;
  /** Printer device id; its AMS / spool devices are found through the registry. */
  device?: string;
  entities?: Partial<Record<EntityKey, string>>;
  name?: string;
  show_name?: boolean;
  show_status?: boolean;
  show_toolbar?: boolean;
  show_ams?: boolean;
  compact_view?: boolean;
  /** Temperature step of the −/+ buttons, °C. */
  temperature_step?: number;
  shortcuts?: ShortcutConfig[];
  language?: string;
}

export type ResolvedEntities = Partial<Record<EntityKey, string>>;

export interface Tray {
  entity_id?: string;
  empty: boolean;
  /** CSS colour (`#rrggbb`) or undefined when unknown. */
  color?: string;
  type?: string;
  name?: string;
  /** Remaining filament %, null when the spool doesn't report it. */
  remain: number | null;
  active: boolean;
}
