// Integration check for the realtime server (Worker + MapRoom Durable Object).
//
// Requires a running dev server:   npm run dev:server        (wrangler dev on http://localhost:8787)
// Usage:   node scripts/check-room.mjs [--require] [--url ws://localhost:8787] [--cap N]
//  - If nothing listens on the URL the script prints SKIP and exits 0, unless --require is given.
//  - --cap N additionally tests the room cap; start the server with `wrangler dev --var ROOM_CAP:N`.
// Uses the Node >= 22 global WebSocket (no dependencies).

const args = process.argv.slice(2);
const REQUIRE = args.includes('--require');
const arg = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};
const BASE = arg('--url', 'ws://localhost:8787');
const CAP = Number(arg('--cap', '0'));
const HTTP = BASE.replace(/^ws/, 'http');
const ROOM = `t${Date.now().toString(36)}`;

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

class Client {
  constructor(room = ROOM, headers) {
    this.msgs = [];
    this.waiters = [];
    this.closed = null;
    this.ws = headers ? new WebSocket(`${BASE}/ws?room=${room}`, { headers }) : new WebSocket(`${BASE}/ws?room=${room}`);
    this.opened = new Promise((res) => {
      this.ws.addEventListener('open', () => res(true));
      this.ws.addEventListener('error', () => res(false));
    });
    this.ws.addEventListener('message', (e) => {
      let m;
      try {
        m = JSON.parse(e.data);
      } catch {
        m = { t: 'raw', data: e.data }; // keep-alive auto-response is the plain text "pong"
      }
      this.msgs.push(m);
      for (const w of [...this.waiters]) if (w.pred(m)) w.resolve(m);
    });
    this.closeP = new Promise((res) => this.ws.addEventListener('close', (e) => ((this.closed = e.code), res(e.code))));
  }
  send(o) {
    this.ws.send(typeof o === 'string' ? o : JSON.stringify(o));
  }
  /** Resolves with the first message (already received or future) matching pred, or null on timeout. */
  wait(pred, ms = 1500, from = 0) {
    const hit = this.msgs.slice(from).find(pred);
    if (hit) return Promise.resolve(hit);
    return new Promise((resolve) => {
      const w = { pred, resolve: (m) => (clearTimeout(timer), this.waiters.splice(this.waiters.indexOf(w), 1), resolve(m)) };
      const timer = setTimeout(() => (this.waiters.splice(this.waiters.indexOf(w), 1), resolve(null)), ms);
      this.waiters.push(w);
    });
  }
  count(pred) {
    return this.msgs.filter(pred).length;
  }
  close() {
    try {
      this.ws.close(1000);
    } catch {
      /* ignore */
    }
  }
}

const hello = (nick, character = 'robot', palette = 'clasico') => ({ t: 'hello', v: 1, nick, character, palette });

async function main() {
  // ---- reachability
  let health;
  try {
    health = await fetch(`${HTTP}/health`).then((r) => r.json());
  } catch {
    if (REQUIRE) {
      console.error(`FAIL: no server listening on ${HTTP} (start it with: npm run dev:server)`);
      process.exit(1);
    }
    console.log(`SKIP: no server listening on ${HTTP} (start it with: npm run dev:server)`);
    process.exit(0);
  }
  ok(health.ok === true && health.protocol === 1, 'health endpoint');

  // ---- A joins
  const a = new Client();
  ok(await a.opened, 'A connects');
  a.send(hello('Ana​‮ López', 'programadora', 'azul-itec'));
  const wa = await a.wait((m) => m.t === 'welcome');
  ok(wa && wa.v === 1 && typeof wa.id === 'string' && wa.room === ROOM && Array.isArray(wa.peers), 'A welcome shape');
  ok(wa && Math.abs(wa.serverTime - Date.now()) < 2000, 'serverTime close to local time');
  ok(wa && wa.peers.length === 0, 'A sees no peers');

  // ---- B and C join
  const b = new Client();
  await b.opened;
  b.send(hello('Beto', 'gato', 'rosa'));
  const wb = await b.wait((m) => m.t === 'welcome');
  ok(wb && wb.peers.length === 1 && wb.peers[0].id === wa.id, 'B welcome lists A');
  const peerA = wb?.peers[0];
  ok(peerA && peerA.nick === 'Ana López' && peerA.character === 'programadora' && peerA.palette === 'azul-itec', 'nick sanitised, appearance kept');
  const joinB = await a.wait((m) => m.t === 'join' && m.peer.id === wb.id);
  ok(joinB && joinB.peer.nick === 'Beto' && joinB.peer.character === 'gato', 'A receives join of B');
  ok(await a.wait((m) => m.t === 'system' && m.kind === 'join' && m.text.includes('Beto')), 'join system line');

  const c = new Client();
  await c.opened;
  c.send(hello('Cami', 'dino', 'verde'));
  const wc = await c.wait((m) => m.t === 'welcome');
  ok(wc && wc.peers.length === 2, 'C welcome lists two peers');
  await a.wait((m) => m.t === 'join' && m.peer.id === wc.id);

  // ---- position -> compact state within 400 ms
  const t0 = Date.now();
  const from = b.msgs.length;
  a.send({ t: 'pos', x: 12.345, z: -7.5, h: 1.5, s: 0.8 });
  const st = await b.wait((m) => m.t === 'state' && m.p.some((p) => p[0] === wa.id), 400, from);
  ok(!!st, 'state reaches B within 400 ms');
  const tup = st?.p.find((p) => p[0] === wa.id);
  ok(Array.isArray(tup) && tup.length === 5 && tup[1] === 12.35 && tup[2] === -7.5 && tup[3] === 1.5 && tup[4] === 0.8, 'compact tuple [id,x,z,h,s]');
  ok(st && typeof st.st === 'number', 'state has st');
  ok(Date.now() - t0 < 600, 'state latency sane');
  // out of bounds is clamped
  a.send({ t: 'pos', x: 9999, z: -9999, h: 0, s: 5 });
  const st2 = await b.wait((m) => m.t === 'state' && m.p.some((p) => p[0] === wa.id && p[1] >= 50), 400, from + 1);
  const tup2 = st2?.p.find((p) => p[0] === wa.id);
  ok(tup2 && tup2[1] <= 60 && tup2[2] >= -40 && tup2[4] === 1, 'position clamped to map bounds, speed to 0..1');

  // ---- appearance propagates
  a.send({ t: 'appearance', character: 'tecnico', palette: 'dorado' });
  const ap = await b.wait((m) => m.t === 'appearance' && m.id === wa.id);
  ok(ap && ap.character === 'tecnico' && ap.palette === 'dorado', 'appearance change propagates');
  b.send({ t: 'appearance', character: 'nope', palette: 'dorado' });
  ok(await b.wait((m) => m.t === 'error' && m.code === 'bad_message'), 'invalid appearance rejected');

  // ---- chat
  const ca = a.msgs.length;
  a.send({ t: 'chat', text: 'hola, ¿qué carrera me recomiendan?' });
  const cb = await b.wait((m) => m.t === 'chat');
  const cc = await c.wait((m) => m.t === 'chat');
  const cs = await a.wait((m) => m.t === 'chat', 1500, ca);
  ok(cb && cc && cs, 'chat broadcast to all incl. sender');
  ok(cb && cb.id === wa.id && cb.nick === 'Ana López' && cb.text === 'hola, ¿qué carrera me recomiendan?' && Math.abs(cb.ts - Date.now()) < 2000, 'chat uses server id/nick/ts');

  // second chat inside 2 s -> rate limited (also the filtered ones consume tokens, so wait for refill)
  const r0 = a.msgs.length;
  a.send({ t: 'chat', text: 'otro mensaje enseguida' });
  ok(await a.wait((m) => m.t === 'error' && m.code === 'rate_limited', 1500, r0), 'second chat within 2 s -> rate_limited');
  ok(b.count((m) => m.t === 'chat') === 1, 'rate-limited chat not broadcast');

  // filtered chats from B (own bucket): phone, link, profanity
  for (const [text, label] of [
    ['llamame al 3584123456', 'phone'],
    ['entra a https://sitio.com', 'link'],
    ['sos un pelotudo', 'profanity'],
  ]) {
    await sleep(2100);
    const f0 = b.msgs.length;
    const before = a.count((m) => m.t === 'chat');
    b.send({ t: 'chat', text });
    const err = await b.wait((m) => m.t === 'error' && m.code === 'filtered', 1500, f0);
    await sleep(150);
    ok(!!err, `filtered ${label}: sender gets error filtered`);
    ok(a.count((m) => m.t === 'chat') === before, `filtered ${label}: not broadcast`);
    ok(err && typeof err.message === 'string' && err.message.length > 5, `filtered ${label}: Spanish message`);
  }

  // ---- rename
  b.send({ t: 'rename', nick: 'Beto\u0007 Nuevo' });
  const rn = await a.wait((m) => m.t === 'rename' && m.id === wb.id);
  ok(rn && rn.nick === 'Beto Nuevo', 'rename sanitised + broadcast');
  b.send({ t: 'rename', nick: 'Otro' });
  ok(await b.wait((m) => m.t === 'error' && m.code === 'rate_limited'), 'rename rate limited');

  // ---- secret once
  c.send({ t: 'secret', id: 'ada' });
  const sec = await a.wait((m) => m.t === 'system' && m.kind === 'secret');
  ok(sec && sec.text === 'Cami descubrió el secreto de Ada', 'secret system line');
  c.send({ t: 'secret', id: 'ada' });
  await sleep(300);
  ok(a.count((m) => m.t === 'system' && m.kind === 'secret') === 1, 'repeated secret does not repeat');

  // ---- bad JSON / unknown
  c.send('this is not json');
  ok(await c.wait((m) => m.t === 'error' && m.code === 'bad_message'), 'bad JSON -> bad_message');
  c.send({ t: 'nope' });
  await sleep(100);
  ok(c.count((m) => m.t === 'error' && m.code === 'bad_message') >= 2, 'unknown type -> bad_message');
  c.send('x'.repeat(2000));
  await sleep(150);
  ok(c.count((m) => m.t === 'error' && m.code === 'bad_message') >= 3, 'oversized frame -> bad_message');

  // ---- ping/pong
  const p0 = b.msgs.length;
  b.send('ping');
  ok(await b.wait((m) => m.t === 'raw' && m.data === 'pong', 1000, p0), 'raw "ping" -> raw "pong" (auto-response)');
  b.send({ t: 'ping' });
  ok(await b.wait((m) => m.t === 'pong', 1000, p0), 'JSON ping -> pong');

  // ---- leave broadcast
  c.close();
  const lv = await a.wait((m) => m.t === 'leave' && m.id === wc.id);
  ok(!!lv, 'leave broadcast on close');
  ok(await a.wait((m) => m.t === 'system' && m.kind === 'leave' && m.text.includes('Cami')), 'leave system line');

  // ---- bad version / hello timeout / pre-hello garbage
  const v = new Client(`${ROOM}-v`);
  await v.opened;
  v.send({ t: 'hello', v: 99, nick: 'x', character: 'robot', palette: 'clasico' });
  ok(await v.wait((m) => m.t === 'error' && m.code === 'bad_version'), 'bad version error');
  await v.closeP;
  ok(v.closed !== null, 'bad version closes');
  const nh = new Client(`${ROOM}-h`);
  await nh.opened;
  nh.send({ t: 'chat', text: 'hola' });
  ok(await nh.wait((m) => m.t === 'error' && m.code === 'bad_message'), 'message before hello rejected');
  // Alarm-initiated closes reach Node's undici client late under `wrangler dev` (~10 s after the
  // frame), so closure is asserted at the end while the other checks run.
  const nhClosed = Promise.race([nh.closeP, sleep(18000).then(() => null)]);
  ok(await nh.wait((m) => m.t === 'error', 7000, 1), 'hello timeout: server answers an error after ~5 s');

  // ---- origin check (headers supported by undici's WebSocket)
  const bad = new Client(`${ROOM}-o`, { Origin: 'https://evil.example' });
  const badOpened = await bad.opened;
  ok(badOpened === false, 'foreign Origin rejected on upgrade');
  const good = new Client(`${ROOM}-o`, { Origin: 'http://localhost:5173' });
  ok(await good.opened, 'localhost Origin accepted');
  good.close();

  // ---- per-IP cap: the 6th concurrent connection gets too_many_connections
  // (skipped when --cap <= 5: the lowered room cap would answer room_full first)
  let sixthClosed = Promise.resolve(true);
  if (!(CAP > 0 && CAP <= 5)) {
  const ipc = [];
  for (let i = 0; i < 5; i++) {
    const k = new Client(`${ROOM}-ip`);
    ipc.push(k);
    await k.opened;
  }
  const sixth = new Client(`${ROOM}-ip`);
  await sixth.opened;
  ok(await sixth.wait((m) => m.t === 'error' && m.code === 'too_many_connections'), '6th connection from same IP -> too_many_connections');
  sixthClosed = Promise.race([sixth.closeP, sleep(18000).then(() => null)]);
  ipc.forEach((k) => k.close());
  }

  // ---- optional room cap
  if (CAP > 0) {
    const room = `${ROOM}-cap`;
    const fill = [];
    for (let i = 0; i < CAP; i++) {
      const k = new Client(room);
      fill.push(k);
      await k.opened;
      k.send(hello(`P${i}`));
      await k.wait((m) => m.t === 'welcome');
    }
    const over = new Client(room);
    await over.opened;
    ok(await over.wait((m) => m.t === 'error' && m.code === 'room_full'), `room cap ${CAP}: room_full`);
    fill.forEach((k) => k.close());
    over.close();
  } else {
    console.log('note: room cap not tested (run `wrangler dev --var ROOM_CAP:3` and pass --cap 3)');
  }

  ok((await nhClosed) !== null, 'hello timeout closes the socket');
  ok((await sixthClosed) !== null, '6th connection gets closed');

  // ---- idle: after everyone leaves nothing breaks
  a.close();
  b.close();
  await sleep(200);

  console.log(`room: ${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
