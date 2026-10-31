import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { NexusPanelComponent } from '../../../../shared/components/nexus-panel/nexus-panel.component';
import { StatusPillComponent } from '../../../../shared/components/status-pill/status-pill.component';
import { PRODUCTS } from '../../../../data/content.data';

/**
 * Hero del home (`#inicio`): frase de marca (H1, oficial, no cambiar),
 * propuesta de valor orientada al cliente, 2 CTAs y panel Nexus a la
 * derecha en desktop (debajo en móvil/tablet).
 */
@Component({
  selector: 'app-hero',
  imports: [RouterLink, RevealDirective, NexusPanelComponent, StatusPillComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  /** Versión del sitio mostrada en la meta row — se sube a mano en cada
   * hito visible del landing (no es la versión de package.json). */
  protected readonly siteVersion = 'v0.2';

  /** Derivados de PRODUCTS (misma fuente que el panel Nexus). */
  protected readonly liveCount = PRODUCTS.filter((p) => p.status === 'live').length;
  protected readonly buildingCount = PRODUCTS.filter((p) => p.status === 'building').length;
  protected readonly totalCount = PRODUCTS.length;
}
