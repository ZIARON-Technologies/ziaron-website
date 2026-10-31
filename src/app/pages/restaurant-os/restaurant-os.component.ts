import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RESTAURANT_OS_MODULES } from '../../data/content.data';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * /productos/restaurant-os — versión base (Fase 1–3): qué es, para quién y
 * módulos reales de 04-restaurant-os. Fase 4 agrega problema/solución y
 * mockups; Fase 5 el formulario de lista de espera en `#lista-espera`.
 */
@Component({
  selector: 'app-restaurant-os',
  imports: [RouterLink, PageHeaderComponent, SectionTitleComponent, RevealDirective],
  templateUrl: './restaurant-os.component.html',
})
export class RestaurantOsComponent {
  protected readonly modules = RESTAURANT_OS_MODULES;
  protected readonly audience = ['Restaurantes', 'Pollerías', 'Pizzerías', 'Chifas', 'Cafeterías'];
}
