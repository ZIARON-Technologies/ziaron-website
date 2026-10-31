import {
  Capability,
  FeaturedProduct,
  FooterColumn,
  ModuleGroup,
  NavLink,
  Phase,
  Principle,
  ProductNode,
  ProductStatus,
} from '../models/content.model';

/**
 * Datos de contenido del sitio — ÚNICA fuente de los textos que se repiten
 * o que vienen del negocio. Sincronizados con el repo `ziaron-foundation`
 * (01-company, 03-products, 04-restaurant-os, 06-engineering, 09-roadmap).
 * Si el negocio cambia, se edita acá y no en los templates.
 */

/** Las 4 líneas de trabajo de la visión de ZIARON (01-company/README.md),
 * mostradas en el bloque "Qué hacemos" del home. Contenido real, no relleno. */
export const CAPABILITIES: Capability[] = [
  { icon: 'saas', title: 'Plataformas SaaS', desc: 'Software propio, no a medida. Productos que la empresa opera y escala.' },
  { icon: 'ai', title: 'Inteligencia Artificial', desc: 'Automatizaciones, predicciones y asistentes integrados a cada plataforma.' },
  { icon: 'automation', title: 'Automatización', desc: 'Procesos que antes eran manuales, ahora orquestados por sistemas propios.' },
  { icon: 'cloud', title: 'Infraestructura Cloud', desc: 'Arquitectura propia, pensada para escalar sin depender de terceros.' },
];

export const PRODUCTS: ProductNode[] = [
  { id: 'N01', name: 'Restaurant OS', status: 'building', desc: 'Sistema operativo para restaurantes y negocios gastronómicos.' },
  { id: 'N02', name: 'Billing Platform', status: 'planned', desc: 'Facturación electrónica SUNAT.' },
  { id: 'N03', name: 'Identity Platform', status: 'planned', desc: 'Usuarios, roles, permisos y autenticación.' },
  { id: 'N04', name: 'AI Platform', status: 'planned', desc: 'Automatizaciones, predicciones y asistentes.' },
  { id: 'N05', name: 'Cloud Platform', status: 'planned', desc: 'Infraestructura cloud propia.' },
  { id: 'N06', name: 'Developer Platform', status: 'planned', desc: 'Herramientas para construir sobre ZIARON.' },
];

/** Títulos: 06-engineering/README.md. `desc`: propuesta de redacción,
 * pendiente de validar con el usuario. */
export const PRINCIPLES: Principle[] = [
  { n: '01', title: 'Arquitectura primero', desc: 'Diseñamos la base antes de escribir la primera pantalla.' },
  { n: '02', title: 'Calidad antes que velocidad', desc: 'Preferimos entregar menos, pero que funcione siempre.' },
  { n: '03', title: 'Interfaces para desacoplar', desc: 'Cada pieza se puede cambiar sin romper las demás.' },
  { n: '04', title: 'Componentes reutilizables', desc: 'Lo que construimos una vez sirve a todo el ecosistema.' },
  { n: '05', title: 'Código mantenible', desc: 'Software pensado para durar años, no para una entrega.' },
  { n: '06', title: 'Documentar antes de desarrollar', desc: 'Las decisiones quedan escritas antes de programarse.' },
];

export const PHASES: Phase[] = [
  { n: 'Fase 1', label: 'Fundación', items: ['Branding', 'Fundación de ZIARON', 'Restaurant OS MVP'], active: true },
  { n: 'Fase 2', label: 'Operación', items: ['Facturación', 'Inventario', 'Delivery'], active: false },
  { n: 'Fase 3', label: 'Inteligencia', items: ['IA', 'Automatizaciones', 'Marketplace'], active: false },
];

/** Productos con página propia, mostrados en el bloque `#productos` del
 * home. Highlights tomados de 04-restaurant-os (Restaurant OS) y de la
 * definición de la plataforma de facturación electrónica. */
export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    name: 'Restaurant OS',
    status: 'building',
    route: '/productos/restaurant-os',
    tagline: 'El sistema operativo para restaurantes, pollerías, pizzerías, chifas y cafeterías.',
    highlights: [
      'Pedidos, cocina y caja en un solo lugar',
      'Menú QR y pantallas de promociones',
      'Delivery con seguimiento de repartidores',
      'Facturación electrónica integrada',
    ],
  },
  {
    name: 'Facturación electrónica',
    status: 'planned',
    route: '/productos/facturacion',
    tagline: 'Emisión de comprobantes electrónicos SUNAT para cualquier negocio.',
    highlights: ['Boletas y facturas electrónicas', 'Notas de crédito y débito', 'API para integrarla con tu sistema'],
  },
];

/** Módulos de Restaurant OS — 04-restaurant-os/README.md ("Funcionalidades
 * definidas"). `desc` de cada grupo: redacción propia. */
export const RESTAURANT_OS_MODULES: ModuleGroup[] = [
  {
    title: 'Core',
    desc: 'La base para operar uno o varios locales.',
    items: ['Multiempresa', 'Multisede', 'Usuarios', 'Roles y permisos', 'Turnos'],
  },
  {
    title: 'Operación',
    desc: 'El día a día del salón, la cocina y el delivery.',
    items: ['Menú QR', 'Pedidos y órdenes', 'Cocina', 'Caja', 'Delivery y repartidores', 'Pantallas', 'Clientes'],
  },
  {
    title: 'Administración',
    desc: 'Control del negocio detrás del mostrador.',
    items: ['Inventario', 'Compras', 'Proveedores', 'Facturación electrónica', 'Reportes'],
  },
  {
    title: 'Inteligencia',
    desc: 'Datos e IA para vender más y desperdiciar menos.',
    items: ['Fidelización', 'Promociones', 'Automatizaciones', 'Predicciones con IA'],
  },
];

/** Nav principal (header + menú móvil). Crece 1:1 con destinos reales. */
export const NAV_LINKS: NavLink[] = [
  { label: 'Productos', route: '/', fragment: 'productos' },
  { label: 'Roadmap', route: '/', fragment: 'roadmap' },
  { label: 'Nosotros', route: '/nosotros' },
  { label: 'Contacto', route: '/contacto' },
];

/** CTA principal del header y del menú móvil. */
export const PRIMARY_CTA: NavLink = { label: 'Conoce Restaurant OS', route: '/productos/restaurant-os' };

/** Columnas del footer. `soon: true` = la página aún no existe (se muestra
 * sin link, como "Próximamente") — nunca links a destinos inexistentes. */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Productos',
    links: [
      { label: 'Restaurant OS', route: '/productos/restaurant-os' },
      { label: 'Facturación electrónica', route: '/productos/facturacion' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nosotros', route: '/nosotros' },
      { label: 'Roadmap', route: '/', fragment: 'roadmap' },
      { label: 'Contacto', route: '/contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad', route: '/legal/privacidad', soon: true },
      { label: 'Términos', route: '/legal/terminos', soon: true },
    ],
  },
];

export function productStatusLabel(status: ProductStatus): string {
  switch (status) {
    case 'live': return 'En vivo';
    case 'building': return 'En construcción';
    case 'planned': return 'Planeado';
    default: return '';
  }
}

/** Etiqueta de estado tal como aparece en el panel "Nexus" (estilo terminal,
 * minúsculas, gerundio) — distinta del label genérico de arriba, que se usa
 * en prosa normal. */
export function terminalStatusLabel(status: ProductStatus): string {
  switch (status) {
    case 'live': return 'en vivo';
    case 'building': return 'construyendo';
    case 'planned': return 'planeado';
    default: return '';
  }
}
