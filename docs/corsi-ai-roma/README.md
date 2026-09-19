# Corsi AI Roma — materiali operativi

Progetto: formare persone all'uso pratico dell'intelligenza artificiale a Roma e
selezionare volontari per il Builder Lab su progetti reali del territorio.

| Documento | Contenuto |
|---|---|
| [01-programma-corsi.md](./01-programma-corsi.md) | Struttura dei tre livelli, moduli, prezzi, calendario, logistica, selezione volontari, KPI |
| [02-campagna-meta.md](./02-campagna-meta.md) | Struttura account Meta, targeting, creatività, testi pronti, tracciamento, follow-up, conformità |
| [03-budget-e-previsioni-lead.md](./03-budget-e-previsioni-lead.md) | Benchmark, tre scenari di budget, previsione a 6 mesi, costi per coorte, soglie di allarme |

**Landing page:** `src/app/[locale]/(public)/corsi-ai/` → pubblicata su
`/it/corsi-ai`, `/en/corsi-ai`, `/ro/corsi-ai`.
I lead arrivano via `POST /api/contact` con `source: 'corsi-ai-roma'` e vengono
inoltrati per email con l'etichetta "Corsi AI Roma - Landing".

> I numeri nel documento 03 sono stime su benchmark di mercato, non garanzie.
> Vanno sostituiti con i dati reali dopo i primi 14 giorni di campagna.
