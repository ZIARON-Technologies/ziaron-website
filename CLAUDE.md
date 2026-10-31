# ZIARON Website — contexto para trabajar más rápido

Sitio institucional de ZIARON Technologies (Angular 22 + Tailwind v4). Desde
la **Landing v2** ya no es una página única: es un **sitio con rutas reales,
prerenderizado a HTML estático (SSG)**, con un home con secciones ancladas y
páginas propias para productos y empresa. Sin backend, sin auth.

- Plan de trabajo por fases y estado: **`docs/PLAN-LANDING-V2.md`** (leer
  primero; marcar ahí lo que se avance).
- Sistema visual (colores, tipografías, motion, isotipo): **`DESIGN.md`**.
- Fuente del contenido de negocio: repo `ziaron-foundation` (01-company,
  03-products, 04-restaurant-os, 06-engineering, 09-roadmap). Si el
  negocio cambia, se edita `src/app/data/content.data.ts`, no los templates.

## Comandos

```bash
npm install     # obligatorio tras traer la rama: se agregaron @angular/ssr y @angular/platform-server
ng serve        # desarrollo (http://localhost:4200)
ng build        # producción + prerender → dist/ziaron-website/browser
ng test
```

## Estado actual (rama `feature/landing-v2`)

Fases 0–6 del plan implementadas en código. Formularios conectados a
Formspree (cuenta del usuario, formulario "ZIARON Website"). Lo que falta
depende de cuentas reales del usuario (ver "Activar canales" y
"Lanzamiento"): WhatsApp, correo con dominio, deploy en Vercel, Search
Console y revisión legal.

## Stack

- Angular 22.2 (standalone, zoneless, signals; sin NgModules)
- `@angular/ssr` solo para **prerender en build** (`outputMode: "static"` en
  `angular.json`) — en producción no hay servidor Node, son HTML estáticos.
- Tailwind CSS v4 vía PostCSS (sin `tailwind.config.js`)
- Sin librería de componentes (Bootstrap/Material) — decisión deliberada.
- Versiones de `@angular/*` alineadas (misma minor). `@angular/platform-server`
  y `@angular/ssr` deben subir junto con `@angular/core` (usar `ng update`).

## Rutas (`app.routes.ts` + `app.routes.server.ts`)

| Ruta | Componente | Render |
|---|---|---|
| `/` | `pages/home` (eager) | Prerender |
| `/productos/restaurant-os` | `pages/restaurant-os` (lazy) | Prerender |
| `/productos/facturacion` | `pages/billing` (lazy) | Prerender |
| `/nosotros` | `pages/about` (lazy) | Prerender |
| `/contacto` | `pages/contact` (lazy) | Prerender |
| `/legal/privacidad` | `pages/legal/privacy` (lazy) | Prerender |
| `/legal/terminos` | `pages/legal/terms` (lazy) | Prerender |
| `**` | `pages/not-found` (lazy) | Client (fallback `index.csr.html`) |

**Checklist al agregar una ruta:**
1. `app.routes.ts` con `title` y `data.description` (≤ 160 caracteres).
2. `app.routes.server.ts` (si no, no se prerenderiza).
3. `public/sitemap.xml`.
4. Footer (`FOOTER_COLUMNS`) y, si corresponde, nav (`NAV_LINKS`).

## SEO (`core/services/title.strategy.ts`)

`ZiaronTitleStrategy` corre en cada navegación y en el prerender, así el
HTML estático ya trae: `<title>` ("`<título>` · ZIARON Technologies"; home
"ZIARON Technologies — ..."), meta description (`data.description`), Open
Graph + Twitter card (imagen `public/brand/social/og-ziaron.png`, 1200×630:
wordmark + frase de marca sobre el fondo del sitio — NO usar
`ziaron-foundation/.../open-graph/ziaron-og.svg`, que junta isotipo y
wordmark, ver "Regla de marca"), `<link rel="canonical">` y robots
(`data.noindex: true` en el 404). En `index.html`: JSON-LD `Organization`,
`theme-color` por tema, favicon SVG + apple-touch-icon
(`public/brand/favicon/`, del branding oficial). `public/robots.txt` y
`public/sitemap.xml` (estático, mantener a mano).

## Analítica

Vercel Web Analytics (`@vercel/analytics`, `inject()` en `App`, solo
navegador y solo producción). Sin cookies, datos agregados — coherente con
la Política de privacidad. Hay que **activar Analytics en el proyecto de
Vercel**; en local la petición a `/_vercel/insights/script.js` falla y es
normal.

`vercel.json` reescribe a `/index.csr.html` cualquier URL que no exista como
archivo (Vercel sirve primero los HTML prerenderizados). Verificar al hacer
el deploy (Fase 6).

## Arquitectura de carpetas (`src/app/`)

```
app.ts / .html / .scss       Shell: fondo decorativo + loader + scroll-progress + header + <router-outlet> + footer + back-to-top
app.config.ts                Router (anclas + scroll), hidratación, TitleStrategy
app.config.server.ts         Config extra solo para el prerender (provideServerRendering)
app.routes.ts / .server.ts   Rutas cliente / modo de render por ruta
core/services/
  theme.service.ts           Tema claro/oscuro/auto (SSR-safe)
  title.strategy.ts          Título + meta + Open Graph + canonical por ruta
  toast.service.ts           Notificaciones efímeras
data/content.data.ts         TODOS los textos de negocio y la navegación (ver abajo)
data/site.config.ts          Canales reales (correo, WhatsApp, endpoint de formularios) — ver "Activar canales"
models/                      Interfaces (sin lógica)
layout/                      Piezas del shell, presentes en todas las rutas
  header/                    Wordmark + nav + CTA + tema + menú móvil
  footer/                    Columnas (marca, Productos, Empresa, Legal) + copyright
  loader/                    Overlay de carga inicial (isotipo animado)
  theme-toggle/
pages/                       Una carpeta por ruta
  home/                      Solo compone secciones (sections/*)
    sections/                hero, capabilities, products, principles, roadmap, cta
  restaurant-os/             (+ concept-board/: tablero de pedidos ilustrativo)
  billing/ about/ contact/ not-found/
  legal/                     privacy, terms (+ legal-layout.scss compartido)
shared/
  components/                section-title, page-header, status-pill, nexus-panel, scroll-progress,
                             back-to-top, toast, lead-form, faq, whatsapp-float
  directives/reveal.directive.ts
```

Regla: si algo aparece en una sola página va en `pages/<página>/`; si se usa
en 2+ lugares va en `shared/components/`; si está en todas las rutas va en
`layout/`.

## Datos (`data/content.data.ts`)

| Constante | Uso |
|---|---|
| `CAPABILITIES` | Home `#que-hacemos` (4 líneas de trabajo) |
| `PRODUCTS` | Ecosistema completo (6) → panel Nexus + conteos del hero + texto "+4 plataformas" |
| `FEATURED_PRODUCTS` | Productos con página propia → home `#productos` y `/productos/facturacion` |
| `RESTAURANT_OS_MODULES` | `/productos/restaurant-os` (4 capas de módulos de 04-restaurant-os) |
| `PRINCIPLES` | Home `#como-trabajamos` (títulos de 06-engineering; `desc` aprobadas por el usuario) |
| `MISSION`, `VISION`, `COMPANY_VALUES` | `/nosotros`. Fuente oficial: `ziaron-foundation/01-company/README.md` — cambiar en ambos lados |
| `PHASES` | Home `#roadmap` |
| `RESTAURANT_OS_PAINS`, `_STEPS`, `_FAQ` | `/productos/restaurant-os` (problema, cómo funciona, FAQ) |
| `BILLING_STEPS`, `BILLING_FAQ` | `/productos/facturacion` |
| `NAV_LINKS`, `PRIMARY_CTA` | Header y menú móvil |
| `FOOTER_COLUMNS` | Footer. `soon: true` = página que aún no existe → texto "Próximamente", sin link |

## Navegación híbrida

- Links con `fragment` (`/#productos`, `/#roadmap`) → anclas del home. El
  router hace el scroll (`withInMemoryScrolling({ anchorScrolling })`); el
  offset del header sticky (88px) se fija en `App` con
  `ViewportScroller.setOffset`. `onSameUrlNavigation: 'reload'` permite
  volver a hacer clic en el mismo ancla.
- Links sin fragment → rutas reales con `routerLink`.
- Estado activo (`HeaderComponent`): ruta actual para páginas; **scroll spy**
  para las anclas del home (`HOME_SECTION_IDS` — mantener sincronizado con
  los `id` de las secciones). "Productos" queda activo también en
  `/productos/*`.
- Ya NO se reescribe la URL con `history.pushState/replaceState` al hacer
  scroll (lo hacía la v1 sin router): ahora las URLs limpias (`/nosotros`)
  son páginas reales y pelearía con el router.
- Nav: el menú crece 1:1 con destinos reales — nada de links decorativos.
- Menú móvil (< `lg`): panel a pantalla completa bajo el header; se cierra al
  navegar o con Escape y bloquea el scroll del body mientras está abierto.

## Prerender (SSG) — reglas para que no se rompa el build

Durante el build cada ruta se ejecuta en Node, donde NO existen `window`,
`document` real, `localStorage`, `matchMedia` ni `IntersectionObserver`.

- Acceso al navegador siempre detrás de `isPlatformBrowser(inject(PLATFORM_ID))`
  o dentro de `afterNextRender(...)`. Ver `ThemeService`, `RevealDirective`,
  `LoaderComponent`, `ScrollProgressComponent`, `BackToTopComponent`, header.
- `@HostListener('window:scroll')` está bien, pero el handler debe salir
  temprano si no es navegador.
- `RevealDirective` pone la clase `reveal` también en el HTML prerenderizado
  (sin parpadeo al hidratar; el loader cubre esos ms). Sin JS, un
  `<noscript>` en `index.html` fuerza todo visible y oculta el loader.
- El `<script>` inline de `index.html` aplica el tema antes de Angular (FOUC).
  Si cambia la lógica de `ThemeService`, reflejarla ahí también.
- Hidratación activa (`provideClientHydration(withEventReplay())`).

## Sistema de diseño (resumen — detalle en DESIGN.md)

- **Tokens semánticos** en `src/tailwind.css` (`:root` claro / `.dark`
  oscuro, expuestos con `@theme inline`). **Nunca hardcodear un hex de UI**;
  usar `bg-bg`, `bg-bg-elevated`, `text-text`, `text-text-muted`,
  `text-text-dim`, `border-border`, `border-line`, `*-accent`,
  `text-accent-text`, `bg-accent-bg`, `border-accent-border`. Los hex de
  marca (`#8B5CF6`, `#6366F1`, `#4F7FFF`, `#06B6D4`, `#22D3EE`) solo en
  isotipo, degradados y glows.
- Tipografías: Space Grotesk (`font-display`), Inter (`font-body`),
  JetBrains Mono (`font-mono`).
- **Clases de UI compartidas** (`tailwind.css`, `@layer components`):
  `.btn` + `.btn-primary` / `.btn-ghost` (+ `.btn-sm`), `.link-arrow` (con
  `.link-arrow__icon`), `.page-gutter` (padding lateral estándar 22/44/72px,
  el mismo que header y footer). Una sola acción `btn-primary` por bloque.
- **Layout full-bleed** (sin `max-w` centrando la página, decisión del
  usuario). Cada bloque usa `page-gutter`; los textos largos sí llevan su
  propio `max-w-[..ch]` por legibilidad.
- **Ritmo vertical de secciones del home:** `py-16 sm:py-20 lg:py-24` con
  `border-t border-line` entre secciones. Encabezado siempre con
  `<app-section-title eyebrow title subtitle meta>`.
- **Páginas internas:** empiezan con `<app-page-header eyebrow title lead status>`.
- **Estados de producto:** `<app-status-pill label tone>` (`accent` = activo,
  `muted` = próximamente).
- Tema claro/oscuro/auto: `ThemeService` + `ThemeToggleComponent`.

### Regla de marca: isotipo O wordmark, nunca juntos

El isotipo (la Z con nodos) y el wordmark (ZIARON) no van lado a lado: se
lee "Z ZIARON". Usar uno u otro según el espacio: wordmark en header,
footer e imagen OG; isotipo solo en favicon, apple-touch-icon, loader,
panel Nexus y como logo cuadrado (JSON-LD). Pedido explícito del usuario.

### Trampas conocidas

- **No poner clases responsive (`hidden sm:block`, etc.) en el tag de un
  componente** que define `:host { display: ... }`: los estilos de
  componente no están en una capa CSS y le ganan a las utilidades de
  Tailwind (que sí están en `@layer utilities`). Envolver en un `<span>`/
  `<div>` y poner las clases ahí (ver header).
- No usar `[class.sm:algo]` / clases con `:` o `[]` en bindings `[class.x]`;
  usar `[class]="cond ? '...' : '...'"`.
- `display: contents` en el `:host` de secciones/páginas que deben ser hijos
  directos del layout flex (hero, footer, header, secciones del home).
- `app.scss` usa `overflow-x: clip` (no `hidden`) para que el header
  `sticky` funcione — ver comentario ahí.
- Geometría del isotipo (loader 1:1, panel Nexus 0.674×): ver DESIGN.md §7.

## Convención de nombres (Angular CLI)

Sufijos clásicos (`.component.ts`, `.service.ts`...) restaurados en
`angular.json` → `schematics`. `ng generate` ya los aplica.

## Formularios (`shared/components/lead-form`)

Un componente, 3 variantes (`variant`): `waitlist` (Restaurant OS
`#lista-espera`), `billing` (`/productos/facturacion#interes`) y `contact`
(`/contacto`). Reactive Forms, validación de celular peruano (9 dígitos que
empiezan en 9, con o sin +51), consentimiento obligatorio con link a
Privacidad (Ley 29733), campo trampa antispam `_gotcha`. Envía POST JSON a
`SITE.formEndpoint` con `origen` y `_subject` para filtrar en el correo.
Éxito/error → toast + estado de éxito en el propio formulario.

## Activar canales (`data/site.config.ts`)

Regla: **nunca publicar un canal que no responde.** Todo campo vacío oculta
su UI o muestra "en preparación". Para activar:
1. **Formularios:** ✅ activo — `https://formspree.io/f/xljjwzew` (cuenta
   Formspree del usuario, plan gratis, un solo formulario para las 3
   variantes; se distinguen por `origen` y `_subject`). Plan gratis ≈ 50
   envíos/mes: revisar el límite si crece el tráfico.
2. **WhatsApp:** número sin "+" ni espacios en `whatsapp` (`'51987654321'`).
   Aparece el botón flotante (el de "volver arriba" se apila encima) y el
   canal en /contacto.
3. **Correo:** `email` (idealmente `contacto@ziaron.com`). Aparece en
   /contacto y en la Política de privacidad (derechos ARCO).

## Lanzamiento (pendiente del usuario)

- Push de `feature/landing-v2` → PR a `develop`/`master`.
- Vercel: proyecto apuntando a este repo, framework Angular, output
  `dist/ziaron-website/browser`; dominio `ziaron.com`; activar Analytics.
  Verificar que `/nosotros` sirve el HTML prerenderizado y que una URL
  inexistente cae en el 404 (`index.csr.html`).
- Google Search Console: verificar dominio y enviar `sitemap.xml`.
- Lighthouse sobre el sitio publicado (en local: SEO 100, accesibilidad
  96–100, performance desktop 98–99; performance móvil local ~72 no es
  representativo — sin compresión y con Google Fonts bloqueado).
- **Legal:** Privacidad y Términos son texto base sin asesoría legal.
  Revisar con un abogado, completar razón social y RUC al constituir, y
  evaluar la inscripción del banco de datos ante la Autoridad Nacional de
  Protección de Datos Personales. Libro de reclamaciones cuando haya venta.
- Contraste: `--text-dim` en textos mono de ~10px no llega a AA 4.5:1 sobre
  tarjetas (aviso de Lighthouse). Decisión de diseño abierta: oscurecer el
  token o usar `text-text-muted` en esos labels.

## Contenido placeholder / honesto (no inventar)

- `/contacto`: aviso honesto de que el canal oficial está en preparación. No
  se publica un correo/WhatsApp/formulario que todavía no responde.
- Footer: "Empresa en constitución" (aprobado por el usuario; cambiar a razón social + RUC al constituirse); sin correo ni redes hasta que existan.
- Formularios: visibles pero con envío deshabilitado ("Disponible pronto")
  hasta configurar `formEndpoint`.
- Vista conceptual de Restaurant OS (`concept-board`): ilustración en
  HTML/CSS con datos ficticios y etiqueta "VISTA CONCEPTUAL". Reemplazar por
  capturas reales cuando exista el MVP.
- FAQ de Restaurant OS: respuestas sobre equipos/precios redactadas como
  intención ("la idea es", "será"), no como promesa — revisar al lanzar.

## Historial

- **v1** (commit `cfb473c`): SPA de una página sin router; nav con URLs
  "limpias" simuladas con `history.pushState`; secciones Nosotros, Misión,
  Valores, Ecosistema, Contacto; panel Nexus; loader.
- **v2** (`feature/landing-v2`): router + SSG, reorganización de carpetas,
  header con CTA y menú móvil, footer en columnas, home con hero + panel
  Nexus, productos, principios, roadmap y CTA; páginas base de productos,
  nosotros, contacto y 404. Valores → "Cómo trabajamos" en el home;
  Nosotros/Misión → `/nosotros`; Contacto → `/contacto`.
- **2026-10-31:** descripciones de principios aprobadas; misión, visión
  aspiracional y 5 valores de empresa redactados y aprobados (en `/nosotros`
  y en `ziaron-foundation/01-company`). Valores de empresa ≠ principios de
  ingeniería: los primeros son cultura (`/nosotros`), los segundos cómo se
  construye (home `#como-trabajamos`).
- **Fases 4–6:** páginas completas de Restaurant OS (problema, cómo
  funciona, vista conceptual, lista de espera, FAQ), Facturación y Contacto;
  formulario único con 3 variantes, toast, WhatsApp flotante, páginas
  legales; SEO por ruta, OG image, favicon, JSON-LD, sitemap/robots y
  Vercel Analytics.
