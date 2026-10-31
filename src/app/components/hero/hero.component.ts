import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PRODUCTS } from '../../data/content.data';

@Component({
  selector: 'app-hero',
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  /** Versión del sitio mostrada en la meta row — se sube a mano en cada
   * hito visible del landing (no es la versión de npm/package.json). */
  protected readonly siteVersion = 'v0.1';

  /** Derivados de PRODUCTS (misma fuente que el panel Nexus) en vez de
   * hardcodear "0" / "1" — si el ecosistema cambia, esta línea se actualiza sola. */
  protected readonly liveCount = PRODUCTS.filter((p) => p.status === 'live').length;
  protected readonly buildingCount = PRODUCTS.filter((p) => p.status === 'building').length;
}
