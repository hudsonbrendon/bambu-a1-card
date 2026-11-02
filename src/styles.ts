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

  /* ── product photos ─────────────────────────────────────────────────── */
  .hero {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 12px;
    margin: 6px auto 0;
    width: min(96%, 460px);
    cursor: pointer;
  }
  .hero.solo {
    width: min(64%, 260px);
  }
  .photo {
    position: relative;
    flex: 0 1 auto;
    line-height: 0;
  }
  .photo.printer {
    width: 58%;
  }
  .hero.solo .photo.printer {
    width: 100%;
  }
  .photo.spools {
    width: 42%;
  }
  .photo img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 10px 14px rgba(0, 0, 0, 0.16));
    transition: filter 0.4s ease, opacity 0.4s ease;
  }
  .hero.offline .photo img,
  .hero.unavailable .photo img {
    filter: grayscale(1);
    opacity: 0.45;
  }
  .hero.paused .photo.printer img {
    filter: drop-shadow(0 10px 14px rgba(0, 0, 0, 0.16)) saturate(0.6);
  }
  .pill {
    position: absolute;
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 2px 7px;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--bac-primary-text-color);
    background: var(--bac-background, var(--card-background-color));
    border: 1px solid var(--bac-divider-color);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    white-space: nowrap;
  }
  .pill ha-icon {
    --mdc-icon-size: 13px;
  }
  .pill.nozzle {
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .pill.bed {
    bottom: 13%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .pill.hot {
    color: #fff;
    background: var(--bac-error, #db4437);
    border-color: transparent;
  }
  .pill.warm {
    color: #fff;
    background: var(--bac-warning, #ffa600);
    border-color: transparent;
  }
  .pill.light {
    top: 6%;
    right: 8%;
    color: #fff;
    background: var(--bac-warning, #ffa600);
    border-color: transparent;
    padding: 3px;
  }
  .pill.active-slot {
    bottom: 6%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .pill .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
  }
  .hero.running .pill.nozzle.hot {
    animation: breathe 1.6s ease-in-out infinite;
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
