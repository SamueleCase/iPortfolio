/* ==========================================================================
   GALLERIA "I MIEI LAVORI"  —  file da aggiornare per aggiungere/togliere foto
   ==========================================================================

   DOVE FINISCONO LE FOTO DI QUESTO ELENCO

   - Le PRIME 9 appaiono nella home (index.html), nella griglia della sezione
     "I miei lavori". Sono la vetrina: tienici i lavori migliori.
   - TUTTE quante appaiono nella pagina galleria (galleria.dc.html), quella
     che si apre con il pulsante "Guarda tutte le foto".
   - Quindi dalla decima in poi si vedono solo nella pagina galleria.
     Per cambiare la vetrina basta spostare un blocco più in alto o più in
     basso in questo elenco.

   COME AGGIUNGERE UNA FOTO (3 passaggi)

   1. Metti il file immagine dentro la cartella  assets/post/
      Nomi consigliati: post-10.jpg, post-11.png ... (senza spazi né accenti)

   2. Qui sotto copia un blocco { ... } esistente, incollalo nella posizione
      in cui vuoi che appaia e cambia i quattro campi:

        file    -> il percorso del file, es. "assets/post/post-10.jpg"
        it      -> l'etichetta in italiano (il FORMATO del contenuto)
        en      -> la stessa etichetta in inglese
        metaIt  -> settore e argomento in italiano, es. "Beauty · Giftcard"
        metaEn  -> lo stesso in inglese

   3. Salva il file e ricarica la pagina. Fine.

   REGOLE UTILI
   - L'ordine dei blocchi è l'ordine in cui appaiono nella griglia
     (si legge da sinistra a destra, riga per riga, come su Instagram).
   - Ogni blocco va separato da una virgola. L'ultimo può averla o no.
   - Le immagini vengono ritagliate a quadrato partendo dal centro.
     Se una foto è molto larga o molto alta e il ritaglio la rovina,
     aggiungi al suo blocco:   fit: "contain"
     così viene mostrata intera, senza tagli.
   - Tieni almeno 9 foto in elenco: sono quelle che riempiono la griglia 3x3
     della home. Sopra le 9 puoi aggiungerne quante vuoi, la pagina galleria
     si allunga da sola.
   - Per togliere una foto basta cancellare il suo blocco { ... } per intero.
   ========================================================================== */

window.GF_GALLERY = [

  {
    file:   "assets/post/post-01.jpg",
    it:     "Grafica feed",
    en:     "Feed graphic",
    metaIt: "Ristorazione · Aperture festive",
    metaEn: "Restaurant · Holiday openings"
  },
  {
    file:   "assets/post/post-02.png",
    it:     "Shooting food + copy",
    en:     "Food shoot + copy",
    metaIt: "Ristorazione · Piatto del menu",
    metaEn: "Restaurant · Menu dish"
  },
  {
    file:   "assets/post/post-03.png",
    it:     "Grafica promo",
    en:     "Promo graphic",
    metaIt: "Ristorazione · Coupon regalo",
    metaEn: "Restaurant · Gift coupon"
  },
  {
    file:   "assets/post/post-04.jpg",
    it:     "Design del feed",
    en:     "Feed design",
    metaIt: "Hamburgeria · Identità visiva",
    metaEn: "Burger brand · Visual identity"
  },
  {
    file:   "assets/post/post-05.png",
    it:     "Grafica promo",
    en:     "Promo graphic",
    metaIt: "Beauty · Giftcard di Natale",
    metaEn: "Beauty · Christmas gift cards"
  },
  {
    file:   "assets/post/post-06.png",
    it:     "Design del feed",
    en:     "Feed design",
    metaIt: "Ristorazione · Piatti e clienti",
    metaEn: "Restaurant · Dishes and guests"
  },
  {
    file:   "assets/post/post-07.png",
    it:     "Annuncio servizio",
    en:     "Service announcement",
    metaIt: "Ristorazione · Buoni pasto",
    metaEn: "Restaurant · Meal vouchers"
  },
  {
    file:   "assets/post/post-08.png",
    it:     "Grafica evento",
    en:     "Event graphic",
    metaIt: "Ristorazione · Promo compleanno",
    metaEn: "Restaurant · Birthday promo"
  },
  {
    file:   "assets/post/post-09.jpg",
    it:     "Carosello educativo",
    en:     "Educational carousel",
    metaIt: "Beauty · Acido ialuronico",
    metaEn: "Beauty · Hyaluronic acid",
    fit:    "contain"
  }

];
