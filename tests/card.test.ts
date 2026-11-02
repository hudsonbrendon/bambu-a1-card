import { describe, it, expect, vi } from "vitest";
import "../src/bambu-a1-card";
import { CARD_NAME } from "../src/const";
import { computeState, parseTray, resolveEntities } from "../src/bambu-a1-card";
import type { BambuCardConfig, HassObject, HassState } from "../src/types";

const DEV = "dev-a1";
const AMS = "dev-ams";

type Opts = Record<string, string | undefined>;

/** Entities as the bambulab_local integration registers them (pt-BR entity ids). */
function mockHass(o: Opts = {}): HassObject & { calls: unknown[] } {
  const tray = (slot: number, color: string | null, type: string | null, remain: number | null, active = false) => ({
    tray_id: slot - 1,
    type,
    color,
    remain,
    active,
    sub_brands: type ? `${type} Basic` : null,
  });
  const defs: Array<[string, string, string, string, Record<string, unknown>?]> = [
    ["binary_sensor.a1_online", DEV, "online", o.online ?? "on"],
    ["sensor.a1_status_da_impressao", DEV, "print_status", o.status ?? "running"],
    ["sensor.a1_etapa", DEV, "stage", o.stage ?? "printing"],
    ["sensor.a1_progresso", DEV, "progress", "42", { unit_of_measurement: "%" }],
    ["sensor.a1_tempo_restante", DEV, "remaining_time", "75", { unit_of_measurement: "min" }],
    ["sensor.a1_camada_atual", DEV, "current_layer", "12"],
    ["sensor.a1_total_de_camadas", DEV, "total_layers", "240"],
    ["sensor.a1_temperatura_do_bico", DEV, "nozzle_temperature", "219.6", { unit_of_measurement: "°C" }],
    ["number.a1_alvo_do_bico", DEV, "nozzle_target", "220", { min: 0, max: 300 }],
    ["sensor.a1_temperatura_da_mesa", DEV, "bed_temperature", "60.1", { unit_of_measurement: "°C" }],
    ["number.a1_alvo_da_mesa", DEV, "bed_target", "60", { min: 0, max: 120 }],
    ["sensor.a1_ventoinha_da_peca", DEV, "part_fan", "0"],
    ["number.a1_ventoinha_da_peca", DEV, "part_fan", "0"],
    ["select.a1_perfil_de_velocidade", DEV, "speed_profile", "standard", { options: ["silent", "standard", "sport", "ludicrous"] }],
    ["light.a1_luz", DEV, "chamber_light", o.light ?? "off"],
    ["sensor.a1_tarefa", DEV, "task_name", "Benchy.gcode.3mf"],
    ["binary_sensor.a1_erro_de_impressao", DEV, "print_error", o.error ?? "off"],
    ["sensor.a1_sinal_wi_fi", DEV, "wifi_signal", "-39"],
    ["button.a1_pausar", DEV, "pause", o.status === "pause" ? "unavailable" : "unknown"],
    ["button.a1_retomar", DEV, "resume", o.status === "pause" ? "unknown" : "unavailable"],
    ["button.a1_parar", DEV, "stop", "unknown"],
    ["button.a1_resfriar", DEV, "cooldown", "unknown"],
    ["sensor.a1_ams_lite_bandeja_2", AMS, "tray", "PETG Basic", tray(2, "000000FF", "PETG", 45)],
    ["sensor.a1_ams_lite_bandeja_1", AMS, "tray", "PLA Basic", tray(1, "00AE42FF", "PLA", 80, true)],
    ["sensor.a1_ams_lite_bandeja_3", AMS, "tray", "empty", tray(3, null, null, null)],
    ["sensor.a1_ams_lite_bandeja_4", AMS, "tray", "Generic PLA", tray(4, "FFFFFFFF", "PLA", null)],
    ["sensor.outra_status", "other", "print_status", "idle"],
  ];
  const states: Record<string, HassState> = {};
  const entities: NonNullable<HassObject["entities"]> = {};
  for (const [id, device, tk, state, attributes = {}] of defs) {
    states[id] = { entity_id: id, state, attributes };
    entities[id] = { entity_id: id, platform: "bambulab_local", translation_key: tk, device_id: device };
  }
  const calls: unknown[] = [];
  return {
    states,
    entities,
    devices: {
      [DEV]: { id: DEV, name: "Bambu lab A1 de Hudson", config_entries: ["entry"] },
      [AMS]: { id: AMS, name: "AMS Lite", config_entries: ["entry"] },
      other: { id: "other", name: "X1C", config_entries: ["entry2"] },
    },
    locale: { language: "pt" },
    calls,
    callService: (domain, service, data) => {
      calls.push([domain, service, data]);
      return Promise.resolve();
    },
  };
}

interface CardEl extends HTMLElement {
  setConfig(c: BambuCardConfig): void;
  hass: HassObject;
  updateComplete: Promise<boolean>;
}

async function mount(opts: Opts = {}, config: Partial<BambuCardConfig> = {}): Promise<CardEl> {
  const el = document.createElement(CARD_NAME) as CardEl;
  el.setConfig({ type: `custom:${CARD_NAME}`, device: DEV, ...config });
  el.hass = mockHass(opts);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
const $ = (el: CardEl, sel: string) => el.shadowRoot!.querySelector(sel);
const $$ = (el: CardEl, sel: string) => [...el.shadowRoot!.querySelectorAll(sel)] as HTMLElement[];

describe("resolution and state", () => {
  it("finds the printer and AMS entities by translation_key, trays in slot order", () => {
    const e = resolveEntities(mockHass(), { type: "x", device: DEV });
    expect(e.print_status).toBe("sensor.a1_status_da_impressao");
    expect(e.nozzle_target).toBe("number.a1_alvo_do_bico");
    expect(e.part_fan).toBe("sensor.a1_ventoinha_da_peca");
    expect(e.speed).toBe("select.a1_perfil_de_velocidade");
    expect([e.tray_1, e.tray_2, e.tray_3, e.tray_4]).toEqual([
      "sensor.a1_ams_lite_bandeja_1",
      "sensor.a1_ams_lite_bandeja_2",
      "sensor.a1_ams_lite_bandeja_3",
      "sensor.a1_ams_lite_bandeja_4",
    ]);
    expect(resolveEntities(mockHass(), { type: "x", device: DEV, entities: { cover: "image.x" } }).cover).toBe("image.x");
  });

  it("maps the print status to the card states", () => {
    const st = (o: Opts) => computeState(mockHass(o), resolveEntities(mockHass(o), { type: "x", device: DEV }));
    expect(st({})).toBe("printing");
    expect(st({ status: "prepare" })).toBe("preparing");
    expect(st({ status: "pause" })).toBe("paused");
    expect(st({ status: "finish" })).toBe("finished");
    expect(st({ status: "failed" })).toBe("failed");
    expect(st({ status: "idle" })).toBe("idle");
    expect(st({ error: "on" })).toBe("error");
    expect(st({ online: "off" })).toBe("offline");
    expect(st({ status: "unavailable" })).toBe("unavailable");
  });

  it("normalises trays from both integrations", () => {
    const greg = parseTray({
      entity_id: "sensor.t",
      state: "Bambu PLA Matte",
      attributes: { color: "#FF6A13FF", type: "PLA", remain: -1, empty: false, active: true, name: "Bambu PLA Matte" },
    });
    expect(greg).toMatchObject({ empty: false, color: "#FF6A13", type: "PLA", remain: null, active: true });
    expect(parseTray({ entity_id: "e", state: "Empty", attributes: { color: "#00000000", type: "Empty", empty: true, remain: -1 } }).empty).toBe(true);
    expect(parseTray({ entity_id: "e", state: "empty", attributes: { color: null, remain: null } })).toMatchObject({ empty: true, remain: null });
    expect(parseTray({ entity_id: "e", state: "PETG", attributes: { color: "000000FF", type: "PETG", remain: 0 } }).remain).toBe(0);
  });
});

describe("rendering", () => {
  it("shows the job, the AMS slots and the temperatures", async () => {
    const el = await mount();
    expect($(el, ".hero")!.classList.contains("printing")).toBe(true);
    expect($(el, ".photo.printer img")).not.toBeNull();
    expect($(el, ".photo.spools img")).not.toBeNull();
    expect($(el, ".pill.nozzle")!.textContent).toContain("220°");
    expect($(el, ".status")!.textContent).toContain("Imprimindo");
    expect($(el, ".job-name")!.textContent).toBe("Benchy");
    expect($$(el, ".spool-tint").length).toBe(4);
    expect($(el, ".tubes path")).not.toBeNull();
    expect($(el, ".job-meta")!.textContent).toContain("Camada 12/240");
    expect($(el, ".job-meta")!.textContent).toContain("faltam 1 h 15 min");
    const chips = $$(el, ".slot-chip").map((c) => c.textContent!.replace(/\s+/g, " ").trim());
    expect(chips).toEqual(["PLA 80%", "PETG 45%", "Vazio —", "PLA —"]);
    expect($(el, ".slot-chip.active")!.textContent).toContain("PLA");
    expect($$(el, ".stats-value").map((s) => s.textContent!.trim())).toEqual(["220°", "60°", "Padrão"]);
    expect($(el, ".stats-subtitle")!.textContent).toBe("Bico · alvo 220°");
  });

  it("pauses, asks before stopping, steps the targets and changes the speed", async () => {
    const el = await mount();
    const calls = (el.hass as unknown as { calls: unknown[] }).calls;
    const [pause, stop] = $$(el, ".toolbar .text-button");
    pause.click();
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    stop.click();
    expect(confirm).toHaveBeenCalled();
    confirm.mockRestore();
    $$(el, ".step")[1].click(); // nozzle +
    $$(el, ".step")[2].click(); // bed -
    const select = $(el, ".speed select") as HTMLSelectElement;
    select.value = "sport";
    select.dispatchEvent(new Event("change"));
    expect(calls).toEqual([
      ["button", "press", { entity_id: "button.a1_pausar" }],
      ["number", "set_value", { entity_id: "number.a1_alvo_do_bico", value: 225 }],
      ["number", "set_value", { entity_id: "number.a1_alvo_da_mesa", value: 55 }],
      ["select", "select_option", { entity_id: "select.a1_perfil_de_velocidade", option: "sport" }],
    ]);
  });

  it("offers resume when paused and shortcuts / cooldown when idle", async () => {
    const paused = await mount({ status: "pause" });
    expect($(paused, ".toolbar .text-button")!.textContent).toContain("Retomar");
    const idle = await mount({ status: "idle", light: "on" }, {
      shortcuts: [{ name: "PLA", icon: "mdi:fire", service: "script.bambu_a1_pre_aquecer_pla" }],
    });
    expect($(idle, ".job")).toBeNull();
    ($(idle, ".toolbar .text-button") as HTMLElement).click();
    $$(idle, ".toolbar ha-icon-button")[1].click(); // light
    expect((idle.hass as unknown as { calls: unknown[] }).calls).toEqual([
      ["script", "bambu_a1_pre_aquecer_pla", undefined],
      ["light", "turn_off", { entity_id: "light.a1_luz" }],
    ]);
  });

  it("dims and hides the toolbar when offline", async () => {
    const el = await mount({ online: "off" });
    expect($(el, ".status")!.textContent).toContain("Desligada");
    expect($(el, ".toolbar")).toBeNull();
    expect($(el, ".ams")).toBeNull();
  });
});
