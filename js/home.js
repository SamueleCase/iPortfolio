/* =============================================================
   home.js — solo index.html (sottoagente A)
   Dipende da: main.js (window.GF), gsap + ScrollTrigger, js/content/faq.js
   -------------------------------------------------------------
   1. Sezione #lavori: caos → elenco (GSAP ScrollTrigger, scrub),
      stessa matematica di tick() del mockup
   2. Anteprima che segue il mouse sull'elenco lavori
   3. FAQ disegnate da window.GF_FAQ (ridisegnate su "gf:lang")
   ============================================================= */
(() => {
  'use strict';

  const d = document;
  const GF = window.GF || {};

  /* ---------- 1-2. Lavori: caos → elenco + anteprima -------------- */
  function initWorks() {
    const section = d.getElementById('lavori');
    if (!section) return;
    const stage = section.querySelector('.works__stage');
    const list = section.querySelector('.works__inner');
    const follow = section.querySelector('[data-follow]');
    const followIn = section.querySelector('[data-follow-in]');
    const prevs = [...section.querySelectorAll('[data-prev]')];
    const nums = (el, key) => ({ el, a: el.dataset[key].split(',').map(Number) });
    const chaos = [...section.querySelectorAll('[data-chaos]')].map((el) => nums(el, 'chaos'));
    const fly = [...section.querySelectorAll('[data-fly]')].map((el) => nums(el, 'fly'));
    const fadeIn = [...section.querySelectorAll('[data-fade-in]')];
    const fadeOut = [...section.querySelectorAll('[data-fade-out]')];
    const gsap = window.gsap;
    const ST = window.ScrollTrigger;

    /* Movimento ridotto (o librerie assenti): stato finale statico */
    if (GF.reducedMotion || !gsap || !ST) {
      section.classList.add('works--static');
      return;
    }
    gsap.registerPlugin(ST);

    const K = 1; // intensità del caos (fissata)
    const HIDDEN = 'scale(0) rotate(-12deg)';
    let listReady = false;
    let shown = false;
    let following = false;
    let hoverRow = -1;
    let fx = 0, fy = 0, cx = 0, cy = 0;

    function hidePreview() {
      if (followIn && shown) followIn.style.transform = HIDDEN;
      shown = false;
      following = false;
      hoverRow = -1;
    }

    /* p = avanzamento 0…1 della sezione (come tick() del mockup) */
    function render(p) {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const mob = GF.isMobile ? GF.isMobile() : vw < 760;
      let e = Math.min(1, p / 0.7);
      e = e * e * (3 - 2 * e);
      const inv = 1 - e;

      /* Titoli: spostati/ruotati, ma tenuti tra il 20% e l'89% della
         scena e senza sovrapporsi al titolo precedente. */
      const sr = stage.getBoundingClientRect();
      const lo = sr.top + sr.height * 0.2;
      const hi = sr.top + sr.height * 0.89;
      let prevBottom = -1e9;
      chaos.forEach(({ el, a }) => {
        const x = a[0] * vw * (mob ? 0.3 : 1) * K * inv;
        let y = a[1] * vh * K * inv;
        const r = a[2] * K * inv;
        const s = 1 + (a[3] - 1) * inv;
        const set = () => { el.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${s})`; };
        set();
        if (inv > 0) {
          const b = el.getBoundingClientRect();
          let fix = b.top < lo ? lo - b.top : b.bottom > hi ? hi - b.bottom : 0;
          if (b.top + fix < prevBottom) fix = prevBottom - b.top;
          if (fix) { y += fix * Math.min(1, inv * 4); set(); }
        }
        prevBottom = el.getBoundingClientRect().bottom;
      });

      /* Parole che volano via e svaniscono */
      fly.forEach(({ el, a }) => {
        el.style.transform = `translate(${a[0] * vw * e}px,${a[1] * vh * e}px) rotate(${a[2] * (1 + e)}deg)`;
        const o = Math.max(0, 1 - e * 1.3);
        el.style.opacity = o;
        el.style.visibility = o > 0 ? '' : 'hidden';
      });

      const fin = Math.min(1, Math.max(0, (e - 0.5) / 0.5));
      fadeIn.forEach((el) => { el.style.opacity = fin; });
      fadeOut.forEach((el) => {
        el.style.opacity = inv;
        el.style.visibility = inv > 0 ? '' : 'hidden';
      });

      listReady = e > 0.95;
      if (!listReady) hidePreview();
    }

    /* Avanzamento legato allo scroll (Lenis → ScrollTrigger, già collegati in main.js) */
    const state = { p: 0 };
    gsap.fromTo(state, { p: 0 }, {
      p: 1,
      ease: 'none',
      onUpdate: () => render(state.p),
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
    render(state.p);
    // ridimensionamento / cambio breakpoint: ScrollTrigger ricalcola, qui si ridisegna
    ST.addEventListener('refresh', () => render(state.p));
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => ST.refresh());

    /* Da tastiera: mettendo il focus su un lavoro si arriva all'elenco in ordine */
    list.addEventListener('focusin', (ev) => {
      const row = ev.target.closest('[data-row]');
      if (!row || listReady || !row.matches(':focus-visible')) return;
      const y = GF.targetY ? GF.targetY(section) : 0;
      if (GF.lenis) GF.lenis.scrollTo(y, { force: true });
      else window.scrollTo({ top: y, behavior: 'smooth' });
    });

    /* Anteprima che segue il mouse: solo puntatore fine e ≥ 760px */
    if (!follow || !followIn) return;
    const canFollow = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 760px)');

    function loop() {
      if (!following) return;
      cx += (fx - cx) * 0.18;
      cy += (fy - cy) * 0.18;
      follow.style.transform = `translate(${cx}px,${cy}px)`;
      requestAnimationFrame(loop);
    }

    list.addEventListener('mousemove', (ev) => {
      if (!listReady || !canFollow.matches) return;
      const row = ev.target.closest('[data-row]');
      if (!row) {
        followIn.style.transform = HIDDEN;
        shown = false;
        hoverRow = -1;
        return;
      }
      fx = ev.clientX;
      fy = ev.clientY;
      const right = fx > window.innerWidth * 0.62;
      followIn.style.marginLeft = right ? 'calc(-1 * clamp(220px, 21vw, 340px) - 24px)' : '24px';
      followIn.style.transformOrigin = right ? 'right center' : 'left center';
      const i = +row.dataset.row;
      if (i !== hoverRow) {
        hoverRow = i;
        shown = true;
        followIn.style.transform = `scale(1) rotate(${i % 2 ? 3 : -4}deg)`;
        prevs.forEach((c, j) => { c.style.opacity = j === i ? 1 : 0; });
      }
      if (!following) {
        following = true;
        cx = fx;
        cy = fy;
        loop();
      }
    });
    list.addEventListener('mouseleave', hidePreview);
    list.addEventListener('click', hidePreview);
  }

  /* ---------- 3. FAQ ---------------------------------------------- */
  function span(cls, text, hidden) {
    const s = d.createElement('span');
    s.className = cls;
    s.textContent = text;
    if (hidden) s.setAttribute('aria-hidden', 'true');
    return s;
  }

  function renderFaq() {
    const box = d.querySelector('[data-faq]');
    const items = window.GF_FAQ;
    if (!box || !Array.isArray(items)) return;
    const lang = window.GF_I18N && window.GF_I18N.lang === 'en' ? 'en' : 'it';
    const open = [...box.querySelectorAll('details')].map((x) => x.open);
    const frag = d.createDocumentFragment();
    items.forEach((item, i) => {
      const t = item[lang] || item.it || {};
      const q = String(t.q || '');
      const a = String(t.a || '');
      const det = d.createElement('details');
      det.className = 'faq__item';
      if (open[i]) det.open = true;
      const sum = d.createElement('summary');
      sum.className = 'faq__q';
      sum.append(span('faq__n', `[${String(i + 1).padStart(2, '0')}]`), span('faq__qt', q), span('faq__plus', '+', true));
      const p = d.createElement('p');
      // segnaposto (testo che inizia con "[") → stile mono del mockup
      p.className = a.trim().startsWith('[') ? 'faq__a faq__a--ph' : 'faq__a';
      p.textContent = a;
      det.append(sum, p);
      frag.appendChild(det);
    });
    box.replaceChildren(frag);
  }

  /* ---------- Avvio ------------------------------------------------ */
  renderFaq();
  d.addEventListener('gf:lang', renderFaq);
  initWorks();
})();
