# ZIARON Website — contexto para trabajar más rápido

Landing page institucional de ZIARON Technologies. Es **solo informativa**
(misión, visión, valores, ecosistema de productos): no hay panel
administrativo ni autenticación en este repo. Es una **SPA de una sola
página** con scroll a secciones ancladas (patrón `scrollIntoView`, ver
`HeaderComponent.scrollTo()`) — no usa Angular Router.

Contenido basado en `ZIARON_Foundation_v0.3.md` (documento fundacional del
repo `ziaron-foundation`). Si el contenido de negocio cambia, ese es el
documento fuente a revisar primero.

**Estado actual de la página (deliberado, no es un olvido):** solo se
muestran el hero, el nav y el footer. Las secciones de Ecosistema,
Principios y Hoja de ruta están ocultas a pedido del usuario mientras el
sitio sigue en construcción — el contenido ya está listo en
`src/app/data/content.data.ts`, solo falta crear los componentes
(`EcosystemComponent`, `PrinciplesComponent`, `RoadmapComponent`) y
agregarlos a `app.html` cuando se quiera reactivarlas. El footer tampoco
muestra correo de contacto todavía, a propósito.

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
│   └── content.model.ts       ProductNode, Principle, Phase
├── data/
│   └── content.data.ts        Datos reales (PRODUCTS, PRINCIPLES, PHASES) — sincronizados
│                               con ziaron-foundation, aún no renderizados (ver estado arriba)
├── pages/
│   └── home/                  Página "Home": compone el contenido de <main> (hoy solo <app-hero />)
├── shared/
│   └── directives/
│       └── reveal.directive.ts  `appReveal` — IntersectionObserver, agrega .visible al entrar al viewport
└── components/
    ├── header/                Nav + status pill + theme-toggle
    ├── hero/                  Sección "Inicio" — hoy único contenido de Home
    ├── footer/
    └── theme-toggle/          Grupo de 3 botones (claro/auto/oscuro), inyecta ThemeService
```

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
| `border-border` | Bordes, divisores |
| `text-text` | Texto principal |
| `text-text-muted` | Texto secundario (~60% opacidad equivalente) |
| `text-text-faint` | Texto terciario (~35-40% opacidad equivalente) |
| `bg-accent` / `text-accent` / `border-accent` | Acento de marca (cian en oscuro, teal en claro) |
| `border-accent-dim` | Acento atenuado (bordes de estado "activo") |

Valores actuales: ver `src/tailwind.css` (`:root` y `.dark`). Colores base
tomados del branding definido en `02-branding/README.md` del repo
`ziaron-foundation` (azul profundo, cian tecnológico, gris grafito, blanco);
el modo claro usa un teal más oscuro como acento por contraste (AA) sobre
fondo claro — el cian brillante original solo funciona bien sobre fondo oscuro.

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

### Home sin scroll (pantalla única)

Mientras solo exista la sección de inicio, la página completa (`header` +
`main` + `footer`) cabe exacto en un viewport, sin scrollbar — a pedido
explícito del usuario. Se logra con `:host` de `App` como flex-column de
`100dvh` en `app.scss`, `header`/`footer` con `flex-shrink-0`, y `main`
con `flex-1`. El `<body>` en `index.html` usa `h-screen overflow-hidden`
(no `min-h-screen`) por la misma razón.

**Importante:** en cuanto se reactiven Ecosistema/Principios/Roadmap (ver
sección de estado arriba), esto va a dejar de tener sentido — la página
volverá a tener scroll normal entre secciones. En ese momento, quitar
`overflow-hidden` del `<body>` y `h-screen` → `min-h-screen` de nuevo, y el
`main` puede volver a fluir sin `flex-1`.

### Nav con scroll a secciones

El nav hoy **no tiene links** (se probó con uno de ejemplo, "Inicio", y se
quitó — solo era para verificar el comportamiento de scroll). El patrón a
usar cuando haya más de una sección: `href="#<id>"` +
`(click)="scrollTo($event, '<id>')"`, evitando que el navegador empuje el
`#hash` a la URL. `id="inicio"` ya está puesto en la `<section>` de
`HeroComponent`, listo para cuando se reactive el nav.

### Qué vive en Tailwind vs. qué vive en SCSS de cada componente

- **Tailwind (`*.component.html`)**: todo el layout, espaciado, color,
  tipografía, responsive, hover/focus states, tema. Es la norma por defecto.
- **SCSS de cada componente**: solo lo que Tailwind no resuelve de forma
  nativa. Hoy: `display: contents` en header/hero/footer (ver arriba), y la
  textura `.blueprint-grid` en `hero.component.scss`. Si algo se puede
  hacer con utilidades de Tailwind, va en el HTML, no en SCSS.
- **La animación `reveal`** (aparición al hacer scroll/cargar) es la
  excepción: vive en `styles.scss` global + `shared/directives/
  reveal.directive.ts`, porque es un patrón compartido entre componentes,
  no algo propio del hero (patrón tomado de `iamwgp-portfolio`).

### Componentes visuales reutilizables (patrones, no todos son componentes Angular aún)

- **Status pill** (punto con "ping" + texto mono uppercase): usado en el nav
  ("En construcción"). Si se repite una tercera vez, vale la pena extraerlo
  a un `<app-status-dot>` standalone.
- **Panel de estado tipo terminal**: el bloque del hero (ventana con 3
  puntos arriba + líneas `$ comando` en mono) que reemplazó al elemento
  animado original. Muestra el estado **real** de la Fase 1, no el de
  `data/content.data.ts` (ese array todavía dice "Branding" completo y
  Restaurant OS "en construcción", que ya no es preciso — hay que
  actualizarlo cuando se reactive el roadmap). Estado real actual:
  Fundación de ZIARON lista, Branding en definición, Restaurant OS sin
  empezar (no se muestra la línea hasta que arranque). Si se necesita en
  otra sección, es un buen candidato a componente propio.
- Ya no hay elemento "hero" animado girando — se retiró a pedido del
  usuario (no le gustaba la animación constante). El panel de estado es
  estático salvo por el cursor parpadeante (`_`), que respeta
  `prefers-reduced-motion`.

### Accesibilidad

- Todo elemento interactivo (botones, links) lleva
  `focus-visible:ring-2 focus-visible:ring-accent`.
- `prefers-reduced-motion: reduce` está respetado globalmente en
  `styles.scss` (anula animaciones/transiciones, incluida `reveal`).

## Pendiente / decisiones abiertas

- [ ] Reactivar secciones de Ecosistema, Principios y Hoja de ruta cuando
      el usuario lo pida (los datos ya están listos en `data/content.data.ts`,
      falta crear los componentes).
- [ ] Agregar información de contacto al footer cuando se defina (a
      propósito no se puso todavía).
- [ ] Extraer status pill / panel de estado a componentes propios si se
      reutilizan en una tercera sección.
- [ ] Conectar con Vercel apuntando a este proyecto (dominio ziaron.com).
