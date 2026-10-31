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

Fases 0–3 del plan hechas: router + SSG, componentes compartidos, header y
footer nuevos, home rediseñado. Páginas internas en versión base (Fase 4
las completa). Pendiente: captación (Fase 5) y SEO/deploy (Fase 6).

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
| `**` | `pages/not-found` (lazy) | Client (fallback `index.csr.html`) |

**Al agregar una ruta:** agregarla en `app.routes.ts` (con `title`) **y** en
`app.routes.server.ts` (si no, no se prerenderiza). Agregarla al footer
(`FOOTER_COLUMNS`) y, si corresponde, al nav (`NAV_LINKS`).

Títulos de pestaña: `core/services/title.strategy.ts` → "`<título>` · ZIARON
Technologies" (el home usa "ZIARON Technologies — ..."). Meta description y
Open Graph por página: Fase 6.

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
  title.strategy.ts          Títulos de pestaña por ruta
data/content.data.ts         TODOS los textos de negocio y la navegación (ver abajo)
models/                      Interfaces (sin lógica)
layout/                      Piezas del shell, presentes en todas las rutas
  header/                    Wordmark + nav + CTA + tema + menú móvil
  footer/                    Columnas (marca, Productos, Empresa, Legal) + copyright
  loader/                    Overlay de carga inicial (isotipo animado)
  theme-toggle/
pages/                       Una carpeta por ruta
  home/                      Solo compone secciones (sections/*)
    sections/                hero, capabilities, products, principles, roadmap, cta
  restaurant-os/ billing/ about/ contact/ not-found/
shared/
  components/                section-title, page-header, status-pill, nexus-panel, scroll-progress, back-to-top
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

## Contenido placeholder / honesto (no inventar)

- `/contacto`: aviso honesto de que el canal oficial está en preparación. No
  se publica un correo/WhatsApp/formulario que todavía no responde.
- Footer: "Empresa en constitución" (aprobado por el usuario; cambiar a razón social + RUC al constituirse); sin correo ni redes hasta que existan.
- Lista de espera de Restaurant OS: bloque "Próximamente" en `#lista-espera`
  de su página (el formulario real es Fase 5).

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
