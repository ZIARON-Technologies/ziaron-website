# ZIARON Website — Sistema de diseño

Documento de referencia visual/UX del landing de ZIARON Technologies. Complementa a
`CLAUDE.md` (que cubre arquitectura de código y decisiones de ingeniería): acá está
todo lo relativo a **cómo se ve y se siente** la página — paleta, tipografía,
espaciado, inventario de componentes, motion y estado actual — para retomar contexto
rápido en cualquier sesión futura antes de tocar diseño.

**Estado del proyecto: en construcción, avance parcial.** Este documento describe lo
que existe HOY, no un ideal terminado. Ver "Pendiente" al final.

---

## 1. Identidad y tono

- **Qué es:** landing institucional de una sola página (SPA sin router) para ZIARON
  Technologies — empresa de ingeniería tecnológica en Fase 1 (fundación), sin
  productos en vivo todavía.
- **Tono visual:** técnico, minimalista, "infraestructura seria" — no corporativo
  genérico ni startup juguetona. Referencia de nivel de sofisticación (no de
  escala/contenido): páginas de empresas de ingeniería/infraestructura.
- **Frase de marca** (usar tal cual, es la narrativa oficial, vive en el H1 del hero):
  > No desarrollamos únicamente software.
  > Diseñamos plataformas inteligentes que impulsan empresas.
- **Origen del diseño:** handoff de Claude Design (`design_handoff_ziaron_landing/`,
  bundle externo con HTML de referencia + README de especificación — no vive en este
  repo), implementado en Angular con dos rondas de ajustes propios documentadas en
  `CLAUDE.md`.

---

## 2. Paleta de color

### 2.1 Paleta de marca (fija, no cambia con el tema)

Usada en el isotipo, gradientes y acentos puntuales. Nunca reinterpretar estos hex.

| Nombre | Hex | Uso |
|---|---|---|
| Violeta | `#8B5CF6` | Nodo 1 del isotipo, punto del dot-grid, gradiente |
| Índigo | `#6366F1` | Nodo 2, anillo del núcleo, gradiente |
| Azul eléctrico | `#4F7FFF` | Nodo 3, líneas punteadas decorativas, gradiente |
| Cian de marca | `#06B6D4` | Nodo 4 en tema oscuro, gradiente |
| Cian IA | `#22D3EE` | Acento en tema oscuro, centro del núcleo (glow) |

### 2.2 Tokens semánticos (cambian por tema — única fuente: `src/tailwind.css`)

| Token CSS | Utilidad Tailwind | Claro | Oscuro | Uso |
|---|---|---|---|---|
| `--bg` | `bg-bg` | `#f6f8fb` | `#05070c` | Fondo de página |
| `--bg-elevated` | `bg-bg-elevated` | `#ffffff` | `#0e1626` | Tarjetas, panel Nexus, hueco de nodos |
| `--text` | `text-text` | `#0b1220` | `#f2f6fb` | Texto principal |
| `--text-muted` | `text-text-muted` | `rgba(11,18,32,.62)` | `rgba(230,237,247,.6)` | Texto secundario (párrafos) |
| `--text-dim` | `text-text-dim` | `rgba(11,18,32,.42)` | `rgba(230,237,247,.38)` | Texto terciario (labels, meta) |
| `--line` | `border-line` | `rgba(11,18,32,.09)` | `rgba(230,237,247,.09)` | Divisores finos (header/footer/secciones) |
| `--border` | `border-border` | `rgba(11,18,32,.1)` | `rgba(230,237,247,.11)` | Bordes de tarjetas/paneles |
| `--accent` | `bg/text/border-accent` | `#0e7490` (teal) | `#22d3ee` (cian) | Acento de marca — AA en claro, brillante en oscuro |
| `--accent-text` | `text-accent-text` | `#0e7490` | `#7fe6f7` | Variante de acento con más contraste sobre pills/links |
| `--accent-bg` | `bg-accent-bg` | `rgba(14,116,144,.07)` | `rgba(34,211,238,.07)` | Fondo tenue de pills/chips |
| `--accent-border` | `border-accent-border` | `rgba(14,116,144,.28)` | `rgba(34,211,238,.28)` | Borde de pills, hover de tarjetas |
| `--ctl-bg` | `bg-ctl-bg` | `#ffffff` | `rgba(255,255,255,.03)` | Fondo del selector de tema |
| `--ctl-border` | `border-ctl-border` | `rgba(11,18,32,.12)` | `rgba(230,237,247,.12)` | Borde del selector de tema |
| `--pill-on` | `bg-pill-on` | `rgba(14,116,144,.12)` | `rgba(34,211,238,.14)` | Fondo del botón activo (selector de tema) |
| `--dot-grid` | *(variable CSS directa)* | `rgba(15,23,42,.10)` | `rgba(99,102,241,.16)` | Retícula de puntos de fondo |
| `--shadow-panel` | *(variable CSS directa)* | `0 26px 60px -34px rgba(11,18,32,.35)` | `0 28px 70px -34px rgba(0,0,0,.9)` | Sombra del panel Nexus |

**Regla de oro:** nunca hardcodear un hex de UI (fondo, texto, borde) en HTML/SCSS —
siempre a través de estos tokens. Los hex de la paleta de marca (tabla 2.1) sí se
usan literales, pero solo dentro del SVG del isotipo/loader/panel Nexus, nunca en
layout general.

Selector de tema: claro / oscuro / automático, vía clase `.dark` en `<html>`
(`ThemeService`, `core/services/theme.service.ts`). `auto` sigue
`prefers-color-scheme` y se recalcula en runtime — expone también `isDark()` (signal)
para los pocos casos donde un componente necesita un *asset* distinto por tema (ej.
el SVG del wordmark), no solo un color.

---

## 3. Tipografía

| Rol | Fuente | Utilidad Tailwind | Pesos cargados |
|---|---|---|---|
| Display (títulos, H1/H2/H3, marca) | Space Grotesk | `font-display` | 400, 500, 600, 700 |
| Cuerpo (párrafos) | Inter | `font-body` (por defecto en `<body>`) | 400, 500, 600 |
| Mono (eyebrows, labels, terminal, footer, nav) | JetBrains Mono | `font-mono` | 400, 500 |

Cargadas vía Google Fonts en `src/index.html` (`<link>` con `preconnect`).

### Escala tipográfica real (mobile / tablet / desktop)

| Elemento | Tamaño | Peso | Tracking |
|---|---|---|---|
| H1 (hero) | 33 / 44 / 57px | 500 | -0.02em |
| H2 (secciones) | 22 / — / 24px | 500 | -0.015em |
| H3 (tarjetas) | 17 / — / 18px | 500 | -0.01em |
| Body (párrafos hero/about) | 15.5 / 16.5 / 17.5px | 400 | normal |
| Body (tarjetas) | 14 / — / 14.5px | 400 | normal |
| Mono (eyebrow, meta, labels) | 9.5–11.5px según contexto | 400–500 | 0.06–0.16em |

La segunda línea del H1 (`Diseñamos plataformas inteligentes que impulsan empresas.`)
lleva un degradado de marca recortado al texto (`background-clip: text`), con stops
distintos por tema — vive en `hero.component.scss` porque Tailwind no puede
expresar un degradado condicional al tema con una sola clase:

- Claro: `linear-gradient(96deg, #7C3AED, #3B63D9 48%, #0E7490)`
- Oscuro: `linear-gradient(96deg, #8B5CF6, #4F7FFF 45%, #22D3EE)`

---

## 4. Layout y espaciado

- **Full-bleed, sin ancho máximo centrado.** Ninguna sección usa `max-w-container`;
  el contenido va de borde a borde con padding lateral que crece por breakpoint.
- **Breakpoints usados:** base (mobile, ~375px), `sm:` (640px, "tablet" del sistema),
  `lg:` (1024px, "desktop"). Consistente en todo el código actual — no usar `md:`
  si se agrega algo nuevo, para no mezclar escalas de breakpoint.
- **Padding lateral de página:** `22px` (mobile) → `44px` (`sm:`, vía `px-11`) →
  `72px` (`lg:`, arbitrario `px-[72px]`). Aplicado en `app.html` (`<main>`),
  `HeaderComponent` y `FooterComponent` — deben moverse juntos si cambia.
  Gap vertical entre secciones dentro de `<main>`: `40px` → `52px` → `64px`.
  Padding vertical de `<main>`: `34px` → `56px` → `88px`.
- **Scroll:** vertical normal en todos los tamaños (ya no es "pantalla única" — esa
  fase terminó cuando se activaron Nosotros/Ecosistema/Nexus).
- **Radios:** `999px` (pills, botones de tema), `16px`/`rounded-2xl` (panel Nexus),
  `14px` (tarjetas de capacidades), `10px` (caja de ícono).
- **Fondo decorativo global** (`app.scss`, capas `.page-dot-grid` + `.page-glow`,
  detrás de header+main+footer, no solo del hero):
  - Retícula de puntos: `radial-gradient(var(--dot-grid) 1px, transparent 1px)`,
    celda de 36px (mobile) / 44px (`sm:`+).
  - Glow: círculo de 760px en la esquina superior derecha, colores de marca
    (violeta/azul en claro, cian/azul en oscuro), no ligado a tokens porque no se
    reutiliza en ningún otro lado.

---

## 5. Motion

Filosofía: **el contenido "arranca" como un sistema al bootear**, de arriba hacia
abajo, terminando en el panel de estado — coherente con que la marca es
"Nexus"/infraestructura, no decoración gratuita. Toda animación respeta
`prefers-reduced-motion: reduce` (desactivada globalmente en `styles.scss`).

- **`appReveal`** (`shared/directives/reveal.directive.ts`): IntersectionObserver
  genérico, agrega `.visible` una sola vez al entrar el elemento al viewport
  (threshold 0.12). El estilo base (`opacity` + `translateY(12px)` →
  `translateY(0)`, 0.6s `cubic-bezier(0.16,1,0.3,1)`) vive en `styles.scss`, la
  directiva solo controla *cuándo*.
- **Clases de delay** (todas en `styles.scss`, todas relativas a cuándo ESE
  elemento entra al viewport, no a un reloj global de página):
  - `.reveal-delay-1/2/3` — ritmo del hero y encabezados de sección (0.05 / 0.15 /
    0.28s). Usadas también en `AboutComponent` y el header de `CapabilitiesComponent`.
  - `.reveal-delay-card-1..4` — cascada rápida (0 / 0.08 / 0.16 / 0.24s) para las 4
    tarjetas de "Qué hacemos", que ya están juntas en el viewport cuando entran (un
    stagger corto se lee como "se van encendiendo en orden").
  - `.reveal-delay-panel` (0.32s) — el panel Nexus se revela último, después de las
    tarjetas: es deliberado, el panel de estado del ecosistema "enciende" al final
    de la secuencia.
- **Transición de tema:** `transition-colors duration-200` en header/footer/panel
  Nexus + regla global de respaldo (`:where(body, header, footer, main, section,
  article, .page-glow)` en `styles.scss`, especificidad 0 para no pisar las
  anteriores) — sin esto, cambiar de claro a oscuro se sentía como un "salto".
- **Loader** (`LoaderComponent`, overlay de carga inicial, ver §6): única pieza con
  animación en loop — la Z del isotipo se dibuja en dos mitades desde el núcleo
  hacia los 4 nodos, núcleo pulsando, flash de impacto en cada nodo, colores
  aleatorios de la paleta de marca en cada carga. Se autodestruye tras ~0.9s mínimo
  de exhibición + 0.5s de fade-out.

---

## 6. Inventario de componentes

Todos standalone (Angular 22, sin NgModules), todos con `:host { display: contents; }`
en su SCSS excepto `App` (root, sí es el contenedor flex real) — ver "por qué" en
`CLAUDE.md`.

| Componente | Rol | Contenido / datos |
|---|---|---|
| `App` (`app.ts/html/scss`) | Shell: fondo decorativo + loader + header + main + footer | — |
| `LoaderComponent` | Overlay de carga inicial animado | Colores random de `RING_PALETTE` |
| `HeaderComponent` | Wordmark (SVG según tema) + nav (Nosotros/Ecosistema, oculto en mobile) + pill "En construcción" + selector de tema | — |
| `HeroComponent` | Eyebrow + H1 con gradiente + párrafo + meta row (conteos reales) | `PRODUCTS` (conteo `live`/`building`) |
| `AboutComponent` | Sección "Quiénes somos" (`#nosotros`) | Texto fijo, basado en visión real de la empresa |
| `CapabilitiesComponent` | Sección "Qué hacemos" (`#ecosistema`), 4 tarjetas | `CAPABILITIES` |
| `SystemStatusComponent` | Panel "Nexus": isotipo SVG inline + terminal de estado | `PRODUCTS` |
| `FooterComponent` | Copyright + "Perú · ziaron.com" | `year()` (signal, `Date` actual) |
| `ThemeToggleComponent` | 3 botones (claro/auto/oscuro) | Inyecta `ThemeService` |

### Datos (`src/app/data/content.data.ts` + `src/app/models/content.model.ts`)

- `CAPABILITIES: Capability[]` — 4 líneas de trabajo (ya renderizado).
- `PRODUCTS: ProductNode[]` — ecosistema real (ya renderizado, usado en hero Y panel
  Nexus — si cambia, ambos se actualizan solos).
- `PRINCIPLES`, `PHASES` — listos en datos, **sin componente ni render todavía**.
- `productStatusLabel()` vs `terminalStatusLabel()`: dos formateadores del mismo
  `ProductStatus` — el primero en prosa normal ("En construcción"), el segundo estilo
  terminal en minúsculas ("construyendo"), usado solo en el panel Nexus.

---

## 7. El isotipo — geometría crítica (no reinterpretar)

El isotipo (Z con núcleo + 4 nodos) aparece en 3 lugares con la MISMA proporción,
solo cambia la escala y si anima o no:

| Instancia | Archivo | Cuadrado de nodos | Factor vs. maestro |
|---|---|---|---|
| Isotipo maestro | `branding-assets/02-isotype/svg/ziaron-isotype.svg` (repo `ziaron-foundation`) | 166.1843px | 1× (referencia) |
| Loader (animado) | `loader.component.html` | 166.1843px | 1× — copia exacta del maestro |
| Panel Nexus (estático) | `system-status.component.html` | 112px | 0.674× |

**Regla:** si se toca stroke-width, radio de nodo o radio del núcleo en una
instancia, recalcular las otras dos con el mismo factor de escala relativo al
isotipo maestro. Ya pasó una vez (se subió el grosor de la Z sin reescalar los
nodos, y quedaron casi tapados) — ver historial en `CLAUDE.md`.

Valores actuales (panel Nexus, factor 0.674 aplicado al maestro):

| Elemento | Maestro (166.18) | Panel Nexus (112) |
|---|---|---|
| Stroke de la Z | 21.8414 | 14.7 |
| Nodo — halo | *(no existe en el maestro)* | 24.4 (agregado propio del panel, ratio 1.73× el disco) |
| Nodo — disco | 20.8918 | 14.1 |
| Nodo — hueco | 10.4459 (= disco/2) | 7.05 |
| Nodo — punto central | 4.17835 (= disco/5) | 2.82 |
| Núcleo — anillo | 18.9925 | 12.8 |
| Núcleo — stroke del anillo | 1.89925 | 1.28 |
| Núcleo — disco (gradiente) | 12.3451 | 8.32 |
| Núcleo — punto central | 2.37406 | 1.6 |

Ambos (loader y panel) incluyen las mismas guías punteadas decorativas alrededor del
núcleo (diagonales `stroke-dasharray` + "ticks" cardinales) — no existen en el
isotipo maestro, son un agregado para dar sensación de "red activa" en contextos más
grandes. Estáticas en los dos; la única diferencia real entre loader y panel es que
el loader anima el dibujado de la Z y el panel no.

Colores del nodo 4 (única variación entre tema claro/oscuro en toda la geometría):
`#0E7490` en claro, `#06B6D4` en oscuro — el resto de nodos usa los mismos hex de
marca en ambos temas.

---

## 8. Assets de marca

Ubicación en el proyecto: `public/brand/logos/` (wordmark SVG light/dark, servidos
por `HeaderComponent` según `ThemeService.isDark()`). El resto de assets (isotipo,
favicons, app icons, avatares, social) vive en `branding-assets/` dentro del repo
`ziaron-foundation`, no en `ziaron-website` — se copian acá solo si un componente
los necesita servir directamente.

---

## 9. Accesibilidad

- Todo elemento interactivo (links de nav, wordmark, botones de tema) lleva
  `focus-visible:ring-2 focus-visible:ring-accent` + `outline-none`.
- `prefers-reduced-motion: reduce` desactiva reveal, loader y transiciones de tema
  globalmente (`styles.scss`).
- Contraste de `--accent` verificado AA sobre `--bg` en ambos temas (por eso el
  claro usa un teal más oscuro en vez del cian brillante del oscuro).

---

## 10. Pendiente / próximas iteraciones

Estado real a la fecha de este documento — revisar y tachar conforme se avance:

- [ ] Reactivar Principios y Hoja de ruta (`PRINCIPLES`, `PHASES` ya tienen datos,
      faltan `PrinciplesComponent`/`RoadmapComponent`).
- [ ] Contenido de contacto en footer (a propósito no está — no hay correo oficial
      todavía).
- [ ] Redes sociales (pendiente reservarlas primero, ver `01-company/README.md`).
- [ ] Libro de reclamaciones virtual (INDECOPI) — evaluar si aplica antes de venta
      real; necesitaría backend o proveedor externo.
- [ ] Páginas legales (Términos, Privacidad) — activar `provideRouter`
      (`app.config.ts`/`app.routes.ts`, ya scaffoldeados vacíos) cuando existan.
- [ ] Extraer status pill a componente propio si se reutiliza en un tercer lugar
      (hoy vive duplicado en `HeaderComponent` y `HeroComponent` a propósito, por
      espacio en mobile — ver comentario en el código).
- [ ] Conectar dominio en Vercel (ziaron.com).

**Cómo usar este documento en la próxima sesión:** leerlo completo antes de tocar
cualquier estilo o componente visual. Si el diseño cambia (nueva ronda de Claude
Design, ajuste manual, etc.), actualizar la sección correspondiente acá en el mismo
cambio — no dejarlo para después.
