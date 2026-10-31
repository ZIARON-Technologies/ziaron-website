import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Todas las rutas conocidas se prerenderizan a HTML estático en build
 * (SEO + carga rápida). El comodín (`**`, página 404) se renderiza en el
 * cliente: el build genera `index.csr.html` como fallback para cualquier
 * URL que no exista (ver `vercel.json`).
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'productos/restaurant-os', renderMode: RenderMode.Prerender },
  { path: 'productos/facturacion', renderMode: RenderMode.Prerender },
  { path: 'nosotros', renderMode: RenderMode.Prerender },
  { path: 'contacto', renderMode: RenderMode.Prerender },
  { path: 'legal/privacidad', renderMode: RenderMode.Prerender },
  { path: 'legal/terminos', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
