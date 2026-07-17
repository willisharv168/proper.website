/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — HERO SLIDESHOW
═══════════════════════════════════════════════════════════════ */

(function () {
  const slides = document.querySelectorAll('.s1-slide');
  if (!slides.length) return;

  let current = 0;

  function advance() {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  }

  setInterval(advance, 5000);
})();


/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — LOGO SCROLL ANIMATION
   Phase 1 (0–50% scroll): logo drifts straight up to margin height
   Phase 2 (50–100% scroll): logo translates left + shrinks to corner
═══════════════════════════════════════════════════════════════ */

(function () {
  const section    = document.getElementById('s1');
  const logo       = section && section.querySelector('.s1-logo');
  const logoCorner = document.getElementById('logo-corner');
  if (!section || !logo) return;

  /* SVG aspect ratio: viewBox 1120.11 × 280.55 */
  const LOGO_ASPECT   = 1120.11 / 280.55;
  const LOGO_H        = logo.offsetHeight || window.innerWidth * 0.0992;
  const LOGO_W        = LOGO_H * LOGO_ASPECT;

  const cornerSvg     = logoCorner && logoCorner.querySelector('svg');
  const END_LOGO_H    = (cornerSvg && cornerSvg.offsetHeight) || window.innerWidth * 0.0337;
  const END_SCALE     = END_LOGO_H / LOGO_H;
  const END_LOGO_W    = LOGO_W * END_SCALE;
  const MARGIN        = window.innerWidth * 0.0116;
  const LOGO_SCROLL = 700;   // px over which logo animation runs

  function easeIn(t)  { return t * t * t; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 5); }

  function lerp(a, b, t) { return a + (b - a) * t; }

  const tagline = section.querySelector('.s1-tagline-group');
  const cta     = section.querySelector('.s1-cta');
  let taglineShown = false;

  function tick() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const scrollInSection = window.scrollY - section.offsetTop;
    const raw             = Math.max(0, Math.min(1, scrollInSection / LOGO_SCROLL));

    /* Phase 1: move up only (progress 0 → 0.5) */
    /* Phase 2: move left + scale (progress 0.5 → 1) */

    /*
      Logo starts flex-centred — its centre is at (vw/2, vh/2).
      We translate relative to that starting centre.
    */

    /* End of phase 1: logo top sits at MARGIN, logo still full scale */
    const phase1CY = (MARGIN + LOGO_H / 2) - vh / 2;

    /* End of phase 2: logo top-left at (MARGIN, MARGIN), scaled down */
    const phase2CX = (MARGIN + END_LOGO_W / 2) - vw / 2;
    const phase2CY = (MARGIN + END_LOGO_H / 2) - vh / 2;

    let tx, ty, scale;

    if (raw <= 0.5) {
      const p = easeIn(raw * 2);
      tx    = 0;
      ty    = lerp(0, phase1CY, p);
      scale = 1;
    } else {
      const p = easeOut((raw - 0.5) * 2);
      tx    = lerp(0, phase2CX, p);
      ty    = lerp(phase1CY, phase2CY, p);
      scale = lerp(1, END_SCALE, p);
    }

    logo.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

    const atEnd = scrollInSection >= LOGO_SCROLL;
    logo.style.opacity = atEnd ? '0' : '';
    if (logoCorner) logoCorner.classList.toggle('is-visible', atEnd);

    if (tagline) {
      const sis = scrollInSection;

      if (sis < LOGO_SCROLL) {
        /* Before logo reaches corner: instant reset */
        if (taglineShown) {
          taglineShown = false;
          tagline.style.transition = 'none';
          tagline.classList.remove('is-visible');
          tagline.style.opacity = '';
          tagline.style.pointerEvents = '';
          tagline.offsetHeight;
          tagline.style.transition = '';
          if (cta) {
            cta.style.transition = 'none';
            cta.classList.remove('is-visible');
            cta.style.opacity = '';
            cta.style.pointerEvents = '';
            cta.offsetHeight;
            cta.style.transition = '';
          }
        }
      } else {
        /* Show on first entry (CSS fade-in) */
        if (!taglineShown) {
          taglineShown = true;
          tagline.style.transition = '';
          tagline.style.opacity = '';
          tagline.classList.add('is-visible');
          if (cta) cta.classList.add('is-visible');
          document.documentElement.style.overflowY = 'hidden';
          setTimeout(() => { document.documentElement.style.overflowY = ''; }, 600);
        }

        /* Fade-out tied to actual screen position of the text */
        const tagTop    = tagline.getBoundingClientRect().top;
        const fadeStart = vh * 0.65 + 60;  // approx. stuck position
        const fadeEnd   = vh * 0.35;        // fully gone at 35% from top (2× range)

        if (tagTop <= fadeEnd) {
          tagline.style.transition  = 'none';
          tagline.style.opacity     = '0';
          tagline.style.pointerEvents = 'none';
          if (cta) { cta.style.transition = 'none'; cta.style.opacity = '0'; cta.style.pointerEvents = 'none'; }
        } else if (tagTop < fadeStart) {
          const p = 1 - (tagTop - fadeEnd) / (fadeStart - fadeEnd);
          tagline.style.transition  = 'none';
          tagline.style.opacity     = String(Math.max(0, 1 - p));
          tagline.style.pointerEvents = p > 0.5 ? 'none' : '';
          if (cta) { cta.style.transition = 'none'; cta.style.opacity = String(Math.max(0, 0.82 * (1 - p))); cta.style.pointerEvents = p > 0.5 ? 'none' : ''; }
        } else {
          /* Fully visible — snap back if returning from fade zone */
          if (tagline.style.opacity !== '') {
            tagline.style.transition  = 'none';
            tagline.style.opacity     = '';
            tagline.style.pointerEvents = '';
            tagline.offsetHeight;
            tagline.style.transition  = '';
          }
          if (cta && cta.style.opacity !== '') {
            cta.style.transition = 'none';
            cta.style.opacity = '';
            cta.style.pointerEvents = '';
            cta.offsetHeight;
            cta.style.transition = '';
          }
        }
      }
    }
  }

  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();


/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — THREE-PHASE SCROLL ANIMATION  (total extra: 3400px)
   Gallery: viewport-based slide — starts as s3 rises from below s1
   Phase 1  (0–1275px):    title words reveal (starts immediately)
   Phase 2  (1275–2550px): description reveals immediately after title
   Phase 3  (2550–3400px): both visible; s5 rises to cover them
═══════════════════════════════════════════════════════════════ */

(function () {
  const section    = document.getElementById('s3');
  if (!section) return;

  const words      = section.querySelectorAll('.s3-word');
  const bodyWords  = section.querySelectorAll('.s3-about-word');
  const textEl     = section.querySelector('.s3-text');
  const imgLeft      = section.querySelector('.s3-img-left');
  const imgRight     = section.querySelector('.s3-img-right');
  const gallery      = section.querySelector('.s3-gallery');
  const galleryInner = section.querySelector('.s3-gallery-inner');
  if (!words.length) return;

  const N = words.length;      // 11
  const M = bodyWords.length;  // 61

  const TOTAL     = 3400;
  const WORD_END  = 1275 / TOTAL;   // title fully revealed
  const ABOUT_END = 2550 / TOTAL;   // description fully revealed

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function tick() {
    const scrollInSection = window.scrollY - section.offsetTop;
    const maxScroll       = section.offsetHeight - window.innerHeight;
    const raw             = Math.max(0, Math.min(1, scrollInSection / maxScroll));
    const vh              = window.innerHeight;

    /* Gallery: easeIn slide — hangs back while s1 is visible, rushes in as s1 exits */
    if (gallery) {
      const s3Top  = section.getBoundingClientRect().top;
      const t      = Math.max(0, Math.min(1, (vh - s3Top) / vh));
      const slideP = t * t * t;   // easeIn — slow start, fast finish
      gallery.style.transform = `translateY(${(1 - slideP) * 100}vh)`;
      const gP = Math.max(0, Math.min(1, raw / ABOUT_END));
      if (galleryInner) galleryInner.style.transform = `translateY(${-160 * gP}vh)`;
    }

    if (raw <= WORD_END) {
      /* ── Phase 1: title reveals with pause after "content." (word 4) ── */
      const p = raw / WORD_END;
      words.forEach((word, i) => {
        /* group 1 (0–4): stagger 0.00→0.30 | group 2 (5–10): stagger 0.57→0.87 */
        const start = i <= 4 ? (i / 4) * 0.30 : 0.57 + ((i - 5) / 5) * 0.30;
        const end   = start + 0.12;
        word.style.opacity = Math.max(0, Math.min(1, (p - start) / (end - start)));
      });
      if (textEl) textEl.style.transform = '';
      bodyWords.forEach(w => { w.style.opacity = 0; });
      if (imgLeft)  imgLeft.style.transform  = 'translateY(100vh)';
      if (imgRight) imgRight.style.transform = 'translateY(100vh)';

    } else if (raw <= ABOUT_END) {
      /* ── Phase 2: description reveals immediately after title ── */
      words.forEach(w => { w.style.opacity = 1; });
      if (textEl) textEl.style.transform = '';
      const p = (raw - WORD_END) / (ABOUT_END - WORD_END);
      bodyWords.forEach((word, i) => {
        const base = (i / M) * 0.70;
        const half = Math.max(0, Math.min(1, (p - base) / 0.08)) * 0.5;
        const full = Math.max(0, Math.min(1, (p - base - 0.22) / 0.08)) * 0.5;
        word.style.opacity = half + full;
      });
      if (imgLeft)  imgLeft.style.transform  = 'translateY(100vh)';
      if (imgRight) imgRight.style.transform = 'translateY(100vh)';

    } else {
      /* ── Phase 3: both visible; s5 rises to cover them ── */
      words.forEach(w => { w.style.opacity = 1; });
      bodyWords.forEach(w => { w.style.opacity = 1; });
      if (textEl) textEl.style.transform = '';
      if (imgLeft)  imgLeft.style.transform  = 'translateY(100vh)';
      if (imgRight) imgRight.style.transform = 'translateY(100vh)';
    }
  }

  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();


/* ═══════════════════════════════════════════════════════════════
   S3 → S5 TRANSITION — images fade as s5 background rises to cover
   As s5 top moves vh → 0, images fade 1 → 0.
   Restores opacity on scroll-back so s3 animation retains control.
═══════════════════════════════════════════════════════════════ */

(function () {
  const s5            = document.getElementById('s5');
  const imgLeft       = document.querySelector('.s3-img-left');
  const imgRight      = document.querySelector('.s3-img-right');
  const textContainer = document.querySelector('.s3-sticky');
  const gallery       = document.querySelector('.s3-gallery');
  const tagline       = document.querySelector('.s3-tagline');
  const logoCorner    = document.getElementById('logo-corner');
  if (!s5 || !imgLeft || !imgRight) return;

  function tick() {
    const vh    = window.innerHeight;
    const s5Top = s5.getBoundingClientRect().top;

    if (s5Top >= vh) {
      /* s5 below viewport — restore so s3 animation retains control */
      imgLeft.style.opacity  = '';
      imgRight.style.opacity = '';
      if (textContainer) textContainer.style.opacity = '';
      if (gallery)       gallery.style.opacity       = '';
      if (logoCorner)    logoCorner.style.opacity     = '';
    } else if (s5Top <= 0) {
      /* s5 fully covering */
      imgLeft.style.opacity  = '0';
      imgRight.style.opacity = '0';
      if (textContainer) textContainer.style.opacity = '0';
      if (gallery)       gallery.style.opacity       = '0';
      if (logoCorner)    logoCorner.style.opacity     = '0';
      if (tagline) tagline.classList.add('is-visible');
    } else {
      /* s5 partially covering — fade from the instant s5 enters */
      const t              = s5Top / vh;
      const opacity        = t * t;
      const galleryOpacity = t * t * t;
      imgLeft.style.opacity  = opacity;
      imgRight.style.opacity = opacity;
      if (textContainer) textContainer.style.opacity = opacity;
      if (gallery)       gallery.style.opacity       = galleryOpacity;
      if (logoCorner)    logoCorner.style.opacity     = opacity;
    }
  }

  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();


/* ═══════════════════════════════════════════════════════════════
   LOGO CORNER — bone-section colour swap
   Sections with bone bg: s3, s6, s7 — logo shifts to light-brown
═══════════════════════════════════════════════════════════════ */

(function () {
  const corner = document.getElementById('logo-corner');
  if (!corner) return;

  const boneSections = ['s3', 's7']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function update() {
    const LOGO_Y = window.innerWidth * 0.0116;
    const onBone = boneSections.some(el => {
      const r = el.getBoundingClientRect();
      return r.top <= LOGO_Y && r.bottom > LOGO_Y;
    });
    corner.classList.toggle('on-bone', onBone);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   Handles .reveal-up elements (s6 pricing cards)
═══════════════════════════════════════════════════════════════ */

(function () {
  const revealEls = document.querySelectorAll('.reveal-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();


/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — SCROLL ENTRY ANIMATION
   Cards start hidden. At 90% viewport coverage (background visible),
   each card enters with a staggered delay and varying duration.
═══════════════════════════════════════════════════════════════ */

(function () {
  const s5 = document.getElementById('s5');
  if (!s5) return;

  const cards = s5.querySelectorAll('.s5-card');
  if (!cards.length) return;

  /* delay (ms) and duration (ms) per card — cards rise from below section */
  const delays    = [0,    300,  520, 150];
  const durations = [1200, 1500, 980, 1350];
  const easing    = 'cubic-bezier(0.16, 1, 0.3, 1)';

  function animateCards() {
    /* block hover effects until all cards have landed */
    s5.classList.add('hover-dormant');

    cards.forEach((card, i) => {
      card.style.transition = `transform ${durations[i]}ms ${easing} ${delays[i]}ms`;
      card.classList.add('is-entered');
      setTimeout(() => { card.style.transition = ''; }, delays[i] + durations[i] + 50);
    });

    /* re-enable hover after the slowest card finishes + 400ms grace */
    const maxMs = Math.max(...delays.map((d, i) => d + durations[i]));
    setTimeout(() => { s5.classList.remove('hover-dormant'); }, maxMs + 400);
  }

  let triggered = false;

  function check() {
    if (triggered) return;
    const rect = s5.getBoundingClientRect();
    /* fire when s5 top is <= 10% of viewport = background covers 90% of screen */
    if (rect.top <= window.innerHeight * 0.1) {
      triggered = true;
      animateCards();
      window.removeEventListener('scroll', check);
    }
  }

  window.addEventListener('scroll', check, { passive: true });
  check();
})();


/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — STICKY EASING
   Entry: inner lags behind with a translateY that eases to 0 as
          the section locks, removing the snap.
   Exit:  in the last 100px of dwell the inner starts to lift
          slightly so the detach feels like acceleration, not a snap.
═══════════════════════════════════════════════════════════════ */

(function () {
  const s5     = document.getElementById('s5');
  const sticky = s5 && s5.querySelector('.s5-sticky');
  if (!s5 || !sticky) return;

  function easeOut(t) { return 1 - Math.pow(1 - t, 4); }
  function easeIn(t)  { return t * t * t; }

  const DWELL       = 510;  /* must match CSS calc(100vh + Xpx) */
  const ENTRY_LEAD  = 70;   /* px of lag at the start of entry  */
  const EXIT_RANGE  = 100;  /* px before detach where exit ease begins */
  const EXIT_LEAD   = 28;   /* px of upward pre-exit shift      */

  function tick() {
    const vh       = window.innerHeight;
    const outerTop = s5.getBoundingClientRect().top;

    if (outerTop > 0 && outerTop <= vh) {
      /* Entering — inner trails and decelerates into the sticky lock */
      const p = easeOut(1 - outerTop / vh);
      sticky.style.transform = `translateY(${ENTRY_LEAD * (1 - p)}px)`;

    } else if (outerTop <= 0 && outerTop > -(DWELL - EXIT_RANGE)) {
      /* Clean dwell zone */
      sticky.style.transform = '';

    } else if (outerTop <= -(DWELL - EXIT_RANGE) && outerTop > -DWELL) {
      /* Exiting — inner begins to lift before the sticky detaches */
      const p = easeIn((-outerTop - (DWELL - EXIT_RANGE)) / EXIT_RANGE);
      sticky.style.transform = `translateY(${-EXIT_LEAD * p}px)`;

    } else {
      sticky.style.transform = '';
    }
  }

  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();


/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — HOVER FALLBACK (browsers without :has())
═══════════════════════════════════════════════════════════════ */

(function () {
  if (CSS.supports('selector(:has(*))')) return;

  const s5    = document.getElementById('s5');
  const cards = document.querySelectorAll('.s5-card');
  if (!s5 || !cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      if (s5.classList.contains('hover-dormant')) return;
      cards.forEach((c) => { if (c !== card) c.style.opacity = '0.35'; });
    });
    card.addEventListener('mouseleave', () => {
      cards.forEach((c) => { c.style.opacity = ''; });
    });
  });
})();


/* ═══════════════════════════════════════════════════════════════
   MOMENTUM SCROLL
   After wheel events stop (~80 ms of silence), coast with friction.
   Works for mouse wheels; trackpad OS momentum makes this negligible.
═══════════════════════════════════════════════════════════════ */

(function () {
  let vel   = 0;
  let raf   = null;
  let timer = null;

  const FRICTION = 0.93;
  const MIN_VEL  = 0.4;

  function coast() {
    if (Math.abs(vel) < MIN_VEL) { vel = 0; raf = null; return; }
    window.scrollBy(0, vel);
    vel *= FRICTION;
    raf = requestAnimationFrame(coast);
  }

  window.addEventListener('wheel', function (e) {
    vel = e.deltaY * 0.65;

    clearTimeout(timer);
    if (raf) { cancelAnimationFrame(raf); raf = null; }

    timer = setTimeout(function () {
      raf = requestAnimationFrame(coast);
    }, 80);
  }, { passive: true });
})();


/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — PRICING HOVER FALLBACK
   CSS :has() handles the visual; JS provides fallback for older browsers
═══════════════════════════════════════════════════════════════ */

(function () {
  if (CSS.supports('selector(:has(*))')) return;

  const cols = document.querySelectorAll('.s6-card');
  if (!cols.length) return;

  cols.forEach((col) => {
    col.addEventListener('mouseenter', () => {
      cols.forEach((c) => { if (c !== col) c.style.opacity = '0.3'; });
    });
    col.addEventListener('mouseleave', () => {
      cols.forEach((c) => { c.style.opacity = ''; });
    });
  });
})();


/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — PANEL SWING-IN
   Dark brown card slides in from the right when s6 enters view.
═══════════════════════════════════════════════════════════════ */

(function () {
  const panel   = document.querySelector('.s6-panel');
  const img     = document.querySelector('.s6-img');
  const section = document.getElementById('s6');
  if (!panel || !section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          panel.classList.add('is-in');
          if (img) img.classList.add('is-in');
          observer.unobserve(section);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -30% 0px' }
  );

  observer.observe(section);
})();


/* ═══════════════════════════════════════════════════════════════
   S6 → S7 SCROLL-DRIVEN TRANSITION

   s6 is sticky for 1020px of scroll (height: 100vh + 1020px).
   The entire animation plays while s6 is pinned:

     p 0.0 – 0.5  s6 panel exits right, image exits left
     p 0.5 – 1.0  bone overlay fades in over medium-brown bg

   At p = 1 s6 releases exactly as s7's top reaches the viewport
   bottom, so s7 naturally scrolls up into view (images scroll up
   from the bottom seamlessly against the now-bone background).

   Within s7 (first 400px): text column fades in.
═══════════════════════════════════════════════════════════════ */

(function () {
  const s6 = document.getElementById('s6');
  const s7 = document.getElementById('s7');
  if (!s6 || !s7) return;

  const s6Panel   = document.querySelector('.s6-panel');
  const s6Img     = document.querySelector('.s6-img');
  const s6Overlay = document.querySelector('.s6-bg-overlay');
  const s7ColR    = document.querySelector('.s7-col-right');
  const s7Cols    = document.querySelector('.s7-cols');
  const s7Arrow   = document.querySelector('.s7-arrow');
  const s7Track   = document.querySelector('.s7-track');

  const S6_ZONE = 1020; // must match s6 extra height

  function eio(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
  function c01(v) { return Math.max(0, Math.min(1, v)); }
  function ph(p, a, b) { return eio(c01((p - a) / (b - a))); }

  let s6Active = false;
  let s7Active = false;
  let textCSS  = false;

  /* ── S6 phase ── */
  function driveS6(p) {
    [s6Panel, s6Img, s6Overlay].forEach(el => { if (el) el.style.transition = 'none'; });
    if (s6Panel)   s6Panel.style.transform   = `translateX(${ph(p, 0, 0.5) * 110}%)`;
    if (s6Img)     s6Img.style.transform     = `translateX(${ph(p, 0, 0.5) * -180}%)`;
    if (s6Overlay) s6Overlay.style.opacity   = ph(p, 0.5, 1.0);
  }

  function resetS6() {
    const els = [s6Panel, s6Img, s6Overlay].filter(Boolean);
    els.forEach(el => { el.style.transition = 'none'; el.style.transform = ''; el.style.opacity = ''; });
    els[0] && els[0].offsetHeight; // reflow so cleared state commits without transition
    els.forEach(el => { el.style.transition = ''; });
    s6Active = false;
  }

  /* ── S7 text phase ── */
  /* Text fades in via CSS transition once images reach their final
     position (s7-sticky pinned = scrollY >= s7.offsetTop). */
  function driveText(scrollY) {
    if (!s7ColR) return;

    if (scrollY >= s7.offsetTop) {
      s7Active = true;
      if (!textCSS) {
        textCSS = true;
        s7ColR.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.3s ease 0.7s';
        s7ColR.classList.add('s7-in');
        setTimeout(() => { if (textCSS) s7ColR.style.transition = ''; }, 2100);
      }
    } else if (s7Active) {
      /* Scrolled back above s7 — instant reset */
      s7Active = false;
      textCSS  = false;
      s7ColR.style.transition = 'none';
      s7ColR.classList.remove('s7-in', 'is-dismissed');
      s7ColR.style.opacity = '';
      s7ColR.offsetHeight;
      s7ColR.style.transition = '';
      if (s7Cols)  s7Cols.classList.remove('is-expanded');
      if (s7Arrow) s7Arrow.classList.remove('is-visible');
      if (s7Track) s7Track.scrollLeft = 0;
    }
  }

  function update() {
    const scrollY = window.scrollY;
    const s6RawP  = (scrollY - s6.offsetTop) / S6_ZONE;

    if (s6RawP < 0) {
      if (s6Active) resetS6();
    } else {
      s6Active = true;
      driveS6(c01(s6RawP));
    }

    driveText(scrollY);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ═══════════════════════════════════════════════════════════════
   SECTION MAGNETIC PULL
   Continuous spring toward the nearest section boundary whenever
   the viewport is within 22% vh of one. Starts ~60ms after the
   user slows, runs every frame until settled.
═══════════════════════════════════════════════════════════════ */

(function () {
  const THRESHOLD = 0.18;
  const STRENGTH  = 0.03;
  const MIN_PULL  = 0.2;

  /* s7 gets a weaker snap so the text fade can play through naturally */
  const S7_THRESHOLD = 0.06;
  const S7_STRENGTH  = 0.012;

  const s7El = document.getElementById('s7');

  function nearestTarget() {
    const vh  = window.innerHeight;
    const y   = window.scrollY;
    let best = null, bestDist = Infinity, bestSec = null;
    document.querySelectorAll('section').forEach(s => {
      const d = Math.abs(y - s.offsetTop);
      if (d < bestDist) { bestDist = d; best = s.offsetTop; bestSec = s; }
    });
    if (best === null || bestDist <= 1) return null;
    const isS7    = bestSec === s7El;
    const thresh  = vh * (isS7 ? S7_THRESHOLD : THRESHOLD);
    if (bestDist >= thresh) return null;
    return { target: best, strength: isS7 ? S7_STRENGTH : STRENGTH };
  }

  function loop() {
    const result = nearestTarget();
    if (result !== null) {
      const delta = result.target - window.scrollY;
      if (Math.abs(delta) >= 0.5) {
        const pull = delta * result.strength;
        window.scrollBy(0, Math.abs(pull) < MIN_PULL ? Math.sign(pull) * MIN_PULL : pull);
      }
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — SEE MORE INTERACTION
═══════════════════════════════════════════════════════════════ */

(function () {
  const btn      = document.querySelector('.s7-btn');
  const colRight = document.querySelector('.s7-col-right');
  const cols     = document.querySelector('.s7-cols');
  const arrow    = document.querySelector('.s7-arrow');
  if (!btn || !colRight || !cols) return;

  const track   = document.querySelector('.s7-track');
  const backBtn = document.querySelector('.s7-gallery-back');

  btn.addEventListener('click', () => {
    colRight.classList.add('is-dismissed');
    setTimeout(() => {
      cols.classList.add('is-expanded');
      if (arrow) arrow.classList.add('is-visible');
    }, 1200);
  });

  let scrollRaf = null;

  function momentumScrollTo(target, duration) {
    const start     = track.scrollLeft;
    const delta     = target - start;
    const startTime = performance.now();
    if (scrollRaf) cancelAnimationFrame(scrollRaf);

    function tick(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * t); // expo ease-out
      track.scrollLeft = start + delta * eased;
      if (t < 1) scrollRaf = requestAnimationFrame(tick);
      else scrollRaf = null;
    }
    scrollRaf = requestAnimationFrame(tick);
  }

  function cancelMomentum() {
    if (scrollRaf) { cancelAnimationFrame(scrollRaf); scrollRaf = null; }
  }

  track.addEventListener('wheel',      cancelMomentum, { passive: true });
  track.addEventListener('touchstart', cancelMomentum, { passive: true });
  track.addEventListener('mousedown',  cancelMomentum);

  if (arrow && track) {
    arrow.addEventListener('click', () => {
      momentumScrollTo(window.innerWidth * 0.35, 1800);
      arrow.classList.remove('is-visible');
    });
  }

  if (backBtn && track) {
    backBtn.addEventListener('click', () => {
      momentumScrollTo(0, 1800);
      if (arrow) arrow.classList.add('is-visible');
    });
  }
})();


/* ═══════════════════════════════════════════════════════════════
   SECTION 8 — GALLERY SLIDESHOW + TRACKER
   Auto-advances every 4s. Clicking a thumb jumps to that slide.
   Tracker ordered bottom-to-top; data-index matches slide index.
═══════════════════════════════════════════════════════════════ */

(function () {
  const s8    = document.getElementById('s8');
  if (!s8) return;
  const inner  = s8.querySelector('.s8-inner');
  const slides = s8.querySelectorAll('.s8-slide');
  const thumbs = s8.querySelectorAll('.s8-thumb');
  if (!inner || !slides.length || !thumbs.length) return;

  let current    = 0;
  let slideTimer = null;
  let startDelay = null;

  const thumbMap = {};
  thumbs.forEach(t => { thumbMap[parseInt(t.dataset.index)] = t; });

  function goTo(index) {
    slides[current].classList.remove('is-active');
    if (thumbMap[current]) thumbMap[current].classList.remove('is-active');
    current = index;
    slides[current].classList.add('is-active');
    if (thumbMap[current]) thumbMap[current].classList.add('is-active');
  }

  function startTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => goTo((current + 1) % slides.length), 4000);
  }

  function stopTimer() {
    clearTimeout(startDelay);
    clearInterval(slideTimer);
    startDelay = slideTimer = null;
  }

  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      goTo(parseInt(t.dataset.index));
      startTimer();
    });
  });

  /* Scale on enter + slideshow gating */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          inner.classList.add('is-entered');
          /* Wait for scale transition (1.6s) + 0.5s buffer before starting slideshow */
          startDelay = setTimeout(startTimer, 2100);
        } else {
          if (entry.boundingClientRect.top > 0) {
            inner.classList.remove('is-entered');
          }
          stopTimer();
          goTo(0);
        }
      });
    },
    { threshold: 0.01 }
  );

  observer.observe(s8);
})();


/* ═══════════════════════════════════════════════════════════════
   CANVAS ELEMENTS — CTAs + S7 Arrow
═══════════════════════════════════════════════════════════════ */

(function () {
  const btn    = document.querySelector('.s7-arrow');
  const canvas = document.querySelector('.s7-arrow-canvas');
  if (!canvas) return;

  function draw() {
    const dpr = window.devicePixelRatio || 1;
    const S   = (btn && btn.offsetWidth) || Math.min(28, window.innerWidth * 0.0185);
    canvas.width        = S * dpr;
    canvas.height       = S * dpr;
    canvas.style.width  = S + 'px';
    canvas.style.height = S + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle    = '#E5C690';
    ctx.textBaseline = 'middle';
    ctx.textAlign    = 'center';
    ctx.font         = `700 ${S}px "Satoshi", sans-serif`;
    ctx.fillText('›', S / 2, S / 2);
  }

  document.fonts.ready.then(draw);
  window.addEventListener('resize', draw);
})();

(function () {
  const cta    = document.querySelector('.s1-cta');
  const canvas = document.querySelector('.s1-cta-canvas');
  if (!cta || !canvas) return;

  function draw() {
    const W   = cta.offsetWidth  || Math.min(465, window.innerWidth * 0.3075);
    const H   = cta.offsetHeight || Math.min(40,  window.innerWidth * 0.0265);
    const dpr = window.devicePixelRatio || 1;

    canvas.width        = W * dpr;
    canvas.height       = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    ctx.fillStyle    = '#F7F0E7';
    ctx.textBaseline = 'middle';

    const textSize = Math.round(H * 0.50);
    const arrowSize = Math.round(H * 0.45);
    ctx.font      = `700 ${textSize}px "Satoshi", sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText('BOOK A CALL', H * 0.225, H / 2);

    ctx.font      = `400 ${arrowSize}px "Satoshi", sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText('›', W - H * 0.4, H / 2);

    ctx.strokeStyle = '#F7F0E7';
    ctx.lineWidth   = Math.max(1, H * 0.0375);
    ctx.strokeRect(0.75, 0.75, W - 1.5, H - 1.5);
  }

  document.fonts.ready.then(draw);
  window.addEventListener('resize', draw);
})();

(function () {
  const cta    = document.querySelector('.s8-cta');
  const canvas = document.querySelector('.s8-cta-canvas');
  if (!cta || !canvas) return;

  function draw() {
    const W   = cta.offsetWidth  || Math.min(465, window.innerWidth * 0.3075);
    const H   = cta.offsetHeight || Math.min(40,  window.innerWidth * 0.0265);
    const dpr = window.devicePixelRatio || 1;

    canvas.width        = W * dpr;
    canvas.height       = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    ctx.fillStyle    = '#F7F0E7';
    ctx.textBaseline = 'middle';

    const textSize = Math.round(H * 0.50);
    const arrowSize = Math.round(H * 0.45);
    ctx.font      = `700 ${textSize}px "Satoshi", sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText('BOOK A CALL', H * 0.225, H / 2);

    ctx.font      = `400 ${arrowSize}px "Satoshi", sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText('›', W - H * 0.4, H / 2);

    ctx.strokeStyle = '#F7F0E7';
    ctx.lineWidth   = Math.max(1, H * 0.0375);
    ctx.strokeRect(0.75, 0.75, W - 1.5, H - 1.5);
  }

  document.fonts.ready.then(draw);
  window.addEventListener('resize', draw);
})();


/* ═══════════════════════════════════════════════════════════════
   BOOK A CALL MODAL
═══════════════════════════════════════════════════════════════ */

(function () {
  const overlay  = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  const modal    = document.getElementById('modal');
  if (!overlay || !modal) return;

  function openModal() { overlay.classList.add('is-open'); }
  function closeModal() { overlay.classList.remove('is-open'); }

  /* Both CTAs open the modal */
  const s1Cta = document.querySelector('.s1-cta');
  const s8Cta = document.querySelector('.s8-cta');
  if (s1Cta) s1Cta.addEventListener('click', function(e) { e.preventDefault(); openModal(); });
  if (s8Cta) s8Cta.addEventListener('click', function(e) { e.preventDefault(); openModal(); });

  /* Close on X button or clicking outside the modal box */
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
})();
