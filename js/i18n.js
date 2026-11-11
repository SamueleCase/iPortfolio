/* =============================================================
   i18n.js — sistema IT/EN (sottoagente C)
   -------------------------------------------------------------
   L'italiano è scritto nell'HTML; l'inglese sta in js/lang/en.js
   (window.GF_EN = { "testo italiano": "English text", … }).
   La chiave è il testo del singolo nodo di testo, con gli spazi
   normalizzati (\s+ → ' ', trim). Gli spazi iniziali/finali del nodo
   (compreso &nbsp;) restano quelli originali.

   Interfaccia (REGOLE §6):
     GF_I18N.lang          'it' | 'en'
     GF_I18N.set(lang)     cambia lingua (salva, <html lang>, evento gf:lang)
     GF_I18N.toggle()      IT ⇄ EN
     GF_I18N.t(testoIT)    traduzione nella lingua attiva
     GF_I18N.apply(root)   traduce un pezzo di pagina aggiunto dopo
     GF_I18N.missing()     elenca i testi italiani senza traduzione

   Cosa traduce: nodi di testo del <body>, document.title,
   meta description / og:title / og:description (e twitter:*),
   attributi alt, aria-label, title.
   Cosa salta: <script>, <style>, <noscript>, <template>,
   i sottoalberi [data-i18n-skip] e gli elementi [data-count].
   data-i18n="chiave": usa quella chiave di GF_EN per i nodi di testo
   figli diretti dell'elemento (invece del loro testo).

   In italiano non fa nessun lavoro. In inglese un MutationObserver
   (solo childList + gli attributi tradotti) traduce i nodi aggiunti
   dopo; le modifiche che fa lui stesso non lo riattivano.
   ============================================================= */
(() => {
  'use strict';

  const d = document;
  const html = d.documentElement;
  const KEY = 'gf-lang';
  const ATTRS = ['alt', 'aria-label', 'title'];
  const META = 'meta[name="description"],meta[property="og:title"],meta[property="og:description"],' +
    'meta[name="twitter:title"],meta[name="twitter:description"]';
  const SKIP_TAGS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEMPLATE: 1 };
  const SKIP_SEL = 'script,style,noscript,template,[data-i18n-skip],[data-count]';

  const dict = () => window.GF_EN || {};
  const has = Object.prototype.hasOwnProperty;
  const norm = (s) => String(s).replace(/\s+/g, ' ').trim();
  const lookup = (k) => (k && has.call(dict(), k) ? dict()[k] : null);

  /* Traduzioni inverse (inglese → chiave italiana), costruite solo se servono:
     riconoscono testo già inglese copiato/clonato da altri script mentre la
     pagina è in EN, così torna anche lui all'italiano. */
  let rev = null;
  const reverse = (k) => {
    if (!rev) {
      rev = Object.create(null);
      const D = dict();
      for (const it in D) { const en = norm(D[it]); if (!(en in rev)) rev[en] = it; }
    }
    return rev[k] || null;
  };

  /* Originali: nodo/elemento → { it, en }. "touched" serve a tornare all'italiano. */
  const textRec = new WeakMap();
  const attrRec = new WeakMap();
  const touched = new Set();
  let titleRec = null;

  const wrap = (raw, s) => raw.match(/^\s*/)[0] + s + raw.match(/\s*$/)[0];

  /* ---------- un nodo di testo ------------------------------------ */
  function doText(n) {
    const v = n.nodeValue;
    let r = textRec.get(n);
    if (!r || (v !== r.en && v !== r.it)) { // nuovo, o riscritto da altri
      let k = norm(v);
      if (!k) return;
      const p = n.parentNode;
      if (p && p.dataset && p.dataset.i18n) k = p.dataset.i18n;
      const en = lookup(k);
      if (en != null) r = { it: v, en: wrap(v, en) };
      else {
        const it = reverse(k);             // è già inglese?
        if (!it || it === k) return;
        r = { it: wrap(v, it), en: v };
      }
      textRec.set(n, r);
    }
    touched.add(n);
    if (n.nodeValue !== r.en) n.nodeValue = r.en;
  }

  /* ---------- un attributo (alt, aria-label, title, content) ------ */
  function doAttr(el, name) {
    const v = el.getAttribute(name);
    if (v == null) return;
    let m = attrRec.get(el);
    let r = m && m[name];
    if (!r || (v !== r.en && v !== r.it)) {
      const k = norm(v);
      const en = lookup(k);
      if (en == null) return;
      r = { it: v, en };
      if (!m) attrRec.set(el, (m = {}));
      m[name] = r;
    }
    touched.add(el);
    if (v !== r.en) el.setAttribute(name, r.en);
  }

  function doElement(el) {
    for (let i = 0; i < ATTRS.length; i++) if (el.hasAttribute(ATTRS[i])) doAttr(el, ATTRS[i]);
  }

  const skipEl = (el) => SKIP_TAGS[el.tagName] === 1 || el.hasAttribute('data-i18n-skip') || el.hasAttribute('data-count');

  /* Un solo passaggio: TreeWalker su elementi + testo, i sottoalberi esclusi
     vengono scartati interi (FILTER_REJECT). */
  function walk(root, fnText, fnEl) {
    if (root.nodeType === 3) { fnText(root); return; }
    if (root.nodeType === 1) { if (skipEl(root)) return; fnEl(root); }
    const w = d.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.nodeType === 1 && skipEl(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
    });
    let n;
    while ((n = w.nextNode())) { if (n.nodeType === 3) fnText(n); else fnEl(n); }
  }

  function doHead() {
    const t = d.title;
    if (!titleRec || (t !== titleRec.en && t !== titleRec.it)) {
      const en = lookup(norm(t));
      titleRec = en != null ? { it: t, en } : null;
    }
    if (titleRec && d.title !== titleRec.en) d.title = titleRec.en;
    d.querySelectorAll(META).forEach((m) => doAttr(m, 'content'));
  }

  /* ---------- ritorno all'italiano -------------------------------- */
  function restore() {
    touched.forEach((n) => {
      if (n.nodeType === 3) {
        const r = textRec.get(n);
        if (r && n.nodeValue === r.en) n.nodeValue = r.it;
      } else {
        const m = attrRec.get(n);
        if (m) for (const a in m) if (n.getAttribute(a) === m[a].en) n.setAttribute(a, m[a].it);
      }
    });
    touched.clear();
    if (titleRec && d.title === titleRec.en) d.title = titleRec.it;
  }

  /* ---------- contenuto aggiunto dopo (solo in EN) ---------------- */
  const inSkipped = (n) => {
    const p = n.nodeType === 1 ? n : n.parentElement;
    return !!p && !!p.closest(SKIP_SEL);
  };

  const mo = 'MutationObserver' in window ? new MutationObserver((list) => {
    for (let i = 0; i < list.length; i++) {
      const m = list[i];
      if (m.type === 'attributes') {
        // le nostre setAttribute arrivano qui già tradotte: doAttr non fa nulla
        if (!inSkipped(m.target)) doAttr(m.target, m.attributeName);
        continue;
      }
      const added = m.addedNodes;
      for (let j = 0; j < added.length; j++) {
        const n = added[j];
        if ((n.nodeType === 1 || n.nodeType === 3) && n.isConnected && !inSkipped(n)) walk(n, doText, doElement);
      }
    }
  }) : null;

  const observe = (on) => {
    if (!mo || !d.body) return;
    if (on) mo.observe(d.body, { childList: true, subtree: true, attributes: true, attributeFilter: ATTRS });
    else mo.disconnect();
  };

  /* ---------- API -------------------------------------------------- */
  const emit = () => d.dispatchEvent(new CustomEvent('gf:lang', { detail: { lang: I.lang } }));

  function render() {
    html.lang = I.lang;
    if (I.lang === 'en') {
      doHead();
      walk(d.body, doText, doElement);
      observe(true);
    } else {
      observe(false);
      restore();
    }
  }

  const I = (window.GF_I18N = {
    lang: 'it',

    set(lang) {
      lang = lang === 'en' ? 'en' : 'it';
      try { localStorage.setItem(KEY, lang); } catch (_) { /* navigazione privata */ }
      if (lang === I.lang) return;
      I.lang = lang;
      render();
      emit();
    },

    toggle() { I.set(I.lang === 'en' ? 'it' : 'en'); },

    t(s) {
      if (I.lang !== 'en' || s == null) return s;
      const en = lookup(norm(s));
      return en != null ? en : s;
    },

    apply(root) {
      if (I.lang !== 'en') return;
      if (!root || root === d || root === html) { doHead(); root = d.body; }
      if (root && !inSkipped(root)) walk(root, doText, doElement);
    },

    /* Testi italiani senza traduzione (per i controlli).
       Ignora: testi senza lettere (numeri, simboli, [01]), email, @nomi, URL,
       IT/EN, e le voci che in en.js sono uguali in inglese. */
    missing() {
      const out = new Map();
      const ignore = (k) => !k || !/\p{L}/u.test(k) || /^(IT|EN)$/.test(k) ||
        /^\S+@\S+\.\S+$/.test(k) || /^@[\w.]+$/.test(k) || /^(https?:|www\.)/.test(k) ||
        /^[\d.,:%+\-–→←↑↓/×x ]*[KkMmh]?\+?$/.test(k);
      const add = (k, where) => {
        if (ignore(k) || lookup(k) != null) return;
        if (I.lang === 'en' && reverse(k)) return; // è già inglese
        if (!out.has(k)) out.set(k, where);
      };
      const label = (el) => el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '');
      const textIt = (n) => {
        const r = textRec.get(n);
        return r && n.nodeValue === r.en ? null : n.nodeValue;
      };
      walk(d.body, (n) => {
        const p = n.parentNode;
        const v = textIt(n);
        if (v != null && norm(v) && p && p.dataset && p.dataset.i18n) {
          if (lookup(p.dataset.i18n) == null) add(p.dataset.i18n, 'data-i18n');
          return;
        }
        if (v != null) add(norm(v), label(n.parentElement || d.body));
      }, (el) => {
        ATTRS.forEach((a) => {
          const v = el.getAttribute(a);
          if (v == null) return;
          const m = attrRec.get(el);
          if (m && m[a] && v === m[a].en) return;
          add(norm(v), label(el) + ' [' + a + ']');
        });
      });
      if (!titleRec || d.title !== titleRec.en) add(norm(d.title), '<title>');
      d.querySelectorAll(META).forEach((m) => {
        const r = attrRec.get(m);
        const v = m.getAttribute('content');
        if (!(r && r.content && v === r.content.en)) add(norm(v || ''), 'meta ' + (m.getAttribute('name') || m.getAttribute('property')));
      });
      const list = [...out.keys()];
      if (list.length && console.table) console.table([...out].map(([testo, dove]) => ({ testo, dove })));
      else console.log('GF_I18N.missing(): nessun testo senza traduzione');
      return list;
    }
  });

  /* ---------- avvio ------------------------------------------------ */
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) { /* niente */ }

  if (saved === 'en') {
    I.lang = 'en';
    render(); // subito, prima di main.js: niente lampo di italiano
    // l'evento parte quando anche main.js/home.js hanno registrato i loro ascoltatori
    if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', emit, { once: true });
    else setTimeout(emit, 0);
  }

  /* Lingua cambiata in un'altra scheda, o pagina ripresa dalla cache "indietro" */
  const sync = () => {
    let v = null;
    try { v = localStorage.getItem(KEY); } catch (_) { return; }
    if ((v === 'en' ? 'en' : 'it') !== I.lang) I.set(v);
  };
  window.addEventListener('storage', (e) => { if (e.key === KEY) sync(); });
  window.addEventListener('pageshow', (e) => { if (e.persisted) sync(); });
})();
