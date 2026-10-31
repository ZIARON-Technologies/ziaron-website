import { Component, HostListener, afterNextRender, computed, inject, signal } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ThemeService } from '../../core/services/theme.service';

/** ids de las secciones reales, en el mismo orden que el nav — se usan para
 * calcular cuál está "activa" mientras se hace scroll y para armar la ruta
 * "limpia" (`/nosotros`, no `/#nosotros`) que se ve en la URL. */
const SECTION_IDS = ['nosotros', 'mision', 'valores', 'ecosistema', 'contacto'] as const;

/** Debe ser mayor que la altura máxima del header (92px sin encoger, ver
 * .scss) para que una sección cuente como "activa" recién cuando su título
 * ya quedó visible debajo del header fijo, no apenas su borde asoma detrás
 * de él. */
const ACTIVE_SECTION_OFFSET = 130;

@Component({
  selector: 'app-header',
  imports: [ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);

  /** El wordmark es un SVG con colores de texto fijos por tema (no tokens
   * CSS) — hay que servir el archivo correcto según el tema resuelto, no
   * se puede resolver solo con CSS (ver README del handoff de diseño). */
  protected readonly wordmarkSrc = computed(() =>
    this.themeService.isDark()
      ? '/brand/logos/ziaron-wordmark-dark.svg'
      : '/brand/logos/ziaron-wordmark-light.svg'
  );

  /** El header es `sticky top-0` (ver .scss) y encoge/eleva con sombra al
   * bajar el scroll — umbral bajo (8px) para que la transición se sienta
   * inmediata, no a mitad de página. Pedido explícito del usuario: header
   * fijo + animación al hacer scroll. */
  protected readonly scrolled = signal(false);

  /** Sección "activa" según cuál ya cruzó la línea de referencia
   * (ACTIVE_SECTION_OFFSET, debajo del header) — se recalcula en el mismo
   * listener de scroll que ya mueve `scrolled`, así queda garantizado que
   * corre siempre que la página se mueve. Pedido explícito del usuario:
   * marcar en el nav la sección por la que se va pasando. */
  protected readonly activeSection = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      this.updateActiveSection();
      this.syncScrollWithCurrentPath();
    });
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 8);
    this.updateActiveSection();
  }

  /** Si se entra directo a `/nosotros`, `/valores`, etc. (recarga, link
   * compartido, atrás/adelante del navegador), hace scroll a esa sección
   * sin animación al cargar. No hay Angular Router en este proyecto (SPA de
   * una sola página, ver CLAUDE.md) — esto es solo para que la URL "limpia"
   * (sin "#") también funcione al entrar directamente, no solo al hacer
   * clic en el nav. */
  @HostListener('window:popstate')
  protected syncScrollWithCurrentPath(): void {
    const id = window.location.pathname.replace(/^\/+/, '');
    if ((SECTION_IDS as readonly string[]).includes(id)) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      this.activeSection.set(id);
    }
  }

  /** Recalcula qué sección está activa y, si cambió, también actualiza la
   * URL — pedido explícito del usuario: "cuando escroleo no me carga la
   * ruta... la parte de arriba no se cambia". Usa `replaceState` (no
   * `pushState`) para el scroll: así la URL siempre refleja dónde estás sin
   * llenar el historial con una entrada por cada sección que se cruza (eso
   * rompería el botón "atrás" del navegador). `pushState` real solo ocurre
   * en `onNavClick`, que es una navegación explícita del usuario. */
  private updateActiveSection(): void {
    let current: string | null = null;
    for (const id of SECTION_IDS) {
      const top = document.getElementById(id)?.getBoundingClientRect().top;
      if (top !== undefined && top - ACTIVE_SECTION_OFFSET <= 0) {
        current = id;
      }
    }

    if (current !== this.activeSection()) {
      this.activeSection.set(current);
      const path = current ? `/${current}` : '/';
      if (window.location.pathname !== path) {
        history.replaceState(null, '', path);
      }
    }
  }

  /** El usuario pidió explícitamente que la URL muestre una ruta "normal"
   * (`localhost:4200/nosotros`) y NO un fragmento (`localhost:4200/#nosotros`)
   * al navegar por el nav. Como esta SPA no tiene Angular Router (una sola
   * página, sin rutas reales, ver CLAUDE.md), se logra sin agregar el
   * router: se intercepta el click, se hace scroll suave a la sección, y se
   * actualiza la URL "a mano" con `history.pushState` (a diferencia del
   * scroll pasivo en `updateActiveSection`, un clic sí es una navegación
   * intencional y merece su propia entrada en el historial). */
  protected onNavClick(event: Event, id: string): void {
    event.preventDefault();
    this.activeSection.set(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const path = `/${id}`;
    if (window.location.pathname !== path) {
      history.pushState(null, '', path);
    }
  }
}
