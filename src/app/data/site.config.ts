/**
 * Configuración del sitio que depende de cuentas/canales REALES.
 *
 * Regla del proyecto: nunca publicar un canal que no responde. Cada campo
 * vacío ('') hace que su UI se oculte o muestre "en preparación":
 * - `whatsapp` vacío → no se muestra el botón flotante ni el canal en /contacto.
 * - `email` vacío → /contacto y las páginas legales dicen "en preparación".
 * - `formEndpoint` vacío → los formularios se ven pero con el envío
 *   deshabilitado y un aviso honesto.
 *
 * Cómo activar (ver CLAUDE.md → "Activar canales"):
 * - formEndpoint: crear un formulario en https://formspree.io (plan gratis)
 *   y pegar su URL, ej. 'https://formspree.io/f/abcdwxyz'. Acepta POST JSON.
 * - whatsapp: número en formato internacional sin "+" ni espacios,
 *   ej. '51987654321'.
 */
export interface SiteConfig {
  name: string;
  url: string;
  city: string;
  email: string;
  whatsapp: string;
  formEndpoint: string;
  legalUpdatedAt: string;
}

/** Tipado explícito (no `as const`): con `as const` TypeScript trata los
 * campos vacíos como el literal '' y los `if (SITE.x)` quedan en `never`. */
export const SITE: SiteConfig = {
  name: 'ZIARON Technologies',
  url: 'https://ziaron.com',
  city: 'Lima, Perú',
  email: '',
  whatsapp: '',
  formEndpoint: '',
  /** Fecha visible en las páginas legales. Actualizarla si cambian. */
  legalUpdatedAt: '31 de octubre de 2026',
};

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
