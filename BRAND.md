# NorthStar — Site Build Style Guide

This file is the single source of truth for all visual decisions on the NorthStar website. Read it before writing any CSS, layout, or component code. Do not deviate from these rules without explicit instruction.

---

## Reference Sites

Use these four sites as style references for layout, white space, typographic confidence, and overall luxury feel. Study their grid discipline, use of negative space, and restraint before making layout decisions.

- [Acne Studios](https://www.acnestudios.com)
- [Mara Design](https://mara.design)
- [Vitra](https://www.vitra.com)
- [Aesop](https://www.aesop.com)

The site should feel like it belongs in this company. Quiet, confident, considered. Nothing should feel crowded, rushed, or decorative for its own sake.

---

## Colours

All colours are specified as HEX. Use the role descriptions to make decisions — do not swap colours arbitrarily.

| Name | HEX | Role |
|------|-----|------|
| Bone | `#F7F0E7` | Primary background. Default page background and light accents on dark imagery. |
| Light Brown | `#B4AD9E` | Secondary. Complements Bone. Use for subtle dividers, muted text, secondary UI. |
| Mid Brown | `#8D8073` | Secondary. Complements Bone. Use for mid-hierarchy text and supporting elements. |
| Dark Brown | `#555047` | Primary text colour on light backgrounds. Dark UI elements. Default text colour. |
| Dusty Gold | `#E5C690` | Primary accent. The main accent colour across the site. Use with intention — not as a default fill. |
| Steel Blue | `#537088` | Secondary accent. Reserved for specialty sections only to create visual contrast and intrigue. Never use for logo or mark. |

---

## Typography

### Font Loading

Fonts are self-hosted in `/fonts/`. Include all `@font-face` declarations before any other styles.

```css
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Erode';
  src: url('/fonts/Erode-SemiboldItalic.woff2') format('woff2');
  font-weight: 600;
  font-style: italic;
}

@font-face {
  font-family: 'Erode';
  src: url('/fonts/Erode-Semibold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
}
```

### Type Scale

All sizes converted from Illustrator pt specs. Tracking converted from Illustrator units (value ÷ 1000 = em). Line height derived from Illustrator leading ÷ font size.

| Level | Font | Weight | Size | Letter Spacing | Line Height | When to Use |
|-------|------|--------|------|---------------|-------------|-------------|
| H1 — Display Heading | Satoshi | 900 | 80–96px | 0 | 0.93 | Hero and primary display headlines. Single-line only. |
| H2 — Section Heading | Satoshi | 700 | 60px | 0 | 1.47 | Section-level headlines with generous open leading. |
| H2 — Section Heading Tight | Satoshi | 700 | 60px | 0 | 1.07 | Same size as H2 but tighter leading. Use when stacking with a subheading directly below. |
| Subheading — Editorial | Erode | 600 italic | 53px | 0 | 1.0 | Expressive secondary headlines, pull quotes, editorial accents. |
| UI Label / CTA | Satoshi | 700 | 33px | -0.016em | 0.96 | CTAs, UI labels, all-caps labels, nav items. Tight tracking is intentional. |
| Serif Mid | Erode | 600 | 33px | 0 | 0.84 | Serif accent at mid-hierarchy. Single-line use only due to tight leading. |
| Body | Satoshi | 500 | 19px | 0.008em | 1.0 | All body copy. Slightly open tracking for readability. |

### Mobile Breakpoints

Scale display type down by ~40% on mobile:

| Level | Desktop | Mobile |
|-------|---------|--------|
| H1 Display | 80–96px | 48–58px |
| H2 Section | 60px | 36px |
| Subheading Editorial | 53px | 32px |
| UI Label / CTA | 33px | 24px |
| Serif Mid | 33px | 24px |
| Body | 19px | 16–17px |

---

## Layout & Spacing

- **Grid:** 12-column grid at all times.
- **Layout reference:** `/assets/structure-mockup.png` — refer to this for section order, proportions, and rough composition before building any section.
- **Negative space is not empty space — it is a design decision.** Err on the side of more space, not less. If something feels too sparse, that is correct.
- Default page margin: **35px** on left and right at all breakpoints unless explicitly specified otherwise.
- Let content breathe. Avoid stacking elements without generous padding between sections.

---

## Logo & Mark

### Assets

| Asset | Path | Description |
|-------|------|-------------|
| Primary logo | `/assets/primary-logo.svg` | Horizontal rectangle, wordmark left, star mark right. Stretches in width. |
| Secondary logo | `/assets/secondary-logo.svg` | Full wordmark — both lines of text with star mark. Used where more vertical space is available. |
| Smallmark | `/assets/smallmark.svg` | Star mark only. Used in sticky nav after scroll. |

All SVGs use `fill="currentColor"` — set colour via CSS `color` property on the element.

### Primary Logo Rules

- The logo is a solid-colour rectangle. The `NORTHSTAR` wordmark and star mark are knocked out of the rectangle (cut-out/reversed) — they are not separate elements placed on top.
- The wordmark and star mark are fixed in size and proportion. They never scale, stretch, or change. Only the rectangle width changes.
- Height is always **80px**, fixed. Width scales as needed for the context.
- `NORTHSTAR` wordmark: always **30px from the left edge**, vertically centred.
- Star mark: always **30px from the right edge**, vertically centred.
- As the rectangle widens, the gap between wordmark and star mark grows. The marks themselves do not move relative to their respective edges.
- Hero instance: spans full page width minus **35px margin on each side**. Appears in **Dark Brown (`#555047`) only**.
- Never render any logo or mark in Steel Blue (`#537088`).
- Every logo placement must have high contrast against its background. If contrast is insufficient, adjust the background — not the logo colour.

### Scroll Behaviour

- On page load, the full primary logo sits at the top of the page in Dark Brown.
- As the user scrolls down, the logo becomes sticky and **slowly fades out**.
- As the primary logo fades, a **Steel Blue smallmark** fades in underneath where the star mark was positioned.
- This is the only sanctioned use of Steel Blue in the logo zone.

---

## Single-Page Structure

The site is a single scrolling page. Sections are defined in `/assets/structure-mockup.png`. Animations should be subtle and purposeful — entrance animations on scroll, no gratuitous motion. Pacing should feel confident and unhurried, consistent with the reference sites above.

---

## Rules Claude Must Never Break

- Do not use Steel Blue as a general-purpose colour. It is a specialty accent only.
- Do not place any logo or mark in Steel Blue.
- Do not reduce margins below 35px without explicit instruction.
- Do not introduce fonts outside of Satoshi and Erode.
- Do not use colours outside the defined palette.
- Do not make layout decisions that prioritise density over space.
