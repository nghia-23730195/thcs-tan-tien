---
name: Quantum Precision
colors:
  surface: '#0a122a'
  surface-dim: '#0a122a'
  surface-bright: '#313852'
  surface-container-lowest: '#050d25'
  surface-container-low: '#131a33'
  surface-container: '#171e37'
  surface-container-high: '#212942'
  surface-container-highest: '#2c344d'
  on-surface: '#dbe1ff'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#dbe1ff'
  inverse-on-surface: '#282f49'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#bdc5e9'
  on-secondary: '#262f4c'
  secondary-container: '#3d4664'
  on-secondary-container: '#abb4d7'
  tertiary: '#ffe9d6'
  on-tertiary: '#482900'
  tertiary-container: '#ffc689'
  on-tertiary-container: '#814d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#bdc5e9'
  on-secondary-fixed: '#111a36'
  on-secondary-fixed-variant: '#3d4664'
  tertiary-fixed: '#ffddbb'
  tertiary-fixed-dim: '#ffb868'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#673d00'
  background: '#0a122a'
  on-background: '#dbe1ff'
  surface-variant: '#2c344d'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  formula-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0.01em
  formula-md:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: 0.005em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system serves high school physics education across Grades 10, 11, and 12 (Chương trình Vật lý THPT). The platform bridges theoretical abstraction and intuitive visual understanding. The target audience includes digital-native students requiring rapid comprehension under exam pressure, alongside educators seeking structured lesson delivery.

The aesthetic fuses **Modern EdTech Precision** with **STEM Scientific Instrument Glassmorphism**:
- Visual tone conveys exactness, intellectual focus, and forward-looking momentum without gaming frivolousness.
- Contrast is engineered for prolonged cognitive endurance: deep orbital space tones ground complex formula breakdowns, while crisp slate surfaces maintain diagram legibility.
- Glassmorphic layers and controlled neon conduits guide student attention to critical physical constants, vector states, and lab variable manipulations.

## Colors

The palette simulates a modern physics laboratory HUD, balancing absolute clarity with high-contrast focal points.

- **Primary (`#00E5FF` - Electric Cyan):** Designates interactive states, energetic vectors, field lines, active tab highlights, and primary call-to-actions.
- **Secondary (`#1C2541` - Orbital Slate Blue):** Structured surface elevations, card backdrops, container dividers, and modal panels.
- **Tertiary (`#FF9E00` - Amber Kinetic):** Kinetic energy markers, warning states, examination countdowns, heat/thermodynamic representations, and pending test reviews.
- **Neutral (`#0B132B` - Deep Space Navy):** Foundational canvas backdrop, providing deep spatial immersion without the eye fatigue of absolute zero black (`#000000`).

### Surface & Semantic Tiers
- **Canvas Base:** `#0B132B`
- **Surface Elevation 1 (Card Default):** `#131E3D`
- **Surface Elevation 2 (Card Hover / Active Layer):** `#1C2541`
- **Surface Elevated Overlay (Glass Panels):** `rgba(28, 37, 65, 0.72)` with 16px backdrop-blur.
- **Border Subtle:** `rgba(0, 229, 255, 0.16)`
- **Border Focus / Active Vector:** `rgba(0, 229, 255, 0.75)`
- **Text High-Contrast:** `#F8FAFC`
- **Text Muted / Sub-label:** `#94A3B8`
- **Physics Constant / Monospace:** `#7DD3FC`

## Typography

The typographic system separates conversational content and editorial guidance from scientific notations.

- **Primary Voice (`Plus Jakarta Sans`):** Delivers clean geometry with open apertures, providing sustained readability across both Vietnamese diacritics and complex theoretical prose.
- **Precision Notation (`JetBrains Mono`):** Applied exclusively to physics formulas, variable indicators ($v_0$, $t$, $\lambda$, $\hbar$), coordinate readouts, SI unit annotations, and virtual oscilloscope telemetry.
- **Hierarchy Rules:** All section labels denoting grades (e.g., `LỚP 12 - DAO ĐỘNG CƠ`) must leverage `label-mono` in uppercase with cyan or amber tinting.

## Layout & Spacing

The layout is built on a responsive 12-column fluid grid on desktop, converting to 8 columns on tablet and 4 columns on mobile.

- **Desktop (min-width: 1200px):** 12 columns, `margin: 2.5rem`, `gutter: 1.5rem`. Simulation sandboxes and question sidebars align to dynamic 8:4 splits.
- **Tablet (768px - 1199px):** 8 columns, `margin: 1.5rem`, `gutter: 1.25rem`. Complex virtual labs switch to stacked viewport modes.
- **Mobile (< 768px):** 4 columns, `margin-mobile: 1rem`, `gutter-mobile: 1rem`. Formula strips lock horizontally with finger-scroll snap.
- **Spatial Rhythm:** Elements adhere strictly to a 4px/8px incremental rhythm. Spacing around interactive apparatuses maintains at least `space-lg` buffer zones to prevent accidental inputs during variable adjustments.

## Elevation & Depth

Visual hierarchy uses luminous depth stacking: dark surfaces step progressively lighter as they approach the user, bordered by micro-luminescent edges.

- **Ground Level (Canvas):** Pure `#0B132B`. Zero elevation.
- **Surface Elevation 1 (Static Cards / Formula Boxes):** Background `#131E3D`, 1px solid `rgba(255, 255, 255, 0.06)`, no box-shadow.
- **Surface Elevation 2 (Floating Lab Controls / Toolbars):** Background `rgba(28, 37, 65, 0.82)`, backdrop filter `blur(12px)`, 1px border `rgba(0, 229, 255, 0.25)`, shadow: `0 8px 32px -4px rgba(3, 7, 18, 0.45)`.
- **Surface Elevation 3 (Active Simulation / Modals / Draggables):** Background `#1C2541`, 1px border `rgba(0, 229, 255, 0.5)`, outer glow shadow: `0 0 20px -2px rgba(0, 229, 255, 0.25), 0 16px 40px -8px rgba(0, 0, 0, 0.6)`.
- **Laser Depth Accent:** Critical points (e.g., active nodes on a standing wave or resonance peaks) emit an amber focal glow: `0 0 12px rgba(255, 158, 0, 0.45)`.

## Shapes

The geometric architecture balances scientific precision with friendly digital affordances.

- **Level 2 (Rounded - 0.5rem / 8px Base):** Used for input fields, data badges, tabs, and small formula callouts.
- **Container Curvature (1rem / 16px):** Standard for exercise cards, video player wrappers, and interactive physics sandboxes.
- **Pill Shaping (Full Radius):** Reserved exclusively for status indicators (e.g., `Cơ học`, `Điện từ`, `Quang hình`), laboratory play/pause pills, and student score metrics.

## Components

### Buttons
- **Primary Kinetic (Execute / Submit):** Electric Cyan fill (`#00E5FF`), deep navy bold text (`#0B132B`), 8px border radius. Hover introduces a bright neon ambient glow (`0 0 16px rgba(0, 229, 255, 0.4)`).
- **Secondary / Ghost (Reset Simulation / Theory Switch):** Transparent background, 1px border `rgba(0, 229, 255, 0.35)`, text `#F8FAFC`. Hover sets background to `rgba(0, 229, 255, 0.08)`.
- **Hazard / Time Alert (Submit Exam):** Amber Neon fill (`#FF9E00`), text `#0B132B`.

### Formula Cards (Physics Theorem Blocks)
- Rendered in `#131E3D` with a left border accent (3px solid `#00E5FF`).
- Formulas use `JetBrains Mono` at `formula-lg` size with micro-glow highlighting on active variables during vector calculations.
- Integrated quick-action copy and variable parameter breakdown in `caption` font.

### Interactive Slider & Lab Controls
- **Track:** 4px tall, neutral slate (`#1C2541`) with an active filled span in `#00E5FF`.
- **Thumb:** 18px circle, `#0B132B` center with a 3px ring of `#00E5FF`. Hover scales thumb by 1.2x and displays current dynamic value in a mono tooltip above.

### Chips & Badges
- **Grade & Topic Tags:** Semi-transparent cyan tint (`rgba(0, 229, 255, 0.1)`), cyan text (`#00E5FF`), 1px border `rgba(0, 229, 255, 0.25)`. Full pill roundedness.
- **Difficulty Meter:** 3-bar vertical indicator using green (Cơ bản), cyan (Vận dụng), amber (Vận dụng cao).

### Input Fields & Multiple Choice Selectors
- **Input Field:** `#0F172A` background, border `rgba(255, 255, 255, 0.12)`, text `#F8FAFC`. Focus transitions border to `#00E5FF` with a 2px offset cyan shadow ring.
- **Quiz Choice Item:** Rounded 12px surface. Normal: `#131E3D`. Selected: Border `#00E5FF`, background `rgba(0, 229, 255, 0.08)`. Correct state: `#10B981` border with subtle success wash; Incorrect state: `#EF4444` border with amber warning callout.

### Data Readout & Oscilloscope Display
- Monospace readout HUD panels with high-contrast numerical values, subtle retro grid lines (`rgba(255, 255, 255, 0.04)`), and live telemetry status icons.