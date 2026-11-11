/* =============================================================
   Testi inglesi del sito — window.GF_EN
   -------------------------------------------------------------
   COME FUNZIONA
   Ogni riga è   "testo italiano esatto": "English text",
   - A sinistra il testo italiano COSÌ COM'È NELLA PAGINA (stessa
     punteggiatura, apostrofo dritto ', frecce → ↓ ↑ ←, maiuscole).
     Gli spazi doppi e gli a capo non contano; "&nbsp;" conta come spazio.
   - Un testo diviso da un <span>, un <a> o un <br> è fatto di più
     pezzi: ogni pezzo ha la sua riga (es. "Prima che tu" e "lo chieda").
   - Le virgolette dentro un testo si scrivono \" (es. "La \"Ruota\"…").
   - Ogni riga finisce con la virgola (l'ultima del file può non averla).

   PER MODIFICARE UNA TRADUZIONE: cambia solo il testo a destra.
   SE CAMBI UN TESTO ITALIANO NELL'HTML: cambia anche la chiave a
   sinistra qui, altrimenti quel testo resta in italiano.
   PER AGGIUNGERE UN TESTO: aggiungi una riga nella sezione giusta.

   CONTROLLO: apri la pagina, console del browser → GF_I18N.missing()
   elenca i testi italiani senza traduzione.
   Le FAQ NON stanno qui: sono in js/content/faq.js.
   ============================================================= */
window.GF_EN = {

  /* ===== Comune: navigazione, menu, transizioni ===================== */
  "Vai al contenuto": "Skip to content",
  "Principale": "Main",
  "Lavori": "Work", "Metodo": "Method", "Percorso": "Background", "Contatti": "Contact",
  "Menu": "Menu", "Chiudi": "Close",
  "Chiudi il menu": "Close menu", "Apri il menu": "Open menu",
  "rispondo entro 24 ore": "I reply within 24 hours",
  "Caso studio": "Case study",
  "← Torna ai lavori": "← Back to work", "Torna ai lavori": "Back to work",
  "← Torna alla home": "← Back to home", "Torna alla home": "Back to home",
  "Galleria": "Gallery",
  /* etichette della transizione a cerchio (main.js → GF.pages) */
  "Negozio di quartiere": "Neighbourhood shop", "Centro estetico": "Aesthetics clinic",

  /* ===== <head>: titoli e descrizioni ================================ */
  /* home */
  "Giulia Fadlon — Social Media Manager a Roma": "Giulia Fadlon — Social Media Manager in Rome",
  "Social media manager a Roma dal 2023: strategia, reel, shooting e Meta Ads per attività locali. Contenuti che riempiono i locali, non solo i feed.": "Social media manager in Rome since 2023: strategy, reels, shoots and Meta Ads for local businesses. Content that fills venues, not just feeds.",
  /* galleria */
  "Galleria: grafiche, caroselli e shooting | Giulia Fadlon": "Gallery: graphics, carousels and shoots | Giulia Fadlon",
  "Grafiche, shooting e caroselli prodotti in prima persona da Giulia Fadlon per clienti food e beauty a Roma: i contenuti, come li ha visti il pubblico.": "Graphics, shoots and carousels produced hands-on by Giulia Fadlon for food and beauty clients in Rome: the content, as the audience saw it.",
  "Galleria — Giulia Fadlon, Social Media Manager": "Gallery — Giulia Fadlon, Social Media Manager",
  "Galleria dei contenuti prodotti da Giulia Fadlon: grafiche, caroselli, stories e shooting per clienti food e beauty a Roma.": "A gallery of content produced by Giulia Fadlon: graphics, carousels, stories and shoots for food and beauty clients in Rome.",
  /* caso pizza */
  "Pizza a Portafoglio: 350+ persone in fila | Giulia Fadlon": "Pizza a Portafoglio: 350+ people queuing | Giulia Fadlon",
  "Caso studio: lancio di una nuova pizzeria partendo da zero follower, dalla strategia pre-opening all'inaugurazione con 350+ persone in fila e 12K+ view in 48h.": "Case study: launching a new pizzeria from zero followers, from pre-opening strategy to an opening day with 350+ people queuing and 12K+ views in 48h.",
  "Pizza a Portafoglio — Caso studio | Giulia Fadlon": "Pizza a Portafoglio — Case study | Giulia Fadlon",
  "Caso studio Pizza a Portafoglio: lancio di una pizzeria da zero follower a 350+ persone in fila all'inaugurazione, 12K+ view organiche in 48 ore.": "Pizza a Portafoglio case study: launching a pizzeria from zero followers to 350+ people queuing on opening day, 12K+ organic views in 48 hours.",
  /* caso negozio */
  "Negozio di quartiere: 0→5.2K follower | Giulia Fadlon": "Neighbourhood shop: 0→5.2K followers | Giulia Fadlon",
  "Caso studio retail: sketch in dialetto romano tra due fratelli e la Ruota della Fortuna. 5.2K follower organici in 3 mesi su TikTok, Instagram e Facebook.": "Retail case study: Roman-dialect sketches between two brothers and the Wheel of Fortune. 5.2K organic followers in 3 months on TikTok, Instagram and Facebook.",
  "Negozio di quartiere — Caso studio | Giulia Fadlon": "Neighbourhood shop — Case study | Giulia Fadlon",
  "Caso studio Negozio di quartiere: da 0 a 5.2K follower organici in 3 mesi con sketch in dialetto romano, engagement all'8.5%.": "Neighbourhood shop case study: from 0 to 5.2K organic followers in 3 months with Roman-dialect sketches, 8.5% engagement.",
  /* caso estetico */
  "Centro estetico: +240% di follower in 4 mesi | Giulia Fadlon": "Aesthetics clinic: +240% followers in 4 months | Giulia Fadlon",
  "Caso studio beauty: contenuti educativi, case study reali, format Vero/Falso e collab influencer per un centro di estetica avanzata. +240% follower in 4 mesi.": "Beauty case study: educational content, real case studies, a True/False format and influencer collabs for an advanced-aesthetics clinic. +240% followers in 4 months.",
  "Centro estetico — Caso studio | Giulia Fadlon": "Aesthetics clinic — Case study | Giulia Fadlon",
  "Caso studio Centro estetico: +240% di follower in 4 mesi con contenuti educativi, case study reali e collaborazioni influencer.": "Aesthetics clinic case study: +240% followers in 4 months with educational content, real case studies and influencer collaborations.",

  /* ===== Home · hero ================================================= */
  "Ciao, sono": "Hi, I'm", "Ciao,": "Hi,", "sono": "I'm",
  "← SMM a Roma dal 2023": "← SMM in Rome since 2023", "↑ SMM a Roma": "↑ SMM in Rome", "parti da qui": "start here",
  "Contenuti che riempiono i locali, non solo i feed.": "Content that fills venues, not just feeds.",
  "foto: Giulia scontornata": "photo: Giulia, cut-out",
  "Guarda i lavori ↓": "See the work ↓", "Scarica il CV": "Download CV",

  /* ===== Home · fascia scorrevole ==================================== */
  "Strategia": "Strategy", "Shooting": "Shoots", "Grafiche": "Graphics", "Piano editoriale": "Editorial plan", "Report": "Reports",
  "SHOOTING": "SHOOTS", "STRATEGIA": "STRATEGY",

  /* ===== Home · numeri =============================================== */
  "i numeri, che poi è quello che volete sapere ↓": "the numbers, since that's what you want to know ↓",
  "persone in fila all'inaugurazione": "people queuing on opening day",
  "da zero follower": "from zero followers",
  "organici in 3 mesi": "organic in 3 months", "follower in 4 mesi": "followers in 4 months",
  "la media di settore? 1.2%": "industry average? 1.2%", "clienti gestiti": "clients managed",

  /* ===== Home · lavori (caos → elenco) =============================== */
  "troppa roba? ok, metto in ordine ↓": "too much? ok, let me tidy up ↓",
  "LAVORI": "WORK",
  "↑ tre casi studio, tre settori: food, retail, beauty": "↑ three case studies, three sectors: food, retail, beauty",
  "foto: fila all'inaugurazione": "photo: opening-day queue", "350+ IN FILA": "350+ QUEUING",
  "reel: format comico in romanesco / Ruota della Fortuna": "reel: Roman-dialect comedy format / Wheel of Fortune",
  "in 3 mesi, tutto organico": "in 3 months, all organic",
  "carosello educativo / before-after": "educational carousel / before-after",
  "educando invece di vendere": "teaching instead of selling",

  /* ===== Home · showreel e contenuti ================================= */
  "45 secondi di lavoro, prima di ogni parola.": "45 seconds of work, before any words.",
  "Una selezione dei contenuti prodotti tra il 2023 e il 2026.": "A selection of content produced between 2023 and 2026.",
  "video: showreel 45–60s — reel, grafiche, shooting": "video: 45–60s showreel — reels, graphics, shoots",
  "reel: sketch dei titolari in dialetto": "reel: owners' dialect sketch",
  "↑ 12K+ view in 48h": "↑ 12K+ views in 48h",
  "reel: format comico in romanesco": "reel: Roman-dialect comedy format",
  "reel: Vero/Falso, centro estetico": "reel: True/False, aesthetics clinic",
  "I contenuti, come li ha visti il pubblico.": "The content, as the audience saw it.",
  "Grafiche, shooting e caroselli prodotti in prima persona per clienti food e beauty. Ogni pezzo nasce da un formato ricorrente del piano editoriale, non da un template: è così che un feed diventa riconoscibile.": "Graphics, shoots and carousels produced hands-on for food and beauty clients. Each piece comes from a recurring format in the editorial plan, not from a template: that's how a feed becomes recognisable.",
  "scorri →": "scroll →",
  "grafica feed: Pizza a Portafoglio": "feed graphic: Pizza a Portafoglio",
  "carosello: format Vero/Falso": "carousel: True/False format",
  "shooting: prodotto food": "shoot: food product",
  "grafica stories: countdown apertura": "stories graphic: opening countdown",
  "Guarda tutte le foto →": "See all the photos →",
  /* descrizioni per screen reader (alt, aria-label) */
  "Showreel: video e reel": "Showreel: videos and reels",
  "Showreel: reel, grafiche e shooting": "Showreel: reels, graphics and shoots",
  "Reel: sketch dei titolari in dialetto": "Reel: the owners' dialect sketch",
  "Reel: format comico in romanesco": "Reel: Roman-dialect comedy format",
  "Reel: Vero/Falso per un centro estetico": "Reel: True/False for an aesthetics clinic",
  "Contenuti: grafiche, caroselli e shooting": "Content: graphics, carousels and shoots",
  "Carosello educativo sull'acido ialuronico, prima slide": "Educational carousel on hyaluronic acid, first slide",
  "Grafica per il feed di Pizza a Portafoglio": "Feed graphic for Pizza a Portafoglio",
  "Carosello in formato Vero/Falso per un centro estetico": "True/False carousel for an aesthetics clinic",
  "La fila all'inaugurazione di Pizza a Portafoglio": "The opening-day queue at Pizza a Portafoglio",
  "Shooting di un prodotto food": "Food product shoot",
  "Grafica stories con il countdown all'apertura": "Stories graphic with the opening countdown",

  /* ===== Home · metodo =============================================== */
  "Il metodo": "The method",
  "Tre fasi, ogni volta. Con una prova per ciascuna.": "Three phases, every time. Each with proof.",
  "Strategia e piano editoriale": "Strategy and editorial plan",
  "Posizionamento, tono di voce e formati ricorrenti costruiti sull'identità del cliente, non su template.": "Positioning, tone of voice and recurring formats built on the client's identity, not on templates.",
  "Consegno: analisi competitor, posizionamento, piano editoriale e calendario mensile.": "Deliverables: competitor analysis, positioning, editorial plan and monthly calendar.",
  "la prova ↓": "the proof ↓",
  /* "Il titolare in dialetto: [350+] in fila" */
  "Il titolare in dialetto:": "The owner in dialect:", "in fila": "queuing",
  "Produzione contenuti": "Content production",
  "Reel, grafiche, shooting e copy: giro con il set in borsa e produco dove il contenuto succede.": "Reels, graphics, shoots and copy: I carry the set in my bag and produce where content happens.",
  "Consegno: reel montati, grafiche feed e stories, shooting sul posto, copy.": "Deliverables: edited reels, feed and stories graphics, on-site shoots, copy.",
  "view organiche in 48 ore": "organic views in 48h",
  "Adv e analisi": "Ads and analytics",
  "Meta Ads, A/B testing e report mensili: ogni scelta creativa risponde a un numero.": "Meta Ads, A/B testing and monthly reports: every creative choice answers to a number.",
  "Consegno: setup campagne, A/B test creativi, report mensile con azioni.": "Deliverables: campaign setup, creative A/B tests, monthly report with actions.",
  "vs 1.2% di settore": "vs 1.2% industry",
  "il ciclo con ogni cliente:": "the cycle with every client:",
  "Audit e obiettivi": "Audit and goals", "Piano 90 giorni": "90-day plan", "Produzione settimanale": "Weekly production", "Report mensile": "Monthly report",

  /* ===== Home · percorso ============================================= */
  "Il percorso": "Background",
  "Esperienza, formazione, strumenti": "Experience, education, tools",
  "anni in agenzia": "years at an agency", "settori: food, retail, beauty": "sectors: food, retail, beauty", "certificazioni": "certifications",
  "Esperienza": "Experience", "Social Media Manager · in agenzia": "Social Media Manager · agency", "2023 — oggi": "2023 — present",
  "8 clienti dell'agenzia in food, retail e beauty, tra cui Pizza a Portafoglio e un centro di estetica avanzata. Strategia, produzione e adv end-to-end.": "8 agency clients across food, retail and beauty, including Pizza a Portafoglio and an advanced-aesthetics clinic. End-to-end strategy, production and ads.",
  "→ retention media: 12+ mesi per cliente": "→ avg retention: 12+ months per client",
  "Formazione e certificazioni": "Education and certifications",
  "Diploma Tecnico in Marketing": "Technical Diploma in Marketing",
  /* "… Diplomata con votazione [96/100]." */
  "Istituto tecnico, indirizzo Marketing · 2023. Diplomata con votazione": "Technical institute, Marketing track · 2023. Graduated with",
  "Strumenti per fase di lavoro": "Tools by phase", "Pianifico": "Plan", "Produco": "Produce", "Misuro": "Measure",
  "Meta Ads Manager, report mensili": "Meta Ads Manager, monthly reports",

  /* ===== Home · FAQ (titolo; domande e risposte sono in js/content/faq.js) */
  "Prima che tu": "Before you", "lo chieda": "ask", "(tanto lo chiedi)": "(you will anyway)",
  "[Domanda — da scrivere]": "[Question — to be written]",
  "[risposta — 2-3 righe con un dato reale, da scrivere]": "[answer — 2-3 lines with a real figure, to be written]",

  /* ===== Home · contatti (footer) ==================================== */
  "Parliamone.": "Let's talk.",
  "Sono Giulia, romana. Da tre anni gestisco in agenzia i social di attività locali, producendo tutto in prima persona. Cerco una nuova agenzia dove portare questo metodo su brand più grandi: se cercate una SMM che produce e misura, scrivetemi — rispondo entro 24 ore.": "I'm Giulia, based in Rome. For three years I've managed local businesses' social media at an agency, producing everything hands-on. I'm looking for a new agency where this method can scale to bigger brands: if you need an SMM who produces and measures, drop me a line — I reply within 24 hours.",
  "+39 320 241 6567 · Roma, Italia": "+39 320 241 6567 · Rome, Italy",

  /* ===== Casi studio · parti comuni ================================== */
  "La sfida": "The challenge", "Contenuti": "Content", "Risultato": "Result",
  "e alla fine, i numeri ↓": "and in the end, the numbers ↓", "Prossimo caso →": "Next case →",
  "screenshot insight": "insights screenshot",
  "Esempi di contenuti, scorrimento orizzontale": "Content examples, horizontal scroll",

  /* ===== Caso 01 · Pizza a Portafoglio =============================== */
  "Caso studio 01 · Instagram · Food & Beverage": "Case study 01 · Instagram · Food & Beverage",
  "350+ persone": "350+ people", "in fila.": "queuing.", "Da zero follower.": "From 0 followers.",
  "Lancio completo di una nuova pizzeria: dalla strategia pre-opening ai contenuti virali, fino all'inaugurazione con 350+ persone in fila.": "Full launch of a new pizzeria: from pre-opening strategy to viral content, ending with 350+ people queuing on opening day.",
  "foto copertina: fila all'inaugurazione": "cover photo: opening-day queue",
  "↑ la fila, quella vera": "↑ the queue, the real one",
  "Creare hype per un ristorante che ancora non esiste": "Building hype for a restaurant that didn't exist yet",
  "Il titolare stava aprendo una nuova pizzeria e aveva bisogno di creare aspettativa prima dell'apertura. Si partiva da zero: nessun follower, nessun contenuto, nessuna reputazione online. L'obiettivo: fare in modo che il giorno dell'inaugurazione ci fosse la fila fuori.": "The owner was opening a new pizzeria and needed anticipation before launch. We started from zero: no followers, no content, no online reputation. The goal: a queue outside on opening day.",
  "Tre fasi per un lancio esplosivo": "Three phases for an explosive launch",
  "Pre-lancio": "Pre-launch", "Lancio": "Launch",
  "Teaser sui lavori in corso, dietro le quinte e personalità del titolare, per far nascere la domanda \"ma quando apre?\".": "Teasers from the building works, behind the scenes and the owner's personality, planting the question \"so when does it open?\".",
  "Massima esposizione il giorno dell'apertura: copertura live, stories in tempo reale, countdown e contenuti sulla fila e l'entusiasmo dei primi clienti.": "Maximum exposure on opening day: live coverage, real-time stories, countdowns and content showing the queue and the first customers' excitement.",
  "Mantenere il momentum: contenuti regolari sulla quotidianità del locale, recensioni dei clienti e momenti migliori, trasformando i visitatori in community.": "Keeping the momentum: regular content on daily life at the pizzeria, customer reviews and best moments, turning visitors into a community.",
  "Video in dialetto, ironia e il titolare come protagonista": "Dialect videos, irony and the owner as the star",
  "Il cuore della strategia era il titolare stesso: video in dialetto napoletano, tono ironico e spontaneo, interazioni genuine con i clienti. Non contenuti patinati, ma autentici e riconoscibili.": "The heart of the strategy was the owner himself: Neapolitan-dialect videos, an ironic, spontaneous tone, genuine interactions with customers. Not polished content — authentic and recognisable.",
  "reel: view count visibile": "reel: visible view count",
  "frame: sketch dei titolari": "frame: owners' sketch video",
  "persone in fila al debutto": "people queuing at the launch", "view organiche in 48h": "organic views in 48h", "di adv: 100% organico": "ad spend: 100% organic",
  "Inaugurazione sold-out con 350+ persone in fila e 12K+ view organiche nelle prime 48 ore — partendo da un profilo creato da zero.": "A sold-out opening with 350+ people queuing and 12K+ organic views in the first 48 hours — starting from a profile created from scratch.",
  "[testimonianza del titolare — 1 frase, da richiedere]": "[owner's testimonial — 1 sentence, to request]",
  /* descrizioni per screen reader (alt, aria-label) */
  "La fila di persone davanti a Pizza a Portafoglio il giorno dell'inaugurazione": "The queue of people outside Pizza a Portafoglio on opening day",
  "Reel di Pizza a Portafoglio con il numero di visualizzazioni": "Pizza a Portafoglio reel showing the view count",
  "Video dietro le quinte della pizzeria prima dell'apertura": "Behind-the-scenes video of the pizzeria before opening",
  "Screenshot degli insight di Instagram di Pizza a Portafoglio": "Screenshot of Pizza a Portafoglio's Instagram insights",
  "Fotogramma di uno sketch con i titolari della pizzeria": "Still from a sketch with the pizzeria's owners",
  "La fila di persone fuori dalla pizzeria all'inaugurazione": "The queue outside the pizzeria on opening day",
  "Prossimo caso: Negozio di quartiere": "Next case: Neighbourhood shop",

  /* ===== Caso 02 · Negozio di quartiere ============================== */
  "Caso studio 02 · TikTok + Instagram + Facebook · Retail": "Case study 02 · TikTok + Instagram + Facebook · Retail",
  "0→5.2K follower": "0→5.2K followers", "in 3 mesi.": "in 3 months.", "Tutto organico.": "All organic.",
  "Da zero a community affezionata su tre piattaforme: contenuti in dialetto romano, sketch tra fratelli e format virali che hanno trasformato un negozio di quartiere in un fenomeno social. Nome protetto da riservatezza.": "From zero to a loyal community across three platforms: Roman-dialect content, sketches between brothers and viral formats that turned a neighbourhood shop into a social phenomenon. Name withheld for confidentiality.",
  "foto copertina: i fratelli titolari nel negozio": "cover photo: the owner brothers in the shop",
  "↑ i due fratelli": "↑ the two brothers",
  "Far emergere un negozio di quartiere nel rumore dei social": "Making a neighbourhood shop stand out in the social noise",
  "Un negozio di articoli vari gestito da due fratelli di origine asiatica, in un quartiere romano. Nessuna presenza social, nessuna community, nessun motivo apparente per cui qualcuno dovesse seguirli online. La sfida: trovare l'angolo giusto per renderli unici e memorabili su tre piattaforme contemporaneamente.": "A variety store run by two brothers of Asian origin, in a Roman neighbourhood. No social presence, no community, no apparent reason to follow them online. The challenge: finding the right angle to make them unique and memorable across three platforms at once.",
  "Il contrasto culturale come leva creativa": "Cultural contrast as a creative lever",
  "L'identità unica": "A unique identity", "Sketch tra fratelli": "Sketches between brothers", "Format ricorrenti": "Recurring formats",
  "Titolari asiatici con accento romano: un contrasto che genera curiosità, simpatia e condivisione, diventato il fil rouge di tutta la comunicazione.": "Asian owners with a Roman accent: a contrast that sparks curiosity, warmth and shares — the thread running through all communication.",
  "Video comici sulle dinamiche quotidiane tra i due titolari: battibecchi, scherzi, momenti di lavoro. Il pubblico si affeziona alle persone, non al negozio.": "Comedy videos on the daily dynamics between the two owners: bickering, pranks, work moments. People grow attached to people, not to the shop.",
  "La \"Ruota della Fortuna\": i clienti girano la ruota per vincere sconti e premi. Genera partecipazione, contenuti spontanei e un motivo concreto per visitare il negozio.": "The \"Wheel of Fortune\": customers spin to win discounts and prizes. It drives participation, spontaneous content and a concrete reason to visit the shop.",
  "Intrattenimento puro che vende senza vendere": "Pure entertainment that sells without selling",
  "Intrattenere prima, vendere poi: i prodotti non venivano quasi mai mostrati direttamente. Erano le persone, le situazioni comiche e i format interattivi a portare visibilità e traffico, con ogni contenuto adattato a TikTok, Instagram e Facebook.": "Entertain first, sell later: products were almost never shown directly. People, comic situations and interactive formats drove visibility and traffic, with every piece adapted for TikTok, Instagram and Facebook.",
  "sketch: view count visibile": "sketch: visible view count", "ruota della fortuna": "wheel of fortune",
  "frame: sketch tra fratelli": "frame: sketch between brothers",
  "foto: clienti alla Ruota della Fortuna": "photo: customers at the Wheel of Fortune",
  "follower in 3 mesi, 100% organico": "followers in 3 months, 100% organic",
  "engagement rate (settore: 1.2%)": "engagement rate (industry: 1.2%)",
  "piattaforme coordinate": "platforms coordinated",
  "5.2K follower organici in 3 mesi, engagement al 8.5% e clienti che entrano in negozio dicendo \"vi ho visti su TikTok\".": "5.2K organic followers in 3 months, 8.5% engagement and customers walking in saying \"I saw you on TikTok\".",
  "[testimonianza dei titolari — 1 frase, da richiedere]": "[owners' testimonial — 1 sentence, to request]",
  /* descrizioni per screen reader (alt, aria-label) */
  "I due fratelli titolari dietro il bancone del loro negozio": "The two owner brothers behind the counter of their shop",
  "Sketch comico tra i due fratelli titolari, con il numero di visualizzazioni": "Comedy sketch between the two owner brothers, showing the view count",
  "Video della Ruota della Fortuna: i clienti girano la ruota per vincere sconti": "Wheel of Fortune video: customers spin the wheel to win discounts",
  "Screenshot degli insight del profilo del negozio": "Screenshot of the shop profile's insights",
  "Fotogramma di uno sketch tra i due fratelli titolari": "Still from a sketch between the two owner brothers",
  "Clienti del negozio che girano la Ruota della Fortuna": "Shop customers spinning the Wheel of Fortune",
  "Prossimo caso: Centro estetico": "Next case: Aesthetics clinic",

  /* ===== Caso 03 · Centro estetico =================================== */
  "Caso studio 03 · Instagram · Beauty": "Case study 03 · Instagram · Beauty",
  "+240% di follower": "+240% followers", "in 4 mesi,": "in 4 months,", "educando invece": "by teaching,", "di vendere.": "not selling.",
  "Contenuti educativi e professionali per un centro di estetica avanzata: case study reali, recensioni autentiche, collaborazioni influencer e myth-busting per costruire autorità e fiducia. Nome protetto da riservatezza.": "Educational, professional content for an advanced-aesthetics clinic: real case studies, authentic reviews, influencer collaborations and myth-busting to build authority and trust. Name withheld for confidentiality.",
  "foto copertina: la titolare al lavoro": "cover photo: the owner at work",
  "↑ la titolare": "↑ the owner",
  "Distinguersi in un settore saturo di contenuti superficiali": "Standing out in a sector saturated with shallow content",
  "L'estetica su Instagram è dominata da before/after senza contesto e promesse esagerate. La sfida: posizionare il centro come autorità dell'estetica avanzata, con un linguaggio professionale ma accessibile, educando il pubblico e costruendo fiducia reale.": "Aesthetics on Instagram is dominated by context-free before/afters and inflated promises. The challenge: positioning the clinic as an authority in advanced aesthetics, professional yet accessible, educating the audience and building real trust.",
  "Educare per vendere, senza vendere": "Educate to sell, without selling",
  "Contenuti educativi": "Educational content", "Case study reali": "Real case studies", "Recensioni e social proof": "Reviews and social proof",
  "Reel e caroselli che spiegano trattamenti, ingredienti e tecniche in modo chiaro: il pubblico impara qualcosa di concreto e riconosce la competenza del centro.": "Reels and carousels explaining treatments, ingredients and techniques clearly: the audience learns something concrete and recognises the clinic's expertise.",
  "Before/after con contesto: il problema della cliente, il trattamento scelto, quante sedute e perché. Non solo risultati, ma il ragionamento dietro.": "Before/afters with context: the client's problem, the chosen treatment, how many sessions and why. Not just results — the reasoning behind them.",
  "Testimonianze reali delle clienti, video e testuali: le esperienze autentiche costruiscono fiducia più di qualsiasi copy pubblicitario.": "Real client testimonials, in video and text: authentic experiences build trust better than any ad copy.",
  "Un mix calibrato di formati e toni": "A calibrated mix of formats and tones",
  "La comunicazione alterna tono professionale e momenti umani, con la titolare come volto esperto: myth-busting \"Vero o Falso\", formato problema-soluzione e collaborazioni con influencer che provano davvero i trattamenti.": "The communication alternates a professional tone with human moments, with the owner as the expert face: \"True or False\" myth-busting, problem-solution formats and collaborations with influencers who genuinely try the treatments.",
  "carosello educativo": "educational carousel", "before/after con contesto": "before/after with context", "reel con influencer": "influencer reel",
  "crescita follower in 4 mesi": "follower growth in 4 months",
  "collab influencer, ROI positivo": "influencer collabs, positive ROI",
  "Vero/Falso": "True/False",
  "il format a più alto engagement": "the highest-engagement format",
  "+240% di follower in 4 mesi e clienti che arrivano già informate e fiduciose: meno obiezioni, più valore per cliente.": "+240% followers in 4 months and clients arriving already informed and confident: fewer objections, higher value per client.",
  "[testimonianza della titolare — 1 frase, da richiedere]": "[owner's testimonial — 1 sentence, to request]",
  /* descrizioni per screen reader (alt, aria-label) */
  "La titolare del centro estetico al lavoro durante un trattamento": "The clinic's owner at work during a treatment",
  "Reel educativo che spiega un trattamento estetico": "Educational reel explaining an aesthetic treatment",
  "Reel before/after di una cliente, con problema, trattamento e numero di sedute": "Before/after reel of a client, with the problem, the treatment and the number of sessions",
  "Reel con un'influencer che prova un trattamento del centro": "Reel with an influencer trying one of the clinic's treatments",
  "Slide di un carosello del format Vero o Falso sui trattamenti estetici": "Slide from a True or False carousel on aesthetic treatments",
  "Screenshot degli insight di Instagram del centro estetico": "Screenshot of the clinic's Instagram insights",
  "Prossimo caso: Pizza a Portafoglio": "Next case: Pizza a Portafoglio",

  /* ===== Galleria ==================================================== */
  "Tutti i contenuti,": "All the content,", "in un posto solo.": "in one place.",
  "grafiche, shooting e caroselli per clienti food e beauty ↓": "graphics, shoots and carousels for food and beauty clients ↓",
  "Post": "Posts",
  "Grafiche, shooting e design del feed": "Graphics, shoots and feed design",
  /* didascalie: tipo · settore */
  "Grafica feed": "Feed graphic", "Shooting food + copy": "Food shoot + copy", "Grafica promo": "Promo graphic",
  "Design del feed": "Feed design", "Annuncio servizio": "Service announcement", "Grafica evento": "Event graphic",
  "Ristorazione · Aperture festive": "Restaurants · Holiday opening",
  "Ristorazione · Piatto del menu": "Restaurants · Menu dish",
  "Ristorazione · Coupon regalo": "Restaurants · Gift voucher",
  "Hamburgeria · Identità visiva": "Burger bar · Visual identity",
  "Beauty · Giftcard di Natale": "Beauty · Christmas gift cards",
  "Ristorazione · Piatti e clienti": "Restaurants · Dishes and customers",
  "Ristorazione · Buoni pasto": "Restaurants · Meal vouchers",
  "Ristorazione · Promo compleanno": "Restaurants · Birthday promo",
  /* descrizioni delle immagini (alt) */
  "Grafica per le feste: calendario di dicembre 2025 con il 25 cerchiato e la scritta Oggi 25 dicembre aperti a pranzo": "Holiday graphic: a December 2025 calendar with the 25th circled and the words Open for lunch today, 25 December",
  "Forchettata di spaghetti al pomodoro con un pomodorino, su fondo bordeaux con la scritta Gusto unico e deciso": "A forkful of spaghetti with tomato sauce and a cherry tomato, on a burgundy background with the words A unique, bold flavour",
  "Grafica natalizia di una trattoria: coupon valido per una cena e la scritta Scegli un regalo di Natale super gustoso": "Christmas graphic for a trattoria: a voucher for one dinner and the words Choose a super-tasty Christmas gift",
  "Griglia del feed di un'hamburgeria: burger con pane nero, carne alla piastra, insegna al neon e una ragazza che addenta un panino": "Feed grid for a burger bar: a black-bun burger, griddled meat, a neon sign and a girl biting into a burger",
  "Grafica natalizia di un centro estetico: giftcard Silver, Gold e Platinum con la scritta A Natale regala bellezza": "Christmas graphic for an aesthetics clinic: Silver, Gold and Platinum gift cards with the words This Christmas, give beauty",
  "Griglia del feed di un ristorante: spaghetti alla puttanesca, fettuccine e supplì con i galluzzi, la sala e clienti a tavola": "Feed grid for a restaurant: spaghetti alla puttanesca, fettuccine and supplì with galluzzi, the dining room and customers at their tables",
  "Annuncio di una pizzeria: Hai diritto ai buoni pasto? Da oggi puoi spenderli anche da noi, con pizze a portafoglio e due ticket illustrati": "Pizzeria announcement: Entitled to meal vouchers? From today you can spend them here too, with folded pizzas and two illustrated vouchers",
  "Grafica per il compleanno del titolare di una pizzeria: calendario con il giorno cerchiato, un megafono e la scritta Scopri la promo valida solo oggi": "Graphic for a pizzeria owner's birthday: a calendar with the day circled, a megaphone and the words Discover the today-only promo",
  /* carosello */
  "Carosello educativo · Beauty": "Educational carousel · Beauty",
  "Ingredient focus: acido ialuronico": "Ingredient focus: hyaluronic acid",
  "Carosello sull'acido ialuronico, 5 slide, scorrimento orizzontale": "Hyaluronic acid carousel, 5 slides, horizontal scroll",
  "Copertina del carosello: Ingredient focus, acido ialuronico, su una texture di gel trasparente": "Carousel cover: Ingredient focus, hyaluronic acid, on a clear gel texture",
  "Slide 2: l'acido ialuronico è un polisaccaride naturale presente nel tessuto cutaneo e agisce come una spugna d'acqua": "Slide 2: hyaluronic acid is a natural polysaccharide found in skin tissue that works like a water sponge",
  "Slide 3: composizione chimica dell'acido ialuronico, un polimero lineare altamente idratante": "Slide 3: the chemical make-up of hyaluronic acid, a highly hydrating linear polymer",
  "Slide 4: le tipologie di acido ialuronico, a basso e alto peso molecolare e cross-linked": "Slide 4: the types of hyaluronic acid: low and high molecular weight, and cross-linked",
  "Slide 5: post-it con l'invito a salvare il post e la domanda E tu, quale forma preferisci nella tua routine?": "Slide 5: a sticky note inviting you to save the post and asking And you, which form do you prefer in your routine?",
  /* chiusura */
  "Le storie dietro i numeri →": "The stories behind the numbers →",
  "I casi studio": "The case studies",

  /* ===== Uguali in inglese =========================================
     Nomi propri e parole già inglesi: restano identici. Sono qui solo
     perché GF_I18N.missing() non li segnali. */
  "Giulia Fadlon": "Giulia Fadlon", "Giulia": "Giulia", "Pizza a Portafoglio": "Pizza a Portafoglio",
  "Instagram": "Instagram", "TikTok": "TikTok", "Facebook": "Facebook", "LinkedIn": "LinkedIn",
  "Meta Ads": "Meta Ads", "META ADS": "META ADS", "Reel": "Reel", "REEL": "REEL", "Copy": "Copy", "COPY": "COPY",
  "Showreel": "Showreel", "Engagement": "Engagement", "engagement": "engagement", "Community": "Community",
  "behind the scenes": "behind the scenes", "Lingua / Language": "Lingua / Language", "Lingua / Language:": "Language / Lingua:",
  "Meta Blueprint": "Meta Blueprint", "Digital Marketing Associate · 2023": "Digital Marketing Associate · 2023",
  "Google Analytics": "Google Analytics", "GA4 Certification · 2024": "GA4 Certification · 2024",
  "HubSpot": "HubSpot", "Social Media Marketing · 2023": "Social Media Marketing · 2023",
  "Media Planning Professional · 2024": "Media Planning Professional · 2024",
  "Meta Business Suite, GA4": "Meta Business Suite, GA4", "Canva Pro, Adobe Express, CapCut": "Canva Pro, Adobe Express, CapCut",
  "[Instagram] →": "[Instagram] →", "[TikTok + IG + FB] →": "[TikTok + IG + FB] →",
  "© 2026 Giulia Fadlon": "© 2026 Giulia Fadlon",

  /* ---------- Pagina 404 ---------- */
  "Pagina non trovata | Giulia Fadlon": "Page not found | Giulia Fadlon",
  "La pagina che cercavi non esiste. Torna alla home del portfolio di Giulia Fadlon, social media manager a Roma.": "The page you were looking for doesn't exist. Head back to the portfolio of Giulia Fadlon, social media manager in Rome.",
  "Qui non c'è niente.": "Nothing to see here.",
  "ma i lavori sono di là →": "but the work is over there →",
  "Guarda i lavori": "See the work"
};
