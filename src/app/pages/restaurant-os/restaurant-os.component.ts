import { Component } from '@angular/core';
import {
  RESTAURANT_OS_FAQ,
  RESTAURANT_OS_MODULES,
  RESTAURANT_OS_PAINS,
  RESTAURANT_OS_STEPS,
} from '../../data/content.data';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';
import { FaqComponent } from '../../shared/components/faq/faq.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ConceptBoardComponent } from './concept-board/concept-board.component';

/**
 * /productos/restaurant-os — página de producto completa:
 * header → para quién → problema → cómo funciona (+ vista conceptual) →
 * módulos → lista de espera (`#lista-espera`) → preguntas frecuentes.
 * Textos en data/content.data.ts (RESTAURANT_OS_*).
 */
@Component({
  selector: 'app-restaurant-os',
  imports: [PageHeaderComponent, SectionTitleComponent, LeadFormComponent, FaqComponent, RevealDirective, ConceptBoardComponent],
  templateUrl: './restaurant-os.component.html',
})
export class RestaurantOsComponent {
  protected readonly modules = RESTAURANT_OS_MODULES;
  protected readonly pains = RESTAURANT_OS_PAINS;
  protected readonly steps = RESTAURANT_OS_STEPS;
  protected readonly faq = RESTAURANT_OS_FAQ;
  protected readonly audience = ['Restaurantes', 'Pollerías', 'Pizzerías', 'Chifas', 'Cafeterías'];
}
