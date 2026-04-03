# Design System: Cutting Edge Lawn Care and Snow Removal

## Color Palette

### Primary
- **Forest Green**: `#15803d` (green-700) — Primary brand color, CTAs, active states
- **Dark Green**: `#166534` (green-800) — Hover states, hero backgrounds
- **Light Green**: `#dcfce7` (green-100) — Subtle backgrounds, highlights

### Neutral
- **Charcoal**: `#1f2937` (gray-800) — Primary text, headers
- **Dark Gray**: `#374151` (gray-700) — Body text
- **Medium Gray**: `#6b7280` (gray-500) — Secondary text, captions
- **Light Gray**: `#f3f4f6` (gray-100) — Section backgrounds
- **White**: `#ffffff` — Page background, cards

### Accent
- **Amber**: `#f59e0b` (amber-500) — Star ratings, highlights
- **Blue**: `#2563eb` (blue-600) — Links (non-CTA)
- **Red**: `#dc2626` (red-600) — Phone number emphasis

## Typography

### Font Stack
- **Headings**: Inter (system fallback: -apple-system, sans-serif)
- **Body**: Inter (same stack)

### Scale
- Hero H1: 3rem / 48px (mobile: 2.25rem / 36px), font-weight: 800
- Page H1: 2.5rem / 40px (mobile: 2rem / 32px), font-weight: 800
- H2 Section: 2rem / 32px (mobile: 1.5rem / 24px), font-weight: 700
- H3 Card: 1.25rem / 20px, font-weight: 600
- Body: 1rem / 16px, font-weight: 400, line-height: 1.75
- Small: 0.875rem / 14px
- Caption: 0.75rem / 12px

## Spacing System
Based on 4px grid using Tailwind defaults:
- Section padding: py-16 (64px) desktop, py-12 (48px) mobile
- Container max-width: max-w-7xl (1280px) with px-4
- Card padding: p-6 or p-8
- Element gap: gap-4 (16px) standard, gap-8 (32px) between groups

## Components

### Buttons

**Primary CTA (Green)**
- bg-green-700 text-white px-6 py-3 rounded-lg font-semibold
- Hover: bg-green-800
- Shadow: shadow-lg

**Secondary CTA (White outline)**
- border-2 border-white text-white px-6 py-3 rounded-lg font-semibold
- Hover: bg-white text-green-800

**Phone CTA (Red accent)**
- bg-red-600 text-white px-6 py-3 rounded-lg font-semibold
- Hover: bg-red-700

### Cards
- bg-white rounded-xl shadow-md p-6
- Hover: shadow-lg transition
- Border option: border border-gray-200

### Form Inputs
- w-full border border-gray-300 rounded-lg px-4 py-3
- Focus: ring-2 ring-green-500 border-green-500
- Label: text-sm font-medium text-gray-700 mb-1

### Navigation
- Sticky top-0 bg-white shadow-sm z-50
- Links: text-gray-700 hover:text-green-700 font-medium
- Active: text-green-700 font-semibold

### Trust Badge
- Centered grid, icon + number + label
- Number: text-3xl font-bold text-green-700
- Label: text-sm text-gray-600

## Responsive Breakpoints
- Mobile: < 640px (default)
- Tablet: sm (640px)
- Desktop: lg (1024px)
- Wide: xl (1280px)

## Design Principles
1. **Clarity first**: Every element serves a purpose. No decorative clutter.
2. **Trust signals everywhere**: Reviews, stats, and credentials visible on every page.
3. **CTA repetition**: Primary actions appear at minimum in header, mid-page, and footer.
4. **Mobile priority**: All layouts designed mobile-first, enhanced for desktop.
5. **Whitespace**: Generous spacing between sections. Let content breathe.
