# Plan Landing v2 — ZIARON Technologies

Rediseño de la landing: de página informativa de una sola vista a **sitio
de empresa** (rutas reales, productos, captación de clientes y SEO),
manteniendo la identidad visual existente (tokens, tipografías, isotipo,
panel Nexus, tema claro/oscuro). Rama de trabajo: `feature/landing-v2`.

Leyenda: `[x]` hecho · `[ ]` pendiente · `[~]` parcial

## Fase 0 — Base limpia
- [x] 1. Commit del estado previo (v1) — `chore: guardar estado previo...`
- [x] 2. Rama `feature/landing-v2`
- [x] 3. Mapa del sitio y textos (ver abajo)

## Fase 1 — Arquitectura (router + SSG)
- [x] 4. Router con layout compartido y rutas reales
- [x] 5. Reorganización de carpetas (`layout/`, `pages/`, `shared/`)
- [x] 6. Navegación híbrida (anclas en el home + rutas reales)
- [x] 7. Prerender estático (SSG) con `@angular/ssr`
- [x] 8. Página 404

## Fase 2 — Componentes compartidos
- [x] 9. `section-title` y `page-header`
- [x] 10. Header nuevo (nav + CTA + menú móvil)
- [x] 11. Barra de progreso de scroll + botón "volver arriba"
- [x] 12. `status-pill` (toast se crea en Fase 5, cuando haya formulario)
- [x] 13. Footer completo en columnas

## Fase 3 — Home rediseñado
- [x] 14. Hero con propuesta de valor + 2 CTAs + panel Nexus
- [x] 15. Qué hacemos
- [x] 16. Productos destacados
- [x] 17. Cómo trabajamos (principios)
- [x] 18. Roadmap
- [x] 19. CTA final

## Fase 4 — Páginas de producto y empresa
- [x] 20. `/productos/restaurant-os` (problema, cómo funciona, vista conceptual, módulos, lista de espera, FAQ) — falta: capturas reales del MVP
- [x] 21. `/productos/facturacion` (incluirá, cómo funcionará, registro de interés, FAQ)
- [x] 22. `/nosotros` (quiénes somos, misión, visión, 5 valores, filosofía)
- [x] 23. `/contacto` (formulario + canales configurables)

## Fase 5 — Captación
- [x] 24. Formulario (3 variantes) + toast — conectado a Formspree (`xljjwzew`). Probar un envío real y confirmar el formulario en Formspree
- [~] 25. Botón flotante de WhatsApp — **falta el número** en `site.config.ts`
- [~] 26. Privacidad (Ley 29733) y Términos publicados — **falta revisión de abogado**

## Fase 6 — SEO, rendimiento y lanzamiento
- [x] 27. Meta description + Open Graph + canonical + JSON-LD por página
- [~] 28. sitemap.xml y robots.txt — **falta Search Console** (requiere dominio publicado)
- [~] 29. Vercel Analytics integrado; Lighthouse local SEO 100 / a11y 96–100 / perf desktop 98+ — **medir de nuevo ya publicado**
- [ ] 30. Deploy en Vercel con ziaron.com + correo con dominio — **requiere acción/permiso del usuario**

## Mapa del sitio

| Ruta | Tipo | Contenido |
|---|---|---|
| `/` | Home (scroll) | `#inicio` hero · `#que-hacemos` · `#productos` · `#como-trabajamos` · `#roadmap` · `#empezar` (CTA) |
| `/productos/restaurant-os` | Página | Para quién, problema, cómo funciona, módulos, lista de espera, FAQ |
| `/productos/facturacion` | Página | Facturación electrónica SUNAT — próximamente |
| `/nosotros` | Página | Quiénes somos, misión, visión, valores, filosofía |
| `/contacto` | Página | Formulario + canales configurables |
| `/legal/privacidad`, `/legal/terminos` | Páginas | Política de privacidad y Términos de uso |
| `**` | 404 | Página no encontrada |

Nav: **Productos** (`/#productos`) · **Roadmap** (`/#roadmap`) · **Nosotros** · **Contacto** · botón **Conoce Restaurant OS**.

## Pendientes del usuario (bloquean el lanzamiento)
- Push de la rama y deploy en Vercel (dominio ziaron.com, activar Analytics).
- Revisión legal de Privacidad y Términos.
- Canal de contacto oficial (WhatsApp, correo con dominio).
- Redes sociales reservadas con el nombre ZIARON.
- Imágenes/mockups de Restaurant OS para la página del producto.
