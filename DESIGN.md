---
name: Deep Space Telemetry & Planetary Surface Interface
colors:
  surface: '#101419'
  surface-dim: '#101419'
  surface-bright: '#36393f'
  surface-container-lowest: '#0a0e13'
  surface-container-low: '#181c21'
  surface-container: '#1c2025'
  surface-container-high: '#262a30'
  surface-container-highest: '#31353b'
  on-surface: '#e0e2ea'
  on-surface-variant: '#bbc9c7'
  inverse-surface: '#e0e2ea'
  inverse-on-surface: '#2d3136'
  outline: '#869392'
  outline-variant: '#3c4948'
  surface-tint: '#5adad1'
  primary: '#78f5ec'
  on-primary: '#003734'
  primary-container: '#58d8d0'
  on-primary-container: '#005c58'
  inverse-primary: '#006a65'
  secondary: '#ecc068'
  on-secondary: '#402d00'
  secondary-container: '#745400'
  on-secondary-container: '#f7cb71'
  tertiary: '#ffd8d6'
  on-tertiary: '#670211'
  tertiary-container: '#ffb1ae'
  on-tertiary-container: '#96292e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#79f6ee'
  primary-fixed-dim: '#5adad1'
  on-primary-fixed: '#00201e'
  on-primary-fixed-variant: '#00504c'
  secondary-fixed: '#ffdea2'
  secondary-fixed-dim: '#ecc068'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5c4200'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#ffb3b0'
  on-tertiary-fixed: '#410007'
  on-tertiary-fixed-variant: '#871e25'
  background: '#101419'
  on-background: '#e0e2ea'
  surface-variant: '#31353b'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  telemetry-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.01em
  telemetry-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.02em
  telemetry-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.12em
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system is engineered for deep lunar exploration, scientific visualization, and Commercial Lunar Payload Services (CLPS) mission telemetry. It combines aerospace operational control with cinematic scientific publication aesthetics, drawing inspiration from high-reliability flight consoles, advanced astrophysical observation decks, and editorial typography.

The target audience encompasses aerospace mission planners, payload astrophysicists, autonomous rover operators, and academic researchers tracking lunar surface operations. The interface must evoke total mission situational awareness: calm, hyper-precise, authoritative, and scientifically rigorous under high-density cognitive load.

### Visual Aesthetic

The visual language rejects generic consumer web tropes, neon vaporwave glows, and arbitrary rounded cards. It implements an aerospace-grade **Precision Technical Minimalist** framework:
- **Hairline Precision**: 1px structural framing, coordinate reticles, and sub-millimeter visual delimiters evoke telemetry HUDs and optical bench instruments.
- **Atmospheric Void**: Total contrast discipline using layered, desaturated basalt tones to eliminate screen glare and reduce ocular strain during continuous surveillance sessions.
- **Instrument Chromaticity**: Spectral functional colors (Solar Gold, Earth Cyan, Alert Coral) reserved strictly for physical phenomena—solar illumination, line-of-sight telecommunications, and geometric occlusions.
- **Dual-Domain Timelines**: Visual data structures accommodate simultaneous chronologies—Universal Time Coordinated (UTC), Ground Elapsed Time (GET), and Lunar Solar Phase azimuth.

## Colors

The palette operates in strict dark mode, establishing an authentic deep-space operational environment. Every hex value represents a calibrated physical or structural role.

### Color Mapping & Semantics

- **Cosmic Base & Tonal Surfaces**:
  - `Obsidian` (`#07090B`): Canvas baseline, outer orbital vacuum, deep letterbox viewports.
  - `Deep Space` (`#0B0F14`): Primary viewport, main telemetry panels, primary operational staging background.
  - `Lunar Graphite` (`#171B20`): Floating telemetry modules, HUD cards, inspector sidebars, instrument data trays.
  - `Surface Border` (`#2A323D`): 1px structural grid lines, bounding boxes, instrument dividers, crosshair axes.

- **Data & Text Scale**:
  - `Warm White` (`#F3F1EB`): Primary mission readouts, active site titles, high-contrast ephemeris values, primary interactive typography.
  - `Titanium` (`#9DA4AD`): Telemetry labels, units of measurement, inactive axis values, coordinate tick markings, secondary descriptions.
  - `Titanium Muted` (`#545C66`): Disabled states, inactive historical orbits, grid subdivision references.

- **Spectral Mission Channels**:
  - `Earth Cyan` (`#58D8D0`): Primary active telemetry state, Direct-to-Earth (DTE) comms link active, S-band/X-band signal locks, active landing footprint.
  - `Solar Gold` (`#F2C66D`): Secondary physical parameter, photovoltaic power generation, direct solar line-of-sight, solar elevation angles, thermal exposure boundaries.
  - `Alert Coral` (`#FF7777`): Tertiary hazard state, horizon terrain masking, critical communication blackout, thermal shadow occlusion, hardware telemetry threshold violation.

### Usage Rules

1. Avoid pure black (`#000000`) for data surfaces; use `#07090B` or `#0B0F14` to retain hairline border legibility.
2. Earth Cyan and Solar Gold must never be used simultaneously for aesthetic decoration; their appearance indicates active real-time data states or physical vector fields.
3. Functional accents must adhere to an 85:10:5 distribution (85% Obsidian/Graphite surfaces, 10% Warm White/Titanium data typography, 5% active telemetry signals).

## Typography

The typographic hierarchy implements a tripartite division of labor:

1. **Space Grotesk (Display & Section Titles)**: Delivers scientific authority, architectural geometry, and mission distinction. Used for mission designation codes (e.g., `CLPS-TO-20A`), payload designations, and chapter titles.
2. **Inter (Body & Analysis)**: Provides neutral, distortion-free optical legibility across dense payload inventories, instrument operation parameters, and scientific summaries.
3. **JetBrains Mono (Telemetry & Vectors)**: Deployed across calculation matrices, ephemeris clocks, azimuth/elevation angles, coordinates, and real-time status chips. Monospace characters maintain strict column alignment during real-time value updates.

### Rules of Execution

- Set numeric coordinates, UTC timestamps, and sensor telemetry in tabular numbers (`font-variant-numeric: tabular-nums`).
- Apply `label-caps` strictly with uppercase transformations (`text-transform: uppercase`) for category tags, radar indicators, and channel headers.
- Never set narrative scientific copy in monospaced type; reserve monospace exclusively for data readouts, labels, and code-level parameters.

## Layout & Spacing

The layout is built upon an instrumentation workbench model using a 12-column fluid grid system paired with micro-step spacing multiples of 4px and 8px.

### Grid & Layout Geometry

- **Desktop (1440px and above)**: 12-column fluid grid, 2.5rem outer canvas margin, 1.5rem gutters. Layout allocates space for persistent flight-director telemetry sidebars (3-column width or 360px fixed) alongside an interactive 3D orthographic surface viewport (9-column span).
- **Tablet / Tactical Displays (768px to 1439px)**: 8-column layout, 1.5rem margin, 1rem gutter. Lateral telemetry panels collapse into sliding bottom-sheet drawers or docked HUD trays.
- **Mobile Handheld (320px to 767px)**: 4-column layout, 1rem margin, 1rem gutter. Visualization viewports maintain a 16:9 or 1:1 constrained ratio with stacked telemetry feeds beneath.

### Structural Density

1. Component internal padding must be compact (`space-xs` and `space-sm` for readouts, `space-md` for control panels) to maximize data density on mission-critical displays.
2. Outer layout boundaries must use generous gaps (`space-xl`, `space-2xl`) between unrelated operational systems, preventing touch/click ambiguity during operations.

## Elevation & Depth

Visual depth is achieved through structural layering and optical density rather than standard drop shadows. The system uses a **Tonal Surface Stacking** model combined with **1px Technical Hairlines**.

### Elevation Stack

- **Level 0 (Deep Space Vacuum - `#07090B`)**: Outer frame background, behind 3D lunar coordinate visualizers and raw data viewports.
- **Level 1 (Working Deck - `#0B0F14`)**: Main console surface, mission list containers, chronological dual-track timelines.
- **Level 2 (Flight Panels & Module Trays - `#171B20`)**: Detached telemetry modules, coordinate readouts, instrument inspector cards. Outlined by a continuous 1px hairline border in `Surface Border` (`#2A323D`).
- **Level 3 (Tactical Floating HUDs & Overlays)**: Surface color `#171B20` rendered at 85% opacity with an active `backdrop-filter: blur(12px)`. Outlined in `Surface Border` (`#2A323D`) or dynamic status colors (e.g., `Earth Cyan` at 40% opacity during active tracking).

### Atmospheric Occlusion & Lighting

Drop shadows are reserved strictly for floating viewport HUD overlays. Where applied, shadows must be sharp and tinted to the cosmic background:
- `box-shadow: 0 4px 24px -2px rgba(7, 9, 11, 0.85), 0 0 0 1px #2A323D`
- Glows are functional, not decorative: an active signal link emits an Earth Cyan atmospheric ring: `box-shadow: 0 0 16px -2px rgba(88, 216, 208, 0.25)`.

## Shapes

The design system implements a **Sharp (0px)** geometric primitive discipline. Radii are set to `0px` across structural containers, panels, and telemetry trays to mirror mechanical aerospace instrumentation, flight computers, and technical blueprints.

### Form Semantics

- **Panels, Cards, and Inputs**: Strict 90-degree orthogonal edges (`border-radius: 0px`).
- **Corner Brackets**: Key mission readouts and HUD modules utilize chamfered corners (using a 6px or 8px 45-degree CSS `clip-path: polygon(...)`) or stylized 1px crosshair reticles on their outer corners, evoking optical framing targets.
- **Indicator Elements**: Telemetry status dots, line-of-sight status indicators, and solar disk markers are kept as exact circles (`border-radius: 50%`) to denote focal coordinates or celestial bodies.

## Components

### 1. Action Triggers & Buttons
- **Primary Flight Trigger**: Background `Earth Cyan` (`#58D8D0`), typography `Obsidian` (`#07090B`) in `JetBrains Mono` medium 12px uppercase. 0px border-radius, 10px 18px padding. On hover: shifts to `#7BE0DA` with a 1px border highlight.
- **Secondary Telemetry Button**: Background transparent, 1px solid `Surface Border` (`#2A323D`), typography `Warm White` (`#F3F1EB`). On hover: border transitions to `Titanium` (`#9DA4AD`) with an internal surface fill of `Lunar Graphite` (`#171B20`).
- **Critical Abort / Occlusion Trigger**: Background transparent, 1px solid `Alert Coral` (`#FF7777`), typography `Alert Coral`. On hover: background shifts to `#FF7777` at 15% opacity.

### 2. Status Chips & Telemetry Badges
- Constructed with a 1px solid border, 4px 8px padding, and `telemetry-sm` typography.
- **DTE (Direct-to-Earth) Online**: Border `rgba(88, 216, 208, 0.4)`, fill `rgba(88, 216, 208, 0.08)`, text `#58D8D0`, paired with a pulsing 6px circular node.
- **Solar Insolation Active**: Border `rgba(242, 198, 109, 0.4)`, fill `rgba(242, 198, 109, 0.08)`, text `#F2C66D`.
- **LOS (Loss-of-Signal) Obstruction**: Border `rgba(255, 119, 119, 0.4)`, fill `rgba(255, 119, 119, 0.08)`, text `#FF7777`.

### 3. Flight Telemetry & Inspector Cards
- Solid `Lunar Graphite` (`#171B20`) background enclosed in a 1px `Surface Border` (`#2A323D`).
- Card headers feature an upper metadata strip: small `label-caps` identifying module code (e.g., `TLM-NAV-01`) on the left, and UTC time synchronization on the right.
- Optional HUD variant incorporates corner crosshairs (+ symbols rendered in `Titanium Muted` at card bounds).

### 4. Input Fields & Parameter Controls
- Background `Obsidian` (`#07090B`), 1px solid `Surface Border` (`#2A323D`), text `Warm White` (`#F3F1EB`) in `JetBrains Mono` 13px.
- Focus state: border shifts immediately to `Earth Cyan` (`#58D8D0`) with a zero-radius bounding outline.
- Labels sit outside the field in `label-caps` uppercase Titanium. Unit markers (e.g., `DEG`, `KM`, `GHZ`) are fixed right-aligned in `Titanium Muted`.

### 5. Checkboxes & Selection Relays
- Custom square markers (14px x 14px), 0px radius, 1px solid `Surface Border` (`#2A323D`).
- Active checked state: filled with `Earth Cyan` (`#58D8D0`) with a centered 6px black dot instead of a conventional checkmark, referencing instrumentation relay switches.

### 6. Domain-Specific Component: Dual-Timeline Data Track
- A horizontal scrub-strip displaying mission time.
- Top track: Solar availability and incidence angle plotted via continuous vector heights in `Solar Gold`.
- Bottom track: Direct-to-Earth line-of-sight windows plotted in solid blocks of `Earth Cyan`.
- Occlusions and shadow boundaries cut through both tracks in sharp vertical slices of `Alert Coral`.

### 7. Domain-Specific Component: Ephemeris Coordinate Matrix
- A dense 4-column data grid showing Azimuth, Elevation, Range, and Range-Rate.
- Values update live using `telemetry-lg` numerals in tabular spacing, labeled above in `label-caps` Titanium.