import { Component, computed, inject } from '@angular/core';
import { PRODUCTS, terminalStatusLabel } from '../../data/content.data';
import { ThemeService } from '../../core/services/theme.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * Panel de estado "Nexus": isotipo de ZIARON como SVG inline (para poder
 * reutilizar la animación del loader más adelante, ver README del handoff)
 * + terminal con el estado real del ecosistema (misma fuente que la meta
 * row del hero: `PRODUCTS` en `content.data.ts`).
 *
 * El degradado lineal de la Z y el radial del núcleo tienen distinta
 * cantidad de stops entre tema claro y oscuro (no es solo un cambio de
 * color), así que van como dos <defs> completos y se elige el id correcto
 * por tema en vez de intentar variabilizar cada stop.
 */
@Component({
  selector: 'app-system-status',
  imports: [RevealDirective],
  templateUrl: './system-status.component.html',
  styleUrl: './system-status.component.scss',
})
export class SystemStatusComponent {
  private readonly themeService = inject(ThemeService);

  protected readonly ecosystem = PRODUCTS;
  protected readonly statusLabel = terminalStatusLabel;

  protected readonly zGradientId = computed(() => (this.themeService.isDark() ? 'nexus-z-dark' : 'nexus-z-light'));
  protected readonly coreGradientId = computed(() => (this.themeService.isDark() ? 'nexus-core-dark' : 'nexus-core-light'));

  /** El 4° nodo (esquina inferior derecha) es el único cuyo color cambia por
   * tema — en claro usa el mismo tono que el acento (#0E7490), en oscuro el
   * cian de marca (#06B6D4). */
  protected readonly node4Color = computed(() => (this.themeService.isDark() ? '#06B6D4' : '#0E7490'));
  protected readonly node4HaloOpacity = computed(() => (this.themeService.isDark() ? 0.24 : 0.2));

  /** Opacidad del halo de los 3 primeros nodos — también sube levemente en
   * oscuro (0.18) respecto a claro (0.14) para compensar el fondo oscuro. */
  protected readonly nodeHaloOpacity = computed(() => (this.themeService.isDark() ? 0.18 : 0.14));
}
