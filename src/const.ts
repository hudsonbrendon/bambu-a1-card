export const CARD_NAME = "bambu-a1-card";
export const CARD_VERSION = "0.3.2";

/** Integrations whose entities the card understands (first wins in the stub config). */
export const PLATFORMS = ["bambulab_local", "bambu_lab"];

/**
 * Card key -> [domain, ...translation_keys]. The two integrations name the same
 * thing differently (`print_progress` vs `progress`), so a key lists both.
 */
export const KEYS = {
  online: ["binary_sensor", "online"],
  print_status: ["sensor", "print_status"],
  stage: ["sensor", "stage"],
  progress: ["sensor", "print_progress", "progress"],
  remaining: ["sensor", "remaining_time"],
  end_time: ["sensor", "end_time"],
  layer: ["sensor", "current_layer"],
  total_layers: ["sensor", "total_layers"],
  nozzle_temp: ["sensor", "nozzle_temp", "nozzle_temperature"],
  nozzle_target: ["number", "target_nozzle_temperature", "nozzle_target"],
  bed_temp: ["sensor", "bed_temp", "bed_temperature"],
  bed_target: ["number", "target_bed_temperature", "bed_target"],
  part_fan: ["sensor", "cooling_fan_speed", "part_fan"],
  speed: ["select", "printing_speed", "speed_profile"],
  speed_profile: ["sensor", "speed_profile"],
  light: ["light", "chamber_light"],
  task: ["sensor", "subtask_name", "task_name"],
  cover: ["image", "cover_image"],
  camera: ["camera", "camera"],
  hms: ["binary_sensor", "hms_errors"],
  print_error: ["binary_sensor", "print_error"],
  wifi: ["sensor", "wifi_signal"],
  nozzle_size: ["sensor", "nozzle_diameter"],
  total_hours: ["sensor", "total_print_time", "total_usage_hours"],
  firmware: ["update", "firmware_update", "firmware"],
  pause: ["button", "pause"],
  resume: ["button", "resume"],
  stop: ["button", "stop"],
  clear_error: ["button", "clear_error"],
  home: ["button", "home"],
  cooldown: ["button", "cooldown"],
  bed_level: ["button", "calibrate_bed_leveling"],
  external_spool: ["sensor", "external_spool"],
  // AMS slots: every `tray` sensor of the AMS, in slot order
  tray_1: ["sensor"],
  tray_2: ["sensor"],
  tray_3: ["sensor"],
  tray_4: ["sensor"],
} as const satisfies Record<string, readonly string[]>;

export type EntityKey = keyof typeof KEYS;
export const TRAY_KEYS = ["tray_1", "tray_2", "tray_3", "tray_4"] as const satisfies readonly EntityKey[];

/** Visual states (CSS classes on the SVG). */
export type PrinterState =
  | "printing"
  | "preparing"
  | "paused"
  | "error"
  | "failed"
  | "finished"
  | "idle"
  | "offline"
  | "unavailable";

export const BUSY_STATES: ReadonlySet<PrinterState> = new Set(["printing", "preparing"]);
export const JOB_STATES: ReadonlySet<PrinterState> = new Set(["printing", "preparing", "paused", "error", "finished", "failed"]);
