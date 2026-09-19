# Campagna Meta (Facebook + Instagram) — Corsi AI Roma

**Obiettivo primario:** raccogliere lead qualificati per il workshop gratuito.
**Obiettivo secondario:** riempire le edizioni a pagamento e individuare volontari.

---

## 1. Struttura account

```
CAMPAGNA A — Lead (obiettivo: Lead / conversioni "Contatto")   ~70% budget
├── Adset A1 — Professionisti & PMI Roma
├── Adset A2 — Studenti e giovani 20-30 Roma
└── Adset A3 — Volontari / terzo settore / maker

CAMPAGNA B — Retargeting (conversioni)                          ~20% budget
└── Adset B1 — Video 25%+ / visitatori landing 30gg / engagement IG-FB

CAMPAGNA C — Notorietà locale (video views / copertura)         ~10% budget
└── Adset C1 — Roma 25 km, video formativi brevi
```

Nota: partire con **Advantage+ audience** e lasciare a Meta ampia libertà; i tre adset
servono soprattutto per messaggi creativi diversi, non per segmentare in modo rigido.

---

## 2. Targeting

**Geografia:** Roma + 25 km (per il formato online: tutta Italia, budget separato).
**Età:** 24-55 (A1), 20-32 (A2), 25-50 (A3).
**Lingua:** italiano.

**Interessi di partenza (poi ampliare):**
- A1: piccola impresa, marketing digitale, produttività, LinkedIn, imprenditoria, commercialisti/consulenti
- A2: università romane (Sapienza, Roma Tre, Tor Vergata, LUISS), ricerca lavoro, formazione online
- A3: volontariato, terzo settore, open source, coding, startup, makerspace

**Esclusioni:** chi ha già inviato il form (custom audience), dipendenti/collaboratori.

---

## 3. Formati creativi

| Priorità | Formato | Uso |
|---|---|---|
| 1 | Reel verticale 15-30s | Volto che parla + demo a schermo. Il formato che rende di più |
| 2 | Video demo 45-60s | Costruzione di un'automazione in tempo reale |
| 3 | Immagine singola con testo forte | Test rapido degli angoli di comunicazione |
| 4 | Carosello 4-5 slide | I moduli del corso / prima-dopo |

Regola: **almeno 4 creatività attive per adset**, ricambio ogni 10-14 giorni.
La creatività pesa più del targeting.

---

## 4. Angoli di comunicazione da testare

1. **Tempo** — "Quante ore a settimana perdi in cose che l'AI farebbe in 2 minuti?"
2. **Paura di restare indietro** — "A Roma chi usa l'AI bene sta già lavorando la metà."
3. **Concretezza** — "Non un corso teorico: esci con 3 automazioni che funzionano."
4. **Community/volontariato** — "Cerchiamo 10 persone a Roma che vogliano costruire con l'AI."
5. **Gratuito/accessibile** — "Workshop gratuito, 2 ore, posti limitati."

---

## 5. Testi pronti

### Ad 1 — Angolo tempo (freddo, A1)
> Ogni settimana perdi ore in email, preventivi, report e post.
>
> Nel workshop gratuito di 2 ore a Roma ti mostriamo dal vivo come automatizzare
> quelle attività con l'intelligenza artificiale. Niente teoria: costruiamo insieme,
> davanti a te, tre automazioni reali.
>
> 📍 Roma — posti limitati a 16 persone
> 🎁 Partecipazione gratuita
>
> Lascia i tuoi dati, ti scriviamo con data e luogo. 👇
>
> **CTA: Iscriviti**

### Ad 2 — Angolo volontari (A3)
> Cerchiamo persone a Roma che non vogliano solo *imparare* l'AI, ma usarla per
> costruire qualcosa.
>
> Dopo il percorso formativo selezioniamo un piccolo gruppo di volontari per
> lavorare su progetti reali: associazioni, piccole imprese del quartiere,
> strumenti open. Mentoring incluso, portfolio vero alla fine.
>
> Se hai 4-5 ore a settimana e voglia di metterti in gioco, scrivici.
>
> **CTA: Scopri di più**

### Ad 3 — Angolo studenti (A2)
> Il tuo curriculum dice "conoscenza base di ChatGPT"? Non basta più.
>
> Workshop gratuito a Roma: 2 ore, pratico, e ti resta un progetto da mostrare
> ai colloqui. Tariffa agevolata sul percorso completo per studenti.
>
> **CTA: Prenota il posto**

### Ad 4 — Prova sociale (retargeting B1)
> "Pensavo di sapere usare l'AI. Dopo due incontri ho automatizzato la
> rendicontazione che mi prendeva mezza giornata a settimana."
>
> La prossima edizione a Roma parte tra poche settimane. Posti limitati.
>
> **CTA: Iscriviti ora**

*(sostituire con testimonianze reali appena disponibili — mai inventarle)*

### Titoli brevi da testare
- Workshop AI gratuito a Roma
- 2 ore per smettere di perdere tempo
- Impara l'AI costruendo, non guardando
- Cerchiamo volontari per progetti AI a Roma
- Da zero a 3 automazioni funzionanti

---

## 6. Modulo lead: form nativo o landing?

Usare **entrambi**, in due adset paralleli:

- **Lead form nativo Meta** (versione "più volume", con domande di qualificazione):
  costo per lead più basso, qualità inferiore. Attivare le *domande personalizzate*
  e l'opzione "intento elevato" (schermata di revisione).
- **Landing page sul sito** (`/it/corsi-ai`): lead più costosi ma molto più caldi,
  e permette il retargeting dei visitatori.

**Domande di qualificazione nel form:**
1. Qual è la tua situazione? (Libero professionista / Dipendente / Studente / Associazione / Imprenditore)
2. Quanto tempo puoi dedicare? (2h una tantum / 2-4h a settimana / 5+ ore a settimana)
3. Ti interesserebbe collaborare come volontario a progetti AI? (Sì / Forse / No)
4. Preferisci in presenza a Roma o online?

La domanda 3 è quella che identifica il segmento volontari.

---

## 7. Tracciamento

- **Pixel Meta** sulla landing + evento `Lead` al submit del form
- **Conversions API** se possibile (recupera il 10-25% delle conversioni perse da iOS/adblock)
- **UTM obbligatori:** `?utm_source=meta&utm_medium=paid&utm_campaign=corsi-ai-roma&utm_content={{ad.name}}`
- **Nel CRM/foglio lead** tracciare: lead → contattato → iscritto al workshop →
  presente → iscritto a pagamento → volontario. Il CPL da solo non dice nulla:
  conta il **costo per partecipante presente** e il **costo per iscritto pagante**.

---

## 8. Sequenza di follow-up (decisiva)

Un lead Meta gratuito si raffredda in poche ore.

| Momento | Canale | Contenuto |
|---|---|---|
| Entro 5 minuti | Email automatica | Conferma + link calendario + cosa portare |
| Entro 24 ore | WhatsApp o telefono | Conferma umana, scelta data, qualificazione |
| -48 ore | WhatsApp | Promemoria + "confermi?" (alza lo show-up di 15-20 punti) |
| -3 ore | WhatsApp | Promemoria con indirizzo/link |
| +2 ore dal workshop | Email | Materiali + offerta L1 con scadenza (7 giorni) |
| +3 giorni | Email/WhatsApp | Caso d'uso + ultima chiamata iscrizioni |
| +7 giorni | Email | Per chi non compra: invito al canale gratuito, resta in lista |

**Senza questa sequenza il budget pubblicitario è sprecato.** È la parte con
l'impatto maggiore sul risultato finale.

---

## 9. Calendario e ottimizzazione

- **Giorni 1-7:** fase di apprendimento. Non toccare nulla, non spegnere gli ad.
  Meta ha bisogno di ~50 conversioni per adset a settimana per stabilizzarsi.
- **Giorni 8-14:** spegnere le creatività con CTR < 0,8% o CPL > 2× media.
  Aumentare il budget solo del 20-30% alla volta.
- **Giorni 15-30:** consolidare le 2-3 creatività vincenti, introdurne 2 nuove.
- Programmazione oraria: se il budget è basso, limitare a 7:00-23:00.

---

## 10. Vincoli e conformità

- **Privacy/GDPR:** informativa collegata al form, base giuridica (consenso),
  doppio consenso separato per marketing. Registrare data e testo del consenso.
- **Policy Meta:** evitare promesse di guadagno ("guadagna 3.000 € al mese con l'AI"):
  è il modo più rapido per farsi rifiutare gli annunci o bloccare l'account.
  Evitare anche l'uso di "tu" in senso di attributo personale
  ("sei disoccupato?" → meglio "cerchi lavoro?").
- **Volontariato:** il volontario non è un lavoratore. L'annuncio non deve
  promettere compensi né configurare un rapporto di lavoro. Accordo scritto di
  volontariato per ciascuno.
- Verificare il dominio e configurare gli 8 eventi di priorità in Business Manager.
