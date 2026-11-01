import { css } from "lit";

export const cardStyles = css`
  :host {
    --bac-background: var(--ha-card-background, var(--card-background-color, transparent));
    --bac-primary-text-color: var(--primary-text-color);
    --bac-secondary-text-color: var(--secondary-text-color);
    --bac-divider-color: var(--entities-divider-color, var(--divider-color));
    --bac-ok: var(--success-color, #43a047);
    --bac-warning: var(--warning-color, #ffa600);
    --bac-error: var(--error-color, #db4437);
    --bac-accent: #00ae42; /* Bambu green */
    --bac-spacing: 10px;
    /* illustration palette, shared with the vacuum / printer / MiSTer cards */
    --bac-body: #f6f7f8;
    --bac-body-2: #e4e6e9;
    --bac-metal: #c9cdd2;
    --bac-metal-hi: #eceef0;
    --bac-metal-2: #a9afb6;
    --bac-cap: #6b7178;
    --bac-outline: #9aa0a6;
    --bac-panel: #2b2f36;
    --bac-plate: #1f2226;
    --bac-gold: #c9a23c;
    --bac-light: #fff4c8;
    --bac-flange: #eef0f2;
    --bac-filament-unknown: #b8bcc2;
    --bac-perf: rgba(255, 255, 255, 0.55);
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  :host([dark-mode]) {
    --bac-body: #4a4f58;
    --bac-body-2: #3a3f47;
    --bac-metal: #5d636c;
    --bac-metal-hi: #7a8089;
    --bac-metal-2: #474c54;
    --bac-cap: #2a2e34;
    --bac-outline: #6b7178;
    --bac-panel: #15171b;
    --bac-plate: #121417;
    --bac-flange: #5a5f68;
    --bac-perf: rgba(0, 0, 0, 0.3);
  }

  ha-card {
    background: var(--bac-background);
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .preview {
    position: relative;
    text-align: center;
  }
  .preview.not-available {
    filter: grayscale(1);
  }

  /* ── header ─────────────────────────────────────────────────────────── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .tips {
    display: flex;
    gap: var(--bac-spacing);
    flex-grow: 1;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--bac-spacing);
    color: var(--bac-secondary-text-color);
    font-size: 0.95rem;
  }
  .tip {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    line-height: 1;
    white-space: nowrap;
  }
  .tip ha-icon {
    --mdc-icon-size: 18px;
  }
  .tip.alert {
    color: var(--bac-error);
  }
  .tip.update {
    color: var(--bac-accent);
  }
  .more-info {
    color: var(--bac-secondary-text-color);
    margin: 2px;
  }

  /* ── illustration ───────────────────────────────────────────────────── */
  .hero {
    display: block;
    margin: 0 auto;
    cursor: pointer;
    width: min(94%, 420px);
  }
  .hero.solo {
    width: min(64%, 260px);
  }
  .a1 {
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .a1 .shadow {
    fill: rgba(0, 0, 0, 0.12);
  }
  .a1 .metal {
    stroke: var(--bac-outline);
    stroke-width: 0.8;
  }
  .a1 .cap {
    fill: var(--bac-cap);
  }
  .a1 .base {
    stroke: var(--bac-outline);
    stroke-width: 1.2;
  }
  .a1 .base-line {
    stroke: var(--bac-metal);
    stroke-width: 1;
  }
  .a1 .slot,
  .a1 .rivet {
    fill: var(--bac-outline);
  }
  .a1 .carriage {
    fill: var(--bac-cap);
  }
  .a1 .plate {
    fill: var(--bac-plate);
    stroke: var(--bac-panel);
    stroke-width: 0.8;
  }
  .a1 .plate-sheen {
    stroke: rgba(255, 255, 255, 0.18);
    stroke-width: 1;
  }
  .a1 .plate-edge {
    fill: var(--bac-metal-2);
  }
  .a1 .part {
    stroke: rgba(0, 0, 0, 0.25);
    stroke-width: 0.6;
  }
  .a1 .window {
    fill: rgba(0, 0, 0, 0.22);
  }
  .a1 .screen {
    fill: var(--bac-panel);
  }
  .a1 .display {
    fill: #3b4552;
  }
  .a1 .ui {
    fill: rgba(255, 255, 255, 0.45);
  }
  .a1:not(.offline):not(.unavailable) .display {
    fill: #1d3b52;
  }
  .a1 .block {
    fill: var(--bac-body);
    stroke: var(--bac-outline);
    stroke-width: 0.8;
  }
  .a1 .badge {
    font: 800 6px Arial, Helvetica, sans-serif;
    fill: var(--bac-panel);
    text-anchor: end;
  }
  .a1 .head {
    fill: var(--bac-body);
    stroke: var(--bac-outline);
    stroke-width: 1;
  }
  .a1 .head-side {
    fill: var(--bac-body-2);
    stroke: var(--bac-outline);
    stroke-width: 0.8;
  }
  .a1 .inlet {
    fill: var(--bac-cap);
  }
  .a1 .knob {
    fill: var(--bac-gold);
    stroke: #9c7a22;
    stroke-width: 0.6;
  }
  .a1 .knob-hole {
    fill: var(--bac-panel);
  }
  .a1 .logo {
    fill: var(--bac-outline);
  }
  .a1 .duct,
  .a1 .heater {
    fill: var(--bac-panel);
  }
  .a1 .nozzle {
    fill: var(--bac-gold);
  }
  .a1 .nozzle-glow,
  .a1 .cone,
  .a1 .heat {
    display: none;
  }
  .a1 .heat {
    fill: none;
    stroke: var(--bac-error);
    stroke-width: 1.4;
    stroke-linecap: round;
    opacity: 0.55;
  }
  .a1 .tube {
    fill: none;
    stroke: var(--bac-metal);
    stroke-width: 1.6;
    stroke-linecap: round;
    opacity: 0.45;
  }
  .a1 .tube.active {
    stroke-width: 2.2;
    opacity: 1;
  }
  .a1 .stand {
    fill: var(--bac-cap);
  }
  .a1 .hub {
    fill: var(--bac-body);
    stroke: var(--bac-outline);
    stroke-width: 1;
  }
  .a1 .feeder {
    fill: var(--bac-cap);
    stroke: var(--bac-panel);
    stroke-width: 0.6;
  }
  .a1 .lever {
    fill: #e8b923;
  }
  .a1 .spool .flange {
    fill: var(--bac-flange);
  }
  .a1 .spool .filament {
    stroke: rgba(0, 0, 0, 0.18);
    stroke-width: 0.6;
  }
  .a1 .spool .spoke {
    stroke: var(--bac-outline);
    stroke-width: 1.4;
    stroke-linecap: round;
  }
  .a1 .spool .rim {
    fill: none;
    stroke: var(--bac-outline);
    stroke-width: 1.2;
  }
  .a1 .spool .core {
    fill: var(--bac-body);
    stroke: var(--bac-outline);
    stroke-width: 0.8;
  }
  .a1 .spool .axle {
    fill: var(--bac-cap);
  }
  .a1 .spool.empty .rim {
    stroke-dasharray: 2 2;
  }
  .a1 .spool.active .rim {
    stroke: var(--bac-accent);
    stroke-width: 2;
  }
  .a1 .badge-warn,
  .a1 .badge-pause,
  .a1 .badge-done {
    display: none;
  }

  /* hot nozzle / bed */
  .a1.nozzle-hot .nozzle-glow {
    display: inline;
    fill: #ff7a1a;
    opacity: 0.55;
    animation: breathe 1.6s ease-in-out infinite;
  }
  .a1.nozzle-hot .nozzle {
    fill: #ff9a3c;
  }
  .a1.bed-hot .heat {
    display: inline;
    animation: rise 2.4s ease-in-out infinite;
  }
  .a1.bed-hot .plate-edge {
    fill: #e0703a;
  }
  /* toolhead LED */
  .a1.light-on .cone {
    display: inline;
  }
  /* printing: the bed slings on Y, the active spool turns */
  .a1.printing .bed {
    animation: sling 1.5s ease-in-out infinite;
  }
  .a1 .reel.spinning {
    animation: spin 5s linear infinite;
  }
  .a1.preparing .lever.on,
  .a1.printing .lever.on {
    fill: var(--bac-accent);
  }
  .a1.paused .badge-pause {
    display: inline;
  }
  .a1.error .badge-warn,
  .a1.failed .badge-warn {
    display: inline;
    animation: breathe 1.2s ease-in-out infinite;
  }
  .a1.finished .badge-done {
    display: inline;
  }
  .a1.offline,
  .a1.unavailable {
    opacity: 0.6;
  }

  @keyframes sling {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(1.6px);
    }
  }
  @keyframes spin {
    to {
      transform: rotate(-360deg);
    }
  }
  @keyframes rise {
    0% {
      transform: translateY(3px);
      opacity: 0;
    }
    40% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(-5px);
      opacity: 0;
    }
  }
  @keyframes breathe {
    0%,
    100% {
      opacity: 0.35;
    }
    50% {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .a1 * {
      animation: none !important;
    }
  }

  /* ── metadata ───────────────────────────────────────────────────────── */
  .metadata {
    margin: var(--bac-spacing) auto;
  }
  .name {
    text-align: center;
    font-weight: bold;
    color: var(--bac-primary-text-color);
    font-size: 16px;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: var(--bac-secondary-text-color);
  }
  .status.error,
  .status.failed {
    color: var(--bac-error);
  }
  .status.paused {
    color: var(--bac-warning);
  }

  /* ── current job ────────────────────────────────────────────────────── */
  .job {
    display: flex;
    gap: 10px;
    align-items: center;
    margin: 0 14px 12px;
    text-align: left;
    cursor: pointer;
  }
  .job img {
    width: 44px;
    height: 44px;
    object-fit: contain;
    border-radius: 8px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    flex-shrink: 0;
  }
  .job-info {
    flex: 1;
    min-width: 0;
  }
  .job-name {
    color: var(--bac-primary-text-color);
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bar {
    height: 6px;
    border-radius: 3px;
    background: var(--bac-divider-color, rgba(0, 0, 0, 0.1));
    margin: 5px 0 4px;
    overflow: hidden;
  }
  .bar > div {
    height: 100%;
    border-radius: 3px;
    background: var(--bac-accent);
    transition: width 0.6s ease;
  }
  .job.paused .bar > div {
    background: var(--bac-warning);
  }
  .job.error .bar > div,
  .job.failed .bar > div {
    background: var(--bac-error);
  }
  .job-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    font-size: 0.8rem;
    color: var(--bac-secondary-text-color);
  }
  .job-meta b {
    color: var(--bac-primary-text-color);
    font-weight: 600;
  }

  /* ── AMS slots ──────────────────────────────────────────────────────── */
  .ams {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    border-top: 1px solid var(--bac-divider-color);
  }
  .slot-chip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 4px;
    cursor: pointer;
    min-width: 0;
    color: var(--bac-secondary-text-color);
    font-size: 0.82rem;
    border-right: 1px solid var(--bac-divider-color);
  }
  .slot-chip:last-child {
    border-right: 0;
  }
  .slot-chip .swatch {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }
  .slot-chip.empty .swatch {
    background: transparent !important;
    box-shadow: inset 0 0 0 1.5px var(--bac-divider-color);
  }
  .slot-chip .slot-text {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
    text-align: left;
    min-width: 0;
  }
  .slot-chip .slot-type {
    color: var(--bac-primary-text-color);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .slot-chip.active {
    background: color-mix(in srgb, var(--bac-accent) 12%, transparent);
  }
  .slot-chip.active .slot-type {
    color: var(--bac-accent);
  }

  /* ── stats ──────────────────────────────────────────────────────────── */
  .stats {
    border-top: 1px solid var(--bac-divider-color);
    display: flex;
    justify-content: space-evenly;
    color: var(--bac-secondary-text-color);
  }
  .stats-block {
    padding: var(--bac-spacing) 4px;
    text-align: center;
    border-right: 1px solid var(--bac-divider-color);
    flex: 1 1 0;
    min-width: 0;
  }
  .stats-block:last-of-type {
    border-right: 0;
  }
  .stats-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
  .stats-value {
    cursor: pointer;
    font-size: 20px;
    color: var(--bac-primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stats-value.hot {
    color: #e8701a;
  }
  .stats-subtitle {
    font-size: 0.82rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .step {
    border: 0;
    background: transparent;
    color: var(--bac-secondary-text-color);
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    border-radius: 50%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  .step:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
  }
  .step ha-icon {
    --mdc-icon-size: 16px;
  }

  /* ── toolbar ────────────────────────────────────────────────────────── */
  .toolbar {
    min-height: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
    border-top: 1px solid var(--bac-divider-color);
  }
  .toolbar .fill-gap {
    flex-grow: 1;
  }
  .toolbar ha-icon-button {
    color: var(--bac-secondary-text-color);
    width: 44px;
    height: 44px;
    --mdc-icon-button-size: 44px;
  }
  .toolbar ha-icon-button ha-icon {
    display: flex;
  }
  .toolbar ha-icon-button.active {
    color: var(--bac-warning);
  }
  .toolbar .text-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 0;
    background: transparent;
    color: var(--bac-secondary-text-color);
    font: inherit;
    padding: 12px 10px;
    cursor: pointer;
    border-radius: 8px;
  }
  .toolbar .text-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }
  .toolbar .text-button.danger {
    color: var(--bac-error);
  }
  .toolbar .text-button ha-icon {
    --mdc-icon-size: 20px;
  }
  .speed {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--bac-secondary-text-color);
    padding: 0 6px;
  }
  .speed ha-icon {
    --mdc-icon-size: 20px;
  }
  .speed select {
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    padding: 10px 2px;
  }
  .speed select option {
    color: initial;
  }
`;
