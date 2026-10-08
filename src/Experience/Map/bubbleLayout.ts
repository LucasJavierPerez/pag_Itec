/** Pure text layout for the overhead speech bubbles (no DOM, unit-tested by scripts/check-chat.mjs). */

/** Characters per line before wrapping. */
export const BUBBLE_LINE_CHARS = 28;
export const BUBBLE_MAX_LINES = 2;

/**
 * Greedy word wrap into at most `maxLines` lines of at most `lineChars` characters (code points).
 * Words longer than a line are cut; text that does not fit ends with an ellipsis.
 */
export function wrapBubbleText(text: string, lineChars = BUBBLE_LINE_CHARS, maxLines = BUBBLE_MAX_LINES): string[] {
  const words = text.split(/\s+/u).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  let overflow = false;

  const pushLine = (): boolean => {
    lines.push(line);
    line = '';
    if (lines.length >= maxLines) {
      overflow = true;
      return false;
    }
    return true;
  };

  outer: for (const word of words) {
    let rest = [...word];
    while (rest.length > 0) {
      const lineLen = [...line].length;
      const sep = lineLen > 0 ? 1 : 0;
      if (lineLen + sep + rest.length <= lineChars) {
        line = lineLen > 0 ? `${line} ${rest.join('')}` : rest.join('');
        rest = [];
      } else if (lineLen > 0) {
        if (!pushLine()) break outer;
      } else {
        line = rest.slice(0, lineChars).join('');
        rest = rest.slice(lineChars);
        if (rest.length > 0 && !pushLine()) break outer;
      }
    }
  }
  if (!overflow && line) {
    lines.push(line);
  } else if (overflow && words.length > 0) {
    // Something was left out: the last line ends with an ellipsis (still within lineChars)
    const last = [...(lines[lines.length - 1] ?? '')];
    const cut = last.length >= lineChars ? last.slice(0, lineChars - 1) : last;
    lines[lines.length - 1] = `${cut.join('').trimEnd()}…`;
  }
  return lines;
}
