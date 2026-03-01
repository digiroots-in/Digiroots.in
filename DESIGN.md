# Design System: digiroots Agency Landing Page
**Project ID:** 17726612492532269902
**Screen ID:** f27b2f1431704c9a89e8311461cff584

---

## 1. Visual Theme & Atmosphere

The digiroots design exudes a **bold, agency-forward energy** — somewhere between a performance dashboard and a streetwear lookbook. It is high-contrast and unapologetically opinionated: deep forest-green darkness paired with electric lime-green punches that feel almost neon against the night.

The overall density is **airy on the macro scale but punchy on the micro** — generous whitespace orchestrates the eye, yet typographic elements shout in uppercase display fonts. The aesthetic philosophy is: *results-first, no fluff*. Numbers dominate, words sell, and every surface element either glows or gets out of the way.

The design supports **dual-mode theming** (light and dark), with the dark mode as its natural, dominant personality — a deep green biome universe where lime-green is the source of light.

---

## 2. Color Palette & Roles

| Descriptive Name | Hex Code | Role |
|---|---|---|
| **Electric Lime** | `#84cc16` | Primary brand accent. Used for main CTAs, links on hover, stat highlights, and the logo dot. The "energy color" of the system. |
| **Deep Forest Night** | `#061a06` | Dark mode page background. Dense, near-black forest green that makes lime pop. |
| **Midnight Canopy** | `#0a260a` | Elevated dark surfaces — cards, sections with one step more luminance than the base. |
| **Pure Snow** | `#f8fafc` | Light mode page background. Clinical white with a breath of cool blue — never warm. |
| **Champagne Mist (Yellow Accent)** | `#fef9c3` | Service card background in dark, signals SEO/creative warmth. |
| **Violet Cream (Purple Accent)** | `#f3e8ff` | Service card background for paid ads/performance. Conveys intelligence. |
| **Arctic Wash (Blue Accent)** | `#e0f2fe` | Service card background for branding/social. Conveys reliability and trust. |
| **Blush Petal (Pink Accent)** | `#fce7f3` | Softer accent for additional service variations. |
| **Cool Slate Mid** | `#64748b` | Body text on light backgrounds. Professional but not harsh. |
| **Fog White** | `rgba(255,255,255,0.03–0.10)` | Glass-card translucency on dark surfaces. The dark mode's version of a "card". |

---

## 3. Typography Rules

The system uses a **two-typeface hierarchy** that separates display drama from body utility:

### Display: **Outfit** (weights 400, 600, 800)
- Reserved for all **heroes, section headings, and major statistics**.
- Used at sizes from `text-4xl` up to `text-8xl` — these are declarations, not paragraphs.
- Always **uppercase when used as headings**. This aggressiveness is intentional and brand-defining.
- Letter-spacing is tight (`tracking-tight`, `tracking-tighter`) — the display text wants to feel *compressed and powerful*.
- Weight `font-black` (900) is used for mega-numbers (+340%, 12k+, 10M+).

### Body: **Plus Jakarta Sans** (weights 400, 500, 600, 700, 800)
- Used for **navigation, body copy, feature lists, card descriptions, and form labels**.
- Conversational, geometric, and humanist — the counterbalance to Outfit's aggression.
- At body sizes, it reads as confident but approachable.
- Label/tag text uses `font-semibold` or `font-bold` with `uppercase tracking-widest` for a structured, badge-like feel.

---

## 4. Component Stylings

### Buttons
- **Primary CTA**: Pill-shaped (`rounded-full`), filled with Electric Lime (`bg-primary`), black text (`text-black`), bold. On hover: slightly brighter lime (`bg-lime-500`) with a subtle pop scale (`hover:scale-105`). Includes a lime-green diffused glow shadow (`shadow-primary/20`).
- **Ghost/Outline**: Pill-shaped, transparent background, 2px border in pale slate or subtle white (`border-slate-200 / border-white/10`). Hover lifts to a muted fill. Used for secondary actions like "View Results".
- **Dark mode toggle**: Circular (`rounded-full`), icon-only, fills with muted hover state.

### Cards / Containers
- **Service Cards**: Generously rounded corners (`rounded-3xl` = 1.5rem). Solid pastel-tinted fills (yellow, purple, blue, pink). Light but saturated, used exclusively in light-facing contexts. Lifts with a gentle scale on hover (`hover:scale-[1.02]`).
- **Success/Results Cards**: Very rounded (`rounded-[2rem]`). **Glassmorphic dark surface** — `bg-white/5`, `backdrop-blur(10px)`, thin bright border (`border-white/10`). Hover state subtly brightens the translucency.
- **Pricing Cards**: Slightly rounded (`rounded-[2rem]`). Light mode: white card with `border-slate-200`. Featured/popular card has a `border-2 border-primary` Electric Lime border with an orange `Most Popular` badge.
- **FAQ Accordions**: Softly rounded (`rounded-2xl`), muted background (`bg-slate-50 / bg-white/5`), hairline border. The expand-icon rotates 180° when open.

### Navigation
- Fixed top bar with `backdrop-blur-md` and a barely-there bottom border. Blends with the content below while remaining legible. Nav links hover to lime. The logo wordmark uses Outfit Black with a lime period punctuation mark as brand signature.

### Forms / Inputs
- **Email capture input**: Pill-shaped (`rounded-full`). Light fill (`bg-white / bg-white/10`). Borderless — the shape and focus ring (`focus:ring-primary`) do the work. The submit button is inset inside the pill shape at the right edge.

### Sticker Highlights
- Special typographic treatment: inline text wrapped in `sticker-highlight` class. Adds a slight tilt (alternating `-2deg` / `+2deg` rotation), a subtle 4px ink-shadow, and a half-rem border radius. Used in the hero headline on the words "IDEAS" (white) and "REAL" (lime).

### Notification Toast (Pop-up Widget)
- Fixed bottom-left. Dark card with heavy `shadow-2xl` and `rounded-2xl`. Contains an avatar with a Primary-lime border ring and a green online-status dot. Bouncing animation (`animate-bounce`) draws attention.

---

## 5. Layout Principles

- **Max-width container**: `max-w-7xl` (80rem) centered with `mx-auto`, padding `px-6`. Consistent across all sections.
- **Generous vertical rhythm**: Sections use `py-24` (6rem top and bottom) as the standard spacer. This creates breathing room and prevents visual fatigue.
- **12-column asymmetric grids**: The Results section uses `grid-cols-12` with `col-span-8` and `col-span-4` splits — the large card gets dominant visual weight.
- **Floating glows**: Decorative `blur-3xl` circular divs with primary-tinted fills are absolutely positioned behind hero text to create soft ambient lighting without hard edges.
- **Dark section breaks**: The "Results" section forces `bg-background-dark text-white` regardless of mode, creating a full-bleed visual "chapter break" that contrasts with the standard page background.
- **Whitespace as trust**: Empty space is used intentionally around major numbers and headlines. The layout communicates that the agency doesn't need to fill every pixel — results speak.
