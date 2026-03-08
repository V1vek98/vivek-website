# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server on port 3000
npm run build      # Production build (Vercel deployment)
npm test           # Jest tests via react-scripts
```

No custom lint script — ESLint runs through `react-scripts` (extends `react-app` config).

## Architecture

React 19 single-page portfolio built with Create React App. No backend — all content is static.

### Routing (React Router v7)

| Route | Page | Description |
|-------|------|-------------|
| `/` | `HomePage` | 5 scrollable sections: Hero, About, Skills, Experience, Contact |
| `/dashboards` | `DashboardShowcase` | 4 interactive dashboard demos |
| `*` | `NotFoundPage` | 404 |

### Layout System

- **Desktop (≥1024px)**: Left sidebar (64px, expands to 220px on hover) + top BreadcrumbBar with scroll progress
- **Mobile (<1024px)**: Bottom tab bar + BreadcrumbBar
- Sections use `<Section>` (full-width with bg variant) → `<Container>` (max-width + responsive padding) pattern
- `PageTransition` wraps routes with Framer Motion exit/enter animations

### Data Flow

All content lives in `src/config/data.js` — personal info, KPIs, skills, experiences, command palette actions, sidebar links, easter eggs. Section components import directly from this file; no props drilling or state management library.

Global state in `App.js`: boot sequence completion, Konami code activation, command palette open/close.

### Styling

- **Tailwind CSS 3** with custom theme in `tailwind.config.js` (colors, fonts, animations)
- **Design tokens** in `src/config/theme.js` and CSS variables in `src/index.css`
- Light theme only. Google 4-color accents: `accent-blue` (#4285F4), `accent-red` (#EA4335), `accent-yellow` (#FBBC05), `accent-green` (#34A853)
- Content colors: `content-primary` (#0F172A), `content-secondary` (#475569), `content-tertiary` (#94A3B8)
- Surface colors: white → `#F8FAFC` → `#F1F5F9`
- Fonts: Inter (UI), JetBrains Mono (code), Instrument Serif (tagline/quotes)
- Custom utility classes in `index.css`: `.glass-card`, `.glass-card-hover`, `.text-gradient-google`, `.noise-overlay`

### Animation

Heavy use of **Framer Motion**. Reusable variants in `src/utils/animations.js`: `fadeInUp`, `fadeIn`, `slideInLeft`, `slideInRight`, `scaleIn`, `staggerContainer`, `staggerItem`. Spring/easing presets in `theme.js`.

Pattern: `whileInView="visible"` with `viewport={{ once: true }}` for scroll-triggered entrances.

`useReducedMotion` hook respects `prefers-reduced-motion` and detects low-end hardware (≤4 cores) — skips boot sequence and disables heavy animations.

### Key Interactive Features

- **Boot Sequence** (`BootSequence.js`): SQL query typewriter on first load, skippable
- **Command Palette** (`CommandPalette.js`): Ctrl+K / Cmd+K search/navigation
- **Custom Cursor + Trail**: Desktop only, hidden on touch/mobile
- **Konami Code**: Easter egg overlay (↑↑↓↓←→←→BA)

## Component Organization

```
src/components/
  layout/     # Sidebar, BottomTabBar, BreadcrumbBar, Container, Section, Footer, PageTransition
  sections/   # HeroSection, AboutSection, SkillsSection, ExperienceSection, ContactSection
  dashboards/ # SaaSAnalytics, NLPAnalytics, HotelPerformance, SupplyChainOps
  ui/         # ~23 reusable components (KPICard, CodeBlock, GlassCard, MagneticButton, etc.)
```

## Custom Hooks

| Hook | Purpose |
|------|---------|
| `useReducedMotion` | Detects `prefers-reduced-motion` + low-end hardware |
| `useKonamiCode` | Tracks Konami sequence, returns `{ activated, reset }` |
| `useAnimatedCounter` | Animates number on scroll into view |
| `useMousePosition` | Mouse coordinates for cursor effects |
| `useScrollProgress` | Page scroll percentage (0–100) |
| `useTimeGreeting` | Time-of-day greeting string |

## Deployment

Deployed to **Vercel** from `master` branch. `npm run build` produces the `build/` directory. Tailwind purges unused CSS automatically.

## Gotchas

- Grid children containing `<pre>` elements need `min-w-0` to prevent horizontal overflow on mobile (CSS grid intrinsic sizing)
- `matter-js` is in dependencies but currently unused
- Icons are from **Lucide React** (not FontAwesome or similar)
- No real form submission — contact section uses mailto/external links
- The `src/routes/` and `src/assets/styles/` directories contain legacy code that is not actively used
