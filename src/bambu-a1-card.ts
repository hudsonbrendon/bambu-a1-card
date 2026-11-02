import { LitElement, html, nothing, svg, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { A1_IMAGE, AMS_LITE_IMAGE, SPOOL_MASKS } from "./assets/images";
import { BUSY_STATES, CARD_NAME, CARD_VERSION, JOB_STATES, PLATFORMS, TRAY_KEYS, type EntityKey, type PrinterState } from "./const";
import { computeState, parseTray, resolveEntities, toMinutes } from "./helpers/resolve";
import { localize, resolveLanguage } from "./localize";
import { cardStyles } from "./styles";
import type { BambuCardConfig, HassObject, HassState, ResolvedEntities, ShortcutConfig, Tray } from "./types";

export { computeState, parseTray, resolveEntities } from "./helpers/resolve";

console.info(
  `%c BAMBU-A1-CARD %c v${CARD_VERSION} `,
  "color: white; background: #00ae42; font-weight: 700;",
  "color: white; background: #23272e; font-weight: 700;"
);

type Template = TemplateResult | typeof nothing;

const GONE = new Set(["unavailable", "unknown", ""]);
/** Stages that say nothing more than the print status itself. */
const PLAIN_STAGES = new Set(["printing", "idle", "none", "unknown", "unavailable", "auto_bed_leveling_complete", ""]);

function fireEvent(node: HTMLElement, type: string, detail?: unknown): void {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

@customElement(CARD_NAME)
export class BambuA1Card extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HassObject;
  @state() private _config!: BambuCardConfig;

  private _entities: ResolvedEntities = {};

  // ── HA card API ──────────────────────────────────────────────────────────
  static getStubConfig(hass?: HassObject): Partial<BambuCardConfig> {
    const entries = Object.values(hass?.entities ?? {});
    for (const platform of PLATFORMS) {
      const entry = entries.find((e) => e.platform === platform && e.translation_key === "print_status" && e.device_id);
      if (entry) return { type: `custom:${CARD_NAME}`, device: entry.device_id! };
    }
    return { type: `custom:${CARD_NAME}` };
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "device", selector: { device: { filter: PLATFORMS.map((integration) => ({ integration })) } } },
        { name: "name", selector: { text: {} } },
        {
          type: "grid",
          name: "",
          schema: [
            { name: "show_name", selector: { boolean: {} } },
            { name: "show_status", selector: { boolean: {} } },
            { name: "show_ams", selector: { boolean: {} } },
            { name: "show_toolbar", selector: { boolean: {} } },
            { name: "compact_view", selector: { boolean: {} } },
            { name: "temperature_step", selector: { number: { min: 1, max: 20, mode: "box" } } },
          ],
        },
      ],
      computeLabel: (schema: { name: string }) => localize(`editor.${schema.name}`),
    };
  }

  public setConfig(config: BambuCardConfig): void {
    if (!config) throw new Error(localize("common.invalid_config"));
    this._config = {
      show_name: true,
      show_status: true,
      show_toolbar: true,
      show_ams: true,
      compact_view: false,
      temperature_step: 5,
      ...config,
    };
    this._entities = resolveEntities(this.hass, this._config);
  }

  public getCardSize(): number {
    return this._config?.compact_view ? 4 : 9;
  }

  public getGridOptions() {
    return this._config?.compact_view
      ? { columns: 6, rows: 4, min_columns: 4, min_rows: 3 }
      : { columns: 6, rows: 9, min_columns: 4, min_rows: 6 };
  }

  // ── lifecycle ────────────────────────────────────────────────────────────
  protected willUpdate(changed: PropertyValues): void {
    if (!changed.has("hass") || !this._config) return;
    const before = changed.get("hass") as HassObject | undefined;
    if (!before || before.entities !== this.hass?.entities || before.devices !== this.hass?.devices || !this._entities.print_status) {
      this._entities = resolveEntities(this.hass, this._config);
    }
    if (!before || before.themes?.darkMode !== this.hass?.themes?.darkMode) {
      this.toggleAttribute("dark-mode", Boolean(this.hass?.themes?.darkMode));
    }
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has("_config")) return true;
    const before = changed.get("hass") as HassObject | undefined;
    if (!before || !this.hass) return true;
    return Object.values(this._entities).some((id) => id && before.states[id] !== this.hass!.states[id]);
  }

  // ── helpers ──────────────────────────────────────────────────────────────
  private get _lang(): string {
    return resolveLanguage(this.hass, this._config?.language);
  }

  private _t(key: string, vars?: Record<string, string | number>): string {
    return localize(key, this._lang, vars);
  }

  private _state(key: EntityKey): HassState | undefined {
    const id = this._entities[key];
    return id ? this.hass?.states[id] : undefined;
  }

  /** Raw state, or undefined when missing / unknown. */
  private _text(key: EntityKey): string | undefined {
    const s = this._state(key)?.state;
    return s === undefined || GONE.has(s) ? undefined : s;
  }

  private _num(key: EntityKey): number | null {
    const value = Number(this._text(key));
    return this._text(key) !== undefined && Number.isFinite(value) ? value : null;
  }

  private _available(key: EntityKey): boolean {
    const s = this._state(key)?.state;
    return s !== undefined && s !== "unavailable";
  }

  private _formatState(stateObj: HassState): string {
    try {
      if (this.hass?.formatEntityState) return this.hass.formatEntityState(stateObj);
    } catch {
      /* fall through */
    }
    return stateObj.state.replace(/_/g, " ");
  }

  private _duration(minutes: number): string {
    const m = Math.max(0, Math.round(minutes));
    if (m < 60) return `${m} min`;
    const h = Math.floor(m / 60);
    if (h < 48) return m % 60 ? `${h} h ${m % 60} min` : `${h} h`;
    return `${Math.floor(h / 24)} d ${h % 24} h`;
  }

  private _clock(date: Date): string {
    return new Intl.DateTimeFormat(this._lang, { hour: "2-digit", minute: "2-digit" }).format(date);
  }

  private _trays(): Tray[] {
    return TRAY_KEYS.filter((k) => this._entities[k]).map((k) => parseTray(this._state(k)));
  }

  private _moreInfo(key: EntityKey = "print_status"): void {
    const id = this._entities[key];
    if (id) fireEvent(this, "hass-more-info", { entityId: id });
  }

  private _moreInfoId(entityId?: string): void {
    if (entityId) fireEvent(this, "hass-more-info", { entityId });
  }

  private _press(key: EntityKey, confirmKey?: string): void {
    const id = this._entities[key];
    if (!id || !this.hass || (confirmKey && !window.confirm(this._t(confirmKey)))) return;
    void this.hass.callService("button", "press", { entity_id: id });
  }

  private _toggleLight(): void {
    const light = this._state("light");
    if (!light || !this.hass) return;
    void this.hass.callService("light", light.state === "on" ? "turn_off" : "turn_on", { entity_id: light.entity_id });
  }

  private _setSpeed(option: string): void {
    const id = this._entities.speed;
    if (id && this.hass) void this.hass.callService("select", "select_option", { entity_id: id, option });
  }

  private _stepTarget(key: "nozzle_target" | "bed_target", direction: number): void {
    const target = this._state(key);
    if (!target || !this.hass) return;
    const step = Number(this._config.temperature_step) || 5;
    const min = Number(target.attributes.min ?? 0);
    const max = Number(target.attributes.max ?? 300);
    const current = Number(target.state) || 0;
    const next = Math.min(max, Math.max(min, Math.round((current + direction * step) / step) * step));
    if (next !== current) void this.hass.callService("number", "set_value", { entity_id: target.entity_id, value: next });
  }

  private _runShortcut(shortcut: ShortcutConfig): void {
    if (!this.hass || !shortcut.service) return;
    const [domain, service] = shortcut.service.split(".");
    void this.hass.callService(domain, service, shortcut.service_data, shortcut.target);
  }

  // ── render ───────────────────────────────────────────────────────────────
  protected render(): Template {
    if (!this._config) return nothing;
    const st = computeState(this.hass, this._entities);
    const unavailable = st === "unavailable";
    const off = unavailable || st === "offline";
    const trays = this._trays();
    return html`
      <ha-card>
        <div class="preview ${unavailable ? "not-available" : ""}">
          <div class="header">
            <div class="tips">${off ? nothing : this._renderTips()}</div>
            <ha-icon-button class="more-info" .label=${this._t("common.more_info")} @click=${() => this._moreInfo()}>
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._config.compact_view ? nothing : this._renderHero(st, trays)}
          <div class="metadata">${this._renderName()} ${this._renderStatus(st)}</div>
          ${off ? nothing : this._renderJob(st)}
        </div>
        ${off || !this._config.show_ams ? nothing : this._renderAms(trays)}
        ${off || this._config.compact_view ? nothing : this._renderStats(st)}
        ${this._renderToolbar(st)}
      </ha-card>
    `;
  }

  private _renderHero(st: PrinterState, trays: Tray[]): Template {
    const showAms = Boolean(this._config.show_ams) && trays.length > 0;
    const on = st !== "offline" && st !== "unavailable";
    const nozzle = this._num("nozzle_temp");
    const bed = this._num("bed_temp");
    const light = on && this._text("light") === "on";
    const active = trays.find((t) => t.active && !t.empty);
    const temp = (value: number | null, hot: number, warm: number) =>
      value === null ? "" : value >= hot ? "hot" : value >= warm ? "warm" : "";
    return html`<div
      class="hero ${showAms ? "" : "solo"} ${st}"
      @click=${() => this._moreInfo(this._entities.camera ? "camera" : "print_status")}
    >
      <div class="photo printer">
        <img src=${A1_IMAGE} alt="Bambu Lab A1" />
        ${on && nozzle !== null
          ? html`<span class="pill nozzle ${temp(nozzle, 150, 50)}" title=${this._t("stat.nozzle")}>
              <ha-icon icon="mdi:printer-3d-nozzle-heat"></ha-icon>${Math.round(nozzle)}°
            </span>`
          : nothing}
        ${on && bed !== null
          ? html`<span class="pill bed ${temp(bed, 60, 35)}" title=${this._t("stat.bed")}>
              <ha-icon icon="mdi:radiator"></ha-icon>${Math.round(bed)}°
            </span>`
          : nothing}
        ${light ? html`<span class="pill light" title=${this._t("action.light")}><ha-icon icon="mdi:lightbulb-on"></ha-icon></span>` : nothing}
      </div>
      ${showAms ? this._renderTubes() : nothing}
      ${showAms
        ? html`<div class="photo spools">
            <img src=${AMS_LITE_IMAGE} alt="AMS lite" />
            ${trays.slice(0, 4).map((tray, i) => this._renderSpoolTint(tray, i))}
            ${active
              ? html`<span class="pill active-slot" title=${active.name ?? ""}>
                  <span class="dot" style="background:${active.color ?? "#999"}"></span>${active.type ?? active.name ?? ""}
                </span>`
              : nothing}
          </div>`
        : nothing}
    </div>`;
  }

  /** Tint one spool winding of the AMS photo with the filament loaded in that slot. */
  private _renderSpoolTint(tray: Tray, index: number): Template {
    const mask = SPOOL_MASKS[index];
    if (!mask) return nothing;
    const style = `-webkit-mask-image:url(${mask});mask-image:url(${mask});`;
    if (tray.empty || !tray.color) return html`<span class="spool-tint empty" style=${style}></span>`;
    return html`<span class="spool-tint" style="${style}background:${tray.color}"></span>`;
  }

  /** PTFE tubes from the four AMS feeders to the hub on the printer's right side. */
  private _renderTubes(): Template {
    // Coordinates in a 1000x1000 box stretched over the hero (printer 58% wide, AMS 42%).
    const hub = { x: 468, y: 205 };
    const feeders = [
      { x: 731, y: 402 },
      { x: 766, y: 392 },
      { x: 822, y: 392 },
      { x: 856, y: 402 },
    ];
    return html`<svg class="tubes" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
      ${feeders.map(
        (f, i) =>
          svg`<path d="M ${f.x} ${f.y} C ${f.x} ${250 - i * 14}, ${hub.x + 120 + i * 16} ${90 + i * 12}, ${hub.x + 4 * i} ${hub.y}" />`
      )}
    </svg>`;
  }

  private _tip(key: EntityKey, icon: string, titleKey: string, value: string, cls = ""): Template {
    return html`
      <div class="tip ${cls}" title=${this._t(titleKey)} @click=${() => this._moreInfo(key)}>
        <ha-icon icon=${icon}></ha-icon><span>${value}</span>
      </div>
    `;
  }

  private _renderTips(): Template {
    const wifi = this._num("wifi");
    const nozzle = this._text("nozzle_size");
    const fan = this._num("part_fan");
    const hms = this._state("hms");
    const hmsCount = Number(hms?.attributes.count ?? hms?.attributes.Count ?? 0);
    return html`
      ${wifi !== null ? this._tip("wifi", wifi > -60 ? "mdi:wifi" : wifi > -75 ? "mdi:wifi-strength-2" : "mdi:wifi-strength-1", "tip.wifi", `${wifi} dBm`) : nothing}
      ${nozzle ? this._tip("nozzle_size", "mdi:printer-3d-nozzle-outline", "tip.nozzle", `${nozzle} mm`) : nothing}
      ${fan ? this._tip("part_fan", "mdi:fan", "tip.fan", `${Math.round(fan)}%`) : nothing}
      ${hms?.state === "on" ? this._tip("hms", "mdi:alert-circle-outline", "tip.hms", hmsCount ? String(hmsCount) : "HMS", "alert") : nothing}
      ${this._text("firmware") === "on" ? this._tip("firmware", "mdi:update", "tip.update", "", "update") : nothing}
    `;
  }

  private _renderName(): Template {
    if (!this._config.show_name) return nothing;
    const device = this._config.device ? this.hass?.devices?.[this._config.device] : undefined;
    const name = this._config.name ?? device?.name_by_user ?? device?.name ?? "Bambu Lab A1";
    return html`<div class="name">${name}</div>`;
  }

  /** Translated stage name; falls back to the integration's own translation, then to a humanised key. */
  private _stageLabel(stage: HassState): string {
    const key = stage.state;
    const own = this._t(`stage.${key}`);
    if (own !== `stage.${key}`) return own;
    const formatted = this._formatState(stage);
    if (formatted && !/_/.test(formatted)) return formatted;
    const text = key.replace(/_+/g, " ").trim();
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private _renderStatus(st: PrinterState): Template {
    if (!this._config.show_status) return nothing;
    const stage = this._state("stage");
    const detailed = (st === "printing" || st === "preparing") && stage && !PLAIN_STAGES.has(stage.state);
    const label = detailed ? this._stageLabel(stage!) : this._t(`status.${st}`);
    return html`
      <div class="status ${st}">
        ${BUSY_STATES.has(st) ? html`<ha-spinner class="status-spinner" size="tiny"></ha-spinner>` : nothing}
        <span>${label}</span>
      </div>
    `;
  }

  /** "auto_cali_for_user_param.gcode" -> "Calibração automática", "Benchy_v2.gcode.3mf" -> "Benchy v2". */
  private _prettyTask(raw: string | null | undefined): string | null {
    if (!raw) return null;
    const base = raw.replace(/\.(gcode|3mf)$/i, "").replace(/\.(gcode|3mf)$/i, "");
    if (/^auto_cali/i.test(base)) return this._t("job.calibration");
    const text = base.replace(/[_]+/g, " ").replace(/\s+/g, " ").trim();
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : null;
  }

  private _renderJob(st: PrinterState): Template {
    if (!JOB_STATES.has(st) || this._config.compact_view) return nothing;
    const progress = st === "finished" ? 100 : Math.min(100, Math.max(0, this._num("progress") ?? 0));
    const task = this._prettyTask(this._text("task"));
    const layer = this._num("layer");
    const total = this._num("total_layers");
    const remaining = toMinutes(this._state("remaining"));
    const running = st !== "finished" && st !== "failed";
    let eta: Date | undefined;
    const end = this._text("end_time");
    if (running && end && !Number.isNaN(Date.parse(end))) eta = new Date(end);
    else if (running && remaining) eta = new Date(Date.now() + remaining * 60_000);
    const cover = this._state("cover");
    const picture = cover && !GONE.has(cover.state) ? cover.attributes.entity_picture : undefined;
    const coverUrl = typeof picture === "string" ? (this.hass?.hassUrl ? this.hass.hassUrl(picture) : picture) : undefined;
    return html`
      <div class="job ${st}" @click=${() => this._moreInfo(cover ? "cover" : "task")}>
        ${coverUrl
          ? html`<img src=${coverUrl} alt="" @error=${(ev: Event) => ((ev.target as HTMLElement).style.display = "none")} />`
          : nothing}
        <div class="job-info">
          ${task ? html`<div class="job-name" title=${task}>${task}</div>` : nothing}
          <div class="bar"><div style="width:${progress}%"></div></div>
          <div class="job-meta">
            <span><b>${Math.round(progress)}%</b></span>
            ${layer !== null && total ? html`<span>${this._t("job.layer", { layer, total })}</span>` : nothing}
            ${running && remaining ? html`<span>${this._t("job.left", { time: this._duration(remaining) })}</span>` : nothing}
            ${eta ? html`<span>${this._t("job.eta", { time: this._clock(eta) })}</span>` : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private _renderAms(trays: Tray[]): Template {
    const external = parseTray(this._state("external_spool"));
    const chips: Array<[Tray, string]> = trays.map((t, i) => [t, this._t("ams.slot", { n: i + 1 })]);
    if (this._entities.external_spool && !external.empty) chips.push([external, this._t("ams.external")]);
    if (!chips.length) return nothing;
    return html`<div class="ams">
      ${chips.map(
        ([tray, slot]) => html`
          <div
            class="slot-chip ${tray.empty ? "empty" : ""} ${tray.active ? "active" : ""}"
            title=${tray.empty ? slot : `${slot} · ${tray.name ?? ""}`}
            @click=${() => this._moreInfoId(tray.entity_id)}
          >
            <span class="swatch" style="background:${tray.color ?? "var(--bac-filament-unknown)"}"></span>
            <span class="slot-text">
              <span class="slot-type">${tray.empty ? this._t("ams.empty") : (tray.type ?? tray.name ?? "?")}</span>
              <span>${tray.remain !== null && !tray.empty ? `${tray.remain}%` : "—"}</span>
            </span>
          </div>
        `
      )}
    </div>`;
  }

  private _tempBlock(tempKey: "nozzle_temp" | "bed_temp", targetKey: "nozzle_target" | "bed_target", nameKey: string): Template {
    const temp = this._num(tempKey);
    if (temp === null && !this._entities[targetKey]) return nothing;
    const name = this._t(nameKey);
    const target = this._num(targetKey);
    const canSet = this._available(targetKey);
    const step = (direction: number, icon: string, labelKey: string) =>
      canSet
        ? html`<button class="step" title=${this._t(labelKey, { name: name.toLowerCase() })} @click=${() => this._stepTarget(targetKey, direction)}>
            <ha-icon icon=${icon}></ha-icon>
          </button>`
        : nothing;
    return html`
      <div class="stats-block">
        <div class="stats-row">
          ${step(-1, "mdi:minus", "action.lower")}
          <span class="stats-value ${temp !== null && temp >= 50 ? "hot" : ""}" @click=${() => this._moreInfo(canSet ? targetKey : tempKey)}>
            ${temp === null ? "—" : `${Math.round(temp)}°`}
          </span>
          ${step(1, "mdi:plus", "action.raise")}
        </div>
        <div class="stats-subtitle">${target ? this._t("stat.target", { name, value: Math.round(target) }) : name}</div>
      </div>
    `;
  }

  private _speedLabel(option?: string): string {
    if (!option) return "—";
    const key = `speed.${option}`;
    const text = this._t(key);
    return text === key ? option : text;
  }

  private _renderStats(st: PrinterState): Template {
    const job = st === "printing" || st === "paused" || st === "preparing" || st === "error";
    const hours = this._num("total_hours");
    const third = job
      ? html`<div class="stats-block" @click=${() => this._moreInfo(this._entities.speed ? "speed" : "speed_profile")}>
          <div class="stats-value">${this._speedLabel(this._text("speed") ?? this._text("speed_profile"))}</div>
          <div class="stats-subtitle">${this._t("stat.speed")}</div>
        </div>`
      : hours !== null
        ? html`<div class="stats-block" @click=${() => this._moreInfo("total_hours")}>
            <div class="stats-value">${Math.round(hours)} h</div>
            <div class="stats-subtitle">${this._t("stat.total_hours")}</div>
          </div>`
        : nothing;
    return html`<div class="stats">
      ${this._tempBlock("nozzle_temp", "nozzle_target", "stat.nozzle")} ${this._tempBlock("bed_temp", "bed_target", "stat.bed")} ${third}
    </div>`;
  }

  private _iconButton(icon: string, labelKey: string, action: () => void, cls = ""): TemplateResult {
    const label = this._t(labelKey);
    return html`
      <ha-icon-button class=${cls} .label=${label} title=${label} @click=${action}>
        <ha-icon icon=${icon}></ha-icon>
      </ha-icon-button>
    `;
  }

  private _textButton(icon: string, labelKey: string, action: () => void, cls = ""): TemplateResult {
    return html`<button class="text-button ${cls}" @click=${action}><ha-icon icon=${icon}></ha-icon>${this._t(labelKey)}</button>`;
  }

  private _renderSpeed(): Template {
    const select = this._state("speed");
    if (!select || GONE.has(select.state)) return nothing;
    const options = (select.attributes.options as string[] | undefined) ?? [];
    return html`
      <label class="speed" title=${this._t("stat.speed")}>
        <ha-icon icon="mdi:speedometer"></ha-icon>
        <select @change=${(ev: Event) => this._setSpeed((ev.target as HTMLSelectElement).value)}>
          ${options.map((o) => html`<option value=${o} ?selected=${o === select.state}>${this._speedLabel(o)}</option>`)}
        </select>
      </label>
    `;
  }

  private _renderToolbar(st: PrinterState): Template {
    if (!this._config.show_toolbar || st === "unavailable" || st === "offline") return nothing;
    const light = this._state("light");
    const lightOn = light?.state === "on";
    const lightButton = light && !GONE.has(light.state)
      ? this._iconButton(lightOn ? "mdi:lightbulb-on" : "mdi:lightbulb-outline", "action.light", () => this._toggleLight(), lightOn ? "active" : "")
      : nothing;
    const stop = this._available("stop") ? this._textButton("mdi:stop", "action.stop", () => this._press("stop", "action.confirm_stop"), "danger") : nothing;
    let buttons: Template[];
    if (st === "printing" || st === "preparing") {
      buttons = [this._available("pause") ? this._textButton("mdi:pause", "action.pause", () => this._press("pause")) : nothing, stop];
    } else if (st === "paused" || st === "error") {
      buttons = [
        this._available("resume") ? this._textButton("mdi:play", "action.resume", () => this._press("resume")) : nothing,
        stop,
        this._available("clear_error") ? this._iconButton("mdi:alert-remove-outline", "action.clear_error", () => this._press("clear_error")) : nothing,
      ];
    } else {
      buttons = [
        ...(this._config.shortcuts ?? []).map(
          (s) => html`<button class="text-button" title=${s.name ?? s.service} @click=${() => this._runShortcut(s)}>
            <ha-icon icon=${s.icon ?? "mdi:flash"}></ha-icon>${s.name ?? ""}
          </button>`
        ),
        this._available("cooldown") ? this._iconButton("mdi:snowflake-thermometer", "action.cooldown", () => this._press("cooldown")) : nothing,
        this._available("home") ? this._iconButton("mdi:home-import-outline", "action.home", () => this._press("home")) : nothing,
        this._available("bed_level")
          ? this._iconButton("mdi:grid", "action.bed_level", () => this._press("bed_level", "action.confirm_bed_level"))
          : nothing,
      ];
    }
    // ponytail: the speed profile only matters during a print, so the select hides when idle
    const speed = st === "printing" || st === "preparing" || st === "paused" ? this._renderSpeed() : nothing;
    const all = [...buttons, lightButton, speed].filter((b) => b !== nothing);
    return all.length ? html`<div class="toolbar">${all}</div>` : nothing;
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: localize("common.name"),
  description: localize("common.description"),
  preview: true,
  documentationURL: "https://github.com/hudsonbrendon/bambu-a1-card",
  getEntitySuggestion: (hass: HassObject, entityId: string) => {
    const entry = hass.entities?.[entityId];
    if (!entry || !PLATFORMS.includes(entry.platform ?? "") || entry.translation_key !== "print_status" || !entry.device_id) return null;
    return { config: { type: `custom:${CARD_NAME}`, device: entry.device_id } };
  },
});
