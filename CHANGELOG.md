# Changelog

## 0.3.2

- Spool masks rebuilt (holes filled, edges smoothed, softer tint through the translucent disc): no more speckled spools.

## 0.3.1

- Print stages are translated (pt-BR / en) instead of showing the raw key.

## 0.3.0

- The spools in the AMS lite photo are tinted with the colour of the filament
  loaded in each slot (empty slots fade out); the windings were neutralised in
  the base render and masked per slot.
- PTFE tubes drawn from the four AMS feeders to the hub on the printer.
- Task names are humanised: underscores become spaces, file extensions are
  dropped and the printer's own calibration job reads "Automatic calibration".

## 0.2.1

- A1 render cropped to the printer with the white background removed; pills repositioned.

## 0.2.0

- The illustration is gone: the card now shows the official Bambu Lab product
  renders of the A1 and the AMS lite (store.bambulab.com, background removed,
  embedded as WebP). Live nozzle / bed temperature pills sit on the printer,
  the chamber-light pill lights up when the LED is on and the active spool is
  tagged on the AMS. No more printed-part or status badge drawings.

## 0.1.1

- Hide the job thumbnail when the cover image fails to load.

## 0.1.0

- First release: the A1 and its AMS lite redrawn after the product photos;
  printing / preparing / paused / error / failed / finished / idle / offline
  states; current job with cover, progress, layers and ETA; AMS slots with the
  real filament colour, type and remaining %; nozzle / bed targets, pause,
  resume, stop, light, speed profile, cool down, home, bed leveling and
  shortcuts. Works with `bambulab_local` and `bambu_lab`.
