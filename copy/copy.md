# NorthStar — Website Copy & Layout Brief

## HOW TO USE THIS FILE
- Read this file top to bottom before writing any code
- Also read: BRAND.md, structure-notes.png (/assets/structure-notes.png), structure-mockup-clean-01.png and structure-mockup-clean-02.png (/assets/)
- Build desktop only — no responsive or mobile styles
- Build section by section in the order listed below
- Colour tokens: [BONE] [LIGHT BROWN] [MEDIUM BROWN] [DARK BROWN] [YELLOW] [STEEL] — values below
- Style tokens: [HEADING 1] [SUBHEADING 1] [ITALIC SUBHEADING] [CAPS SUBHEADING] [SUB-BODY 1] [SUB-BODY 2] [BODY] — specs below

---

## COLOURS

| Token | HEX |
|-------|-----|
| [BONE] | #F7F0E7 |
| [LIGHT BROWN] | #B4AD9E |
| [MEDIUM BROWN] | #8D8073 |
| [DARK BROWN] | #555047 |
| [YELLOW] | #E5C690 |
| [STEEL] | #537088 |

---

## FONT LOADING

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

---

## TYPE STYLES

Apply these as CSS classes. All leading values are in px (line-height). Tracking values are converted from Illustrator units to CSS letter-spacing em values.

| Token | CSS Class | Font | Weight | Size | line-height | letter-spacing |
|-------|-----------|------|--------|------|-------------|----------------|
| [HEADING 1] | .h1 | Satoshi | 900 | 72px | 66px | 0 |
| [SUBHEADING 1] | .sub1 | Satoshi | 700 | 45px | 48px | 0 |
| [ITALIC SUBHEADING] | .italic-sub | Erode | 600 | 40px | 40px | 0 |
| [CAPS SUBHEADING] | .caps-sub | Satoshi | 700 | 45px | 48px | 0 — text-transform: uppercase |
| [SUB-BODY 1] | .subbody1 | Satoshi | 500 | 35px | 33px | -0.013em — text-transform: uppercase |
| [SUB-BODY 2] | .subbody2 | Erode | 600 | 35px | 44px | 0.016em |
| [BODY] | .body | Satoshi | 500 | 18px | 30px | 0.016em |

---

## PAGE MARGIN
All sections: 35px left and right margin unless specified as full bleed.

---

## SECTIONS (top to bottom)

---

### 1. LANDING (Hero)

Background: full-bleed crossfade slideshow — no margins, full viewport height (100vh)
Overlay: rgba(0,0,0,0.15) over images for subtle darkening

Slideshow images (crossfade, opacity transition, 1.2s transition, 5s hold per image, autoplay, no controls):
- /assets/images/image1.png
- /assets/images/image2.png
- /assets/images/image3.png
- /assets/images/image4.png

Logo:
- secondary-logo.svg
- File: /assets/secondary-logo.svg
- Colour: [BONE] via CSS color property
- Height: 300px, width scales proportionally
- Position: centred horizontally and vertically over the slideshow

---

### 3. THE OFFER

Background: [BONE]
Layout: full width, generous vertical padding (min 160px top and bottom)

"A year of premium content. For the cost of one photoshoot."
- Style: [HEADING 1]
- "A year of premium content. For the cost of" → colour: [MEDIUM BROWN]
- "one" → colour: [YELLOW], rendered in [ITALIC SUBHEADING] style (Erode Semibold Italic)
- "photoshoot." → colour: [MEDIUM BROWN]
- Position: centred horizontally and vertically

---

### 4. SHOWCASE

Background: [BONE]
Layout: two images side by side, no captions, no interaction

Left image:
- /assets/images/image5.png
- Width: ~40% of page, full bleed to left edge (no left margin)
- Height: fills section height, object-fit: cover

Right image:
- /assets/images/image6.webp
- Smaller than left image, floated right
- Does not touch the right page edge — refer to structure-mockup-clean-01.png for exact proportions
- Generous space between left and right images

---

### 5. HOW IT WORKS

Background: [MEDIUM BROWN]
Layout: refer to structure-notes.png

"From concept to launch,
step by step."
- Style: [HEADING 1], colour: [BONE]
- Line break after "launch," — these are two lines

"01. Assessment"
- Style: [SUBHEADING 1], colour: [BONE]

"Before anything is produced, we assess where your brand is positioned, mapping visual identity, tone of voice, and any other brand specific traits."
- Style: [SUB-BODY 1], colour: [BONE]

"02. Strategise"
- Style: [SUBHEADING 1], colour: [BONE]

"For your first month, we sit down with your team, planning your first batch of content so it can tick all the right boxes."
- Style: [SUB-BODY 1], colour: [BONE]

"03. Construct"
- Style: [SUBHEADING 1], colour: [BONE]

"We use the data collected to create your first batch of AI powered, on-brand content, you receive a months worth of postable assets."
- Style: [SUB-BODY 1], colour: [BONE]

"04. Review"
- Style: [SUBHEADING 1], colour: [BONE]

"After your first month we will sit down with your team again, analyse what worked and optimise for the coming month. After this, all we need is a monthly goal spec sheet and a review at the end of each month to continue to produce luxury content for your brand."
- Style: [SUB-BODY 1], colour: [BONE]

All step alignment: refer to structure-notes.png

---

### 6. PRICING

Background: [BONE]
Layout: three equal columns side by side — refer to structure-notes.png

"Flexible programs, catered to your business's volume."
- Style: [HEADING 1], colour: [DARK BROWN]
- Aligned to left margin

--- LEFT COLUMN: PILOT ---

"PILOT"
- Style: [CAPS SUBHEADING], colour: [DARK BROWN]

"$1,800"
- Style: [SUBHEADING 1], colour: [DARK BROWN]

"One month. No minimum commitment.
Includes:"
- Style: [BODY], colour: [DARK BROWN]

"2 × 15s narrative videos
12 × 8s short-form videos
8 × 4:5 image posts
Captions for every asset
1 revision round"
- Style: [BODY], colour: [DARK BROWN]

"The right way to start. Prove the output before you commit."
- Style: [BODY], colour: [DARK BROWN]

--- CENTRE COLUMN: ENGINE ---

"ENGINE"
- Style: [CAPS SUBHEADING], colour: [DARK BROWN]

"$2,500 / month"
- Style: [SUBHEADING 1], colour: [DARK BROWN]

"3-month minimum
Includes:"
- Style: [BODY], colour: [DARK BROWN]

"2 × 15s narrative videos
12 × 8s short-form videos
8 × 4:5 image posts
Captions for every asset
Monthly content angle brief
1 revision round"
- Style: [BODY], colour: [DARK BROWN]

"Consistent volume. Every month, without gaps."
- Style: [BODY], colour: [DARK BROWN]

--- RIGHT COLUMN: ENGINE PRO ---

"ENGINE PRO"
- Style: [CAPS SUBHEADING]
- "ENGINE" in [DARK BROWN], "PRO" in [YELLOW]

"$4,500 / month"
- Style: [SUBHEADING 1], colour: [DARK BROWN]

"3-month minimum
Includes:"
- Style: [BODY], colour: [DARK BROWN]

"2 × 30s narrative videos
4 × 15s narrative videos
16 × 8s short-form videos
12 × 4:5 image posts
6 × UGC-style posts
Captions for every asset
Monthly strategy call
2 revision rounds"
- Style: [BODY], colour: [DARK BROWN]

"For brands ready to lead in their category."
- Style: [BODY], colour: [DARK BROWN]

---

### 7. PREVIOUS WORK

Background: [BONE]
Layout: three columns — refer to structure-mockup-clean-01.png for exact proportions

"PREVIOUS WORK —
MCKENZIE AND WILLIS
WINTER COLLECTION SPRINT"
- Style: [CAPS SUBHEADING], colour: [DARK BROWN]
- Top left, aligned to left margin

Left column: 1 tall image, full height of section
- /assets/images/image7.webp

Centre column: 2 stacked images, equal height
- Top: /assets/images/image8.webp
- Bottom: /assets/images/image9.webp

Right column: body copy, top-aligned to centre column images
- Write 2–3 short paragraphs describing the McKenzie & Willis Winter Collection Sprint project. Cover: what the brief was, what content was produced (AI-native short-form video and image posts for social), and the outcome. Keep it factual, confident, and concise. Style: [BODY], colour: [DARK BROWN]

---

### 8. ABOUT

Background: full-bleed cinematic image — /assets/images/image10.webp
Layout: image fills entire section. Content sits on right half only.

Left half: image only, no content

Right half (content sits on top of image):
- Secondary logo: /assets/secondary-logo.svg
  - Colour: [BONE] via CSS color property
  - Left-aligned within right half
  - Sits above body copy

"NorthStar is a content studio specialising in luxury home and furniture retail across New Zealand and Australia. Our systematic AI workflows, combined with the taste and skill of our design team, allow us to create high-volume content without sacrificing brand standards. This allows luxury retailers to compete and dominate with organic social, deepening consumer trust and building familiarity with new audiences."
- Style: [BODY], colour: [BONE]
- Left-aligned within right half, directly below secondary logo

Right half content is vertically centred within the section.

---

