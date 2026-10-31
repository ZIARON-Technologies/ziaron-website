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
- [~] 20. `/productos/restaurant-os` (hay versión base con módulos reales)
- [~] 21. `/productos/facturacion` (versión base "próximamente")
- [~] 22. `/nosotros` (texto real + misión placeholder)
- [~] 23. `/contacto` (aviso honesto: canal aún no definido)

## Fase 5 — Captación
- [ ] 24. Formulario de lista de espera (+ toast de confirmación)
- [ ] 25. Botón flotante de WhatsApp
- [ ] 26. Política de privacidad (Ley 29733) y Términos

## Fase 6 — SEO, rendimiento y lanzamiento
- [ ] 27. Meta description + Open Graph por página
- [ ] 28. sitemap.xml, robots.txt, Search Console
- [ ] 29. Analítica + Lighthouse 90+
- [ ] 30. Deploy en Vercel con ziaron.com + correo con dominio

## Mapa del sitio

| Ruta | Tipo | Contenido |
|---|---|---|
| `/` | Home (scroll) | `#inicio` hero · `#que-hacemos` · `#productos` · `#como-trabajamos` · `#roadmap` · `#empezar` (CTA) |
| `/productos/restaurant-os` | Página | Qué es, para quién, módulos (Core, Operación, Administración, Inteligencia), lista de espera (Fase 5) |
| `/productos/facturacion` | Página | Facturación electrónica SUNAT — próximamente |
| `/nosotros` | Página | Quiénes somos, misión (placeholder), principios |
| `/contacto` | Página | Canal de contacto (pendiente de definir) |
| `**` | 404 | Página no encontrada |

Nav: **Productos** (`/#productos`) · **Roadmap** (`/#roadmap`) · **Nosotros** · **Contacto** · botón **Conoce Restaurant OS**.

## Decisiones pendientes del usuario
- Canal de contacto oficial (WhatsApp, correo con dominio).
- Misión oficial (hoy es texto placeholder).
- Redes sociales reservadas con el nombre ZIARON.
- Imágenes/mockups de Restaurant OS para la página del producto.
