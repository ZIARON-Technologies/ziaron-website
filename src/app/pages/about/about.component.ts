import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY_VALUES, MISSION, VISION } from '../../data/content.data';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * /nosotros — quiénes somos (01-company), misión y visión, valores de
 * empresa (cultura; distintos de los principios de ingeniería del home) y
 * filosofía. Textos en data/content.data.ts. Fase 4 puede sumar
 * "cómo nace ZIARON" y fundador.
 */
@Component({
  selector: 'app-about',
  imports: [RouterLink, PageHeaderComponent, SectionTitleComponent, RevealDirective],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  protected readonly mission = MISSION;
  protected readonly vision = VISION;
  protected readonly values = COMPANY_VALUES;
}
