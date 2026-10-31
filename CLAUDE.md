# ZIARON Website — contexto para trabajar más rápido

Landing page institucional de ZIARON Technologies. Es **solo informativa**
(misión, visión, valores, ecosistema de productos): no hay panel
administrativo ni autenticación en este repo. Es una **SPA de una sola
página** con scroll a secciones ancladas (links `href="#id"` + scroll
nativo del navegador, ver "Nav con scroll a secciones" más abajo) — no usa
Angular Router.

Contenido basado en `ZIARON_Foundation_v0.3.md` (documento fundacional del
repo `ziaron-foundation`). Si el contenido de negocio cambia, ese es el
documento fuente a revisar primero.

**Estado actual de la página:** implementado el handoff de diseño de
Claude Design (mockup hi-fi aprobado, 6 pantallas: desktop/tablet/mobile ×
claro/oscuro), más dos rondas de ajustes propios (ver más abajo). Hoy se
muestran: header (wordmark + nav con "NOSOTROS"/"ECOSISTEMA" + pill "En
construcción" + selector de tema — nav oculto en mobile por espacio, ver
`HeaderComponent`), hero (frase de marca + meta row con conteos reales del
ecosistema), sección "Quiénes somos" (`AboutComponent`, id de ancla
`nosotros`, contenido real de Visión/Filosofía de `01-company/README.md`),
bloque "Qué hacemos" (`CapabilitiesComponent`, id de ancla `ecosistema`, 4
tarjetas con las líneas de trabajo), panel "Nexus" (`SystemStatusComponent`,
isotipo SVG + terminal con el estado real de `PRODUCTS`) y footer
(copyright + "Perú · ziaron.com", sin correo/redes todavía a propósito).
Las secciones de Principios y Hoja de ruta siguen ocultas — el contenido
ya está listo en `src/app/data/content.data.ts` (`PRINCIPLES`, `PHASES`),
solo falta crear los componentes (`PrinciplesComponent`,
`RoadmapComponent`) y agregarlos a `home.component.html` cuando se quiera
reactivarlas.

**Sobre el nav con más de un link:** el brief original decía "un solo
link, no agregar menú" porque solo había una sección real. Se agregó
"NOSOTROS" cuando se creó una segunda sección real (`AboutComponent`) — la
regla de fondo sigue siendo la misma: el nav crece 1:1 con secciones reales
que existan, nunca con links decorativos sin destino (se evaluó
explícitamente y se descartó agregar "Misión"/"Visión" como links sueltos
sin contenido detrás).

**Geometría del panel Nexus y del loader:** ambos deben ser réplicas a
escala exacta del isotipo maestro (`branding-assets/02-isotype/svg/
ziaron-isotype.svg`, cuadrado de nodos de 166.1843px, stroke 21.8414) —
el loader es 1:1 con el maestro; el panel Nexus usa un cuadrado de 112px
(factor de escala 112 ÷ 166.1843 ≈ 0.674 aplicado a stroke, nodos y
núcleo). Si se toca una de las dos geometrías, recalcular la otra con este
mismo factor para que no se desalineen (pasó una vez: se aumentó el grosor
de la Z sin reescalar los nodos, y quedaron casi tapados por el trazo).
Ambos incluyen las mismas guías punteadas decorativas (diagonales +
"ticks" cardinales alrededor del núcleo) — estáticas en los dos, la única
diferencia real es que el loader anima el dibujado y el panel no.

## Stack

- Angular 22 (standalone, sin NgModules)
- Tailwind CSS v4, integrado vía PostCSS (no vía `tailwind.config.js` — v4 no lo usa)
- Sin librería de componentes (Bootstrap/Material) — decisión deliberada para no pelear
  contra la identidad visual custom.

## Arquitectura de carpetas (`src/app/`)

```
app/
├── app.ts / .html / .scss     Shell: compone header + main(home) + footer, layout de página completa
├── core/
│   └── services/
│       └── theme.service.ts   Estado del tema (signal), localStorage, matchMedia
├── models/                    Interfaces y tipos (sin lógica)
│   ├── theme.model.ts         ThemeMode
│   └── content.model.ts       ProductNode, Capability, Principle, Phase
├── data/
│   └── content.data.ts        Datos reales (CAPABILITIES, PRODUCTS ya renderizados;
│                               PRINCIPLES, PHASES aún no — ver estado arriba)
├── pages/
│   └── home/                  Página "Home": compone <app-hero /> + <app-capabilities /> + <app-system-status />
├── shared/
│   └── directives/
│       └── reveal.directive.ts  `appReveal` — IntersectionObserver, agrega .visible al entrar al viewport
└── components/
    ├── header/                Wordmark + nav ("NOSOTROS"/"ECOSISTEMA") + status pill + theme-toggle
    ├── hero/                  Sección "Inicio": eyebrow + H1 con degradado + meta row
    ├── about/                 Sección "Quiénes somos" (id `nosotros`) — contenido real, sin repetir el hero
    ├── capabilities/          Bloque "Qué hacemos" (id `ecosistema`) — 4 tarjetas, usa CAPABILITIES
    ├── system-status/         Panel "Nexus" — isotipo SVG inline + terminal con estado real (PRODUCTS)
    ├── loader/                Overlay de carga inicial con el isotipo animándose (ver app.html)
    ├── footer/
    └── theme-toggle/          Grupo de 3 botones (claro/auto/oscuro), inyecta ThemeService
```

Origen del diseño actual: `design_handoff_ziaron_landing/` (bundle exportado de
Claude Design, no vive en este repo — son referencias HTML/README, no código
para copiar tal cual). Si el diseño visual cambia de nuevo, ese README es el
lugar donde están los valores exactos (colores, tipografías, espaciados,
geometría del isotipo) que se usaron para escribir los componentes de arriba.

### Inspiración: `iamwgp-portfolio`

El otro proyecto Angular del usuario (`D:\GIT\WGOMEZPR\iamwgp-portfolio`)
usa una arquitectura hermana (`core/services`, `shared/components`,
`shared/directives`, feature folders) y ya tiene resuelto en Tailwind/SCSS
patrones que ZIARON todavía no necesita pero puede reutilizar cuando
crezca:

- `shared/directives/reveal.directive.ts` — ya adoptado acá tal cual.
- `shared/components/terminal/` — terminal con efecto typewriter real
  (líneas que se escriben progresivamente). El panel de estado del hero
  de ZIARON es una versión estática; si se quiere el efecto de escritura,
  ese componente es la referencia directa.
- `shared/components/section-title/` — eyebrow + heading + acento + sub
  como componente con `@Input()`, para no repetir ese bloque de markup en
  cada sección nueva (Ecosistema, Principios, Roadmap). Vale la pena
  crear el equivalente en ZIARON cuando se reactiven esas secciones.
- `shared/components/back-to-top/` y `scroll-progress/` — solo aplican
  cuando la página vuelva a tener scroll (ver nota de "Home sin scroll"
  más abajo).

Es una SPA de una sola pantalla, **no usa Angular Router** — `pages/home`
no es una "ruta", es solo la capa que agrupa el contenido de `<main>`
separada del layout (`header`/`footer`), para que crecer el home no
signifique tocar el shell (`app.html`). Si en algún momento se necesitan
rutas reales (ej. una página de privacidad aparte), ahí sí se agrega
`provideRouter` en `app.config.ts` y `app.routes.ts` (ya existen, vacíos,
del scaffold inicial de `ng new`).

Al agregar una sección nueva (ej. reactivar Ecosistema): crear
`components/ecosystem/`, importar `PRODUCTS` desde `data/content.data.ts`,
y agregar `<app-ecosystem />` dentro de `pages/home/home.component.html`
(no en `app.html`).

### Por qué un service para el tema

El tema (`ThemeService`) vive en `core/services` porque es estado
compartido: lo lee `HeaderComponent` (vía `ThemeToggleComponent`) pero en
el futuro cualquier componente podría necesitarlo. Los componentes de
presentación (`header`, `hero`, `footer`, `home`) no tienen lógica de
negocio propia — solo maquetación y, cuando aplica, inyectan servicios.

### `display: contents` en los componentes del shell

`header`, `home`, `hero` y `footer` usan `:host { display: contents; }`
en su SCSS. Esto es necesario porque `app.scss` pone al `:host` de `App`
como flex-column de `100dvh`, y sus hijos directos deben ser los
elementos `<header>`/`<main>`/`<footer>` reales (con `flex-shrink-0` /
`flex-1`) para que el cálculo de alturas funcione — no los tags custom
que Angular inserta (`<app-header>`, `<app-home>`, etc.). Si se crea un
componente nuevo que sea hijo directo del shell o de `home`, aplicar el
mismo patrón.

## Convención de nombres (Angular CLI)

Este proyecto restaura el sufijo clásico (`.component.ts`, `.service.ts`, etc.)
que Angular 20+ quitó por defecto. Configurado en `angular.json` →
`projects.ziaron-website.schematics`. Al correr `ng generate`, los archivos
saldrán con sufijo automáticamente — no hay que hacer nada extra.

## Sistema de diseño

### Tokens semánticos (única fuente de verdad: `src/tailwind.css`)

Los colores **no son fijos** — son tokens semánticos que cambian de valor
según el tema (claro/oscuro), definidos como variables CSS en `:root` (claro)
y `.dark` (oscuro), y expuestos a Tailwind vía `@theme inline`. Esto es lo
que permite el selector de tema sin duplicar clases.

**Nunca hardcodear un color hex en HTML/SCSS.** Usar siempre estas utilidades:

| Utilidad Tailwind | Uso |
|---|---|
| `bg-bg` / `text-bg` | Fondo de página |
| `bg-bg-elevated` | Fondo de tarjetas/paneles elevados |
| `border-border` | Bordes de tarjetas/paneles (~10-11% opacidad) |
| `border-line` | Divisores finos (header, footer, entre secciones — ~9% opacidad, más sutil que `border`) |
| `text-text` | Texto principal |
| `text-text-muted` | Texto secundario (~60% opacidad equivalente) |
| `text-text-dim` | Texto terciario (~38-42% opacidad equivalente) — reemplaza al viejo `text-faint` |
| `bg-accent` / `text-accent` / `border-accent` | Acento de marca (cian en oscuro, teal en claro) |
| `text-accent-text` | Variante de acento para texto sobre fondos claros de pill/link (más contraste que `accent` puro en oscuro) |
| `bg-accent-bg` / `border-accent-border` | Fondo/borde tenue de acento (pills, chips) |
| `bg-ctl-bg` / `border-ctl-border` | Fondo/borde de controles tipo grupo de botones (selector de tema) |
| `bg-pill-on` | Fondo del botón activo dentro de un grupo de controles |
| `--dot-grid` (variable CSS, no utilidad) | Color de la retícula de puntos de fondo (`app.scss`) |

Valores actuales: ver `src/tailwind.css` (`:root` y `.dark`) — sincronizados con
`design_handoff_ziaron_landing/README.md` (handoff de Claude Design, alta
fidelidad). Colores base tomados del branding definido en
`02-branding/README.md` del repo `ziaron-foundation` (azul profundo, cian
tecnológico, gris grafito, blanco); el modo claro usa un teal más oscuro como
acento por contraste (AA) sobre fondo claro — el cian brillante original solo
funciona bien sobre fondo oscuro.

| Rol | Fuente | Utilidad |
|---|---|---|
| Display (títulos, marca) | Space Grotesk | `font-display` |
| Cuerpo | Inter | `font-body` (aplicada por defecto en `<body>`, ver `index.html`) |
| Mono (eyebrows, labels, datos, panel de estado) | JetBrains Mono | `font-mono` |

Para agregar un color o tipografía nueva: edítalo en `src/tailwind.css`
(dentro de `:root`/`.dark` si es un tema, o en `@theme inline` si es fijo
para ambos temas), no en ningún otro lado.

### Modo oscuro / claro / automático

- Implementado con la estrategia de clase de Tailwind v4:
  `@custom-variant dark (&:where(.dark, .dark *));` en `tailwind.css`.
  Esto hace que `dark:` **no** dependa directamente de `prefers-color-scheme`
  — depende de si `<html>` tiene la clase `.dark`, que la app controla.
- Lógica centralizada en `ThemeService` (`core/services/theme.service.ts`):
  signal `theme` (`'light' | 'dark' | 'auto'`), persistida en `localStorage`
  bajo la key `ziaron-theme`. En modo `auto` escucha
  `matchMedia('(prefers-color-scheme: dark)')` y sigue al sistema.
- `index.html` tiene un `<script>` inline en el `<head>` que aplica el tema
  guardado **antes** de que Angular arranque, para evitar parpadeo (FOUC).
  Si cambia la lógica del service, hay que reflejarla ahí también (están
  duplicadas a propósito: una corre antes de que Angular exista).
- Selector de tema: `ThemeToggleComponent`, 3 botones (claro/auto/oscuro)
  en el nav, con iconos SVG inline y `aria-pressed`. Inyecta `ThemeService`
  directamente (no recibe `@Input`).

### Patrón de layout: full-bleed, sin ancho máximo

Cada `<section>` ocupa `w-full` (fondo, bordes y contenido van de borde a
borde de la pantalla — a pedido explícito del usuario, **no** hay un
`max-w` centrando el contenido). El padding lateral crece con el viewport:
`px-6 md:px-12 lg:px-20`. Al agregar una sección nueva, copia ese patrón:

```html
<section class="w-full border-t border-border py-20 md:py-24">
  <div class="w-full px-6 md:px-12 lg:px-20">
    <!-- contenido -->
  </div>
</section>
```

Los bloques de texto largo (citas, párrafos) sí pueden llevar su propio
`max-w-[...]` interno por legibilidad — eso es tipografía, no layout de
página, y está bien mantenerlo.

### Scroll vertical normal (ya no es pantalla única)

Con el hero + "Qué hacemos" + panel Nexus activos, el contenido no siempre
cabe en un viewport, así que la página vuelve a hacer scroll vertical
normal en todos los tamaños (ver `design_handoff_ziaron_landing/README.md`,
"la página hace scroll vertical en todos los tamaños"). `:host` de `App`
usa `min-height: 100dvh` (no `height` fijo) en `app.scss`, y `<body>` en
`index.html` usa `min-h-screen` (sin `overflow-hidden`). Si se agregan más
secciones no hay que tocar esto de nuevo — ya está pensado para crecer.

### Fondo decorativo de la página (retícula + glow)

Viven en `app.scss` (`.page-dot-grid` y `.page-glow`), no en un componente,
porque cubren header + main + footer completos, no solo el hero (ver el
mismo README). Se renderizan como dos `<div>` absolutos en `app.html`,
detrás del contenido (`z-0`; header/main/footer llevan `relative z-10`).

### Nav con scroll a secciones

El nav tiene dos links reales, "NOSOTROS" (`#nosotros` → `AboutComponent`)
y "ECOSISTEMA" (`#ecosistema` → `CapabilitiesComponent`) — scroll nativo
del navegador (ancla `#id` + `scroll-behavior: smooth` global en
`styles.scss`), no hace falta lógica de `scrollTo()` en TypeScript. En
mobile el `<nav>` del header se oculta (`hidden sm:flex`) porque no entra
junto al wordmark y el selector de tema — en ese tamaño se navega con
scroll normal, las secciones tienen su propio `<h2>` visible. Si se agrega
otra sección con ancla propia, seguir el mismo patrón: un link por sección
real, nada de dropdowns/mega-menú ni links decorativos sin destino
(decisión explícita, ver handoff — el nav crece con el contenido real, no
al revés).

### Qué vive en Tailwind vs. qué vive en SCSS de cada componente

- **Tailwind (`*.component.html`)**: todo el layout, espaciado, color,
  tipografía, responsive, hover/focus states, tema. Es la norma por defecto.
- **SCSS de cada componente**: solo lo que Tailwind no resuelve de forma
  nativa. Hoy: `display: contents` en todos los componentes de sección
  (ver arriba), el degradado de texto del H1 en `hero.component.scss`
  (cambia de stops completos entre tema claro/oscuro, no solo de color) y
  la retícula/glow de fondo en `app.scss`. Si algo se puede hacer con
  utilidades de Tailwind, va en el HTML, no en SCSS.
- **La animación `reveal`** (aparición al hacer scroll/cargar) es la
  excepción: vive en `styles.scss` global + `shared/directives/
  reveal.directive.ts`, porque es un patrón compartido entre componentes,
  no algo propio del hero (patrón tomado de `iamwgp-portfolio`).

### Componentes visuales reutilizables (patrones, no todos son componentes Angular aún)

- **Status pill** (punto + texto mono uppercase, borde/fondo de acento
  tenue): aparece dos veces con el mismo marcado — en el header (desktop/
  tablet) y repetida arriba del eyebrow del hero (solo mobile, porque el
  header angosto no tiene espacio, ver `HeaderComponent`/`HeroComponent`).
  Es la misma información en dos lugares, no un componente compartido
  todavía — si se necesita una tercera vez, ahí sí vale la pena extraerla
  a `<app-status-pill>`.
- **Panel "Nexus"** (`SystemStatusComponent`): reemplazó al viejo panel
  tipo terminal falso. Es el isotipo real de ZIARON como SVG inline
  (geometría 1:1 obligatoria, ver README del handoff) + una terminal con
  el estado real del ecosistema, tomado de `PRODUCTS` en
  `content.data.ts` (misma fuente que la meta row del hero — si
  `PRODUCTS` cambia, ambos se actualizan solos). El SVG queda inline (no
  `<img>`) a propósito: `LoaderComponent` reutiliza esta misma geometría
  animada al cargar la página.
- Ya no hay elemento "hero" animado girando — se retiró a pedido del
  usuario (no le gustaba la animación constante). El panel Nexus es
  estático; la única animación de marca hoy vive en `LoaderComponent`
  (overlay de carga inicial) y respeta `prefers-reduced-motion`.

### Accesibilidad

- Todo elemento interactivo (botones, links) lleva
  `focus-visible:ring-2 focus-visible:ring-accent`.
- `prefers-reduced-motion: reduce` está respetado globalmente en
  `styles.scss` (anula animaciones/transiciones, incluida `reveal`).

## Pendiente / decisiones abiertas

- [x] Reactivar Ecosistema — implementado como `CapabilitiesComponent`
      ("Qué hacemos") + `SystemStatusComponent` (panel Nexus).
- [ ] Reactivar Principios y Hoja de ruta cuando el usuario lo pida (los
      datos ya están listos en `data/content.data.ts` — `PRINCIPLES`,
      `PHASES` —, falta crear los componentes).
- [ ] Agregar información de contacto al footer cuando se defina (a
      propósito no se puso todavía — hoy solo muestra "Perú · ziaron.com").
- [ ] Reservar redes sociales y agregarlas al footer (pendiente también en
      `01-company/README.md` del repo `ziaron-foundation`).
- [ ] Libro de reclamaciones virtual (INDECOPI) — evaluar si aplica antes
      de que el sitio tenga venta/contratación real; si aplica, va como
      link en el footer + página propia con `provideRouter` (necesita
      backend o proveedor externo, ver conversación de diseño).
- [ ] Páginas legales (Términos, Privacidad) — cuando existan, activar
      `provideRouter` en `app.config.ts`/`app.routes.ts` (ya scaffoldeados,
      vacíos) en vez de agregarlas como secciones de `home`.
- [ ] Extraer status pill a un componente propio si se reutiliza en un
      tercer lugar además de header/hero.
- [ ] Conectar con Vercel apuntando a este proyecto (dominio ziaron.com).
