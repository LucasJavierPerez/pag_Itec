// Headless checks for the chat store and the bubble text layout. Run with:
//   node --experimental-strip-types scripts/check-chat.mjs
import {
  BURST_WINDOW_MS,
  ChatStore,
  MAX_MESSAGES,
  MUTED_KEY,
  NOTICE_FILTERED,
  NOTICE_OFFLINE,
  NOTICE_RATE_LIMITED,
  RATE_COOLDOWN_MS,
  messageForReason,
  noticeForError,
} from '../src/UI/chat/ChatStore.ts';
import { BUBBLE_LINE_CHARS, BUBBLE_MAX_LINES, wrapBubbleText } from '../src/Experience/Map/bubbleLayout.ts';
import { checkChat } from '../shared/moderation.ts';

let failures = 0;
let checks = 0;
function check(ok, message) {
  checks++;
  if (!ok) {
    failures++;
    console.error(`FAIL: ${message}`);
  }
}

function memoryStorage() {
  const data = new Map();
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => void data.set(k, v), data };
}
let clock = 1000;
function makeStore(storage = memoryStorage()) {
  return { store: new ChatStore({ now: () => clock, storage }), storage };
}
const chat = (id, text, self = false) => ({ id, nick: `N-${id}`, text, ts: clock, self });

// ---- cap
{
  const { store } = makeStore();
  for (let i = 0; i < MAX_MESSAGES + 25; i++) store.addChat(chat('a', `m${i}`));
  check(store.messages.length === MAX_MESSAGES, `store keeps ${MAX_MESSAGES} messages`);
  check(store.messages[0].text === 'm25' && store.messages.at(-1).text === `m${MAX_MESSAGES + 24}`, 'oldest messages are dropped first');
}

// ---- unread / markRead
{
  const { store } = makeStore();
  let changes = 0;
  store.subscribe(() => changes++);
  store.addChat(chat('a', 'hola'));
  store.addChat(chat('b', 'chau'));
  store.addChat(chat('me', 'yo', true));
  store.addSystem('algo', 'info');
  check(store.unread === 2, 'unread counts other people only (not self, not system)');
  store.markRead();
  check(store.unread === 0, 'markRead clears the counter');
  store.addChat(chat('a', 'otra'));
  check(store.unread === 1, 'unread grows again after markRead');
  check(changes > 0, 'subscribers are notified');
}

// ---- mute
{
  const { store, storage } = makeStore();
  const seen = [];
  store.onChat((m) => seen.push(m.text));
  store.addChat(chat('a', 'uno'));
  store.addChat(chat('b', 'dos'));
  store.mute('a');
  check(!store.messages.some((m) => m.id === 'a'), 'muted peer is hidden from the list');
  check(store.unread === 1, 'muted peer does not count as unread');
  store.addChat(chat('a', 'tres'));
  check(seen.join() === 'uno,dos', 'muted peer does not trigger bubbles');
  check(!store.messages.some((m) => m.text === 'tres'), 'new messages of a muted peer stay hidden');
  check(JSON.parse(storage.data.get(MUTED_KEY)).includes('a'), 'mute list is persisted');
  const again = new ChatStore({ now: () => clock, storage });
  check(again.isMuted('a'), 'mute list is restored from storage');
  store.unmute('a');
  check(store.messages.filter((m) => m.id === 'a').length === 2, 'unmute restores the hidden messages');
  store.addChat(chat('me', 'mine', true));
  store.mute('me');
  check(store.messages.some((m) => m.text === 'mine'), 'own messages are never hidden');
  const broken = new ChatStore({ storage: { getItem: () => '{not json', setItem: () => { throw new Error('x'); } } });
  broken.mute('z');
  check(broken.isMuted('z'), 'corrupted / blocked storage does not break muting');
}

// ---- burst collapsing
{
  const { store } = makeStore();
  clock = 10_000;
  store.addSystem('Ana entró', 'join');
  clock += 500;
  store.addSystem('Beto entró', 'join');
  check(store.messages.length === 2, 'two joins stay as two lines');
  clock += 500;
  store.addSystem('Cami entró', 'join');
  check(store.messages.length === 1 && store.messages[0].text === '3 personas entraron', 'three joins within 5 s collapse');
  const rev = store.messages[0].rev;
  clock += 500;
  store.addSystem('Dani entró', 'join');
  check(store.messages.length === 1 && store.messages[0].text === '4 personas entraron' && store.messages[0].rev > rev, 'burst line updates in place');
  clock += BURST_WINDOW_MS + 1;
  store.addSystem('Eli entró', 'join');
  check(store.messages.length === 2 && store.messages[1].text === 'Eli entró', 'a join after the window is a normal line');
  const s2 = makeStore().store;
  clock = 50_000;
  s2.addSystem('A salió', 'leave');
  clock += 100;
  s2.addSystem('B entró', 'join');
  clock += 100;
  s2.addSystem('C salió', 'leave');
  check(s2.messages.length === 3, 'mixed join/leave do not collapse');
  const s3 = makeStore().store;
  for (let i = 0; i < 3; i++) s3.addSystem(`P${i} salió`, 'leave');
  check(s3.messages[0].text === '3 personas salieron', 'leave bursts use their own wording');
  const s4 = makeStore().store;
  s4.addSystem('Alguien encontró algo', 'secret');
  s4.addSystem('Alguien encontró algo', 'secret');
  check(s4.messages.length === 2, 'secret lines are never collapsed');
}

// ---- notices, dedupe and error mapping
{
  const { store } = makeStore();
  store.addNotice('hola');
  store.addNotice('hola');
  check(store.messages.length === 1, 'identical consecutive notices are deduped');
  store.addChat(chat('a', 'x'));
  store.addNotice('hola');
  check(store.messages.length === 3, 'a notice after other messages is kept');

  const e = makeStore().store;
  e.handleError({ code: 'filtered', message: 'del server' });
  check(e.messages.at(-1).kind === 'notice' && e.messages.at(-1).text === NOTICE_FILTERED, 'filtered -> friendly notice');
  const before = Date.now();
  const r = new ChatStore({ storage: null });
  r.handleError({ code: 'rate_limited', message: 'x' });
  check(r.messages.at(-1).text === NOTICE_RATE_LIMITED, 'rate_limited -> friendly notice');
  check(r.cooldownUntil >= before + RATE_COOLDOWN_MS - 5, 'rate_limited starts a client cooldown');
  check(noticeForError('weird', 'Mensaje del server') === 'Mensaje del server', 'unknown codes fall back to the server message');
  check(noticeForError('weird').length > 5, 'unknown codes without message still get a notice');
  check(noticeForError('bad_version').includes('Recargá'), 'bad_version tells to reload');

  const o = makeStore().store;
  o.handleStatus({ status: 'offline', count: 0 });
  o.handleStatus({ status: 'offline', count: 0 });
  o.handleStatus({ status: 'rejected', count: 0 });
  check(o.messages.filter((m) => m.text === NOTICE_OFFLINE).length === 1, 'offline notice is shown once per episode');
  o.handleStatus({ status: 'online', count: 3 });
  check(o.status === 'online' && o.count === 3, 'status and count are tracked');
  o.addChat(chat('a', 'x'));
  o.handleStatus({ status: 'offline', count: 0 });
  check(o.messages.filter((m) => m.text === NOTICE_OFFLINE).length === 2, 'offline notice returns after reconnecting and dropping again');
  const idle = makeStore().store;
  idle.handleStatus({ status: 'idle', count: 0 });
  check(idle.messages.length === 0, 'idle (solo mode) adds no notice');
}

// ---- no HTML interpretation, malformed events
{
  const { store } = makeStore();
  const evil = '<img src=x onerror=alert(1)> <b>hola</b> &amp;';
  store.handleChat({ id: 'a', nick: '<script>', text: evil, ts: 1, self: false });
  const m = store.messages.at(-1);
  check(m.text === evil && m.nick === '<script>', 'text and nick are stored verbatim (renderers use textContent)');
  const n = store.messages.length;
  store.handleChat(null);
  store.handleChat({ text: 5 });
  store.handleChat({ text: '' });
  store.handleSystem({ text: 7 });
  store.handleSystem(undefined);
  store.handleStatus(null);
  store.handleError(null);
  check(store.messages.length === n + 1, 'malformed events are ignored (only a generic error notice is added)');
}

// ---- event wiring on an EventTarget
{
  const { store } = makeStore();
  const target = new EventTarget();
  store.attach(target);
  target.dispatchEvent(new CustomEvent('net-chat', { detail: { id: 'z', nick: 'Zeta', text: 'hola', ts: 5, self: false } }));
  target.dispatchEvent(new CustomEvent('net-system', { detail: { text: 'Zeta entró', kind: 'join' } }));
  check(store.messages.length === 2, 'attach() wires net-chat and net-system');
  store.detach();
  target.dispatchEvent(new CustomEvent('net-chat', { detail: { id: 'z', nick: 'Zeta', text: 'otra', ts: 6, self: false } }));
  check(store.messages.length === 2, 'detach() stops listening');
}

// ---- client pre-check messages
{
  for (const text of ['mi mail es a@b.com', 'escribime al 3584123456', 'entrá a http://x.com', 'AAAAAAAAAAAAAAAAAA']) {
    const c = checkChat(text);
    check(!c.ok && messageForReason(c.reason).length > 5, `pre-check rejects "${text}" with a friendly reason`);
  }
  check(checkChat('hola, ¿cómo andás?').ok, 'a normal message passes the pre-check');
}

// ---- bubble text layout
{
  check(wrapBubbleText('hola').join('|') === 'hola', 'short text is a single line');
  check(wrapBubbleText('   ').length === 0, 'blank text yields no lines');
  const two = wrapBubbleText('esta es una frase un poco larga para dos lineas');
  check(two.length === 2 && two.every((l) => [...l].length <= BUBBLE_LINE_CHARS), 'long text wraps into two lines within the limit');
  const long = wrapBubbleText('palabra '.repeat(30));
  check(long.length === BUBBLE_MAX_LINES && long[1].endsWith('…'), 'overflow ends with an ellipsis on the last line');
  check(long.every((l) => [...l].length <= BUBBLE_LINE_CHARS), 'ellipsis lines stay within the limit');
  const giant = wrapBubbleText('x'.repeat(100));
  check(giant.length === 2 && giant[0].length === BUBBLE_LINE_CHARS && giant[1].endsWith('…'), 'a giant word is cut across lines with an ellipsis');
  const exact = wrapBubbleText('a'.repeat(BUBBLE_LINE_CHARS));
  check(exact.length === 1 && exact[0].length === BUBBLE_LINE_CHARS, 'a word that exactly fills a line is kept');
  const emoji = wrapBubbleText('😀'.repeat(40));
  check(emoji.length === 2 && [...emoji[0]].length === BUBBLE_LINE_CHARS, 'wrapping counts code points, not UTF-16 units');
  check(wrapBubbleText('uno dos tres cuatro cinco seis siete ocho', 10, 3).length === 3, 'custom limits are honoured');
  check(wrapBubbleText('hola <b>mundo</b>').join(' ') === 'hola <b>mundo</b>', 'markup is laid out as plain text');
}

console.log(`check:chat ${checks - failures}/${checks} passed`);
if (failures > 0) process.exit(1);
