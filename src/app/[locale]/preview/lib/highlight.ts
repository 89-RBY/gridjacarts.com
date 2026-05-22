const TS_KEYWORDS = [
  'import', 'export', 'from', 'as', 'default',
  'const', 'let', 'var', 'function', 'return',
  'async', 'await', 'if', 'else', 'new', 'class',
  'interface', 'type', 'extends', 'implements',
  'public', 'private', 'protected', 'static',
  'true', 'false', 'null', 'undefined',
  'throw', 'try', 'catch', 'finally',
  'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
  'in', 'of', 'typeof', 'instanceof', 'void', 'this', 'super',
];

const PRISMA_KEYWORDS = [
  'model', 'enum', 'datasource', 'generator',
  'String', 'Int', 'Float', 'Boolean', 'DateTime', 'Json',
];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function highlight(code: string, language: 'typescript' | 'prisma' | 'sql' = 'typescript'): string {
  if (!code) return '';

  let html = escapeHtml(code);

  // Comments first (otherwise keywords inside comments get colored)
  html = html.replace(/(\/\/[^\n]*)/g, '<span class="text-slate-500 italic">$1</span>');

  // Strings (both single and double quotes, also template strings without interp)
  html = html.replace(/(&#39;[^&]*?&#39;|&quot;[^&]*?&quot;|`[^`]*?`)/g, '<span class="text-emerald-300">$1</span>');

  // Decorators / Prisma attributes (@@index, @id, @default)
  if (language === 'prisma') {
    html = html.replace(/(@{1,2}[a-zA-Z]+)/g, '<span class="text-cyan-300">$1</span>');
  }

  // Numbers
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-300">$1</span>');

  // Keywords
  const keywords = language === 'prisma' ? PRISMA_KEYWORDS : TS_KEYWORDS;
  const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  html = html.replace(kwRegex, '<span class="text-violet-300">$1</span>');

  // Function names (rough: word followed by ()
  html = html.replace(/\b([a-z][a-zA-Z0-9_]*)(?=\()/g, '<span class="text-sky-300">$1</span>');

  // Type names (uppercase identifier)
  html = html.replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="text-amber-300">$1</span>');

  return html;
}
