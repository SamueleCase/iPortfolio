/* =============================================================
   main.js — comune a tutte le pagine
   -------------------------------------------------------------
   Espone window.GF con:
     GF.reducedMotion      true se l'utente preferisce meno movimento
     GF.isMobile()         true sotto i 760px
     GF.t(testoIT)         traduzione (se js/i18n.js è caricato)
     GF.pages              destinazioni della transizione "wipe"
     GF.lenis              istanza Lenis (null con movimento ridotto)
     GF.scrollToEl(el,opt) scroll morbido (rispetta data-anchor-progress)
     GF.closeMenu()        chiude il menu mobile
     GF.initMedia(root)    attiva segnaposto immagini/video
     GF.initReveal(root)   attiva contatori [data-count] e tratti [data-draw]
   Dipendenze opzionali: Lenis, gsap + ScrollTrigger (solo home).
   ============================================================= */
(() => {
  'use strict';

  const d = document;
  const html = d.documentElement;
  const GF = (window.GF = window.GF || {});
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqMobile = matchMedia('(max-width: 759.98px)');

  GF.reducedMotion = mqReduce.matches;
  GF.isMobile = () => mqMobile.matches;
  GF.t = (s) => (window.GF_I18N && typeof window.GF_I18N.t === 'function' ? window.GF_I18N.t(s) : s);
  GF.cssVar = (name) => getComputedStyle(html).getPropertyValue(name).trim();

  /* Destinazioni della transizione: <a href="…" data-wipe="pizza"> */
  GF.pages = {
    pizza:    { label: 'Pizza a Portafoglio',  bg: '--brand-pizza',    ink: '--brand-pizza-ink' },
    negozio:  { label: 'Negozio di quartiere', bg: '--brand-negozio',  ink: '--brand-negozio-ink' },
    estetico: { label: 'Centro estetico',      bg: '--brand-estetico', ink: '--brand-estetico-ink' },
    lavori:   { label: 'Lavori',               bg: '--ink',            ink: '--cream' },
    home:     { label: 'Giulia Fadlon',        bg: '--sig',            ink: '--cream' },
    galleria: { label: 'Galleria',             bg: '--sig',            ink: '--cream' }
  };

  /* ---------- Transizione "wipe" ---------------------------------- */
  let busy = false;

  function makeOverlay(bg, ink, label) {
    const o = d.createElement('div');
    o.className = 'wipe';
    o.setAttribute('aria-hidden', 'true');
    o.style.background = bg;
    o.style.color = ink;
    o.textContent = label;
    return o;
  }

  function wipeTo(a, e) {
    const page = GF.pages[a.dataset.wipe];
    if (!page || GF.reducedMotion) return; // navigazione normale
    e.preventDefault();
    if (busy) return;
    busy = true;
    const bg = GF.cssVar(page.bg);
    const ink = GF.cssVar(page.ink);
    const label = GF.t(page.label);
    const x = e.clientX || innerWidth / 2;
    const y = e.clientY || innerHeight / 2;
    const o = makeOverlay(bg, ink, label);
    o.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    d.body.appendChild(o);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      o.style.clipPath = `circle(150vmax at ${x}px ${y}px)`;
    }));
    setTimeout(() => {
      try { sessionStorage.setItem('gf-wipe', JSON.stringify({ bg, ink, label })); } catch (_) { /* privato */ }
      location.href = a.href;
    }, 850);
  }

  /* Arrivo: lo script inline nel <head> ha aggiunto .wipe-in */
  function arrive() {
    if (!html.classList.contains('wipe-in')) return;
    let w = null;
    try {
      w = JSON.parse(sessionStorage.getItem('gf-wipe'));
      sessionStorage.removeItem('gf-wipe');
    } catch (_) { /* niente */ }
    html.classList.remove('wipe-in');
    if (!w) return;
    const o = makeOverlay(w.bg, w.ink, w.label);
    d.body.appendChild(o);
    setTimeout(() => {
      o.style.opacity = '0';
      setTimeout(() => o.remove(), 480);
    }, 260);
  }

  /* Tornando indietro (cache del browser) la pagina non deve restare coperta */
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    d.querySelectorAll('.wipe').forEach((o) => o.remove());
    busy = false;
  });

  /* ---------- Smooth scroll (Lenis) -------------------------------- */
  GF.lenis = null;

  function initLenis() {
    if (GF.reducedMotion || typeof window.Lenis !== 'function') return;
    const gsap = window.gsap;
    const lenis = new window.Lenis({ autoRaf: !gsap });
    if (gsap) {
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      if (window.ScrollTrigger) lenis.on('scroll', window.ScrollTrigger.update);
    }
    GF.lenis = lenis;
  }

  /* ---------- Scroll alle sezioni ---------------------------------- */
  /* data-anchor-progress="0.8" su una sezione alta: si arriva all'80% del suo
     scorrimento (usato da #lavori, dove l'elenco è già in ordine). */
  GF.targetY = (el) => {
    const r = el.getBoundingClientRect();
    let y = r.top + window.scrollY;
    const p = parseFloat(el.dataset.anchorProgress || '');
    if (p) y += (r.height - window.innerHeight) * p;
    return Math.max(0, Math.round(y));
  };

  GF.scrollToEl = (el, { immediate = false } = {}) => {
    const y = GF.targetY(el);
    if (GF.lenis) GF.lenis.scrollTo(y, { immediate, force: true });
    else window.scrollTo({ top: y, behavior: immediate || GF.reducedMotion ? 'auto' : 'smooth' });
    // sposta il focus per chi naviga da tastiera, senza far saltare la pagina
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  };

  const samePage = (url) =>
    url.origin === location.origin &&
    url.pathname.replace(/index\.html$/, '') === location.pathname.replace(/index\.html$/, '');

  /* ---------- Click delegato: wipe + ancore ------------------------ */
  d.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || (a.target && a.target !== '_self')) return;

    if (a.dataset.wipe) { wipeTo(a, e); return; }

    const url = new URL(a.href, location.href);
    if (!url.hash || !samePage(url)) return;
    const el = d.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    const go = () => GF.scrollToEl(el);
    if (a.closest('.menu')) { GF.closeMenu(false); setTimeout(go, 60); } else go();
    if (history.replaceState) history.replaceState(null, '', url.hash);
  });

  /* Arrivo con #ancora nell'URL (es. "Torna ai lavori" → /#lavori) */
  function initHash() {
    if (!location.hash) return;
    let el = null;
    try { el = d.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (_) { return; }
    if (!el) return;
    const jump = () => requestAnimationFrame(() => GF.scrollToEl(el, { immediate: true }));
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(jump); else jump();
  }

  /* ---------- Menu mobile ------------------------------------------ */
  GF.closeMenu = () => {};

  function initMenu() {
    const menu = d.getElementById('menu');
    if (!menu) return;
    const openers = d.querySelectorAll('[data-menu-open]');
    let last = null;
    const items = () => [...menu.querySelectorAll('a[href], button:not([disabled])')];

    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      const list = items();
      const first = list[0];
      const end = list[list.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); end.focus(); }
      else if (!e.shiftKey && d.activeElement === end) { e.preventDefault(); first.focus(); }
    }

    function open() {
      last = d.activeElement;
      menu.hidden = false;
      openers.forEach((b) => b.setAttribute('aria-expanded', 'true'));
      if (GF.lenis) GF.lenis.stop();
      html.style.overflow = 'hidden';
      d.addEventListener('keydown', onKey);
      const first = items()[0];
      if (first) first.focus();
    }

    function close(restoreFocus = true) {
      if (menu.hidden) return;
      menu.hidden = true;
      openers.forEach((b) => b.setAttribute('aria-expanded', 'false'));
      html.style.overflow = '';
      if (GF.lenis) GF.lenis.start();
      d.removeEventListener('keydown', onKey);
      if (restoreFocus && last) last.focus();
    }

    GF.closeMenu = close;
    openers.forEach((b) => b.addEventListener('click', open));
    menu.querySelectorAll('[data-menu-close]').forEach((b) => b.addEventListener('click', () => close()));
    mqMobile.addEventListener('change', (e) => { if (!e.matches) close(false); });
  }

  /* ---------- Lingua ----------------------------------------------- */
  function initLang() {
    d.querySelectorAll('[data-lang-toggle]').forEach((b) =>
      b.addEventListener('click', () => {
        if (window.GF_I18N && typeof window.GF_I18N.toggle === 'function') window.GF_I18N.toggle();
      })
    );
  }

  /* ---------- Segnaposto media ------------------------------------- */
  /* <img class="ph__media"> : se il file è il segnaposto 1×1 resta la didascalia.
     <video class="ph__media" data-src="…"> : caricato vicino alla vista,
     riprodotto muto in loop (con controlli), messo in pausa fuori vista. */
  GF.initMedia = (root = d) => {
    root.querySelectorAll('img.ph__media').forEach((img) => {
      const box = img.closest('.ph');
      if (!box) return;
      const check = () => { if (img.naturalWidth > 1) box.classList.add('has-media'); };
      if (img.complete) check(); else img.addEventListener('load', check, { once: true });
    });

    const vids = root.querySelectorAll('video.ph__media[data-src]');
    if (!vids.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) {
        if (!v.getAttribute('src')) {
          v.addEventListener('loadedmetadata', () => {
            if (v.videoWidth <= 16) return; // ancora il segnaposto
            v.dataset.real = '1';
            v.controls = true;
            const box = v.closest('.ph');
            if (box) box.classList.add('has-media');
            if (!GF.reducedMotion) v.play().catch(() => {});
          }, { once: true });
          v.src = v.dataset.src;
        } else if (v.dataset.real && !GF.reducedMotion) {
          v.play().catch(() => {});
        }
      } else if (!v.paused) {
        v.pause();
      }
    }), { rootMargin: '200px 0px' });
    vids.forEach((v) => io.observe(v));
  };

  /* ---------- Contatori e tratti disegnati ------------------------- */
  /* <span data-count="5.2" data-dec="1" data-pre="+" data-suf="K">5.2K</span>
     <path data-draw style="--dur:1.2s;--delay:.3s" …> */
  function setNum(el, v) {
    const ds = el.dataset;
    el.textContent = (ds.pre || '') + v.toFixed(+(ds.dec || 0)) + (ds.suf || '');
  }

  function count(el) {
    const to = +el.dataset.count;
    const t0 = performance.now();
    const dur = 1400;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      setNum(el, to * (1 - Math.pow(1 - k, 3)));
      if (k < 1 && el.isConnected) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  GF.initReveal = (root = d) => {
    const els = [...root.querySelectorAll('[data-count],[data-draw]')].filter((el) => !el.__gf);
    els.forEach((el) => { el.__gf = true; });
    if (GF.reducedMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => { if (el.hasAttribute('data-draw')) el.classList.add('is-drawn'); });
      return;
    }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      io.unobserve(el);
      if (el.hasAttribute('data-count')) count(el); else el.classList.add('is-drawn');
    }), { threshold: 0.4 });
    els.forEach((el) => {
      if (el.hasAttribute('data-count')) setNum(el, 0);
      io.observe(el);
    });
  };

  /* ---------- Avvio ------------------------------------------------ */
  arrive();
  initLenis();
  initMenu();
  initLang();
  GF.initMedia();
  GF.initReveal();
  initHash();
})();
