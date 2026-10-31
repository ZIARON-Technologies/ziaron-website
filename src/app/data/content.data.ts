import { Capability, Phase, Principle, ProductNode, ProductStatus } from '../models/content.model';

/**
 * Datos de contenido de la página. Sincronizados con el repo
 * `ziaron-foundation` (01-company, 03-products, 04-restaurant-os,
 * 06-engineering, 09-roadmap).
 *
 * PRODUCTS y CAPABILITIES ya se renderizan (bloque "Qué hacemos" y panel
 * "Nexus" del handoff de Claude Design, ver
 * `design_handoff_ziaron_landing/README.md`). PRINCIPLES y PHASES siguen
 * sin usarse — quedan listos para cuando se reactiven esas secciones
 * (ver CLAUDE.md).
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
  { id: 'N02', name: 'Billing Platform', status: 'planned', desc: 'Facturación, suscripciones y pagos.' },
  { id: 'N03', name: 'Identity Platform', status: 'planned', desc: 'Usuarios, roles, permisos y autenticación.' },
  { id: 'N04', name: 'AI Platform', status: 'planned', desc: 'Automatizaciones, predicciones y asistentes.' },
  { id: 'N05', name: 'Cloud Platform', status: 'planned', desc: 'Infraestructura cloud propia.' },
  { id: 'N06', name: 'Developer Platform', status: 'planned', desc: 'Herramientas para construir sobre ZIARON.' },
];

export const PRINCIPLES: Principle[] = [
  { n: '01', title: 'Arquitectura primero' },
  { n: '02', title: 'Calidad antes que velocidad' },
  { n: '03', title: 'Interfaces para desacoplar' },
  { n: '04', title: 'Componentes reutilizables' },
  { n: '05', title: 'Código mantenible' },
  { n: '06', title: 'Documentar antes de desarrollar' },
];

export const PHASES: Phase[] = [
  { n: 'Fase 1', label: 'Fundación', items: ['Branding', 'Fundación de ZIARON', 'Restaurant OS MVP'], active: true },
  { n: 'Fase 2', label: 'Operación', items: ['Facturación', 'Inventario', 'Delivery'], active: false },
  { n: 'Fase 3', label: 'Inteligencia', items: ['IA', 'Automatizaciones', 'Marketplace'], active: false },
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
