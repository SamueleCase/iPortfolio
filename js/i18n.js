/* =============================================================
   i18n.js — sistema IT/EN (sottoagente C)
   STUB della tappa 1: espone l'interfaccia, non traduce ancora.
   Interfaccia richiesta (vedi _design-handoff/REGOLE.md §6):
     GF_I18N.lang · GF_I18N.set(lang) · GF_I18N.toggle() · GF_I18N.t(testoIT) · GF_I18N.apply(root)
   ============================================================= */
(() => {
  'use strict';
  const I = (window.GF_I18N = {
    lang: 'it',
    t: (s) => s,
    apply: () => {},
    set(lang) {
      I.lang = lang === 'en' ? 'en' : 'it';
      document.documentElement.lang = I.lang;
      try { localStorage.setItem('gf-lang', I.lang); } catch (_) {}
      document.dispatchEvent(new CustomEvent('gf:lang', { detail: { lang: I.lang } }));
    },
    toggle() { I.set(I.lang === 'en' ? 'it' : 'en'); }
  });
})();
