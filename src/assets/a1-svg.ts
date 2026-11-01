import { svg, nothing, type TemplateResult } from "lit";
import type { PrinterState } from "../const";
import type { Tray } from "../types";

export interface ArtModel {
  state: PrinterState;
  trays: Tray[];
  /** 0..100, drives the printed part and the gantry height. */
  progress: number;
  /** Colour of the part on the plate (active filament). */
  partColor: string;
  light: boolean;
  nozzleHot: boolean;
  bedHot: boolean;
  /** SMIL toolhead / tube motion (off for reduced motion). */
  animate: boolean;
  showAms: boolean;
}

// Plate top (where the part sits) and the part's full height.
const PLATE_Y = 165;
const PART_H = 34;
const TOOL_X = 112.5;
// Toolhead shuttle while printing (x offsets), shared by the head and the tubes.
const SHUTTLE = [0, -34, 22, -10, 30, -24, 8, 0];
const DUR = "6s";

// AMS lite: four spools in an X around the hub; slots 1-2 behind (top), 3-4 in front.
const HUB = { x: 292, y: 124 };
const SPOOLS = [
  { x: 266, y: 95, r: 22 },
  { x: 318, y: 95, r: 22 },
  { x: 263, y: 152, r: 24 },
  { x: 321, y: 152, r: 24 },
];
const FEEDERS = [
  { x: 283, y: 114 },
  { x: 301, y: 114 },
  { x: 283, y: 134 },
  { x: 301, y: 134 },
];

function tubePath(i: number, dx: number, tipY: number): string {
  const f = FEEDERS[i];
  const ex = TOOL_X + dx + (i - 1.5) * 1.1;
  const ey = tipY - 45;
  return `M${f.x} ${f.y - 6} C${f.x - 4} ${f.y - 92} ${ex + 64} ${ey - 52} ${ex} ${ey}`;
}

function spool(tray: Tray | undefined, i: number, spinning: boolean): TemplateResult {
  const { x, y, r } = SPOOLS[i];
  const core = r * 0.38;
  const empty = !tray || tray.empty;
  const fill = empty ? 0 : (tray.remain ?? 100) / 100;
  const wound = core + (r - 2.2 - core) * Math.max(0.1, fill);
  const color = tray?.color ?? "var(--bac-filament-unknown)";
  const notch = (a: number) => {
    const rad = (a * Math.PI) / 180;
    return `M${x + Math.cos(rad) * core * 0.45} ${y + Math.sin(rad) * core * 0.45} L${x + Math.cos(rad) * core * 0.85} ${y + Math.sin(rad) * core * 0.85}`;
  };
  return svg`
    <g class="spool s${i + 1} ${empty ? "empty" : ""} ${tray?.active ? "active" : ""}">
      <circle cx=${x} cy=${y} r=${r} class="flange" />
      ${empty ? nothing : svg`<circle cx=${x} cy=${y} r=${wound} fill=${color} class="filament" />`}
      <circle cx=${x} cy=${y} r=${r} class="perf" fill="url(#bac-perf)" />
      <circle cx=${x} cy=${y} r=${r} class="rim" />
      <circle cx=${x} cy=${y} r=${core} class="core" />
      <g class="reel ${spinning ? "spinning" : ""}" style="transform-origin:${x}px ${y}px">
        <path d="${notch(0)} ${notch(120)} ${notch(240)}" class="spoke" />
      </g>
      <circle cx=${x} cy=${y} r=${core * 0.32} class="axle" />
    </g>
  `;
}

/**
 * Inline illustration of a Bambu Lab A1 (open-frame bed slinger: white base,
 * black textured plate, aluminium arch with grey caps, X beam with the white
 * toolhead and its gold cutter knob, the little touchscreen) next to an AMS
 * lite (four spools in an X around the hub on its grey stand, PTFE tubes
 * arching over to the toolhead), redrawn after the product photos in the same
 * flat grey/white style as the sibling cards.
 */
export function a1Svg(m: ArtModel): TemplateResult {
  const job = m.state === "printing" || m.state === "paused" || m.state === "error" || m.state === "finished" || m.state === "preparing";
  const partH = job ? (m.state === "finished" ? PART_H : (PART_H * Math.min(100, Math.max(0, m.progress))) / 100) : 0;
  const tipY = job ? PLATE_Y - 1 - partH : 112;
  const printing = m.state === "printing";
  const animate = m.animate && printing;
  const viewBox = m.showAms ? "14 6 340 200" : "14 6 206 200";
  const activeIdx = m.trays.findIndex((t) => t.active && !t.empty);

  return svg`
    <svg class="a1 ${m.state} ${m.light ? "light-on" : ""} ${m.nozzleHot ? "nozzle-hot" : ""} ${m.bedHot ? "bed-hot" : ""}"
      viewBox=${viewBox} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bambu Lab A1">
      <defs>
        <linearGradient id="bac-alu" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="var(--bac-metal)" />
          <stop offset="0.55" stop-color="var(--bac-metal-hi)" />
          <stop offset="1" stop-color="var(--bac-metal-2)" />
        </linearGradient>
        <linearGradient id="bac-alu-h" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--bac-metal-hi)" />
          <stop offset="1" stop-color="var(--bac-metal-2)" />
        </linearGradient>
        <linearGradient id="bac-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--bac-body)" />
          <stop offset="1" stop-color="var(--bac-body-2)" />
        </linearGradient>
        <linearGradient id="bac-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--bac-light)" stop-opacity="0.75" />
          <stop offset="1" stop-color="var(--bac-light)" stop-opacity="0" />
        </linearGradient>
        <clipPath id="bac-part-clip"><rect x="-30" y=${-partH} width="60" height=${partH + 1} /></clipPath>
        <pattern id="bac-perf" width="2.8" height="2.8" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="0.6" fill="var(--bac-perf)" />
        </pattern>
        <pattern id="bac-layers" width="4" height="1.6" patternUnits="userSpaceOnUse">
          <rect width="4" height="0.5" fill="rgba(0,0,0,0.16)" />
        </pattern>
      </defs>

      <ellipse cx="120" cy="200" rx="98" ry="4.5" class="shadow" />
      ${m.showAms ? svg`<ellipse cx="292" cy="200" rx="44" ry="3.5" class="shadow" />` : nothing}

      <!-- aluminium arch: two uprights, top bar, grey corner caps -->
      <rect x="56" y="50" width="10" height="128" fill="url(#bac-alu)" class="metal" />
      <rect x="176" y="50" width="11" height="138" fill="url(#bac-alu)" class="metal" />
      <rect x="176" y="168" width="11" height="20" rx="1" class="cap" />
      <rect x="62" y="46" width="118" height="9" fill="url(#bac-alu-h)" class="metal" />
      <rect x="53" y="43.5" width="17" height="13" rx="2.5" class="cap" />
      <rect x="172" y="43.5" width="18" height="13" rx="2.5" class="cap" />

      <!-- base -->
      <rect x="32" y="174" width="176" height="24" rx="6" fill="url(#bac-base)" class="base" />
      <path d="M36 191 H204" class="base-line" />
      <rect x="146" y="193.5" width="9" height="1.6" rx="0.8" class="slot" />

      <!-- bed: carriage, black textured plate (slings on Y while printing) -->
      <g class="bed">
        <rect x="52" y="167" width="128" height="7" rx="1.5" class="carriage" />
        <path d="M56 158.5 H174 L183 170 H47 Z" class="plate" />
        <path d="M56 158.5 H174" class="plate-sheen" />
        <rect x="47" y="170" width="136" height="2.4" rx="1" class="plate-edge" />
        <g class="heat">
          <path d="M84 154 q3 -4 0 -8 q-3 -4 0 -8" /><path d="M115 154 q3 -4 0 -8 q-3 -4 0 -8" /><path d="M146 154 q3 -4 0 -8 q-3 -4 0 -8" />
        </g>
        ${partH > 0
          ? svg`<g transform="translate(115 ${PLATE_Y})" clip-path="url(#bac-part-clip)">
              <path d="M-19 0 H16 Q22 -4 25 -12 H-23 Q-21 -5 -19 0 Z M-12 -12 V-25 H7 V-12 Z M-15 -25 H9 V-28.5 H-15 Z M-5 -28.5 V-34 H1 V-28.5 Z"
                fill=${m.partColor} class="part" />
              <path d="M-19 0 H16 Q22 -4 25 -12 H-23 Q-21 -5 -19 0 Z M-12 -12 V-25 H7 V-12 Z M-15 -25 H9 V-28.5 H-15 Z M-5 -28.5 V-34 H1 V-28.5 Z"
                fill="url(#bac-layers)" />
              <rect x="-7" y="-22" width="6" height="6" rx="1" class="window" />
            </g>`
          : nothing}
      </g>

      <!-- touchscreen on the front right of the base -->
      <rect x="166" y="175" width="32" height="19" rx="3" class="screen" />
      <rect x="168.5" y="177.3" width="27" height="13.4" rx="1.5" class="display" />
      <rect x="171" y="180" width="9" height="2" rx="1" class="ui" /><rect x="171" y="184.5" width="18" height="1.6" rx="0.8" class="ui" />

      <!-- PTFE tubes from the AMS lite over to the toolhead -->
      ${m.showAms
        ? FEEDERS.map((_, i) => {
            const active = i === activeIdx;
            const tray = m.trays[i];
            const color = tray && !tray.empty ? tray.color : undefined;
            return svg`<path d=${tubePath(i, 0, tipY)} class="tube ${active ? "active" : ""}" style=${color ? `stroke:${color}` : ""}>
              ${animate
                ? svg`<animate attributeName="d" dur=${DUR} repeatCount="indefinite" values=${SHUTTLE.map((dx) => tubePath(i, dx, tipY)).join(";")} />`
                : nothing}
            </path>`;
          })
        : nothing}

      <!-- X gantry: rides up (Z) with the part -->
      <g transform="translate(0 ${tipY})">
        <rect x="26" y="-27" width="160" height="9" fill="url(#bac-alu-h)" class="metal" />
        ${[40, 52, 76, 88, 136, 148, 160].map((x) => svg`<circle cx=${x} cy="-22.5" r="0.9" class="rivet" />`)}
        <path d="M20 -31 h10 v16 h-4 v6 h-6 z" class="cap" />
        <rect x="184" y="-31" width="24" height="17" rx="2" class="block" />
        <text x="203" y="-19.5" class="badge">A1</text>

        <g class="toolhead">
          ${animate
            ? svg`<animateTransform attributeName="transform" type="translate" dur=${DUR} repeatCount="indefinite"
                values=${SHUTTLE.map((dx) => `${dx} 0`).join(";")} />`
            : nothing}
          <path d="M101 -1 L124 -1 L${TOOL_X + 30} ${PLATE_Y - tipY - 4} L${TOOL_X - 30} ${PLATE_Y - tipY - 4} Z" class="cone" fill="url(#bac-cone)" />
          <rect x="110" y="-45" width="5" height="8" rx="1" class="inlet" />
          <rect x="98" y="-38" width="29" height="31" rx="3.5" class="head" />
          <rect x="119" y="-38" width="8" height="31" rx="2" class="head-side" />
          <circle cx="108" cy="-27" r="4.6" class="knob" />
          <circle cx="108" cy="-27" r="2" class="knob-hole" />
          <rect x="102" y="-17" width="12" height="1.4" rx="0.7" class="logo" />
          <rect x="103" y="-8" width="19" height="4" rx="1.2" class="duct" />
          <rect x="108.5" y="-5" width="8" height="3" rx="0.6" class="heater" />
          <path d="M110.8 -2.2 H114.2 L113 0.4 H112 Z" class="nozzle" />
          <circle cx=${TOOL_X} cy="0" r="3.2" class="nozzle-glow" />
        </g>
      </g>

      ${m.showAms
        ? svg`
          <!-- AMS lite: stand, hub, four feeders, spools -->
          <path d="M260 198 L276 186 H308 L324 198 Z" class="stand" />
          <rect x="287.5" y="124" width="9" height="64" rx="2" class="stand" />
          ${[0, 1].map((i) => spool(m.trays[i], i, printing && i === activeIdx))}
          <circle cx=${HUB.x} cy=${HUB.y} r="15" class="hub" />
          ${FEEDERS.map(
            (f, i) => svg`<rect x=${f.x - 4} y=${f.y - 6} width="8" height="12" rx="3" class="feeder" />
              <circle cx=${f.x} cy=${f.y + 3} r="1.6" class="lever ${i === activeIdx ? "on" : ""}" />`
          )}
          ${[2, 3].map((i) => spool(m.trays[i], i, printing && i === activeIdx))}
        `
        : nothing}

      <!-- badges over the frame -->
      <g class="badge-warn" transform="translate(121 24)">
        <path d="M0 -10 l11 19 h-22 z" fill="var(--bac-error)" />
        <rect x="-1.2" y="-4" width="2.4" height="7" rx="1" fill="#fff" /><circle cy="5.6" r="1.4" fill="#fff" />
      </g>
      <g class="badge-pause" transform="translate(121 24)">
        <circle r="10" fill="var(--bac-warning)" />
        <rect x="-4.2" y="-5" width="3" height="10" rx="1" fill="#fff" /><rect x="1.2" y="-5" width="3" height="10" rx="1" fill="#fff" />
      </g>
      <g class="badge-done" transform="translate(121 24)">
        <circle r="10" fill="var(--bac-ok)" />
        <path d="M-4.5 0 l3 3.2 l6 -6.4" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
  `;
}
