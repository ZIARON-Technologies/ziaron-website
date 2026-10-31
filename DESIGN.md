# ZIARON Website — Sistema de diseño

Documento de referencia visual/UX del landing de ZIARON Technologies. Complementa a
`CLAUDE.md` (que cubre arquitectura de código y decisiones de ingeniería): acá está
todo lo relativo a **cómo se ve y se siente** la página — paleta, tipografía,
espaciado, inventario de componentes, motion y estado actual — para retomar contexto
rápido en cualquier sesión futura antes de tocar diseño.

**Estado del proyecto: Landing v2 en curso (fases 0–3 hechas, ver `docs/PLAN-LANDING-V2.md`).** Este documento describe lo
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
  `lg:` (1024px, "desktop") y `xl:` (1280px, solo para detalles que no entran antes:
  pill del header, tamaño máximo del H1, grilla de 4 módulos). No usar `md:`.
- **Padding lateral de página:** `22px` (mobile) → `44px` (`sm:`) → `72px` (`lg:`).
  Desde la v2 es la clase `.page-gutter` (`tailwind.css`), usada por cada sección,
  `PageHeaderComponent` y el footer; el header usa los mismos valores en utilidades.
  Si cambia, cambiar `.page-gutter` y el header juntos.
- **Ritmo vertical (v2):** cada sección del home lleva su propio padding
  `py-16 sm:py-20 lg:py-24` y `border-t border-line` (excepto hero y CTA final).
  `<main>` ya no tiene padding ni gap propio.
- **Grillas de tarjetas:** gap `16px` → `20px` (`gap-4 sm:gap-5`). Principios usa
  grilla con bordes compartidos (`gap-px` sobre `bg-line`), se lee como tabla técnica.
- **Scroll:** vertical normal en todos los tamaños.
- **Radios:** `999px` (pills, botones de tema), `24px`/`rounded-3xl` (bloque CTA final),
  `16px`/`rounded-2xl` (panel Nexus, tarjetas de producto/roadmap/módulos),
  `14px` (tarjetas de capacidades), `10px` (botones `.btn`, caja de ícono).
- **Botones (v2, `tailwind.css`):** `.btn-primary` = fondo `--text` / texto `--bg`
  (negro en claro, blanco en oscuro) y pasa a `--accent` en hover; `.btn-ghost` =
  borde + `--bg-elevated`. Alto 44px (36px con `.btn-sm`). Una sola primaria por bloque.
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

Todos standalone (Angular 22). Ubicación y reglas de carpetas: ver `CLAUDE.md`.

| Componente | Dónde | Rol |
|---|---|---|
| `App` | `app.*` | Shell: fondo decorativo + loader + scroll-progress + header + `<router-outlet>` + footer + back-to-top |
| `LoaderComponent` | `layout/loader` | Overlay de carga inicial animado (colores random de `RING_PALETTE`) |
| `HeaderComponent` | `layout/header` | Wordmark + nav (Productos, Roadmap, Nosotros, Contacto; desde `lg`) + pill (desde `xl`) + CTA "Conoce Restaurant OS" (desde `sm`) + tema + hamburguesa/menú móvil (< `lg`) |
| `FooterComponent` | `layout/footer` | Marca + columnas Productos/Empresa/Legal + barra de copyright |
| `ThemeToggleComponent` | `layout/theme-toggle` | 3 botones (claro/auto/oscuro) |
| `HeroComponent` | `pages/home/sections/hero` | `#inicio`: eyebrow + H1 de marca + propuesta de valor + 2 CTAs + meta row; panel Nexus a la derecha (desktop) |
| `CapabilitiesComponent` | `pages/home/sections/capabilities` | `#que-hacemos`: 4 tarjetas |
| `ProductsComponent` | `pages/home/sections/products` | `#productos`: Restaurant OS destacado (más ancho, glow) + Facturación |
| `PrinciplesComponent` | `pages/home/sections/principles` | `#como-trabajamos`: 6 principios en grilla tipo tabla |
| `RoadmapComponent` | `pages/home/sections/roadmap` | `#roadmap`: 3 fases, la activa con acento y punto "EN CURSO" pulsante |
| `CtaComponent` | `pages/home/sections/cta` | `#empezar`: bloque final para dueños de negocios gastronómicos |
| `SectionTitleComponent` | `shared/components` | Encabezado de sección: eyebrow + H2 + bajada + meta |
| `PageHeaderComponent` | `shared/components` | "Hero chico" de páginas internas: eyebrow con línea degradada + H1 + bajada + pill |
| `StatusPillComponent` | `shared/components` | Pill de estado (`accent` / `muted`) |
| `NexusPanelComponent` | `shared/components/nexus-panel` | Panel Nexus (antes `SystemStatusComponent`); `[compact]` lo apila en una columna |
| `ScrollProgressComponent` | `shared/components` | Barra de 2px arriba con degradado de marca |
| `BackToTopComponent` | `shared/components` | Botón flotante abajo a la derecha tras ~1 pantalla de scroll |
| `LeadFormComponent` | `shared/components/lead-form` | Formulario de captación (variantes waitlist/billing/contact). Campos con clases `.field`, `.field__label`, `.field__input`, `.field__error` (`tailwind.css`) |
| `ToastComponent` | `shared/components/toast` | Toasts abajo a la izquierda (borde acento = éxito, rojo = error) |
| `FaqComponent` | `shared/components/faq` | Acordeón `<details>` nativo, ícono + que rota a × |
| `WhatsappFloatComponent` | `shared/components/whatsapp-float` | Botón verde WhatsApp (#25D366) abajo a la derecha, solo si hay número |
| `ConceptBoardComponent` | `pages/restaurant-os/concept-board` | Tablero de pedidos ilustrativo (KPIs + 3 columnas), etiqueta "VISTA CONCEPTUAL" |
| Páginas | `pages/*` | `RestaurantOsComponent`, `BillingComponent`, `AboutComponent`, `ContactComponent`, `PrivacyComponent`, `TermsComponent`, `NotFoundComponent` |

### Patrones de página (v2)

- **Bloque de captación:** tarjeta `rounded-3xl` con `--shadow-panel`, texto +
  beneficios a la izquierda y `<app-lead-form>` a la derecha (desktop).
- **Pasos numerados:** círculo con borde/fondo de acento + título + bajada.
- **Problemas:** número sobre fondo rojo tenue (`#b91c1c` claro / `#f87171`
  oscuro) — único uso de rojo fuera de errores de formulario.
- **Documentos legales:** `.legal-doc` (`pages/legal/legal-layout.scss`),
  ancho máximo 860px, H2 display 20px, viñetas con marcador de acento.

### Datos (`src/app/data/content.data.ts` + `src/app/models/content.model.ts`)

- Tabla completa de constantes y dónde se usan: ver `CLAUDE.md` → "Datos".
- `PRODUCTS` (6, ecosistema) alimenta panel Nexus + conteos del hero;
  `FEATURED_PRODUCTS` (2, con página) alimenta el bloque Productos.
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
| Panel Nexus (estático) | `shared/components/nexus-panel/nexus-panel.component.html` | 112px | 0.674× |

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

**Regla:** isotipo O wordmark, nunca los dos juntos (se lee "Z ZIARON").
Wordmark: header, footer, imagen OG. Isotipo: favicon, apple-touch-icon,
loader, panel Nexus, logo cuadrado.


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

El plan vivo está en `docs/PLAN-LANDING-V2.md` (fases 4–6). Pendientes de diseño:

- [ ] Mockups/capturas de Restaurant OS para su página (Fase 4).
- [ ] Contraste AA de `--text-dim` en labels mono pequeños sobre tarjetas
      (decidir: oscurecer token o usar `text-text-muted`).
- [ ] Footer: correo, redes y RUC cuando existan.

**Cómo usar este documento en la próxima sesión:** leerlo completo antes de tocar
cualquier estilo o componente visual. Si el diseño cambia (nueva ronda de Claude
Design, ajuste manual, etc.), actualizar la sección correspondiente acá en el mismo
cambio — no dejarlo para después.
