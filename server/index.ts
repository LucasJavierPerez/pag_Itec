import { DEFAULT_ROOM, PROTOCOL_VERSION, sanitizeRoomName } from '../shared/protocol.ts';
import type { Env } from './env.ts';

export { MapRoom } from './MapRoom.ts';

function isLocalHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

/** Browsers always send Origin on WebSocket upgrades; allow same host and local dev only. */
export function originAllowed(request: Request): boolean {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  if (!origin) return isLocalHost(url.hostname);
  try {
    const o = new URL(origin);
    return o.host === url.host || isLocalHost(o.hostname);
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/ws') {
      if (request.method !== 'GET' || request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
        return new Response('Se esperaba una conexión WebSocket.', { status: 426 });
      }
      if (!originAllowed(request)) return new Response('Origen no permitido.', { status: 403 });
      const room = sanitizeRoomName(url.searchParams.get('room') ?? DEFAULT_ROOM);
      const stub = env.MAP_ROOM.get(env.MAP_ROOM.idFromName(room));
      return stub.fetch(request);
    }

    if (url.pathname === '/health') {
      return Response.json(
        { ok: true, protocol: PROTOCOL_VERSION },
        { headers: { 'Cache-Control': 'no-store' } },
      );
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
