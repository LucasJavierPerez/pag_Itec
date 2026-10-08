// Headless checks for shared/moderation.ts + shared/protocol.ts. Run with:
//   node --experimental-strip-types scripts/check-moderation.mjs
import { checkChat, hasProfanity, normalizeForMatch, sanitizeNick, generateNick } from '../shared/moderation.ts';
import {
  CHARACTER_IDS,
  PALETTE_IDS,
  MAX_CHAT,
  MAX_NICK,
  parseClientMessage,
  sanitizeRoomName,
} from '../shared/protocol.ts';
import { readFileSync } from 'node:fs';

let pass = 0;
let fail = 0;
function ok(cond, label) {
  if (cond) pass++;
  else {
    fail++;
    console.error('FAIL:', label);
  }
}
const allowed = (t) => checkChat(t).ok === true;
const blocked = (t, reason) => {
  const r = checkChat(t);
  return r.ok === false && (reason === undefined || r.reason === reason);
};

// ---- allowed normal chat
for (const t of [
  'hola, ¿qué carrera me recomiendan?',
  'Desarrollo de Software es genial',
  'me encanta el mapa',
  'Buenísimo el robot!!',
  'jajajaja que bueno',
  'ja ja ja ja ja',
  'vamos a la plaza del ITEC',
  'Hay clases el lunes 12 a las 8?',
  'estoy en 3er año de la secundaria',
  'el año que viene empiezo mecatrónica',
  'qué lindo está el sector de computadoras',
  'soy analista de sistemas',
  'hay una disputa por el lugar',
  'Scunthorpe es una ciudad de Inglaterra',
  'me puse el pijama',
  'estudio en sexto año',
  'la ortografía es importante',
  'la cassette se pasó de moda',
  'hola, ¿alguien sabe dónde está el laboratorio?',
  'ñandú y pingüino',
  'ASDF gracias por la ayuda a todos',
]) ok(allowed(t), `allowed: ${t}`);

// ---- phones / digits
ok(blocked('mi cel es 3584123456', 'phone'), 'phone plain');
ok(blocked('llamame al 0358 412-3456', 'phone'), 'phone 0358 spaced');
ok(blocked('+54 9 358 4123456', 'phone'), 'phone +54');
ok(blocked('(0358) 4-123-456', 'phone'), 'phone parentheses');
ok(blocked('3 5 8 4 1 2 3 4 5 6', 'phone'), 'phone single digits spaced');
ok(blocked('whatsapp 358.412.3456', undefined), 'whatsapp style');
ok(blocked('mi dni es 12345678'), 'dni digits');
ok(blocked('codigo 123456', 'digits'), 'six digit string');
ok(blocked('cero tres cinco ocho cuatro uno dos tres', 'phone'), 'spelled digits');

// ---- e-mail
ok(blocked('escribime a juan@gmail.com', 'email'), 'email plain');
ok(blocked('juan arroba gmail punto com', 'email'), 'email arroba');
ok(blocked('pepe (at) hotmail . com', 'email'), 'email (at)');
ok(blocked('mi mail es pepe@algo.com.ar', 'email'), 'email domain.ar');

// ---- links
ok(blocked('entrá a https://sitio.com/x', 'link'), 'https');
ok(blocked('www.algo.net', 'link'), 'www');
ok(blocked('mirá esto sitio.com', 'link'), 'domain.com');
ok(blocked('mirá esto sitio punto com', 'link'), 'punto com');
ok(blocked('entra a discord.gg/abc'), 'discord.gg');
ok(blocked('t.me/canal'), 't.me');
ok(blocked('wa.me/549358'), 'wa.me');
ok(blocked('bit.ly/xyz'), 'bit.ly');

// ---- contact asks
ok(blocked('pasame tu insta', 'contact'), 'pasame tu insta');
ok(blocked('dame tu whatsapp', 'contact'), 'dame tu whatsapp');
ok(blocked('mi tiktok es lucas', 'contact'), 'mi tiktok');
ok(blocked('agregame al snap'), 'agregame snap');
ok(blocked('donde vivis?', 'contact'), 'donde vivis');
ok(allowed('me gusta ver videos'), 'no contact false positive');

// ---- repetition / caps
ok(blocked('holaaaaaaaaaa', 'repetition'), 'char repetition');
ok(blocked('si si si si', 'repetition'), 'word repetition');
ok(allowed('holaaaa'), 'mild repetition allowed');
ok(blocked('ESTO ES UN MENSAJE GRITADO', 'caps'), 'caps');
ok(allowed('ITEC es genial'), 'short caps ok');
ok(blocked('', 'empty') && blocked('    ', 'empty') && blocked('​​', 'empty'), 'empty / invisible');
ok(blocked('a'.repeat(141).replace(/a{3}/g, 'abc'), 'too_long'), 'too long');
ok(checkChat('x'.repeat(5) + ' ' + 'hola'.repeat(1)).ok, 'short ok');

// ---- profanity (plain, accents, leetspeak, separators, repeats)
for (const t of [
  'sos un pelotudo',
  'qué boludo que sos',
  'hijo de puta',
  'hijoputa',
  'andá a la mierda',
  'p.u.t.a',
  'p u t a madre',
  'pvta'.replace('v', 'u'),
  'put4',
  'm13rd4',
  'puuuuta',
  'b0lud0',
  'P3L0TUD0',
  'cul0',
  'la concha de tu madre',
  'hdp',
  'HDP!!',
  'lpm',
  'te voy a matar',
  'fuck you',
  'f.u.c.k',
  'sh1t',
  'qué pijaaa',
  'sexo',
  'mandame nudes',
  'trolo de mierda',
  'sudaca',
]) ok(hasProfanity(t) || blocked(t), `profanity: ${t}`);
ok(blocked('sos un PELOTUDO', 'profanity'), 'profanity uppercase');
ok(blocked('sos un pelotúdo', 'profanity'), 'profanity accent');
ok(!hasProfanity('computadora'), 'fp computadora');
ok(!hasProfanity('analista'), 'fp analista');
ok(!hasProfanity('Scunthorpe'), 'fp scunthorpe');
ok(!hasProfanity('disputa'), 'fp disputa');
ok(!hasProfanity('pijama'), 'fp pijama');
ok(!hasProfanity('sexto'), 'fp sexto');
ok(!hasProfanity('ortografia'), 'fp ortografia');
ok(!hasProfanity('cassette'), 'fp cassette');
ok(!hasProfanity('mongolia'), 'fp mongolia');
ok(!hasProfanity('tetera'), 'fp tetera');
ok(!hasProfanity('puerta'), 'fp puerta');
ok(!hasProfanity('assistant classic bass'), 'fp english');

// ---- normalizeForMatch
ok(normalizeForMatch('P.U.T.A') === 'puta', 'normalize separators');
ok(normalizeForMatch('Cañón') === 'canon', 'normalize accents');
ok(normalizeForMatch('m13rd4') === 'mierda', 'normalize leet');
ok(normalizeForMatch('hooolaaa') === 'hola', 'normalize repeats');
ok(normalizeForMatch(normalizeForMatch('P.u@T4  x')) === normalizeForMatch('P.u@T4  x'), 'normalize idempotent');

// ---- chat output is normalised
{
  const r = checkChat('  hola ​  che‮  ');
  ok(r.ok && r.text === 'hola che', 'chat whitespace + invisibles stripped');
  const r2 = checkChat('x'.repeat(0) + 'a'.repeat(0) + 'hola'.padEnd(4));
  ok(r2.ok && r2.text === 'hola', 'chat trim');
  ok(checkChat(r.text).ok && checkChat(r.text).text === r.text, 'chat idempotent');
  ok(checkChat(42).ok === false, 'non-string chat');
  const long = ('hola que tal ' + 'bien '.repeat(30)).slice(0, MAX_CHAT);
  ok(blocked('palabra '.repeat(3) + 'xyz'.repeat(60), 'too_long'), 'long rejected');
  ok(long.length <= MAX_CHAT, 'sanity');
}

// ---- nick sanitization
ok(sanitizeNick('Lucas') === 'Lucas', 'nick plain');
ok(sanitizeNick('  María   José  ') === 'María José', 'nick spaces + accents');
ok(sanitizeNick('Ñandú_99') === 'Ñandú_99', 'nick ñ digits underscore');
ok(sanitizeNick('Lu\u0000ca\u0007s') === 'Lucas', 'nick control chars');
ok(sanitizeNick('Lu​cas‏') === 'Lucas', 'nick zero-width');
ok(sanitizeNick('‮admin') === 'admin', 'nick rtl override');
ok(/^Visitante\d{4}$/.test(sanitizeNick('😀😀😀')), 'nick emoji-only');
ok(/^Visitante\d{4}$/.test(sanitizeNick('')), 'nick empty');
ok(/^Visitante\d{4}$/.test(sanitizeNick('   ')), 'nick blank');
ok(/^Visitante\d{4}$/.test(sanitizeNick(null)), 'nick null');
ok(/^Visitante\d{4}$/.test(sanitizeNick('...')), 'nick punctuation-only');
ok(sanitizeNick('A'.repeat(40)).length === MAX_NICK, 'nick truncated');
ok([...sanitizeNick('abcdefghijklmnopq')].length === MAX_NICK, 'nick 17 chars truncated');
ok(/^Visitante\d{4}$/.test(sanitizeNick('pelotudo')), 'nick profanity');
ok(/^Visitante\d{4}$/.test(sanitizeNick('p.u.t.a')), 'nick profanity separators');
ok(/^Visitante\d{4}$/.test(sanitizeNick('3584123456')), 'nick phone');
ok(/^Visitante\d{4}$/.test(sanitizeNick('a@b.com')), 'nick email chars');
ok(sanitizeNick('<b>Hi</b>') === 'bHib', 'nick html stripped');
ok(sanitizeNick('Привет') !== 'Привет', 'nick non-latin rejected');
ok(generateNick(7) === 'Visitante0007' && sanitizeNick('', 7) === 'Visitante0007', 'generated deterministic with seed');
for (const n of ['Lucas', '  María   José  ', 'A'.repeat(40), '😀', 'pelotudo', 'Lu​cas', 'x y z', 'a_b-c.d']) {
  const once = sanitizeNick(n, 1);
  ok(sanitizeNick(once, 1) === once, `nick idempotent: ${JSON.stringify(n)}`);
}

// ---- protocol parser + id lists staying in sync with the client modules
ok(parseClientMessage('{"t":"ping"}')?.t === 'ping', 'parse ping');
ok(parseClientMessage('{"t":"pos","x":1,"z":2,"h":0,"s":0.5}')?.t === 'pos', 'parse pos');
ok(parseClientMessage('{"t":"pos","x":"1","z":2,"h":0,"s":0.5}') === null, 'reject pos string');
ok(parseClientMessage('{"t":"pos","x":1e999,"z":2,"h":0,"s":0.5}') === null, 'reject infinite');
ok(parseClientMessage('not json') === null, 'reject bad json');
ok(parseClientMessage('[]') === null && parseClientMessage('{"t":"zzz"}') === null, 'reject unknown');
ok(parseClientMessage(JSON.stringify({ t: 'chat', text: 'a'.repeat(1100) })) === null, 'reject > 1KB frame');
ok(parseClientMessage('{"t":"hello","v":1,"nick":"a","character":"x","palette":"clasico"}') === null, 'reject bad character');
ok(sanitizeRoomName('Main-2') === 'main-2' && sanitizeRoomName('a b') === 'main' && sanitizeRoomName(null) === 'main', 'room name');

const spec = readFileSync(new URL('../src/Experience/Map/characters/characterSpec.ts', import.meta.url), 'utf8');
const skins = readFileSync(new URL('../src/Experience/Map/skins/robotSkins.ts', import.meta.url), 'utf8');
const union = (src, name) => {
  const m = src.match(new RegExp(`type ${name}\\s*=([^;]+);`));
  return m ? [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]) : [];
};
ok(JSON.stringify(union(spec, 'CharacterId')) === JSON.stringify(CHARACTER_IDS), 'character ids in sync with src');
ok(JSON.stringify(union(skins, 'RobotSkinId')) === JSON.stringify(PALETTE_IDS), 'palette ids in sync with src');

console.log(`moderation: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
