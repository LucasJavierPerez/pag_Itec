/**
 * Profanity / slur / sexual / violence word lists (Rioplatense Spanish + common English insults).
 * Every entry is stored ALREADY normalised: lowercase, accents stripped, no separators. They are
 * run through `normalizeForMatch` again at load time (leetspeak, repeated letters), so keep them
 * plain letters. Matching is token based (see moderation.ts):
 *  - EXACT: the whole token must equal an entry (used for words that are prefixes of innocent ones,
 *    e.g. "pija" vs "pijama", "sexo" vs "sexto", "orto" vs "ortografia").
 *  - PREFIX: the token must START with the stem (never matches in the middle of a word, so
 *    "computadora" / "disputa" are safe even though they contain "puta").
 *  - PHRASES: multi-word expressions matched on whole-word boundaries.
 */

const w = (s: string): string[] => s.split(/\s+/).filter(Boolean);

export const PROFANITY_PREFIX: readonly string[] = w(`
  puta puto pute hijoput hijaput hijodeput hijadeput putamadre
  mierd pelotud pelotu bolud boludez pendej cagon cagad cagar cagas
  chupala chupapij poronga pijud culiad culia culon culazo culito
  conchud conchatu conchuda garch masturb orgasm eyacul pornogra prostitut
  gilastr gilipoll cabron hostia cojon maricon sudaca negrata pedofil sodomi
  idiota estupid imbecil tarad retrasad subnormal mamada trolo
  boludo pajer fuck motherfuck shit bitch bastard asshole whore slut fagg
  retard douche cocksuck cocain narcotraf
`);

export const PROFANITY_EXACT: readonly string[] = w(`
  hdp lpm ctm lpqtp lcdtm lpmqtp ptm mrd hijodeputa
  pija pijas pito pitos verga vergas vergon vergota
  choto chotos chota poronga porongas pete petes
  culo culos concha conchas orto ortos ortiva ortivas
  teta tetas tetona tetonas tetitas tetita nude nudes desnuda desnudas
  vagina vaginas pene penes vulva clitoris semen anal sexo sexy sexual sexting sex porno porn
  coger cogi cogiendo cogemos cogida cogido cogerte cogerme cojer follar folla
  garcha garchar carajo carajos cago caga cagaste cagamos cagaron
  zorra zorras golfa golfas ramera rameras turra turras trola trolas cornudo cornuda pirobo piroba
  mongo mongolico mongolica mongolica marica maricas joto sidoso sidosa
  mamon mamona inutil lacra pajero pajera pajeros pajeras
  gilipollas capullo capullos
  joder jodete jodido jodida jodan jodas jodiste
  sorete soretes forro forra forros forras
  nazi nazis violar violo violador violadores abusador abusadores pedofilo pedofila
  asesinar degollar apunalar matarte matarlos suicidarte suicidate
  cunt cunts dick dicks dickhead cock cocks pussy pussies fag fags faggot nigger niggers nigga niggas
  fck fuk fuq kys stfu rape raped raping rapist wanker twat jackass dumbass boobs piss pissed
`);

export const PROFANITY_PHRASES: readonly string[] = [
  'te voy a matar',
  'te vamos a matar',
  'te mato',
  'voy a matar',
  'matense',
  'morite',
  'ojala te mueras',
  'ojala te mueran',
  'te voy a violar',
  'te voy a pegar',
  'te voy a romper',
  'te voy a cagar a palos',
  'andate a la mierda',
  'la puta que te pario',
  'la concha de tu madre',
  'la concha de tu hermana',
  'chupame la',
  'chupa pija',
  'comeme',
  'hijo de re mil puta',
  'son of a bitch',
  'kill yourself',
  'go die',
  'me quiero matar',
  'me voy a matar',
  'quiero morirme',
  'quiero morir',
  'me quiero morir',
];
