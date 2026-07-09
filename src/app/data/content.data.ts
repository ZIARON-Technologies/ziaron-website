import { Phase, Principle, ProductNode, ProductStatus } from '../models/content.model';

/**
 * Datos de contenido de la página. Sincronizados con el repo
 * `ziaron-foundation` (03-products, 04-restaurant-os, 06-engineering,
 * 09-roadmap). No se renderizan todavía — están listos para cuando se
 * reactiven las secciones de Ecosistema, Principios y Hoja de ruta
 * (ver CLAUDE.md).
 */

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
