# AI Practitioner — Programma dettagliato, lezione per lezione

Documento operativo per il docente. Il documento 01 descrive il percorso a chi
lo compra; questo descrive **come si conduce ogni singolo incontro**.

- **Durata:** 8 incontri da 2 ore (16 ore) + circa 1 ora di esercizio a casa fra un incontro e l'altro
- **Aula:** 12-16 in presenza, fino a 30 online
- **Prerequisiti:** nessuno tecnico. Portatile, account email, browser aggiornato
- **Formato di ogni incontro:** 15' ripresa e dubbi · 35' spiegazione con demo · 50' laboratorio guidato · 20' revisione in plenaria e compito

---

## Materiali e account da preparare (prima dell'incontro 1)

Da mandare via email all'iscrizione, con una guida illustrata.

| Strumento | Piano | Costo | Note |
|---|---|---|---|
| ChatGPT o Claude | Gratuito sufficiente | 0 € | Almeno uno dei due, meglio entrambi |
| Google account | Gratuito | 0 € | Serve per Fogli e Drive |
| n8n Cloud **o** Make | Piano free | 0 € | Il free basta per tutto il corso |
| Canva | Gratuito | 0 € | Modulo 5 |
| Account email dedicato | — | 0 € | **Mai usare l'email aziendale vera negli esercizi** |

> **Regola d'aula, ripetuta ogni incontro:** negli esercizi non si inseriscono mai
> dati reali di clienti, dipendenti o pazienti. Si usano dati finti forniti dal
> docente. Serve a insegnare l'abitudine giusta, non solo la regola.

---

## Incontro 1 — Fondamenta: come ragiona (e come sbaglia) un modello

**Obiettivo:** smettere di usare l'AI come un motore di ricerca.

| Tempo | Attività |
|---|---|
| 0-15' | Giro di presentazioni: ognuno dice **una** attività che vorrebbe automatizzare. Il docente le annota: saranno i casi d'uso di tutto il corso |
| 15-35' | Cos'è un modello linguistico: predizione del testo, token, finestra di contesto, perché "non sa" ma "prevede" |
| 35-50' | **Demo dell'errore:** il docente fa sbagliare il modello dal vivo (data inventata, citazione falsa, calcolo errato). Serve a costruire diffidenza sana fin dal primo giorno |
| 50-70' | Privacy e GDPR in pratica: cosa succede ai dati che incolli, differenza fra piani consumer e business, cosa non va mai inserito |
| 70-110' | **Laboratorio:** ogni partecipante interroga il modello sul proprio mestiere e trova almeno 2 errori fattuali, documentandoli in una tabella |
| 110-120' | Compito: tenere un "diario degli errori" per una settimana |

**Output:** glossario operativo (1 pagina) + policy personale d'uso dell'AI.

**Errore tipico da prevenire:** credere che un output scritto bene sia vero.
Lo stile sicuro del modello non ha nessuna relazione con la sua accuratezza.

---

## Incontro 2 — Prompting operativo

**Obiettivo:** passare da risposte generiche a risposte utilizzabili senza riscritture.

| Tempo | Attività |
|---|---|
| 0-15' | Revisione del diario degli errori |
| 15-40' | La struttura che funziona: **ruolo, contesto, compito, vincoli, formato, esempi**. Perché gli esempi valgono più delle istruzioni |
| 40-55' | Demo prima/dopo: stesso compito con prompt da 1 riga e con prompt strutturato, messi a confronto |
| 55-70' | Iterare invece di ricominciare: come correggere un output invece di rigenerarlo |
| 70-110' | **Laboratorio:** ognuno costruisce 3 prompt strutturati per il proprio lavoro e li testa su 3 casi diversi |
| 110-120' | Compito: portare a 10 la propria libreria di prompt |

**Output:** libreria personale di 10 prompt riutilizzabili, in un documento condiviso.

**Errore tipico:** scrivere prompt lunghissimi credendo che più testo significhi
più qualità. Contano struttura ed esempi, non la lunghezza.

---

## Incontro 3 — Testi, email e comunicazione

**Obiettivo:** produrre testi che suonino come il partecipante, non come l'AI.

| Tempo | Attività |
|---|---|
| 0-15' | Revisione della libreria prompt |
| 15-35' | Estrarre il proprio tono di voce: dare al modello 3 testi propri e farsi restituire le regole stilistiche |
| 35-55' | Casi pratici: risposta a un reclamo, preventivo, email di sollecito, descrizione di un servizio |
| 55-70' | **Revisione critica:** come si corregge un testo AI. I segnali da cancellare sempre (superlativi, "in un mondo dove...", entusiasmo finto) |
| 70-110' | **Laboratorio:** ognuno produce 3 testi reali del proprio lavoro e li fa rivedere a un compagno |
| 110-120' | Compito: usare l'AI per tutta la corrispondenza di una giornata, annotando dove ha fatto perdere tempo invece di farne guadagnare |

**Output:** kit di comunicazione (tono di voce + 5 modelli di testo).

**Errore tipico:** pubblicare senza rileggere. La revisione umana non è opzionale,
ed è il motivo per cui questo modulo dura due ore invece di una.

---

## Incontro 4 — Dati e documenti

**Obiettivo:** smettere di leggere manualmente documenti lunghi e tabelle.

| Tempo | Attività |
|---|---|
| 0-15' | Ripresa |
| 15-35' | Caricare file: PDF, fogli, immagini. Cosa il modello legge bene e cosa legge male (scansioni, tabelle complesse, PDF grafici) |
| 35-55' | Estrazione strutturata: da documento disordinato a tabella, con formato di output imposto |
| 55-70' | Interrogare i propri documenti (introduzione al RAG, senza codice) |
| 70-110' | **Laboratorio:** ognuno porta 3 documenti veri del proprio lavoro (anonimizzati) e costruisce un assistente che risponde su quelli |
| 110-120' | Compito: verificare 20 dati estratti e calcolare la propria percentuale di errore |

**Output:** un assistente funzionante sui propri documenti + il proprio tasso di errore misurato.

**Errore tipico:** fidarsi dei numeri estratti senza verificarli a campione.
Il compito serve esattamente a far toccare con mano questo punto.

---

## Incontro 5 — Contenuti visuali e multimediali

**Obiettivo:** produrre materiale visivo decoroso senza un grafico.

| Tempo | Attività |
|---|---|
| 0-15' | Ripresa |
| 15-35' | Generazione di immagini: struttura del prompt visivo (soggetto, stile, inquadratura, luce), limiti reali (testo nelle immagini, mani, coerenza fra immagini) |
| 35-50' | Editing: rimozione sfondo, estensione, ritocco, ridimensionamento per i formati social |
| 50-65' | Voce e video brevi: sintesi vocale, sottotitoli automatici, montaggio assistito |
| 65-80' | **Diritti e etica:** cosa si può usare commercialmente, perché non si imitano artisti viventi, obblighi di trasparenza sui contenuti sintetici, rischi dei volti generati |
| 80-110' | **Laboratorio:** ognuno produce un set di 4 immagini coerenti per il proprio progetto |
| 110-120' | Compito: produrre un reel di 20 secondi |

**Output:** set di asset visivi per una campagna.

**Errore tipico:** generare immagini bellissime e fuori contesto. Il criterio è
la coerenza con il proprio marchio, non l'effetto.

---

## Incontro 6 — Automazioni no-code *(il modulo che vende il corso)*

**Obiettivo:** la prima automazione che gira da sola, senza il partecipante davanti.

| Tempo | Attività |
|---|---|
| 0-15' | Ripresa |
| 15-35' | Logica di un'automazione: trigger, azioni, condizioni, gestione degli errori |
| 35-60' | **Costruzione dal vivo, passo passo:** email in arrivo → classificazione AI → riga su foglio → risposta in bozza. Tutti seguono sul proprio schermo |
| 60-105' | **Laboratorio:** ognuno costruisce la propria automazione su un caso raccolto nell'incontro 1. Il docente gira fra i banchi |
| 105-120' | Cosa fare quando si rompe: log, esecuzioni fallite, notifiche di errore |

**Output:** **1 automazione attiva e funzionante** per ciascun partecipante.

**Errore tipico:** automatizzare un processo che non si è capito. Se non lo sa
descrivere a voce in tre passaggi, non è pronto per automatizzarlo.

> Questo è l'incontro che genera le testimonianze e il passaparola. Se il tempo
> stringe, si taglia altrove: da qui nessuno deve uscire senza un'automazione che gira.

---

## Incontro 7 — Agenti e assistenti su misura

**Obiettivo:** capire cosa sia un agente e — soprattutto — quando non serve.

| Tempo | Attività |
|---|---|
| 0-15' | Revisione delle automazioni costruite: cosa si è rotto durante la settimana |
| 15-35' | Assistenti personalizzati: istruzioni permanenti, base di conoscenza, esempi |
| 35-55' | Agenti: strumenti, memoria, più passaggi in autonomia. Perché falliscono più spesso di quanto si racconti |
| 55-70' | **Costi e controllo:** come si misura la spesa, perché un agente lasciato libero può costare molto, dove mettere sempre un'approvazione umana |
| 70-110' | **Laboratorio:** ognuno costruisce un assistente sul proprio mestiere e lo mette alla prova con 5 casi difficili |
| 110-120' | Compito: preparare il progetto finale |

**Output:** un assistente su misura, documentato.

**Errore tipico:** costruire un agente dove bastava un'automazione lineare. Più
autonomia significa più punti di rottura: si usa solo quando serve davvero.

---

## Incontro 8 — Progetto finale, etica e prosecuzione

**Obiettivo:** consolidare, e decidere cosa fare dopo.

| Tempo | Attività |
|---|---|
| 0-50' | **Presentazioni:** 4 minuti a testa. Cosa ho automatizzato, quanto tempo risparmio, cosa non ha funzionato |
| 50-70' | Bias e limiti: da dove vengono gli errori sistematici, perché vanno cercati attivamente |
| 70-85' | Verifica delle fonti: metodo pratico in 3 passaggi per qualunque affermazione prodotta dall'AI |
| 85-100' | **AI Act in breve:** livelli di rischio, obblighi di trasparenza, cosa cambia per chi usa l'AI in azienda. Impostato come "cosa devi sapere", non come consulenza legale |
| 100-115' | Come continuare: moduli verticali, community, Builder Lab. Criteri di selezione dichiarati apertamente |
| 115-120' | Consegna attestati |

**Output:** progetto presentato + attestato con elenco competenze.

---

## Valutazione

Nessun esame. Tre indicatori osservabili, raccolti dal docente lungo il percorso:

| Indicatore | Come si misura |
|---|---|
| Ha completato i compiti | 6 compiti su 7 |
| Ha un'automazione che gira | Verificata dal vivo all'incontro 7 |
| Sa spiegare cosa ha costruito | Presentazione finale |

Chi soddisfa tutti e tre è candidabile al Builder Lab (doc. 01 §6).

---

## Varianti del formato

| Variante | Adattamento |
|---|---|
| **Weekend intensivo (2 giorni)** | Stessi contenuti, laboratori accorciati del 30%. Il modulo 6 resta intero. Meno efficace: manca la settimana per sedimentare |
| **Aziendale 1 giorno** | Moduli 1, 2, 6 + casi dell'azienda raccolti in anticipo con un colloquio preliminare |
| **Aziendale 2 giorni** | Aggiunge moduli 4 e 7, con i documenti reali dell'azienda |
| **Verticale 4h** (commercialisti, studi legali, e-commerce) | Moduli 2, 4 e 6 su casi del settore. È il prodotto n. 5 del doc. 04 |
| **Online** | Laboratori in stanze separate da 4 persone; il docente ruota. Registrazioni disponibili 60 giorni |

---

## Cosa serve al docente per ogni incontro

- Slide (massimo 12 per incontro: è un laboratorio, non una conferenza)
- Scheda esercizio stampata o in PDF
- **Dataset finti** già pronti (email, fatture, documenti) — da preparare una volta sola
- Un'automazione di riserva già funzionante, da mostrare se la rete o il servizio cade
- Il piano B tecnico: hotspot e SIM dati (doc. 01 §5.1)
