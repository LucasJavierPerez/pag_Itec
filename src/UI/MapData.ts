import { careerData } from './CareerData.ts';

/**
 * Content of the "Mapa" tab. Facts come from the official site (itecriocuarto.org.ar,
 * consulted on 2026-10-06). Career entries reuse `careerData` so the strings live in one place.
 */

export type MapCategory = 'sede' | 'carrera' | 'servicio' | 'trayecto' | 'secundario' | 'contacto';

export type DistrictId = 'sedes' | 'carreras' | 'innovacion' | 'cursos' | 'secundario';

/** Keys of the canvas-drawn pictograms (see Map/labels.ts). */
export type MapIcon =
  | 'school'
  | 'campus'
  | 'code'
  | 'brain'
  | 'plane'
  | 'chip'
  | 'megaphone'
  | 'flask'
  | 'book'
  | 'briefcase'
  | 'monitor'
  | 'cap'
  | 'gear'
  | 'phone';

export interface MapLink {
  label: string;
  url: string;
}

export interface MapPoint {
  id: string;
  name: string;
  category: MapCategory;
  icon: MapIcon;
  /** Hex color (#rrggbb). */
  accent: string;
  district: DistrictId;
  title: string;
  subtitle: string;
  /** Short pill text shown in the card and in the hover tooltip. */
  tag: string;
  description: string;
  highlights: string[];
  link?: MapLink;
}

export interface District {
  id: DistrictId;
  name: string;
  accent: string;
}

export const DISTRICTS: District[] = [
  { id: 'sedes', name: 'Sedes', accent: '#2980b9' },
  { id: 'carreras', name: 'Carreras', accent: '#8e44ad' },
  { id: 'innovacion', name: 'Innovación y empleo', accent: '#16a085' },
  { id: 'cursos', name: 'Cursos y oficios', accent: '#e67e22' },
  { id: 'secundario', name: 'Secundario', accent: '#c0392b' },
];

const BASE = 'https://www.itecriocuarto.org.ar';

interface CareerSpec {
  id: string;
  key: string;
  icon: MapIcon;
  path: string;
}

const CAREER_SPECS: CareerSpec[] = [
  { id: 'carrera-software', key: 'Desarrollo de Software', icon: 'code', path: '/carreras/software' },
  { id: 'carrera-ia', key: 'Inteligencia Artificial', icon: 'brain', path: '/carreras/inteligencia-artificial' },
  { id: 'carrera-turismo', key: 'Turismo y Hotelería', icon: 'plane', path: '/carreras/turismo' },
  { id: 'carrera-mecatronica', key: 'Mecatrónica', icon: 'chip', path: '/carreras/mecatronica' },
  { id: 'carrera-marketing', key: 'Marketing Digital', icon: 'megaphone', path: '/carreras/marketing-digital' },
];

function careerPoint(spec: CareerSpec): MapPoint {
  const info = careerData[spec.key];
  return {
    id: spec.id,
    name: info.title,
    category: 'carrera',
    icon: spec.icon,
    accent: info.color,
    district: 'carreras',
    title: info.title,
    subtitle: info.subtitle,
    tag: info.duration,
    description: info.description,
    highlights: info.highlights,
    link: { label: `Ver la carrera en itecriocuarto.org.ar →`, url: BASE + spec.path },
  };
}

const CAREER_POINTS = CAREER_SPECS.map(careerPoint);

export const MAP_POINTS: MapPoint[] = [
  {
    id: 'sede-centro',
    name: 'Sede Centro',
    category: 'sede',
    icon: 'school',
    accent: '#2980b9',
    district: 'sedes',
    title: 'Sede Centro',
    subtitle: 'Constitución 716 · Barrio Centro, Río Cuarto',
    tag: 'Sede',
    description:
      'Una de las dos sedes del instituto. Se encuentra en el Barrio Centro de Río Cuarto y atiende en dos turnos.',
    highlights: ['Mañana: 8:00 a 12:30', 'Tarde: 17:00 a 21:00', 'Constitución 716'],
    link: { label: 'Más info en itecriocuarto.org.ar →', url: BASE },
  },
  {
    id: 'sede-campus',
    name: 'Sede Campus',
    category: 'sede',
    icon: 'campus',
    accent: '#3498db',
    district: 'sedes',
    title: 'Sede Campus',
    subtitle: 'Wenceslao Tejerina Norte 783 · Barrio Villa Dalcar, Río Cuarto',
    tag: 'Sede',
    description: 'La segunda sede del instituto, ubicada en el Barrio Villa Dalcar de Río Cuarto.',
    highlights: ['Lunes a jueves: 19:00 a 22:00', 'Tejerina Norte 783'],
  },
  ...CAREER_POINTS,
  {
    id: 'itec-labs',
    name: 'iTec Labs',
    category: 'servicio',
    icon: 'flask',
    accent: '#16a085',
    district: 'innovacion',
    title: 'iTec Labs',
    subtitle: 'Programa integrado a la Tecnicatura en Desarrollo de Software',
    tag: 'Desde 2019',
    description:
      'Programa nacido en 2019, integrado a la Tecnicatura Superior en Desarrollo de Software. Estudiantes avanzados diseñan software a pedido de empresas y organizaciones, trabajando con metodología scrum en equipos de 3 a 6 estudiantes supervisados por docentes.',
    highlights: ['Metodología scrum', 'Equipos de 3 a 6 estudiantes', 'Supervisión docente', 'Mellitus Salud', 'Sindicato de la Carne'],
    link: { label: 'Conocé iTec Labs →', url: BASE + '/itec-labs' },
  },
  {
    id: 'pcc',
    name: 'PCC · Capacitación Continua',
    category: 'servicio',
    icon: 'book',
    accent: '#e67e22',
    district: 'cursos',
    title: 'PCC · Programa de Capacitación Continua',
    subtitle: 'Cursos 2026 · Presencial e "in company"',
    tag: 'Cursos 2026',
    description:
      'Formación teórico-práctica con seguimiento docente, en modalidad presencial e "in company". La atención es en el Centro, de 9 a 13 y de 17 a 21 hs. WhatsApp de cursos: 3585606052.',
    highlights: [
      'Modelado 3D de Interiores con SketchUP',
      'AutoCAD para Planos Eléctricos',
      'Introducción al uso de la Inteligencia Artificial',
      'WhatsApp: 3585606052',
    ],
    link: { label: 'Ver los cursos →', url: 'https://cursos.itecriocuarto.org.ar/' },
  },
  {
    id: 'portal-trabajo',
    name: 'Portal de Trabajo',
    category: 'servicio',
    icon: 'briefcase',
    accent: '#27ae60',
    district: 'innovacion',
    title: 'Portal de Trabajo',
    subtitle: 'Estudiantes avanzados y egresados del ITEC y del PCC',
    tag: 'Empleo',
    description:
      'Conecta a quienes buscan empleo con empresas e instituciones. Se completa el perfil profesional y las preferencias laborales, y se puede postular a las ofertas publicadas. La institución contacta a los candidatos según sus competencias e intereses.',
    highlights: ['Perfil profesional', 'Postulación a ofertas', 'Registro para estudiantes y egresados', 'Registro para empresas e instituciones'],
    link: { label: 'Ir al Portal de Trabajo →', url: BASE + '/bolsadetrabajo' },
  },
  {
    id: 'sitec',
    name: 'SiTec',
    category: 'servicio',
    icon: 'monitor',
    accent: '#1abc9c',
    district: 'innovacion',
    title: 'SiTec',
    subtitle: 'Sistema de información para estudiantes',
    tag: 'Estudiantes',
    description:
      'El sistema de información del instituto para sus estudiantes. En el sitio también encontrás las secciones de Ingresantes, Horarios de cursado y Calendario académico.',
    highlights: ['Ingresantes', 'Horarios de cursado', 'Calendario académico'],
    link: { label: 'Entrar a SiTec →', url: 'https://sitec.itecriocuarto.org.ar/' },
  },
  {
    id: 'ada-byron',
    name: 'Secundario Ada Byron',
    category: 'secundario',
    icon: 'cap',
    accent: '#c0392b',
    district: 'secundario',
    title: 'Secundario Ada Byron',
    subtitle: 'Secundaria técnica · Orientación Programación y Robótica',
    tag: 'Admisión abierta',
    description:
      'Secundaria técnica de 1º a 4º año (el 4º año se abre en 2027) con orientación en Programación y Robótica. Combina tecnología con artes, literatura y ciencias humanas, con una mirada crítica, reflexiva y ética sobre la tecnología. Hoy ofrece 1º, 2º y 3º año y se cursa en las sedes Centro y Campus (Villa Dalcar).',
    highlights: ['1º, 2º y 3º año', '4º año desde 2027', 'Sedes Centro y Campus', 'Programación y Robótica'],
    link: { label: 'Conocé el Ada Byron →', url: BASE + '/adabyron' },
  },
  {
    id: 'electromecanico',
    name: 'Operario de Mantenimiento Electromecánico',
    category: 'trayecto',
    icon: 'gear',
    accent: '#d35400',
    district: 'cursos',
    title: 'Operario de Mantenimiento Electromecánico',
    subtitle: 'Trayecto de 10 meses · 280 horas',
    tag: 'Inicio septiembre 2026',
    description:
      'Para jóvenes y adultos que quieran adquirir un oficio técnico. Se cursa de forma presencial en el campus, lunes y jueves de 20:00 a 23:30 hs.',
    highlights: [
      'Electricidad básica',
      'Instalaciones domiciliarias e industriales',
      'Mecánica general',
      'Motores eléctricos',
      'Automatización básica',
      'Neumática',
      'Proyecto integrador',
    ],
    link: { label: 'Ver el trayecto →', url: BASE + '/trayectos/Operario_electromecanico' },
  },
  {
    id: 'contacto',
    name: 'Contacto y redes',
    category: 'contacto',
    icon: 'phone',
    accent: '#e84393',
    district: 'sedes',
    title: 'Contacto y redes',
    subtitle: 'Más de 30 años formando profesionales',
    tag: 'Escribinos',
    description:
      'Podés comunicarte por teléfono al 0358-4643036 o por correo a informes@itecriocuarto.org.ar. WhatsApp de carreras: 3585606036. WhatsApp de cursos: 3585606052.',
    highlights: ['0358-4643036', 'informes@itecriocuarto.org.ar', 'Facebook @itecriocuarto', 'Instagram @itecriocuarto', 'TikTok @itecriocuarto'],
    link: { label: 'Instagram →', url: 'https://www.instagram.com/itecriocuarto/' },
  },
];

const BY_ID = new Map(MAP_POINTS.map((p) => [p.id, p]));

export function getMapPoint(id: string): MapPoint | undefined {
  return BY_ID.get(id);
}
