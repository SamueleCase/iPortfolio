# ASSETS — Foto, video e testi da preparare

Questa è la lista di tutto il materiale che manca al sito. Ogni file ha **già il suo nome definitivo**:
oggi al suo posto c'è un segnaposto invisibile (il sito mostra le righe diagonali e la didascalia grigia).
Per mettere quello vero basta **salvare il file nuovo con lo stesso identico nome, nella stessa cartella**,
sovrascrivendo il vecchio. Non serve toccare il codice.

Legenda priorità: **Alta** = si vede appena si apre il sito o un caso studio · **Media** = si vede scorrendo · **Bassa** = dettaglio o già pronto.

---

## 1. Cosa esiste già (file veri, non serve fare nulla)

| File | Cosa contiene |
|---|---|
| `assets/img/post-01.webp` … `post-08.webp` (+ versioni `-640.webp`) | i post reali della galleria |
| `assets/img/post-09-1.webp` … `post-09-5.webp` (+ `-640.webp`) | il carosello educativo (usato anche in home e nell'anteprima del Centro estetico) |
| `assets/cv/cv-giulia-fadlon.pdf` | il CV scaricabile |
| `assets/img/og-home.jpg`, `og-pizza.jpg`, `og-negozio.jpg`, `og-estetico.jpg`, `og-galleria.jpg` | le immagini di anteprima quando si condivide un link (vedi §4) |
| `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | l'iconcina "G" della scheda del browser (vedi §4) |

Se vuoi aggiornare il CV, salva il nuovo PDF come `assets/cv/cv-giulia-fadlon.pdf` (stesso nome).

---

## 2. Foto da preparare (`assets/img/`)

Formato per tutte: **WebP** (vedi §5 per come esportarlo). Pesi massimi indicativi: se li superi il sito funziona, ma si carica più lento.

| Priorità | File (percorso esatto) | Cosa deve mostrare / da dove prenderla | Dimensioni | Peso max | Dove compare |
|---|---|---|---|---|---|
| **Alta** | `assets/img/hero-giulia.webp` | Giulia **scontornata** (senza sfondo, trasparente), mezzo busto o figura intera, sguardo in camera. Foto nuova o shooting esistente, scontornata con remove.bg / Photoshop / Canva "Rimuovi sfondo" | 1400×2000 (verticale) | 300 KB | Home, prima schermata (desktop e mobile) |
| **Alta** | `assets/img/pizza-cover.webp` | Copertina del caso Pizza: la **fila all'inaugurazione**, soggetto al centro (i lati possono essere tagliati) | 2400×1600 (3:2) | 350 KB | Caso Pizza a Portafoglio, in alto |
| **Alta** | `assets/img/negozio-cover.webp` | Copertina: **i due fratelli titolari nel negozio**. ⚠ Il nome del negozio è riservato: niente insegne o loghi leggibili | 2400×1600 (3:2) | 350 KB | Caso Negozio di quartiere, in alto |
| **Alta** | `assets/img/estetico-cover.webp` | Copertina: **la titolare al lavoro** (trattamento in corso). ⚠ Nome riservato: niente loghi leggibili; le clienti solo se hanno dato il consenso | 2400×1600 (3:2) | 350 KB | Caso Centro estetico, in alto |
| **Alta** | `assets/img/foto-fila-inaugurazione.webp` | La fila all'inaugurazione di Pizza a Portafoglio (può essere un altro scatto rispetto alla copertina) | 1800×1200 (3:2) | 250 KB | Home: striscia contenuti (4ª) + anteprima "Pizza a Portafoglio" nell'elenco lavori; Caso Pizza (riquadro 3:2) |
| **Alta** | `assets/img/negozio-ruota.webp` | Clienti che girano la **Ruota della Fortuna** nel negozio | 1800×1200 (3:2) | 250 KB | Home: anteprima "Negozio di quartiere" nell'elenco lavori; Caso Negozio (riquadro 3:2) |
| Media | `assets/img/grafica-pizza-feed.webp` | Una **grafica del feed** di Pizza a Portafoglio (export da Canva) | 1080×1080 (1:1) | 180 KB | Home: striscia contenuti (2ª) |
| Media | `assets/img/carosello-vero-falso.webp` | La prima slide di un **carosello "Vero/Falso"** del centro estetico | 1080×1350 (4:5) | 200 KB | Home: striscia contenuti (3ª); Caso Centro estetico (riquadro 4:5) |
| Media | `assets/img/shooting-food.webp` | Uno scatto dello **shooting di prodotto food** | 1080×1080 (1:1) | 180 KB | Home: striscia contenuti (5ª) |
| Media | `assets/img/stories-countdown.webp` | La **grafica stories del countdown** all'apertura (per la striscia va ritagliata in 4:5) | 1080×1350 (4:5) | 200 KB | Home: striscia contenuti (6ª) |
| Media | `assets/img/pizza-insight.webp` | **Screenshot degli insight** (Instagram > Statistiche, o Meta Business Suite) che mostri i numeri del caso: view, copertura. Nascondi dati personali | 1080×2280 (screenshot telefono) | 200 KB | Caso Pizza, terzo telefono |
| Media | `assets/img/negozio-insight.webp` | Screenshot degli insight del negozio (follower, engagement). ⚠ Coprire nome e foto profilo | 1080×2280 | 200 KB | Caso Negozio, terzo telefono |
| Media | `assets/img/estetico-insight.webp` | Screenshot degli insight del centro estetico (crescita follower). ⚠ Coprire nome e foto profilo | 1800×1200 (3:2, orizzontale: se lo screenshot è verticale, mettilo su uno sfondo neutro 3:2) | 250 KB | Caso Centro estetico, riquadro 3:2 |
| Bassa | `assets/img/pizza-frame-sketch.webp` | Un **fotogramma** di uno sketch dei titolari (fermo immagine dal reel) | 1080×1350 (4:5) | 200 KB | Caso Pizza, riquadro 4:5 |
| Bassa | `assets/img/negozio-frame-sketch.webp` | Un fotogramma di uno **sketch tra i due fratelli** | 1080×1350 (4:5) | 200 KB | Caso Negozio, riquadro 4:5 |

## 3. Video da preparare (`assets/video/`)

Formato per tutti: **MP4 (H.264), verticale 1080×1920, senza audio** (sul sito partono muti, in loop).
Durata **15–30 secondi**, peso **sotto 8 MB** (comando pronto in §5). Prendi i reel originali esportati da CapCut, non quelli scaricati da Instagram (che sono già compressi).

| Priorità | File (percorso esatto) | Cosa deve mostrare | Durata | Dove compare |
|---|---|---|---|---|
| **Alta** | `assets/video/showreel.mp4` | **Showreel**: montaggio dei lavori migliori 2023–2026 (reel, grafiche, shooting), ritmo veloce | **45–60 s** | Home, sezione Showreel, telefono grande |
| Media | `assets/video/reel-sketch-dialetto.mp4` | Reel di Pizza a Portafoglio: **sketch dei titolari in dialetto** (quello da 12K+ view) | 15–30 s | Home, Showreel, 2° telefono |
| Media | `assets/video/reel-romanesco.mp4` | Reel del negozio: **format comico in romanesco** | 15–30 s | Home, Showreel, 3° telefono |
| Media | `assets/video/reel-vero-falso.mp4` | Reel del centro estetico: **format Vero/Falso** | 15–30 s | Home, Showreel, 4° telefono |
| Media | `assets/video/pizza-reel-views.mp4` | Un reel di Pizza a Portafoglio in cui si vede il **contatore delle visualizzazioni** (registrazione schermo dal profilo) | 15–30 s | Caso Pizza, 1° telefono |
| Media | `assets/video/pizza-reel-backstage.mp4` | **Dietro le quinte** (preparazione dei contenuti o del locale) | 15–30 s | Caso Pizza, 2° telefono |
| Media | `assets/video/negozio-reel-sketch.mp4` | Uno **sketch tra fratelli** con il contatore delle view visibile | 15–30 s | Caso Negozio, 1° telefono |
| Media | `assets/video/negozio-reel-ruota.mp4` | Il format della **Ruota della Fortuna** | 15–30 s | Caso Negozio, 2° telefono |
| Media | `assets/video/estetico-reel-carosello.mp4` | Un **carosello educativo** animato o la registrazione dello scorrimento delle slide | 15–30 s | Caso Centro estetico, 1° telefono |
| Media | `assets/video/estetico-reel-before-after.mp4` | **Before/after con contesto** (problema, trattamento, sedute) | 15–30 s | Caso Centro estetico, 2° telefono |
| Media | `assets/video/estetico-reel-influencer.mp4` | Il **reel con l'influencer** che prova un trattamento | 15–30 s | Caso Centro estetico, 3° telefono |

---

## 4. Immagini di condivisione e icona (già pronte, sostituibili)

Queste sono già fatte con i colori e i font del sito. Sostituiscile solo se vuoi una versione diversa
(per esempio la foto di Giulia nell'anteprima della home quando sarà pronta).

| Priorità | File | Cosa mostra oggi | Dimensioni | Formato / peso | Dove compare |
|---|---|---|---|---|---|
| Bassa | `assets/img/og-home.jpg` | Fondo rosa, "Ciao, sono Giulia" + "Contenuti che riempiono i locali, non solo i feed." | **1200×630** esatti | JPG, max 200 KB | Anteprima del link della home su WhatsApp, LinkedIn, Facebook, Telegram… |
| Bassa | `assets/img/og-pizza.jpg` | Fondo rosso, "350+ persone in fila. Da zero follower." | 1200×630 | JPG, max 200 KB | Anteprima del link del caso Pizza |
| Bassa | `assets/img/og-negozio.jpg` | Fondo blu, "0→5.2K follower in 3 mesi. Tutto organico." | 1200×630 | JPG, max 200 KB | Anteprima del link del caso Negozio |
| Bassa | `assets/img/og-estetico.jpg` | Fondo rosa cipria, "+240% di follower in 4 mesi, educando invece di vendere." | 1200×630 | JPG, max 200 KB | Anteprima del link del caso Centro estetico |
| Bassa | `assets/img/og-galleria.jpg` | Fondo rosa, "Galleria di Giulia" + quattro post reali | 1200×630 | JPG, max 200 KB | Anteprima del link della galleria |
| Bassa | `favicon.svg` (cartella principale) | "G" crema su quadrato rosa arrotondato | vettoriale | SVG con la lettera già convertita in tracciato | Scheda del browser |
| Bassa | `favicon.ico` | Stessa icona | 16×16 + 32×32 | ICO | Browser vecchi |
| Bassa | `apple-touch-icon.png` | Stessa icona, quadrata senza angoli (iPhone li arrotonda da solo) | 180×180 | PNG senza trasparenza | iPhone: "Aggiungi a schermata Home" |
| Bassa | `icon-192.png`, `icon-512.png` | Stessa icona | 192×192, 512×512 | PNG | Android / "installa app" |

Nell'immagine di condivisione tieni le scritte importanti lontane dai bordi (circa 60 px): alcune app ritagliano i lati.
Dopo averla cambiata, i social possono mostrare ancora la vecchia per qualche giorno: per forzare l'aggiornamento usa
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) e [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

---

## 5. Come sostituire un asset

1. Prepara il file con le **dimensioni** e il **formato** indicati nella tabella.
2. Dagli **esattamente** il nome indicato (minuscole, trattini, estensione `.webp` / `.mp4` / `.jpg`).
3. Copialo nella cartella indicata **sovrascrivendo** quello che c'è (il sistema chiederà "Sostituisci?": sì).
4. Pubblica (commit + push): Netlify aggiorna il sito da solo in un minuto.

Non rinominare né spostare gli altri file, e non cancellare `_placeholder.webp` / `_placeholder.mp4`.

### Esportare un'immagine in WebP

- **Senza programmi**: [squoosh.app](https://squoosh.app) → trascina la foto → a destra scegli **WebP**, qualità **80**,
  in "Resize" metti la larghezza della tabella → "Download". Poi rinomina il file.
- **Da terminale** (`cwebp`):
  ```
  cwebp -q 80 -resize 1800 0 foto-originale.jpg -o assets/img/negozio-ruota.webp
  ```
  (`-resize 1800 0` = larghezza 1800, altezza proporzionale; per le copertine usa `2400 0`, per i post `1080 0`.)
- **Prima ritaglia** la foto nella proporzione giusta (3:2, 4:5, 1:1) con Foto/Canva/Lightroom: il sito riempie il riquadro e taglia ciò che sborda.

### Foto scontornata (hero di Giulia)

- Rimuovi lo sfondo (remove.bg, Canva "Rimuovi sfondo", Photoshop) ed esporta in **PNG con trasparenza**, 1400×2000.
- Poi convertila in WebP **mantenendo la trasparenza**:
  ```
  cwebp -q 85 -alpha_q 90 giulia-scontornata.png -o assets/img/hero-giulia.webp
  ```
  Su Squoosh la trasparenza resta automaticamente con WebP. Lascia un po' d'aria sopra la testa; i piedi/il busto possono toccare il bordo in basso.

### Video: MP4 verticale, muto, leggero

Da CapCut esporta in **1080p, 30 fps**, poi comprimi con `ffmpeg` (toglie l'audio, sistema il formato verticale, ottimizza per il web):

```
ffmpeg -i reel-originale.mp4 -an -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30" -c:v libx264 -preset slow -crf 26 -maxrate 2M -bufsize 4M -pix_fmt yuv420p -movflags +faststart assets/video/NOME.mp4
```

- Per accorciare: aggiungi `-ss 00:00:03 -t 25` dopo `-i reel-originale.mp4` (parte dal secondo 3, dura 25 s).
- Per lo **showreel** (45–60 s) usa `-maxrate 1M -bufsize 2M` per restare sotto gli 8 MB; se si vede troppo sgranato,
  sostituisci `scale=1080:1920…crop=1080:1920` con `scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280`.
- Controlla il peso finale: se supera 8 MB alza `-crf` (28, 30: più alto = più leggero).

---

## 6. Testi da scrivere

### FAQ — `js/content/faq.js`

Ci sono 6 domande segnaposto. Apri il file e sostituisci i testi tra apici:

```js
{
  it: { q: 'Lavori anche fuori Roma?', a: 'Sì: …' },
  en: { q: 'Do you work outside Rome?', a: 'Yes: …' }
},
```

- `q` = domanda, `a` = risposta (2–3 righe, possibilmente con un dato reale).
- Scrivi sia l'italiano (`it`) sia l'inglese (`en`). Se un testo contiene un apostrofo, scrivilo come `\'` (es. `'L\'agenzia'`) oppure usa l'apostrofo tipografico `’`.
- Per toglierne una cancella il blocco `{ … },`; la numerazione [01], [02]… si aggiorna da sola.
- Finché un testo inizia con `[` il sito lo mostra come segnaposto.

### Le 3 testimonianze dei casi studio

Una frase per ogni cliente, da chiedere al cliente stesso (con il suo permesso a pubblicarla):

| Caso | Chi | File | Testo segnaposto da sostituire |
|---|---|---|---|
| Pizza a Portafoglio | il titolare | `lavori/pizza-a-portafoglio.html` | `[testimonianza del titolare — 1 frase, da richiedere]` |
| Negozio di quartiere | i due titolari (senza nome del negozio) | `lavori/negozio-di-quartiere.html` | `[testimonianza dei titolari — 1 frase, da richiedere]` |
| Centro estetico | la titolare (senza nome del centro) | `lavori/centro-estetico.html` | `[testimonianza della titolare — 1 frase, da richiedere]` |

Cerca nel file il testo tra parentesi quadre e sostituiscilo con la frase vera. Serve anche la traduzione inglese:
va aggiunta in `js/lang/en.js` come `"frase italiana esatta": "English sentence",` (la frase italiana deve essere identica, carattere per carattere).
