// Integration check for the browser NetClient against a running dev server.
//
// Requires:   npm run dev:server        (wrangler dev on http://localhost:8787)
// Usage:      node --experimental-strip-types scripts/check-client-net.mjs [--require] [--url ws://localhost:8787]
//  - If nothing listens on the URL the script prints SKIP and exits 0, unless --require is given.
// Part 1 drives the real NetClient against the server with a second, plain WebSocket client.
// Part 2 drives it against a scripted fake socket (room_full fallback, rejections, odd frames).

import { NetClient } from '../src/Experience/Map/net/NetClient.ts';
import { ClockSync } from '../src/Experience/Map/net/clockSync.ts';

const args = process.argv.slice(2);
const REQUIRE = args.includes('--require');
const argIdx = args.indexOf('--url');
const BASE = argIdx >= 0 ? args[argIdx + 1] : 'ws://localhost:8787';
const HTTP = BASE.replace(/^ws/, 'http');
const PREFIX = `c${Date.now().toString(36)}`;

let pass = 0;
let fail = 0;
const ok = (cond, label) => {
  if (cond) pass++;
  else {
    fail++;
    console.error('FAIL:', label);
  }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Resolves with the first event payload matching `pred`, or null on timeout. */
function waitEvent(client, name, pred = () => true, ms = 3000) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      off();
      resolve(null);
    }, ms);
    const off = client.on(name, (p) => {
      if (pred(p)) {
        clearTimeout(timer);
        off();
        resolve(p);
      }
    });
  });
}

class Plain {
  constructor(room) {
    this.msgs = [];
    this.waiters = [];
    this.ws = new WebSocket(`${BASE}/ws?room=${room}`);
    this.opened = new Promise((res) => {
      this.ws.addEventListener('open', () => res(true));
      this.ws.addEventListener('error', () => res(false));
    });
    this.ws.addEventListener('message', (e) => {
      let m;
      try {
        m = JSON.parse(e.data);
      } catch {
        m = { t: 'raw', data: e.data };
      }
      this.msgs.push(m);
      for (const w of [...this.waiters]) if (w.pred(m)) w.resolve(m);
    });
  }
  send(o) {
    this.ws.send(JSON.stringify(o));
  }
  wait(pred, ms = 3000) {
    const hit = this.msgs.find(pred);
    if (hit) return Promise.resolve(hit);
    return new Promise((resolve) => {
      const w = {
        pred,
        resolve: (m) => {
          clearTimeout(timer);
          this.waiters = this.waiters.filter((x) => x !== w);
          resolve(m);
        },
      };
      const timer = setTimeout(() => {
        this.waiters = this.waiters.filter((x) => x !== w);
        resolve(null);
      }, ms);
      this.waiters.push(w);
    });
  }
  close() {
    try {
      this.ws.close();
    } catch {
      // ignore
    }
  }
}

async function serverUp() {
  try {
    const res = await fetch(`${HTTP}/health`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------- part 2: fake socket
class FakeSocket {
  constructor(url, script) {
    this.url = url;
    this.readyState = 0;
    this.sent = [];
    this.onopen = this.onmessage = this.onclose = this.onerror = null;
    this.closedWith = null;
    setTimeout(() => {
      this.readyState = 1;
      this.onopen?.({});
    }, 0);
    this.script = script;
  }
  send(data) {
    this.sent.push(data);
    let msg = null;
    try {
      msg = JSON.parse(data);
    } catch {
      /* raw frame */
    }
    if (msg?.t === 'hello') setTimeout(() => this.script(this, msg), 0);
  }
  reply(o) {
    this.onmessage?.({ data: typeof o === 'string' ? o : JSON.stringify(o) });
  }
  close(code) {
    this.closedWith = code ?? 1000;
    this.readyState = 3;
  }
}

async function fakeTests() {
  const welcome = (extra = {}) => ({
    t: 'welcome',
    v: 1,
    id: 'me1',
    nick: 'Fake',
    serverTime: Date.now(),
    room: 'main',
    peers: [],
    ...extra,
  });
  const hello = () => ({ nick: 'Fake', character: 'robot', palette: 'clasico' });

  // room_full on the first rooms, then success: main -> main-2 -> main-3
  {
    const urls = [];
    const sockets = [];
    const c = new NetClient({
      getHello: hello,
      watchVisibility: false,
      clock: new ClockSync(),
      buildUrl: (room) => `fake://x/ws?room=${room}`,
      createSocket: (url) => {
        urls.push(url);
        const idx = urls.length;
        const s = new FakeSocket(url, (sock) => {
          if (idx <= 2) sock.reply({ t: 'error', code: 'room_full', message: 'x' });
          else sock.reply(welcome({ room: 'main-3' }));
        });
        sockets.push(s);
        return s;
      },
    });
    const errors = [];
    c.on('error', (e) => errors.push(e.code));
    c.connect();
    const w = await waitEvent(c, 'welcome', () => true, 4000);
    ok(w !== null && c.status === 'online', 'fake: online after two full rooms');
    ok(urls.map((u) => u.split('room=')[1]).join(',') === 'main,main-2,main-3', `fake: room fallback order (${urls.map((u) => u.split('room=')[1]).join(',')})`);
    ok(sockets[0].closedWith !== null && sockets[1].closedWith !== null, 'fake: client closed the full-room sockets itself');
    ok(errors.filter((e) => e === 'room_full').length === 2, 'fake: room_full errors surfaced as events');
    ok(c.room === 'main-3', 'fake: room name taken from welcome');
    c.dispose();
  }
  // every room full: rejected after 5 rooms, no more sockets
  {
    const urls = [];
    const c = new NetClient({
      getHello: hello,
      watchVisibility: false,
      clock: new ClockSync(),
      buildUrl: (room) => room,
      createSocket: (url) => {
        urls.push(url);
        return new FakeSocket(url, (sock) => sock.reply({ t: 'error', code: 'room_full', message: 'x' }));
      },
    });
    c.connect();
    await waitEvent(c, 'status', (i) => i.status === 'rejected', 5000);
    ok(c.status === 'rejected', 'fake: rejected when every room is full');
    await sleep(600);
    ok(urls.length === 5, `fake: exactly 5 rooms tried (${urls.length})`);
    ok(c.message.length > 0, 'fake: rejection carries a message');
    c.dispose();
  }
  // bad_version: rejected right away, socket closed, no retry
  {
    const urls = [];
    let sock0 = null;
    const c = new NetClient({
      getHello: hello,
      watchVisibility: false,
      clock: new ClockSync(),
      buildUrl: (room) => room,
      createSocket: (url) => {
        urls.push(url);
        sock0 = new FakeSocket(url, (s) => s.reply({ t: 'error', code: 'bad_version', message: 'x' }));
        return sock0;
      },
    });
    c.connect();
    await waitEvent(c, 'status', (i) => i.status === 'rejected', 2000);
    ok(c.status === 'rejected' && sock0.closedWith !== null, 'fake: bad_version rejects and closes our socket');
    await sleep(1600);
    ok(urls.length === 1 && c.status === 'rejected', 'fake: no reconnection after a rejection');
    c.connect(); // the user retries
    await sleep(100);
    ok(urls.length === 2, 'fake: connect() retries after a rejection');
    c.dispose();
  }
  // odd frames never throw: raw pong, binary, junk JSON, unknown type, state for unknown id
  {
    let sock = null;
    const c = new NetClient({
      getHello: hello,
      watchVisibility: false,
      clock: new ClockSync(),
      buildUrl: (room) => room,
      createSocket: (url) => {
        sock = new FakeSocket(url, (s) => s.reply(welcome()));
        return sock;
      },
    });
    c.connect();
    await waitEvent(c, 'welcome');
    let threw = false;
    try {
      sock.reply('pong');
      sock.reply('not json at all');
      sock.reply('{"t":"nope"}');
      sock.reply('[1,2,3]');
      sock.onmessage({ data: new ArrayBuffer(4) });
      sock.reply({ t: 'state', st: 1, p: [['ghost', 1, 2, 0, 0]] });
      sock.reply({ t: 'state', st: 2, p: 'garbage' });
      sock.reply({ t: 'leave', id: 'ghost' });
      sock.reply({ t: 'pong' });
    } catch {
      threw = true;
    }
    ok(!threw && c.status === 'online', 'fake: odd frames are tolerated');
    // listeners that throw do not break the client
    c.on('chat', () => {
      throw new Error('listener bug');
    });
    let secondGot = false;
    c.on('chat', () => (secondGot = true));
    sock.reply({ t: 'chat', id: 'x', nick: 'n', text: 'hola', ts: 1 });
    ok(secondGot, 'fake: a throwing listener does not stop the others');
    // first JSON ping on welcome
    ok(sock.sent.some((d) => d === '{"t":"ping"}'), 'fake: JSON ping sent on welcome for the RTT estimate');
    // sendPos rounding / clamping / view gating
    sock.sent.length = 0;
    ok(c.sendPos(999, -999, 7, 3) === true, 'fake: sendPos accepted');
    const pos = JSON.parse(sock.sent.at(-1));
    ok(pos.t === 'pos' && pos.x === 52 && pos.z === -35 && Math.abs(pos.h) <= Math.PI && pos.s === 1, `fake: pos clamped (${JSON.stringify(pos)})`);
    ok(c.sendPos(0, 0, 0, 0) === false, 'fake: pos faster than ~25/s is dropped');
    await sleep(60);
    c.setViewActive(false);
    ok(c.sendPos(0, 0, 0, 0) === false, 'fake: no pos while the Mapa view is not active');
    c.setViewActive(true);
    ok(c.sendPos(Number.NaN, 0, 0, 0) === false, 'fake: NaN pos refused');
    // dispose-safe
    c.dispose();
    c.dispose();
    ok(c.status === 'idle', 'fake: dispose leaves the client idle');
    ok(c.sendChat('x') === false, 'fake: nothing is sent after dispose');
  }
  // give-up after 8 failed attempts needs real backoff time: covered by check:net (schedule)
  // default URL builder from location
  {
    globalThis.location = { protocol: 'https:', host: 'example.org' };
    let url = '';
    const c = new NetClient({
      getHello: hello,
      watchVisibility: false,
      clock: new ClockSync(),
      createSocket: (u) => {
        url = u;
        return new FakeSocket(u, () => {});
      },
    });
    c.connect();
    ok(url === 'wss://example.org/ws?room=main', `fake: wss URL on https (${url})`);
    c.dispose();
    globalThis.location = { protocol: 'http:', host: 'localhost:5173' };
    c.connect();
    const c2 = new NetClient({
      getHello: hello,
      watchVisibility: false,
      clock: new ClockSync(),
      createSocket: (u) => {
        url = u;
        return new FakeSocket(u, () => {});
      },
    });
    c2.connect();
    ok(url === 'ws://localhost:5173/ws?room=main', `fake: ws URL on http (${url})`);
    c2.dispose();
    delete globalThis.location;
  }
}

// ---------------------------------------------------------------- part 1: real server
async function serverTests() {
  const buildUrl = (room) => `${BASE}/ws?room=${PREFIX}${room.replace('-', '')}`;
  const clockA = new ClockSync();
  let helloNick = 'Ana';
  const a = new NetClient({
    getHello: () => ({ nick: helloNick, character: 'gato', palette: 'rosa' }),
    watchVisibility: false,
    clock: clockA,
    buildUrl,
  });
  const room = `${PREFIX}main`;
  const statuses = [];
  a.on('status', (i) => statuses.push(i.status));
  a.connect();
  ok(a.status === 'connecting', 'A is connecting right after connect()');
  const wa = await waitEvent(a, 'welcome');
  ok(wa !== null && a.status === 'online', 'A: welcome received, status online');
  ok(wa && typeof wa.id === 'string' && a.selfId === wa.id, 'A: selfId stored from welcome');
  ok(a.nick === 'Ana', `A: server nick adopted (${a.nick})`);
  ok(a.connectedCount === 1, 'A: connectedCount is 1 alone');
  ok(clockA.synced && Math.abs(clockA.targetOffset) < 2000, `A: clock synced (offset ${Math.round(clockA.targetOffset)} ms)`);
  await sleep(300);
  ok(clockA.rtt >= 0 && clockA.rtt < 1000, `A: RTT refined by the JSON ping (${clockA.rtt} ms)`);
  ok(statuses[0] === 'connecting' && statuses.includes('online'), 'A: status events connecting -> online');

  // B joins the same room
  const b = new Plain(room);
  await b.opened;
  const joinP = waitEvent(a, 'join');
  b.send({ t: 'hello', v: 1, nick: 'Beto', character: 'dino', palette: 'verde' });
  const wb = await b.wait((m) => m.t === 'welcome');
  ok(wb && wb.peers.length === 1 && wb.peers[0].nick === 'Ana' && wb.peers[0].character === 'gato', 'B sees A (nick/character) in welcome');
  const join = await joinP;
  ok(join && join.nick === 'Beto' && join.character === 'dino', 'A gets the join event of B');
  ok(a.connectedCount === 2 && a.presence.get(join.id)?.nick === 'Beto', 'A: presence tracks B (count 2)');

  // movement both ways
  const stateP = waitEvent(a, 'state', (s) => s.p.some((t) => t[0] === wb.id));
  b.send({ t: 'pos', x: 5, z: -3, h: 1.5, s: 0.8 });
  const st = await stateP;
  const tup = st?.p.find((t) => t[0] === wb.id);
  ok(tup && tup[1] === 5 && tup[2] === -3 && tup[4] === 0.8, 'A receives B movement in a state batch');
  ok(st && typeof st.st === 'number' && st.recvAt > 0, 'state carries server time and receive time');
  ok(a.sendPos(10, 11, 0.5, 0.5) === true, 'A sends pos');
  const bState = await b.wait((m) => m.t === 'state' && m.p.some((t) => t[0] === wa.id && t[1] === 10));
  const mine = bState?.p.find((t) => t[0] === wa.id);
  ok(mine && mine[1] === 10 && mine[2] === 11, 'B receives A movement');

  // appearance both ways
  ok(a.sendAppearance('programadora', 'dorado') === true, 'A sends appearance');
  const app = await b.wait((m) => m.t === 'appearance' && m.id === wa.id);
  ok(app && app.character === 'programadora' && app.palette === 'dorado', 'B sees A appearance change');
  const appP = waitEvent(a, 'appearance');
  b.send({ t: 'appearance', character: 'turista', palette: 'nocturno' });
  const ea = await appP;
  ok(ea && ea.character === 'turista' && a.presence.get(ea.id)?.palette === 'nocturno', 'A sees B appearance change (presence updated)');

  // rename (server sanitised version wins) and chat
  const renameSelf = waitEvent(a, 'rename', (r) => r.self);
  ok(a.sendRename('Anita') === true, 'A sends rename');
  const rs = await renameSelf;
  ok(rs && rs.nick === 'Anita' && a.nick === 'Anita', 'A gets its own rename echo');
  helloNick = 'Anita'; // what MapOnline does: the stored nick is read again on every connection
  const rn = await b.wait((m) => m.t === 'rename' && m.id === wa.id);
  ok(rn && rn.nick === 'Anita', 'B sees A rename');
  const chatP = waitEvent(a, 'chat');
  ok(a.sendChat('hola a todos') === true, 'A sends chat');
  const chat = await chatP;
  ok(chat && chat.self === true && chat.text === 'hola a todos' && chat.nick === 'Anita', 'A gets its chat echo flagged as self');
  const bChat = await b.wait((m) => m.t === 'chat');
  ok(bChat && bChat.nick === 'Anita', 'B receives the chat');
  await sleep(2100); // chat rate limit: one message every 2 s
  const errP = waitEvent(a, 'error');
  a.sendChat('mi mail es juan@example.com');
  const err = await errP;
  ok(err && err.code === 'filtered' && err.message.length > 0, 'filtered chat yields an error event with a Spanish message');
  ok(a.status === 'online', 'a filtered message does not drop the connection');

  // B leaves
  const leaveP = waitEvent(a, 'leave');
  b.close();
  const lv = await leaveP;
  ok(lv && lv.id === wb.id && a.connectedCount === 1, 'A gets leave and the count drops');

  // reconnect after the socket is killed
  const oldId = a.selfId;
  const b2 = new Plain(room);
  await b2.opened;
  b2.send({ t: 'hello', v: 1, nick: 'Cami', character: 'robot', palette: 'clasico' });
  await b2.wait((m) => m.t === 'welcome');
  const offlineP = waitEvent(a, 'status', (i) => i.status === 'offline', 2000);
  a._ws.close(); // the connection dies underneath the client
  const off = await offlineP;
  ok(off !== null && off.count === 0, 'A goes offline with count 0 when the socket dies');
  ok(a.presence.count === 0, 'presence is cleared while offline');
  const again = await waitEvent(a, 'welcome', () => true, 5000);
  ok(again !== null && a.status === 'online', 'A reconnects by itself (backoff ~1 s)');
  ok(a.selfId !== oldId, 'A gets a new id after reconnecting');
  ok(a.nick === 'Anita', 'A rejoins with the renamed nick (getHello is read again)');
  ok(a.presence.peers.size === 1, 'A sees Cami again after reconnecting');
  const bLeave = await b2.wait((m) => m.t === 'leave' && m.id === oldId);
  ok(bLeave !== null, 'peers saw the old session leave');

  // clean disconnect
  const joins = [];
  b2.waiters.push({ pred: (m) => (m.t === 'join' ? (joins.push(m), false) : false), resolve: () => {} });
  const idNow = a.selfId;
  const leave2 = b2.wait((m) => m.t === 'leave' && m.id === idNow);
  a.disconnect();
  ok(a.status === 'idle' && a.connectedCount === 0, 'disconnect() leaves the client idle');
  ok((await leave2) !== null, 'peers see the leave after disconnect()');
  await sleep(2500);
  ok(a.status === 'idle' && joins.length === 0, 'no reconnection after a deliberate disconnect()');
  ok(a.sendPos(0, 0, 0, 0) === false, 'nothing is sent while disconnected');
  a.dispose();
  b2.close();
  await sleep(100);
}

// ---------------------------------------------------------------- main
const up = await serverUp();
if (!up) {
  if (REQUIRE) {
    console.error(`FAIL: no server on ${HTTP} (start it with: npm run dev:server)`);
    process.exit(1);
  }
  console.log(`SKIP: no server on ${HTTP}; running the fake-socket checks only`);
}
await fakeTests();
if (up) await serverTests();

console.log(`check-client-net: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
