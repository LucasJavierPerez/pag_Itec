import type { MapPoint } from '../../UI/MapData.ts';

/**
 * Real ITEC facts for the bot speech bubbles, drawn only from the MapData texts (descriptions and
 * highlights of the points of interest). Pure, so it can be checked headless.
 */

const MAX_FACT_CHARS = 170;

export interface BotFact {
  pointId: string;
  pointName: string;
  /** A sentence (or highlight) copied from MapData. */
  text: string;
}

/** Splits a description into sentences without breaking abbreviations like "1º". */
function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Phone numbers and e-mails belong to the contact card, not to a chatty bubble. */
const looksLikeContact = (s: string): boolean => /\d{6,}|@/.test(s);

export function buildBotFacts(points: readonly MapPoint[]): BotFact[] {
  const facts: BotFact[] = [];
  for (const p of points) {
    for (const s of sentences(p.description)) {
      if (s.length <= MAX_FACT_CHARS && s.length >= 20 && !looksLikeContact(s)) {
        facts.push({ pointId: p.id, pointName: p.name, text: s });
      }
    }
    for (const h of p.highlights) {
      if (h.split(/\s+/).length >= 3 && h.length >= 14 && h.length <= MAX_FACT_CHARS && !looksLikeContact(h)) {
        facts.push({ pointId: p.id, pointName: p.name, text: h.endsWith('.') ? h : `${h}.` });
      }
    }
  }
  return facts;
}

/** The bubble text: a greeting, the point the fact is about and the fact itself. */
export function botLine(botName: string, fact: BotFact): string {
  return `¡Hola! Soy ${botName}. ¿Sabías esto de ${fact.pointName}? ${fact.text}`;
}
