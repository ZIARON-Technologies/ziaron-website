import { Component, DOCUMENT, HostListener, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ThemeService } from '../../core/services/theme.service';
import { StatusPillComponent } from '../../shared/components/status-pill/status-pill.component';
import { NAV_LINKS, PRIMARY_CTA } from '../../data/content.data';
import { NavLink } from '../../models/content.model';

/** ids de las secciones del home, en orden — el scroll spy marca como
 * activa la última que cruzó la línea de referencia. Solo `productos` y
 * `roadmap` tienen link en el nav; el resto existe para "apagar" esos
 * links cuando se está en otra sección. */
const HOME_SECTION_IDS = ['inicio', 'que-hacemos', 'productos', 'como-trabajamos', 'roadmap', 'empezar'] as const;

/** Mayor que la altura máxima del header (92px) — una sección cuenta como
 * activa recién cuando su título ya quedó visible debajo del header. */
const ACTIVE_SECTION_OFFSET = 130;

/**
 * Header global (sticky). Navegación HÍBRIDA (ver CLAUDE.md):
 * - Links con `fragment` → anclas dentro del home (`/#productos`). El
 *   router hace el scroll (`anchorScrolling`, ver app.config.ts).
 * - Links sin fragment → rutas reales (`/nosotros`, `/contacto`).
 * Estado activo: ruta actual para páginas; scroll spy para anclas del home.
 * En < lg el nav se reemplaza por un menú móvil (hamburguesa).
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, ThemeToggleComponent, StatusPillComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly links = NAV_LINKS;
  protected readonly cta = PRIMARY_CTA;

  /** El wordmark es un SVG con colores de texto fijos por tema (no tokens
   * CSS) — hay que servir el archivo correcto según el tema resuelto. */
  protected readonly wordmarkSrc = computed(() =>
    this.themeService.isDark() ? '/brand/logos/ziaron-wordmark-dark.svg' : '/brand/logos/ziaron-wordmark-light.svg',
  );

  /** Header encoge y se eleva con sombra al bajar el scroll (umbral 8px). */
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  private readonly currentPath = signal('/');
  private readonly activeSection = signal<string | null>(null);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath.set(event.urlAfterRedirects.split(/[?#]/)[0] || '/');
        this.closeMenu();
        // Esperar a que la nueva página pinte antes de recalcular secciones.
        if (this.isBrowser) requestAnimationFrame(() => this.updateActiveSection());
      }
    });
  }

  protected isActive(link: NavLink): boolean {
    const path = this.currentPath();
    if (link.fragment) {
      return path === '/' && this.activeSection() === link.fragment;
    }
    return path === link.route || path.startsWith(link.route + '/');
  }

  /** "Productos" también queda activo dentro de /productos/*. */
  protected isLinkActive(link: NavLink): boolean {
    if (link.fragment === 'productos' && this.currentPath().startsWith('/productos')) return true;
    return this.isActive(link);
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    if (!this.isBrowser) return;
    this.scrolled.set(window.scrollY > 8);
    this.updateActiveSection();
  }

  @HostListener('document:keydown.escape')
  protected closeMenu(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.document.body.classList.remove('overflow-hidden');
  }

  protected toggleMenu(): void {
    const open = !this.menuOpen();
    this.menuOpen.set(open);
    this.document.body.classList.toggle('overflow-hidden', open);
  }

  private updateActiveSection(): void {
    if (this.currentPath() !== '/') {
      this.activeSection.set(null);
      return;
    }
    let current: string | null = null;
    for (const id of HOME_SECTION_IDS) {
      const top = this.document.getElementById(id)?.getBoundingClientRect().top;
      if (top !== undefined && top - ACTIVE_SECTION_OFFSET <= 0) current = id;
    }
    this.activeSection.set(current);
  }
}
