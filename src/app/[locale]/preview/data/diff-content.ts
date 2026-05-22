export type DiffLine = {
  type: 'add' | 'remove' | 'context' | 'meta';
  content: string;
  oldLine?: number;
  newLine?: number;
};

export type Annotation = {
  anchorLine: number;
  title: string;
  body: string;
};

export type DiffFile = {
  id: string;
  filename: string;
  language: 'typescript' | 'prisma' | 'sql';
  status: 'modified' | 'added';
  additions: number;
  deletions: number;
  summary: string;
  lines: DiffLine[];
  annotations: Annotation[];
};

export const PROJECT_META = {
  client: 'B2B SaaS, 40 dipendenti',
  problem: 'Un ops manager passava 4h/giorno a smistare 200+ email tra support, sales e billing.',
  solution: 'AI triage con Claude + structured output, routing automatico, draft reply.',
  outcomes: [
    { metric: '94%', label: 'accuratezza classificazione' },
    { metric: '12min/giorno', label: 'tempo umano residuo' },
    { metric: '€3.2k/mese', label: 'costo recuperato' },
    { metric: '11 giorni', label: 'da kickoff a prod' },
  ],
};

export const DIFF_FILES: DiffFile[] = [
  {
    id: 'inbox-route',
    filename: 'app/api/inbox/route.ts',
    language: 'typescript',
    status: 'modified',
    additions: 14,
    deletions: 38,
    summary: 'Endpoint webhook che riceve email — da if/else fragile a singola chiamata classificatore.',
    annotations: [
      {
        anchorLine: 6,
        title: 'Niente più keyword matching',
        body: 'Le regole if/else fallivano su email ambigue (es: "billing question about the new feature"). Le abbiamo cancellate tutte.',
      },
      {
        anchorLine: 18,
        title: 'Una sola dipendenza',
        body: 'triage() è una funzione pura: input email → output categoria + priorità + draft. Testabile, mockabile, sostituibile.',
      },
      {
        anchorLine: 24,
        title: 'Persistenza con tracciamento',
        body: 'Salviamo classification + confidence per misurare drift nel tempo. Se confidence < 0.7, escalation umana.',
      },
    ],
    lines: [
      { type: 'meta', content: '@@ -1,52 +1,28 @@' },
      { type: 'context', content: "import { NextRequest, NextResponse } from 'next/server';", oldLine: 1, newLine: 1 },
      { type: 'remove', content: "import { db } from '@/lib/db';", oldLine: 2 },
      { type: 'remove', content: "import { sendSlack } from '@/lib/slack';", oldLine: 3 },
      { type: 'add', content: "import { triage } from '@/lib/ai/triage';", newLine: 2 },
      { type: 'add', content: "import { route } from '@/lib/email/router';", newLine: 3 },
      { type: 'add', content: "import { prisma } from '@/lib/prisma';", newLine: 4 },
      { type: 'context', content: '', oldLine: 4, newLine: 5 },
      { type: 'context', content: 'export async function POST(req: NextRequest) {', oldLine: 5, newLine: 6 },
      { type: 'context', content: '  const email = await req.json();', oldLine: 6, newLine: 7 },
      { type: 'remove', content: '', oldLine: 7 },
      { type: 'remove', content: '  // Keyword-based triage (legacy)', oldLine: 8 },
      { type: 'remove', content: "  let category = 'unknown';", oldLine: 9 },
      { type: 'remove', content: '  const body = email.body.toLowerCase();', oldLine: 10 },
      { type: 'remove', content: '', oldLine: 11 },
      { type: 'remove', content: "  if (body.includes('invoice') || body.includes('payment')) {", oldLine: 12 },
      { type: 'remove', content: "    category = 'billing';", oldLine: 13 },
      { type: 'remove', content: "  } else if (body.includes('bug') || body.includes('error')) {", oldLine: 14 },
      { type: 'remove', content: "    category = 'support';", oldLine: 15 },
      { type: 'remove', content: "  } else if (body.includes('demo') || body.includes('pricing')) {", oldLine: 16 },
      { type: 'remove', content: "    category = 'sales';", oldLine: 17 },
      { type: 'remove', content: '  }', oldLine: 18 },
      { type: 'remove', content: '', oldLine: 19 },
      { type: 'remove', content: "  if (category === 'unknown') {", oldLine: 20 },
      { type: 'remove', content: "    await sendSlack('#ops', `Need triage: ${email.subject}`);", oldLine: 21 },
      { type: 'remove', content: '    return NextResponse.json({ status: 0 });', oldLine: 22 },
      { type: 'remove', content: '  }', oldLine: 23 },
      { type: 'remove', content: '', oldLine: 24 },
      { type: 'remove', content: '  await db.email.insert({ ...email, category });', oldLine: 25 },
      { type: 'add', content: '', newLine: 8 },
      { type: 'add', content: '  const result = await triage(email);', newLine: 9 },
      { type: 'add', content: '', newLine: 10 },
      { type: 'add', content: '  if (result.confidence < 0.7) {', newLine: 11 },
      { type: 'add', content: "    return route(email, 'human-review', result);", newLine: 12 },
      { type: 'add', content: '  }', newLine: 13 },
      { type: 'add', content: '', newLine: 14 },
      { type: 'add', content: '  await prisma.classification.create({', newLine: 15 },
      { type: 'add', content: '    data: {', newLine: 16 },
      { type: 'add', content: '      emailId: email.id,', newLine: 17 },
      { type: 'add', content: '      category: result.category,', newLine: 18 },
      { type: 'add', content: '      confidence: result.confidence,', newLine: 19 },
      { type: 'add', content: '      draftReply: result.draft,', newLine: 20 },
      { type: 'add', content: '    },', newLine: 21 },
      { type: 'add', content: '  });', newLine: 22 },
      { type: 'add', content: '', newLine: 23 },
      { type: 'add', content: '  return route(email, result.category, result);', newLine: 24 },
      { type: 'context', content: '}', oldLine: 52, newLine: 25 },
    ],
  },
  {
    id: 'triage-lib',
    filename: 'lib/ai/triage.ts',
    language: 'typescript',
    status: 'added',
    additions: 42,
    deletions: 0,
    summary: 'Nuovo modulo: classificatore con Claude, schema Zod, retry, prompt caching.',
    annotations: [
      {
        anchorLine: 7,
        title: 'Output strutturato, non parsing',
        body: 'Zod schema garantisce shape. Niente try/catch su JSON.parse, niente regex su risposte LLM.',
      },
      {
        anchorLine: 18,
        title: 'Prompt caching = -70% costi',
        body: 'Il system prompt (3.2k token con esempi few-shot) viene cachato su Anthropic. Costo per email: ~$0.0008.',
      },
      {
        anchorLine: 31,
        title: 'Retry con jitter',
        body: 'Rate limit Anthropic = 50 req/min. Su burst usiamo exponential backoff. Mai un email persa.',
      },
    ],
    lines: [
      { type: 'meta', content: '@@ -0,0 +1,42 @@' },
      { type: 'add', content: "import Anthropic from '@anthropic-ai/sdk';", newLine: 1 },
      { type: 'add', content: "import { z } from 'zod';", newLine: 2 },
      { type: 'add', content: "import { withRetry } from '@/lib/retry';", newLine: 3 },
      { type: 'add', content: '', newLine: 4 },
      { type: 'add', content: 'const client = new Anthropic();', newLine: 5 },
      { type: 'add', content: '', newLine: 6 },
      { type: 'add', content: 'const TriageSchema = z.object({', newLine: 7 },
      { type: 'add', content: "  category: z.enum(['support', 'sales', 'billing', 'spam', 'other']),", newLine: 8 },
      { type: 'add', content: "  priority: z.enum(['urgent', 'normal', 'low']),", newLine: 9 },
      { type: 'add', content: '  confidence: z.number().min(0).max(1),', newLine: 10 },
      { type: 'add', content: '  draft: z.string(),', newLine: 11 },
      { type: 'add', content: '  reasoning: z.string(),', newLine: 12 },
      { type: 'add', content: '});', newLine: 13 },
      { type: 'add', content: '', newLine: 14 },
      { type: 'add', content: 'export async function triage(email: Email) {', newLine: 15 },
      { type: 'add', content: '  return withRetry(async () => {', newLine: 16 },
      { type: 'add', content: '    const res = await client.messages.create({', newLine: 17 },
      { type: 'add', content: "      model: 'claude-sonnet-4-6',", newLine: 18 },
      { type: 'add', content: '      max_tokens: 1024,', newLine: 19 },
      { type: 'add', content: '      system: [', newLine: 20 },
      { type: 'add', content: '        {', newLine: 21 },
      { type: 'add', content: "          type: 'text',", newLine: 22 },
      { type: 'add', content: '          text: TRIAGE_SYSTEM_PROMPT,', newLine: 23 },
      { type: 'add', content: "          cache_control: { type: 'ephemeral' },", newLine: 24 },
      { type: 'add', content: '        },', newLine: 25 },
      { type: 'add', content: '      ],', newLine: 26 },
      { type: 'add', content: '      messages: [', newLine: 27 },
      { type: 'add', content: "        { role: 'user', content: formatEmail(email) },", newLine: 28 },
      { type: 'add', content: '      ],', newLine: 29 },
      { type: 'add', content: '    });', newLine: 30 },
      { type: 'add', content: '', newLine: 31 },
      { type: 'add', content: '    const text = extractText(res);', newLine: 32 },
      { type: 'add', content: '    return TriageSchema.parse(JSON.parse(text));', newLine: 33 },
      { type: 'add', content: '  }, {', newLine: 34 },
      { type: 'add', content: '    retries: 3,', newLine: 35 },
      { type: 'add', content: '    minDelay: 500,', newLine: 36 },
      { type: 'add', content: '    jitter: true,', newLine: 37 },
      { type: 'add', content: '  });', newLine: 38 },
      { type: 'add', content: '}', newLine: 39 },
    ],
  },
  {
    id: 'prisma-schema',
    filename: 'prisma/schema.prisma',
    language: 'prisma',
    status: 'modified',
    additions: 11,
    deletions: 1,
    summary: 'Nuovo modello Classification per audit, monitoring drift e training futuro.',
    annotations: [
      {
        anchorLine: 8,
        title: 'Confidence persistito',
        body: 'Lo storia di confidence ci permette di trovare pattern: se cala su una categoria, è segnale di drift sui dati reali.',
      },
      {
        anchorLine: 12,
        title: 'Indici per dashboard',
        body: "Index su (emailId, createdAt) per query del tipo \"ultime 100 email classificate male\". Non serve subito ma il giorno che servirà sarà troppo tardi.",
      },
    ],
    lines: [
      { type: 'meta', content: '@@ -42,7 +42,17 @@' },
      { type: 'context', content: 'model Email {', oldLine: 42, newLine: 42 },
      { type: 'context', content: '  id        String   @id @default(cuid())', oldLine: 43, newLine: 43 },
      { type: 'remove', content: "  category  String?  // 'support' | 'sales' | 'billing'", oldLine: 44 },
      { type: 'add', content: '  classifications Classification[]', newLine: 44 },
      { type: 'context', content: '  createdAt DateTime @default(now())', oldLine: 45, newLine: 45 },
      { type: 'context', content: '}', oldLine: 46, newLine: 46 },
      { type: 'context', content: '', oldLine: 47, newLine: 47 },
      { type: 'add', content: 'model Classification {', newLine: 48 },
      { type: 'add', content: '  id          String   @id @default(cuid())', newLine: 49 },
      { type: 'add', content: '  emailId     String', newLine: 50 },
      { type: 'add', content: '  email       Email    @relation(fields: [emailId], references: [id])', newLine: 51 },
      { type: 'add', content: '  category    String', newLine: 52 },
      { type: 'add', content: '  confidence  Float', newLine: 53 },
      { type: 'add', content: '  draftReply  String   @db.Text', newLine: 54 },
      { type: 'add', content: '  createdAt   DateTime @default(now())', newLine: 55 },
      { type: 'add', content: '', newLine: 56 },
      { type: 'add', content: '  @@index([emailId, createdAt])', newLine: 57 },
      { type: 'add', content: '}', newLine: 58 },
    ],
  },
];
