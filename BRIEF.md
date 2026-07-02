# NorthStar — Website Build Brief

Read this file alongside `BRAND.md` before writing a single line of code. BRAND.md contains all colour values, typography specs, font loading, and logo rules. This file contains the layout, section-by-section build instructions, interactions, and animations.

---

## Overview

- **Type:** Single scrolling page, no routing
- **Tech stack:** Plain HTML, CSS, JavaScript — no framework required
- **Deployment:** Static files, deployable via Netlify drag-and-drop
- **Fonts:** Self-hosted via `@font-face` (see BRAND.md)
- **Layout reference:** `/assets/structure-mockup-clean-01.png` (top half) and `/assets/structure-mockup-clean-02.png` (bottom half) — visual layout map, refer to both throughout
- **Animation notes:** `/assets/structure-notes.png` — annotation layer with animation intent per section

---

## Workspace File Structure

Before starting, confirm these files exist:

```
07website/
  index.html
  style.css
  script.js
  BRAND.md
  BRIEF.md
  /assets/
    structure-mockup-clean-01.png
    structure-mockup-clean-02.png
    structure-notes.png
    primary-logo.svg
    secondary-logo.svg
    smallmark.svg
    /images/
      hero-1.png
      hero-2.jpeg
      hero-3.png
      hero-4.png
      hero-5.png
      hero-6.png
  /fonts/
    Satoshi-Black.woff2
    Satoshi-Bold.woff2
    Satoshi-Medium.woff2
    Erode-SemiboldItalic.woff2
    Erode-Semibold.woff2
  /copy/
    copy.md  ← Harvey will provide this
```

Do not start building until `/copy/copy.md` exists and `/fonts/` contains all four font files. Use placeholder text only if Harvey has explicitly said to proceed without final copy.

---

## Global Rules

- All styles from BRAND.md apply globally — never override them without instruction
- 12-column grid at all times
- 35px page margin left and right, maintained throughout all sections unless specified otherwise
- Generous negative space — when in doubt, add more padding, not less
- No borders, drop shadows, or decorative lines unless specified
- All scroll-triggered animations use `IntersectionObserver` — no scroll-jacking
- Animation easing: `cubic-bezier(0.16, 1, 0.3, 1)` — smooth, confident, not bouncy
- Default animation duration: 0.7s. Default delay between staggered elements: 0.1s
- Images: always `object-fit: cover`, never distorted or letter-boxed
- All images use the dusty cinematic grade (see BRAND.md image direction)

---

## Section 1 — Navigation

**Layout:**
- Full-width Bone (`#F7F0E7`) background
- Primary logo spans full width minus 35px margin each side
- Logo height: 80px fixed (see BRAND.md logo rules — knockout container, marks pinned 30px from edges)
- Logo colour: Dark Brown (`#555047`)
- "GET IN TOUCH" button: right-aligned, sits outside the logo container to the far right within the 35px margin zone — small, uppercase, Satoshi Bold, Dark Brown text, no fill, thin Dark Brown border

**Scroll behaviour:**
- Nav is sticky from the moment the user scrolls
- As the user scrolls past the hero, the primary logo slowly fades out (opacity 1 → 0, duration 0.4s)
- Simultaneously, the Steel Blue (`#537088`) smallmark fades in (opacity 0 → 1) in the same position where the star mark was on the right side of the logo
- "GET IN TOUCH" button remains visible throughout
- Nav background transitions from transparent (over hero) to Bone with a subtle blur backdrop once past the hero

---

## Section 2 — Hero

**Layout:**
- Full viewport height (`100vh`), full bleed — no margins
- Slideshow of cinematic NZ photography (dusty grade, see BRAND.md)
- Images: `object-fit: cover`, `object-position: center`
- Dark overlay: `rgba(0,0,0,0.15)` — subtle, just enough contrast for text legibility without killing the grade
- Headline text sits over the image, lower-left or centred — refer to `/assets/structure-mockup.png`
- Text colour: white or Bone depending on image brightness — default to Bone (`#F7F0E7`)

**Slideshow behaviour:**
- 3 images minimum, crossfade transition (opacity-based, not slide)
- Transition duration: 1.2s
- Hold time per image: 5s
- Autoplay on load, no controls visible
- No indicators/dots — clean

**Text:**
- Insert from `/copy/copy.md` — hero headline section
- Heading level (Satoshi Black, 64–72px)

---

## Section 3 — Value Proposition

**Layout:**
- Bone (`#F7F0E7`) background
- Full width, generous vertical padding (min 120px top and bottom)
- Large headline, left-aligned or centred — refer to mockup
- The word "one" in the headline is italicised using Erode Medium Italic — this is a deliberate typographic accent, not a mistake

**Text:**
- Heading: "A year of premium content. For the cost of one photoshoot."
- "one" renders in Erode Medium Italic, all other words in Satoshi Black
- Supporting body copy below from `/copy/copy.md`

---

## Section 4 — Work Samples Grid

**Layout:**
- Cinematic image grid — mixed proportions (refer to `/assets/structure-mockup.png` for grid pattern)
- No margins between images — flush grid
- Images are display only — no click interaction, no lightbox
- Full bleed to page edges (no 35px margin in this section)
- 2–3 column grid depending on image proportions

**Images:**
- All images from `/assets/images/`
- All use the dusty cinematic grade
- Grid should feel like an editorial spread, not a portfolio thumbnail grid

**Scroll animation:**
- Images fade and translate up (translateY 20px → 0) as they enter the viewport
- Stagger each image by 0.1s

---

## Section 5 — How It Works

**Layout:**
- Bone background
- Section headline: "From concept to launch. Step by step." — use Heading style, left-aligned
- The word "launch" renders in Dusty Gold (`#E5C690`) — typographic accent
- Four numbered steps in a row or 2×2 grid (refer to mockup): 01 Assessment, 02 Strategise, 03 Construct, 04 Review
- Each step: number in Erode Medium Italic (large, muted), title in Satoshi Bold Subheading 2 style, description in Body
- NorthStar star mark or full logo appears as a large, low-opacity watermark behind the content in this section — Mid Brown (`#8D8073`) at ~8% opacity

**Step numbers:**
- Prefix format: `01.` `02.` `03.` `04.`
- Numbers in Erode Medium Italic, large (48–64px), Mid Brown colour
- Titles in Satoshi Bold (Subheading 2 spec)

**Scroll animation:**
- Steps animate in sequentially, staggered 0.15s apart
- Fade + translateY(20px → 0)

---

## Section 6 — Pricing

**Layout:**
- Bone background
- Section headline: "Flexible programs, catered to your business's volume." — Heading style
- Three columns side by side: PILOT, ENGINE, ENGINE PRO
- All three start at the same height
- Column headers in Subheading 2 (Satoshi Bold, all caps)
- Pricing and details in Body copy
- Refer to `/copy/copy.md` for all pricing copy

**Hover interaction (critical):**
- On hover of any column: the hovered column extends upward (height increases via transform: translateY(-20px) or padding-top increase), creating a "pop up" effect
- Simultaneously: all other columns drop to 60% opacity
- Transition: 0.3s, smooth easing
- Only one column in the active state at a time
- On mouse leave from all columns: all return to default state

**Column styling:**
- Thin border or subtle background differentiation between columns — keep it minimal
- ENGINE PRO should have a subtle distinction (slightly darker background or Dusty Gold accent detail) to indicate it is the recommended/premium tier — but do not make it garish

---

## Section 7 — Previous Work

**Layout:**
- Section label: "PREVIOUS WORK — MCKENZIE AND WILLIS WINTER COLLECTION SPRINT" — Subheading 2, all caps, Mid Brown
- Image grid below the label — refer to mockup for grid proportions
- Images flush, no gap or minimal gap
- Display only, no interaction

**Note:** M&W work is the proof of concept. Present it cleanly without over-explaining.

---

## Section 8 — About NorthStar

**Layout:**
- Bone background, full bleed cinematic image (boucle/furniture close-up) spanning left half or full width — refer to mockup
- Secondary logo (`/assets/secondary-logo.svg`) sits above the body copy, in Dark Brown, left-aligned
- Secondary logo is the standalone wordmark + star mark — NOT inside a rectangle container. Size to feel considered, not oversized.
- Body copy from `/copy/copy.md` — About section, sits to the right of or below the image depending on layout

---

## Section 9 — Final CTA

**Layout:**
- Dark section — Dark Brown (`#555047`) or near-black background
- Large NorthStar primary logo centred or full width — in Bone (`#F7F0E7`) (knockout reversed on dark background)
- CTA headline and button from `/copy/copy.md`
- "Schedule a Call" button — primary button style, Dusty Gold background, Dark Brown text

---

## Section 10 — Footer

**Layout:**
- Continues from the dark CTA section or transitions to a Bone footer
- Decorative terrain/landscape silhouette in Dusty Gold (`#E5C690`) at the very bottom of the page — a subtle organic shape echoing NZ landscape, sits flush to the bottom edge
- Minimal footer text: copyright, email — Body style, Mid Brown

---

## Decorative Elements

**Terrain silhouette:**
- Appears at the footer as an SVG organic shape
- Colour: Dusty Gold (`#E5C690`)
- Flush to the bottom of the page
- Subtle, not dominant — it should read as a design detail, not a graphic

**Star mark watermark:**
- Used in Section 5 (How It Works) as a background element
- Low opacity (6–8%), never a feature — purely atmospheric

---

## Animations — Global Summary

| Element | Animation | Trigger | Duration |
|---------|-----------|---------|----------|
| Hero images | Crossfade | Autoplay | 1.2s transition, 5s hold |
| Nav logo | Fade out on scroll | Scroll past hero | 0.4s |
| Nav smallmark | Fade in on scroll | Scroll past hero | 0.4s |
| Section headlines | Fade + translateY(20px→0) | IntersectionObserver | 0.7s |
| Work grid images | Fade + translateY(20px→0), staggered | IntersectionObserver | 0.7s, 0.1s stagger |
| How It Works steps | Fade + translateY, staggered | IntersectionObserver | 0.7s, 0.15s stagger |
| Pricing columns | Pop up + sibling dim | Hover | 0.3s |

All animations respect `prefers-reduced-motion` — wrap motion in a media query and provide a static fallback.

---

## Copy

Harvey will provide `/copy/copy.md` before the build starts. Do not invent placeholder names, prices, or claims. Use `[COPY]` as a placeholder token for any missing text. Prices and offer names are in `BRAND.md`.

---

## Before You Start — Checklist

- [ ] `BRAND.md` read in full
- [ ] `BRIEF.md` read in full
- [ ] `/assets/structure-mockup.png` present and reviewed
- [ ] `/assets/structure-notes.png` present and reviewed
- [ ] `/fonts/` contains all four `.woff2` files
- [ ] `/copy/copy.md` present
- [ ] `/assets/primary-logo.svg` present
- [ ] `/assets/smallmark.svg` present
- [ ] `/assets/images/` contains hero images and work sample images
