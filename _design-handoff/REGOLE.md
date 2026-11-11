# REGOLE — Portfolio Giulia Fadlon (redesign)

Questo documento vincola tutti i sottoagenti. Va letto per intero prima di scrivere codice.
In caso di dubbio: **non inventare, chiedi** (scrivilo nel rapporto finale).

---

## 0. Fonte di verità

- Mockup approvato: `_design-handoff/Portfolio Giulia.dc.html` (home + 3 casi studio, a viste).
  `Home Direzioni.dc.html` è solo esplorazione: **non usarlo**.
- Il mockup si replica **fedelmente**: testi (parola per parola, stessa punteggiatura e apostrofi dritti `'`),
  colori, font, dimensioni (`clamp(...)`, `vw`, `px` identici), spaziature, rotazioni, ombre, animazioni.
- I file in `_design-handoff/` **non si modificano** (eccezioni: questo file e `ASSETS.md`, scritti dall'orchestratore e dal sottoagente D).
- Valori fissati (il pannello Tweaks del mockup non esiste più):
  - colore firma `--sig: #B82E66` + chiaro `--sig2: #EF7CA6`
  - caos = **1** (nel codice del mockup `k = 1`)
  - brand: pizza `#C2281D`, negozio `#2740C9`, estetico `#E9C2BC` (inchiostro: crema, crema, nero)

## 1. Stack e vincoli

- HTML + CSS + JavaScript vanilla, **nessuna build**, nessun framework, nessuna libreria nuova.
- Librerie già presenti in `js/vendor/` (versioni fissate): `gsap.min.js` 3.13.0, `ScrollTrigger.min.js` 3.13.0, `lenis.min.js` 1.3.4.
  GSAP + ScrollTrigger si caricano **solo in home**. Lenis ovunque. Lenis è già inizializzato da `main.js` e collegato a ScrollTrigger: non crearne un'altra istanza.
- Percorsi sempre **assoluti dalla radice**: `/css/…`, `/js/…`, `/assets/…`, `/lavori/…`.
- Font locali già dichiarati in `style.css`: `var(--f-display)` Anton, `var(--f-body)` Instrument Sans (400/500/600), `var(--f-hand)` Caveat Brush, `var(--f-mono)`.

## 2. File e proprietari

| File | Proprietario | Note |
|---|---|---|
| `css/style.css`, `js/main.js`, `netlify.toml`, `_design-handoff/REGOLE.md` | **orchestratore** | i sottoagenti NON li modificano: segnalano le modifiche necessarie nel rapporto |
| `<head>` di tutti gli HTML (fuori dal blocco SEO), nav e menu già presenti | **orchestratore** | |
| `index.html` (body, tranne nav e `#menu`), `css/home.css`, `js/home.js` | **A** | |
| `lavori/*.html` e `galleria.html` (body, tranne la `<nav>`), `css/case.css`, `js/case.js` | **B** | |
| `js/i18n.js`, `js/lang/en.js` | **C** | |
| blocco `<!-- SEO:START --> … <!-- SEO:END -->` di ogni HTML, `favicon.*`, `apple-touch-icon.png`, `site.webmanifest`, `robots.txt`, `sitemap.xml`, `_redirects`, `assets/img/og-*.jpg`, `_design-handoff/ASSETS.md` | **D** | |
| `js/content/faq.js` | orchestratore (contenuto), A (rendering) | |
| copie segnaposto in `assets/img/` e `assets/video/` | chi le referenzia (A o B) | vedi §8 |

**Modifiche concorrenti agli HTML**: A, B e D lavorano negli stessi file in parallelo (D nel blocco SEO).
Quindi sugli HTML usate **solo modifiche puntuali (Edit)**, mai la riscrittura dell'intero file (Write).
I sottoagenti **non fanno commit** e non toccano git.

## 3. Variabili (definite in `css/style.css` `:root`)

```
--sig  #B82E66   colore firma (rosa)          --sig2 #EF7CA6  rosa chiaro (su fondo scuro)
--ink  #1B1714   nero caldo                   --cream #F3EBDD  crema
--cream-2 #E8DCC6 / --cream-3 #EFE5D3          righe dei segnaposto
--line-on-ink   rgba(243,235,221,.3)          --line-on-ink-2 rgba(243,235,221,.35)
--brand / --brand-ink                          colore del caso attivo (da <body data-brand="pizza|negozio|estetico">)
--brand-pizza, --brand-negozio, --brand-estetico (+ -ink)
--px  3.1vw (mobile 16px)                      margine laterale
--nav-h  clamp(56px,5vw,76px)
--ease-out cubic-bezier(.2,.8,.2,1)            --ease-wipe cubic-bezier(.7,0,.2,1)
```

**Mai scrivere un colore esadecimale** in `home.css` / `case.css` / HTML: sempre `var(--…)`.
Corrispondenze dal mockup: `#B82E66→--sig`, `#EF7CA6→--sig2`, `#1B1714→--ink`, `#F3EBDD→--cream`,
`#E8DCC6→--cream-2`, `#EFE5D3→--cream-3`, `#2740C9→--brand-negozio`, `#E9C2BC→--brand-estetico`, `#C2281D→--brand-pizza`.
Le trasparenze nere dei segnaposto su brand sono nella classe `.ph--tint`.

## 4. Dal mockup al codice: regole di traduzione

- **Stili inline → classi** nel CSS della pagina. Nomi BEM semplici: `blocco__elemento--variante`.
  Prefissi: home = nome della sezione (`.hero__…`, `.band`, `.numbers__…`, `.works__…`, `.reel__…`, `.method__…`, `.path__…`, `.faq__…`, `.contact__…`);
  casi studio = `.case-…`; galleria = `.gallery-…`. Non ridefinire le classi comuni (§5).
- **`var(--d)` / `var(--m)`** (desktop/mobile) → media query `@media (max-width: 759.98px)` (unico breakpoint, come il mockup: `innerWidth < 760`).
  Es. `font-size: calc(var(--d)*20.3vw + var(--m)*38vw)` → `20.3vw` + in mobile `38vw`.
- `--dblock/--mblock/--dflex/--mflex` → classi `.only-desktop` / `.only-mobile`.
- `--px`, `--o-title`, `--o-tag`, `--numcols`, `--bigcol`, `--bigrow` → valori diretti + media query.
- `style-hover="…"` → `:hover` **e** `:focus-visible`.
- `onClick` → link veri (`<a href>`) o `<button>`. Mai `<a>` senza `href`.
- Le animazioni d'ingresso del mockup (`rise`, `fadeup`, `draw`, `mq`) restano **CSS** con le classi comuni e i ritardi originali (`--delay`, `--dur`).
  Le animazioni legate allo scroll (caos → elenco) passano a **GSAP ScrollTrigger** (`scrub`), con la stessa matematica del metodo `tick()` del mockup.
- Contatori `data-count` e tratti `data-draw` del mockup: **stessi attributi**, li gestisce `main.js` (non riscriverli).
- **Si replica ciò che il browser mostra davvero.** Attenzione: nel mockup gli elementi che hanno sia
  `animation: fadeup … both` sia un `transform: rotate(…)` inline finiscono **non ruotati**, perché il fotogramma finale
  `transform: none` dell'animazione prevale (es. cornice foto della hero desktop, "foto: Giulia scontornata" mobile,
  "← SMM a Roma dal 2023", "parti da qui", "↑ SMM a Roma"). Riproducete lo stato finale visibile, verificando con screenshot del mockup.
- `<sc-if>`, `<x-dc>`, `<helmet>`, `data-screen-label`, `data-props`: non esistono nel sito, si eliminano.
- L'anteprima a scomparsa nell'elenco lavori si mostra **solo** con `(hover: hover) and (pointer: fine)` e sopra i 760px.

## 5. Componenti comuni (già in `style.css` / `main.js`)

| Classe / attributo | Uso |
|---|---|
| `.nav`, `.nav--case`, `.nav__logo`, `.nav__links`, `.nav__link`, `.nav__back`, `.nav__meta` | barre di navigazione (già nelle pagine) |
| `.lang-toggle` `[data-lang-toggle]` | selettore IT/EN; la lingua attiva si sottolinea da `<html lang>` |
| `.menu-btn` `[data-menu-open]`, `#menu`, `[data-menu-close]` | menu mobile (già in index.html) |
| `.btn` + `.btn--ink` / `.btn--line` / `.btn--block` | pulsanti a pillola della hero |
| `.eyebrow` (+ `--plain`, `--light`) | occhiello 14px maiuscolo |
| `.h-sec` | h2 delle sezioni home `clamp(40px,7vw,124px)` |
| `.h-case` | h2 dei casi studio `clamp(34px,5vw,88px)` |
| `.display`, `.hand`, `.mono` | famiglie font |
| `.rise-mask > .rise` | testo che sale (`style="--delay:.2s"`) |
| `.fadeup` | comparsa (`--delay`, `--dur`) |
| `.draw-in` | tratto SVG disegnato all'avvio (`--delay`, `--dur`) |
| `[data-draw]` | tratto SVG disegnato quando entra in vista (`--delay`, `--dur`) |
| `[data-count]` + `data-pre` `data-suf` `data-dec` | contatore animato (scrivi nel HTML il valore finale) |
| `.scribble` | `<svg>` degli scarabocchi (overflow visibile, niente puntatore) |
| `.ph` (+ `--hero`, `--tint`), `.ph__media`, `.ph__label` | segnaposto media (§8) |
| `.phone` > `.ph.phone__screen`, `.play` (+ `--fill`) | telefono con video |
| `.hscroll` | striscia orizzontale (gap/padding li decide la pagina) |
| `[data-wipe="pizza|negozio|estetico|lavori|home|galleria"]` | link con transizione a cerchio |
| `[data-anchor-progress="0.8"]` | lo scroll all'ancora arriva all'80% della sezione (`#lavori`) |
| `.only-desktop`, `.only-mobile`, `.sr-only`, `.skip-link` | utilità |

### API `window.GF` (main.js)
`GF.reducedMotion`, `GF.isMobile()`, `GF.t(testoIT)`, `GF.lenis`, `GF.scrollToEl(el,{immediate})`,
`GF.targetY(el)`, `GF.closeMenu()`, `GF.initMedia(root)`, `GF.initReveal(root)`, `GF.pages`.
Se inserite HTML via JS (es. FAQ) e contiene `data-count`/`data-draw`/`.ph__media`, chiamate `GF.initReveal(root)` / `GF.initMedia(root)`.

### Ordine degli script (già nel `<head>`, tutti `defer`)
Home: `lenis → gsap → ScrollTrigger → lang/en.js → i18n.js → content/faq.js → main.js → home.js`
Casi e galleria: `lenis → lang/en.js → i18n.js → main.js → case.js`

## 6. Lingue (sottoagente C, ma vale per tutti)

- L'italiano è scritto nell'HTML (è la versione indicizzata). L'inglese sta in `js/lang/en.js`:
  `window.GF_EN = { "testo italiano esatto": "English text", … }` (base: `_design-handoff/i18n-en.js`).
- La chiave è il **testo italiano del singolo nodo di testo**, con gli spazi normalizzati. Quindi:
  - A e B copiano i testi **identici al mockup** e mantengono la stessa suddivisione in nodi (es. `Ciao, sono` in uno span, `Giulia` in un altro);
  - ogni testo **nuovo** (alt, aria-label, testi `.sr-only`, galleria) va elencato nel rapporto finale con la proposta inglese → l'orchestratore lo aggiunge.
- Interfaccia `window.GF_I18N` (da rispettare):
  - `lang` (`'it'|'en'`), `set(lang)`, `toggle()`, `t(testoIT)`, `apply(root?)`, `missing()` (elenca i testi senza traduzione, per il controllo).
  - salva la scelta in `localStorage['gf-lang']`, aggiorna `<html lang>`, traduce testi, `document.title`, `meta[name=description]`, `og:title`, `og:description` e gli attributi `alt`, `aria-label`, `title`.
  - emette `document` → `CustomEvent('gf:lang', {detail:{lang}})` dopo ogni cambio (anche al primo avvio se la lingua salvata è EN).
  - salta i sottoalberi con `[data-i18n-skip]` e gli elementi `[data-count]`.
  - `data-i18n="chiave"` (facoltativo) forza una chiave esplicita di `GF_EN`.
- Contenuti generati da JS (FAQ) si ridisegnano ascoltando `gf:lang` e leggendo `GF_I18N.lang`.

## 7. FAQ

- Contenuto **solo** in `js/content/faq.js` (`window.GF_FAQ = [{ it:{q,a}, en:{q,a} }, …]`).
- A le disegna in home dentro un contenitore `[data-i18n-skip]`, con `<details>/<summary>` come nel mockup, numerazione automatica `[01]…`.
- Se il testo inizia con `[` è un segnaposto: si usa lo stile del mockup (mono 14px). Altrimenti la risposta usa `var(--f-body)` `clamp(16px,1.3vw,19px)` / `line-height:1.5`.

## 8. Immagini e video: segnaposto con nome definitivo

Ogni foto/video mancante **ha già il suo nome file definitivo**. Il file su disco è una copia del segnaposto,
così non ci sono 404 e per mettere quello vero basta sovrascriverlo:
```
cp assets/img/_placeholder.webp  assets/img/<nome>.webp     # immagine trasparente 1×1
cp assets/video/_placeholder.mp4 assets/video/<nome>.mp4    # video 16×16 di 0,2 s
```
`main.js` riconosce il segnaposto (immagine ≤ 1px, video ≤ 16px) e lascia visibili righe e didascalia del mockup.

Markup immagine:
```html
<div class="ph [ph--tint|ph--hero] [classi-pagina]">
  <img class="ph__media" src="/assets/img/NOME.webp" alt="descrizione reale" width="W" height="H" loading="lazy" decoding="async">
  <span class="ph__label" aria-hidden="true">didascalia del mockup</span>
</div>
```
Markup video (telefono):
```html
<div class="phone [classi]"><div class="ph phone__screen">
  <video class="ph__media" data-src="/assets/video/NOME.mp4" muted loop playsinline preload="none" aria-label="descrizione"></video>
  <span class="play [play--fill]" aria-hidden="true">▶</span>
  <span class="ph__label" aria-hidden="true">didascalia del mockup</span>
</div></div>
```
- Above the fold (hero): niente `loading="lazy"`, aggiungere `fetchpriority="high"`.
- Per uno sfondo diverso a media caricato: `style="--ph-loaded-bg: var(--cream)"`.

**Nomi file stabiliti** (non cambiarli):

| File | Dove | Didascalia mockup | Formato |
|---|---|---|---|
| `img/hero-giulia.webp` | home hero (desktop + mobile) | foto: Giulia scontornata | 1400×2000, sfondo trasparente |
| `video/showreel.mp4` | home showreel, telefono 1 | video: showreel 45–60s — reel, grafiche, shooting | 1080×1920 |
| `video/reel-sketch-dialetto.mp4` | home showreel, telefono 2 | reel: sketch dei titolari in dialetto | 1080×1920 |
| `video/reel-romanesco.mp4` | home showreel, telefono 3 | reel: format comico in romanesco | 1080×1920 |
| `video/reel-vero-falso.mp4` | home showreel, telefono 4 | reel: Vero/Falso, centro estetico | 1080×1920 |
| `img/post-09-1.webp` ✅ esiste | home striscia 1 + anteprima Centro estetico | carosello educativo / before-after | 4:5 |
| `img/grafica-pizza-feed.webp` | home striscia 2 | grafica feed: Pizza a Portafoglio | 1:1 1080×1080 |
| `img/carosello-vero-falso.webp` | home striscia 3 + caso estetico (frame 4:5) | carosello: format Vero/Falso | 4:5 1080×1350 |
| `img/foto-fila-inaugurazione.webp` | home striscia 4 + anteprima Pizza + caso pizza (frame 3:2) | foto: fila all'inaugurazione | 3:2 1800×1200 |
| `img/shooting-food.webp` | home striscia 5 | shooting: prodotto food | 1:1 1080×1080 |
| `img/stories-countdown.webp` | home striscia 6 | grafica stories: countdown apertura | 4:5 1080×1350 |
| `img/negozio-ruota.webp` | anteprima Negozio + caso negozio (frame 3:2) | foto: clienti alla Ruota della Fortuna | 3:2 1800×1200 |
| `img/pizza-cover.webp` | caso pizza, copertina | foto copertina: fila all'inaugurazione | 2400×1600, soggetto al centro |
| `video/pizza-reel-views.mp4` | caso pizza, telefono 1 | reel: view count visibile | 1080×1920 |
| `video/pizza-reel-backstage.mp4` | caso pizza, telefono 2 | behind the scenes | 1080×1920 |
| `img/pizza-insight.webp` | caso pizza, telefono 3 | screenshot insight | 1080×2280 |
| `img/pizza-frame-sketch.webp` | caso pizza, frame 4:5 | frame: sketch dei titolari | 1080×1350 |
| `img/negozio-cover.webp` | caso negozio, copertina | foto copertina: i fratelli titolari nel negozio | 2400×1600 |
| `video/negozio-reel-sketch.mp4` | caso negozio, telefono 1 | sketch: view count visibile | 1080×1920 |
| `video/negozio-reel-ruota.mp4` | caso negozio, telefono 2 | ruota della fortuna | 1080×1920 |
| `img/negozio-insight.webp` | caso negozio, telefono 3 | screenshot insight | 1080×2280 |
| `img/negozio-frame-sketch.webp` | caso negozio, frame 4:5 | frame: sketch tra fratelli | 1080×1350 |
| `img/estetico-cover.webp` | caso estetico, copertina | foto copertina: la titolare al lavoro | 2400×1600 |
| `video/estetico-reel-carosello.mp4` | caso estetico, telefono 1 | carosello educativo | 1080×1920 |
| `video/estetico-reel-before-after.mp4` | caso estetico, telefono 2 | before/after con contesto | 1080×1920 |
| `video/estetico-reel-influencer.mp4` | caso estetico, telefono 3 | reel con influencer | 1080×1920 |
| `img/estetico-insight.webp` | caso estetico, frame 3:2 | screenshot insight | 1800×1200 |

Galleria: usa i post reali già pronti `img/post-01…08.webp` (1080 px) e `-640.webp` (640 px), e il carosello `img/post-09-1…5.webp`, con `srcset`.
CV: `/assets/cv/cv-giulia-fadlon.pdf`.

## 9. Link

- Ancore home: `#lavori` (con `data-anchor-progress="0.8"`), `#metodo`, `#percorso`, `#contatti` (il footer, già presente).
- Casi: `/lavori/pizza-a-portafoglio.html`, `/lavori/negozio-di-quartiere.html`, `/lavori/centro-estetico.html` — sempre con `data-wipe`.
- "Torna ai lavori" = `/#lavori` `data-wipe="lavori"` (già nella nav). Prossimo caso: pizza→negozio→estetico→pizza.
- "Guarda tutte le foto →" = `/galleria.html` (stessa scheda, `data-wipe="galleria"`).
- Esterni: `target="_blank" rel="noopener"`. Email `mailto:giuliis.fa.marketing@gmail.com`, LinkedIn `https://www.linkedin.com/in/giulia-fadlon`, Instagram `https://www.instagram.com/giuliis.smm`.
- CV: `/assets/cv/cv-giulia-fadlon.pdf` (`target="_blank" rel="noopener"`). Mai l'URL assoluto di Netlify.

## 10. Accessibilità

- HTML semantico: un solo `<h1>` visibile per pagina (in home la hero ha due versioni, desktop e mobile, in elementi `.only-*`: entrambe `<h1>`, una sola è visibile), `h2` per le sezioni, `<ul>` per gli elenchi, `<details>` per le FAQ.
- Focus sempre visibile (globale in style.css). Tutto raggiungibile da tastiera, compreso l'elenco lavori (le anteprime al passaggio del mouse sono decorative).
- Elementi decorativi (scarabocchi, ✺, frecce, segnaposto) → `aria-hidden="true"`. Fascia scorrevole: testo duplicato `aria-hidden` dalla seconda copia.
- Strisce `.hscroll`: `tabindex="0"`, `role="region"`, `aria-label`.
- Bersagli touch ≥ 44px su mobile.
- Contrasti verificati: crema/rosa 4.90, crema/rosso 4.91, crema/blu 6.66, nero/rosa estetico 10.95, rosa chiaro/nero 6.87. Il nero su `--sig` (3.07) solo per testo ≥ 24px (titolo "Giulia").

## 11. Movimento e prestazioni

- `GF.reducedMotion === true` → niente scrub, niente anteprima che segue il mouse; stato finale statico (elenco lavori in ordine, parole volanti nascoste). Il CSS globale azzera già le animazioni CSS.
- Mobile (`GF.isMobile()`): caos ridotto come nel mockup (spostamento X × 0.3), nessuna anteprima, niente effetti aggiuntivi. Animare solo `transform` e `opacity`.
- `will-change` solo dove il mockup lo usa. Niente listener `scroll` manuali: usate ScrollTrigger.
- Immagini sotto la prima schermata: `loading="lazy" decoding="async"` + `width`/`height`. Video: `preload="none"` + `data-src` (li carica main.js).

## 12. Verifica (ognuno sulle proprie pagine, prima di consegnare)

- Server locale già attivo: `http://127.0.0.1:8765/` (radice del repo).
- Playwright: `node /private/tmp/claude-501/-Users-samuele-Documents-DevPersonal-iPortfolio/a9024a98-b72b-49ad-b9b6-56a9dec7e479/scratchpad/pw/check.js <cartella-output> <url…>`
  (larghezze 375/768/1440, errori console, richieste fallite, overflow orizzontale; `FULL=1` per pagina intera).
  Usate una cartella di output vostra nello scratchpad (es. `…/scratchpad/shots-A`).
- Confronto col mockup: aprite `http://127.0.0.1:8765/_design-handoff/Portfolio%20Giulia.dc.html` (i casi con `#pizza`, `#negozio`, `#estetico`) alle stesse larghezze.
- Requisiti: zero errori in console, zero overflow orizzontale, nessun 404.

## 13. Rapporto finale di ogni sottoagente

1. File creati/modificati.
2. Scostamenti dal mockup (se inevitabili) e perché.
3. Modifiche richieste ai file comuni (style.css, main.js, head) — **non applicate**.
4. Testi nuovi da tradurre (IT → EN proposto).
5. Asset referenziati (nome file) e segnaposto creati.
6. Esito della verifica (larghezze, console, overflow).
