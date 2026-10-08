# Online map: architecture and operations

The "Mapa" tab can show other visitors in real time and offers a small text chat. It is optional:
without a connection (or after choosing "Jugar sin conexión") the map works exactly as before.

## Architecture

- **Client** (`src/Experience/Map/net/*`, `src/UI/chat/*`, `src/Experience/Map/ChatBubbles.ts`):
  `MapOnline` owns a lazy `NetClient` (WebSocket, reconnect with backoff, clock sync), the nickname
  and the consent prompt. It publishes window events (`net-status`, `net-chat`, `net-system`,
  `net-error`, `net-nick`) consumed by `ChatStore` (messages, unread, mutes), `ChatPanel` (UI) and
  `ChatBubbles` (speech bubbles above the characters).
- **Server** (`server/`): a Cloudflare Worker routes `/ws` and `/health`; every other path is served
  from the static assets (`wrangler.jsonc`, `run_worker_first`). One Durable Object class (`MapRoom`,
  SQLite-backed, migration tag `v1`) holds one room (`?room=main`, `main-2`, ... when full).
- **Shared** (`shared/`): `protocol.ts` (message types, limits, validators) and `moderation.ts`
  (chat and nickname rules) are imported by both sides.

## Protocol summary (`PROTOCOL_VERSION = 1`)

- Frames are JSON text, at most 1 KB. `hello` must arrive within 5 s of connecting.
- Client to server: `hello`, `pos` (about 10 per second while moving), `appearance`, `chat`,
  `secret`, `rename` (1 per 10 s), `ping`.
- Server to client: `welcome` (own id, nick, peers), `join`, `leave`, `state` (batched positions),
  `appearance`, `rename`, `chat` (also echoed to the sender), `system`, `error`, `pong`.
- Errors: `bad_message`, `filtered`, `rate_limited`, `room_full`, `bad_origin`, `bad_version`,
  `too_many_connections`. Rejected chats are reported to the sender only.

## Limits and cost notes

- Room capacity `ROOM_CAP = 40`; 3 chat strikes in 60 s mute a sender for 30 s; 20 malformed frames
  close the socket.
- Chat: 140 characters, one token every 2 s (burst of 2). Nothing is persisted, there is no history.
- Position updates are the main cost (inbound messages bill 20:1). The client stops sending while
  standing still and the room only ticks while someone moves and at least two sockets are open.
  Idle rooms hibernate.
- Tunables: `net/NetClient.ts`, `net/backoff.ts`, `net/interpolation.ts`, `MapOnline.ts`
  (`POS_INTERVAL_MS`), `ChatBubbles.ts` (lifetime, pool size), `ChatStore.ts` (history size, bursts).

## Moderation rules

The server is authoritative; the client only pre-checks with the same `checkChat` for fast feedback.
Messages are rejected when they contain phone or ID numbers, e-mails, links, requests to move to
another app, profanity, long repetitions or mostly capital letters. Nicknames are sanitised and made
unique per room. All user text is rendered with `textContent`. Players can mute anyone for the
session (kept in `sessionStorage`, never sent anywhere). The chat shows a privacy reminder.

## Run locally

```bash
npm run dev:server   # Worker + Durable Object on http://localhost:8787
npm run dev          # Vite client (connects to the local Worker for /ws)
```

Open two browser tabs on the Mapa tab to see each other. Useful checks: `npm run check:chat`,
`check:net`, `check:moderation`, and, with the dev server running, `check:room -- --require` and
`check:clientnet -- --require`.

## Deploy

`npm run build` creates `dist/`; `npx wrangler deploy` publishes the Worker and the assets together
(Cloudflare Workers Builds runs both on every push to `main`). The Durable Object migration `v1` is
applied on the first deploy. Roll back by reverting the merge commit; an unused migration is harmless.
