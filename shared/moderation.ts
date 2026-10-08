/**
 * Pure, deterministic moderation helpers shared by the Worker (authoritative) and the client
 * (optional pre-check). No dependencies. See shared/wordlist.ts for the word lists.
 */
import { MAX_CHAT, MAX_NICK } from './protocol.ts';
import { PROFANITY_EXACT, PROFANITY_PHRASES, PROFANITY_PREFIX } from './wordlist.ts';

export type ChatRejectReason =
  | 'empty'
  | 'too_long'
  | 'phone'
  | 'digits'
  | 'email'
  | 'link'
  | 'contact'
  | 'repetition'
  | 'caps'
  | 'profanity';

export type ChatCheck = { ok: true; text: string } | { ok: false; reason: ChatRejectReason };

const LEET: Record<string, string> = {
  '0': 'o',
  '1': 'i',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '7': 't',
  '@': 'a',
  $: 's',
};

/** Control, format (zero-width, bidi overrides, BOM...) and line/paragraph separators. */
const INVISIBLES = /[\p{Cc}\p{Cf}\p{Co}\p{Cn}\p{Zl}\p{Zp}]/gu;

/** Trim, drop invisible chars, collapse whitespace runs to one space. */
export function normalizeWhitespace(raw: string): string {
  return raw
    .normalize('NFC')
    .replace(INVISIBLES, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function collapseRepeats(s: string): string {
  return s.replace(/(.)\1+/gu, '$1');
}

/**
 * Canonical form used to match the word list: lowercase, accents stripped, leetspeak undone,
 * separators turned into single spaces, runs of single letters ("p.u.t.a") joined, repeated
 * letters collapsed ("puuuta" -> "puta"). Output contains only [a-z0-9 ].
 */
export function normalizeForMatch(raw: string): string {
  let s = raw
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .toLowerCase();
  s = s.replace(/[013457@$]/g, (c) => LEET[c] ?? c);
  s = s.replace(/[^a-z0-9]+/g, ' ').trim();
  if (!s) return '';
  const tokens = s.split(' ');
  const out: string[] = [];
  let run = '';
  const flush = () => {
    if (run) out.push(run);
    run = '';
  };
  for (const t of tokens) {
    if (t.length === 1) {
      run += t;
    } else {
      if (run.length === 1) {
        out.push(run);
        run = '';
      } else flush();
      out.push(t);
    }
  }
  if (run.length === 1) out.push(run);
  else flush();
  return collapseRepeats(out.join(' '));
}

const EXACT = new Set(PROFANITY_EXACT.map((e) => normalizeForMatch(e)).filter((e) => e.length >= 3));
const PREFIXES = PROFANITY_PREFIX.map((e) => normalizeForMatch(e)).filter((e) => e.length >= 3);
const PHRASES = PROFANITY_PHRASES.map((p) => ` ${normalizeForMatch(p)} `);

/** True when the text contains a profane/slur/sexual/violent word or phrase. */
export function hasProfanity(raw: string): boolean {
  const norm = normalizeForMatch(raw);
  if (!norm) return false;
  const padded = ` ${norm} `;
  for (const p of PHRASES) if (padded.includes(p)) return true;
  for (const tok of norm.split(' ')) {
    if (EXACT.has(tok)) return true;
    for (const p of PREFIXES) if (tok.startsWith(p)) return true;
  }
  return false;
}

// ------------------------------------------------------------------ personal data
const DIGIT_WORDS = new Set<string>([
  'cero', 'uno', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
]);
const APP_WORDS = new Set<string>([
  'insta', 'instagram', 'ig', 'whatsapp', 'whats', 'wsp', 'wpp', 'wasap', 'guasap', 'tiktok',
  'snap', 'snapchat', 'telegram', 'discord', 'facebook', 'face', 'fb', 'messenger', 'twitter',
  'mail', 'gmail', 'hotmail', 'outlook', 'yahoo', 'icloud', 'correo', 'numero', 'cel', 'celu',
  'celular', 'telefono', 'tel', 'direccion', 'dni',
]);
const CONTACT_CUES = new Set<string>([
  'mi', 'tu', 'su', 'mio', 'tuyo', 'pasa', 'pasame', 'pasas', 'pasalo', 'dame', 'deci', 'decime',
  'manda', 'mandame', 'mandalo', 'agrega', 'agregame', 'segui', 'seguime', 'sigueme', 'busca',
  'buscame', 'escribi', 'escribime', 'escribeme', 'habla', 'hablame', 'hablamos', 'charlamos',
  'anda', 'vamos', 'pasen', 'pasenme', 'tenes', 'tienes', 'cual', 'cuál',
]);

for (const set of [DIGIT_WORDS, APP_WORDS, CONTACT_CUES]) {
  for (const w of [...set]) set.add(normalizeForMatch(w));
}

function personalDataReason(raw: string): ChatRejectReason | null {
  const lower = raw.normalize('NFD').replace(/\p{M}+/gu, '').toLowerCase();

  // e-mail (also obfuscated)
  if (/[a-z0-9._%+-]*\s*(@|\(\s*at\s*\)|\[\s*at\s*\]|\barroba\b)\s*[a-z0-9-]+\s*(\.|\(\s*dot\s*\)|\bpunto\b)\s*[a-z]{2,}/.test(lower)) return 'email';
  if (/@\s*[a-z0-9_-]+\s*(\.|\bpunto\b)\s*[a-z]{2,}/.test(lower)) return 'email';
  if (/\b(gmail|hotmail|outlook|yahoo|icloud)\b/.test(lower)) return 'email';
  if (/\barroba\b/.test(lower)) return 'email';

  // links
  if (/\b(https?|ftp)\b|\bwww\b/.test(lower)) return 'link';
  if (/\b(t\.me|wa\.me|discord\.gg|bit\.ly|youtu\.be|tinyurl|goo\.gl)\b/.test(lower)) return 'link';
  if (/[a-z0-9-]\.(com|ar|net|org|io|gg|ly|tv|xyz|info|edu|gob|app|dev)\b/.test(lower)) return 'link';
  if (/\bpunto\s*(com|ar|net|org|io|gg)\b/.test(lower)) return 'link';
  if (/\b(dot)\s*(com|net|org)\b/.test(lower)) return 'link';
  if (/\b(wa\s*me|t\s*me)\s*\//.test(lower)) return 'link';

  // phones and long digit strings (digits may be separated by space . - ( ) )
  if (/(?:\+?\d[\s.\-()]*){7,}/.test(lower)) return 'phone';
  if (/\d{6,}/.test(lower.replace(/[\s.\-()]/g, ''))) return 'digits';

  // spelled-out digits ("cero tres cinco ocho ...")
  const toks = normalizeForMatch(lower).split(' ');
  let run = 0;
  for (const t of toks) {
    run = DIGIT_WORDS.has(t) ? run + 1 : 0;
    if (run >= 6) return 'phone';
  }

  // asking to move to other apps / sharing contact data
  for (let i = 0; i < toks.length; i++) {
    const tok = toks[i] as string;
    if (!APP_WORDS.has(tok)) continue;
    for (let j = Math.max(0, i - 4); j < i; j++) if (CONTACT_CUES.has(toks[j] as string)) return 'contact';
    if (i + 1 < toks.length && /^\d+$/.test(toks[i + 1] as string)) return 'contact';
  }
  if (/\b(donde|dnd)\s+(vivis|vivo|vives|estudias|estudiabas)\b/.test(lower)) return 'contact';
  if (/\bvivo\s+en\s+(la\s+)?(calle|av|avenida)\b/.test(lower)) return 'contact';
  return null;
}

function lettersOf(s: string): string {
  return s.replace(/[^\p{L}]/gu, '');
}

/** Moderate one chat message. Returns the normalised text on success. */
export function checkChat(raw: unknown): ChatCheck {
  if (typeof raw !== 'string') return { ok: false, reason: 'empty' };
  const text = normalizeWhitespace(raw);
  if (!text) return { ok: false, reason: 'empty' };
  if ([...text].length > MAX_CHAT) return { ok: false, reason: 'too_long' };

  const letters = lettersOf(text);
  if (letters.length >= 12) {
    const upper = letters.replace(/[^\p{Lu}]/gu, '').length;
    if (upper / letters.length > 0.7) return { ok: false, reason: 'caps' };
  }
  if (/(.)\1{7,}/u.test(text.toLowerCase())) return { ok: false, reason: 'repetition' };
  const words = text.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((x) => x.length >= 2);
  const counts = new Map<string, number>();
  for (const word of words) {
    if (/^(?:j[aeiou]+)+j?$|^(?:ha)+h?$|^x+d+$|^lol$/.test(word)) continue; // laughter
    const n = (counts.get(word) ?? 0) + 1;
    if (n >= 4) return { ok: false, reason: 'repetition' };
    counts.set(word, n);
  }

  const pd = personalDataReason(text);
  if (pd) return { ok: false, reason: pd };
  if (hasProfanity(text)) return { ok: false, reason: 'profanity' };
  return { ok: true, text };
}

// ------------------------------------------------------------------ nicknames
/** Deterministic when a seed is given (tests); otherwise random. Always `Visitante` + 4 digits. */
export function generateNick(seed?: number): string {
  const n = seed === undefined ? Math.floor(Math.random() * 10000) : Math.abs(Math.trunc(seed)) % 10000;
  return `Visitante${String(n).padStart(4, '0')}`;
}

const NICK_DISALLOWED = /[^\p{Script=Latin}0-9 _.\-]/gu;

/**
 * Clean a user supplied nickname: control/zero-width/RTL chars removed, only Latin letters
 * (accents and ñ ok), digits, space, `_`, `-`, `.`; 1..MAX_NICK chars; falls back to a generated
 * `Visitante####` if empty or if it trips the profanity/personal-data filter. Idempotent.
 */
export function sanitizeNick(raw: unknown, seed?: number): string {
  if (typeof raw !== 'string') return generateNick(seed);
  let s = raw.normalize('NFC').replace(INVISIBLES, '');
  s = s.replace(NICK_DISALLOWED, '').replace(/\s+/g, ' ').trim();
  s = [...s].slice(0, MAX_NICK).join('').trim();
  if (!/[\p{L}0-9]/u.test(s)) return generateNick(seed);
  if (hasProfanity(s) || personalDataReason(s) !== null) return generateNick(seed);
  return s;
}
