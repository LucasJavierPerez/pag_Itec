export interface CareerInfo {
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  highlights: string[];
  color: string;
  imageUrl: string;
}

export const careerData: Record<string, CareerInfo> = {
  'Desarrollo de Software': {
    title: 'Desarrollo de Software',
    subtitle: 'Tecnicatura Superior',
    duration: 'Título Oficial · Presencial y Virtual',
    description: 'Formá parte del mundo tech. Diseñá y construí aplicaciones multiplataforma para Desktop, Tablets, Smartphones y Web. Dominá Python, JavaScript, React, Node.js, PHP, SQL y más.',
    highlights: ['Python & JavaScript', 'React & Node.js', 'Apps Multiplataforma', 'Bases de Datos'],
    color: '#2980b9',
    imageUrl: 'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72v4JX76rUvi9CkSpNDlkXNOA9DIvGFIk7EGymwr9WUNZwbMIPBwis0tkQTj27eqjfMIZv01ZG5jgVTYG2EKprfJKnFmI7DvKZpidufBhlK4e-QgZPcdbqvQbnpnh3h-CmjzowxlF8Sh-E5yNlgzWleAI2rVkNBxqy-d_OfR3k_BA8mLZ26B5jyVXRTzyC21edNQNi6v7ned-Gxe39zoP5QsJWtWFaxsXA=w600',
  },
  'Inteligencia Artificial': {
    title: 'Inteligencia Artificial',
    subtitle: 'Tecnicatura Superior',
    duration: 'Título Oficial · Presencial y Virtual',
    description: 'Convertite en Data Scientist. Recopilá, preparé y analizá datos, construí modelos predictivos y comunicá hallazgos para fintech, healthtech y e-commerce.',
    highlights: ['Data Science', 'Machine Learning', 'Modelos Predictivos', 'Análisis de Datos'],
    color: '#8e44ad',
    imageUrl: 'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vDVbt3hiBfGzcbFdci8K6HOEpUlRhzN4qAA_fydQyO9RFcKWFiWBI8YZS2ltsVCtMTu4Sp9yi7aAMg9Ya1lnNw7siDfl10-ytucbMv_tspYCU7JKjv1TbmKA_4TJEmKfDAKQeyyUT-T0FSa4Nppgpb8DFYeOxyyU6jy8C4ZCpuyetcd9Jrm1gOImLytWVJMjvjlOClbTds7A0mfM-NXToxLBdN53ZVL2_i=w600',
  },
  'Mecatrónica': {
    title: 'Mecatrónica',
    subtitle: 'Tecnicatura Superior',
    duration: 'Título Oficial · Presencial con Prácticas',
    description: 'Proyectá dispositivos, equipos y sistemas automatizados. Diseñá, instalá y mantené procesos de control de maquinarias para la industria.',
    highlights: ['Robótica Industrial', 'Automatización', 'Electrónica', 'Diseño Mecánico'],
    color: '#e74c3c',
    imageUrl: '',
  },
  'Turismo y Hotelería': {
    title: 'Turismo y Hotelería',
    subtitle: 'Tecnicatura Superior',
    duration: 'Título Oficial · Presencial con Prácticas',
    description: 'Trabajá en alojamiento, gastronomía, entretenimiento, transporte y logística turística. Prácticas profesionalizantes desde primer año.',
    highlights: ['Hotelería', 'Gastronomía', 'Eventos', 'Gestión Turística'],
    color: '#27ae60',
    imageUrl: '',
  },
  'Marketing Digital': {
    title: 'Marketing Digital',
    subtitle: 'Tecnicatura Superior',
    duration: 'Título Oficial · Presencial con Prácticas',
    description: 'Analizá tendencias de consumo, gestioná planes de marketing digital, desarrollá estrategias de e-commerce y construí posicionamiento de marca en redes sociales.',
    highlights: ['Social Media', 'E-Commerce', 'Branding', 'Analítica Digital'],
    color: '#e67e22',
    imageUrl: 'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vNhxSp_T3Dgo7ych2bdnxcxxUg5KaaMkd6I6GcPCNtSRFPk_CmlZMpBHhkbLXPL6M9Bgt-CqmHIpCyJ8u7YXvTEzx61_TNT-7kWPdxhF92hYwn97hlsBgqg46hxw7L1yETL5wlS6sZT1NdEEBsy3TnV9T1Ha2CYnabA_oMT_GaFWbqZywON2sX8MwaYrD7qVlP9948d6Kc8EmnfRgMsKx-5fqzsWHe4c8K=w600',
  },
  'Cómo llegar': {
    title: 'Cómo llegar',
    subtitle: 'ITEC Río Cuarto — Instituto Tecnológico',
    duration: 'Dirección',
    description: 'Te esperamos en nuestras sedes de Río Cuarto, Córdoba.',
    highlights: ['Campus: Tejerina Norte 783', 'Sede Centro: Constitución 716', 'informes@itecriocuarto.org.ar'],
    color: '#2980b9',
    imageUrl: '',
  },
};
