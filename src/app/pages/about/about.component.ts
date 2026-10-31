import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * /nosotros — texto real de 01-company (visión/filosofía). La MISIÓN sigue
 * siendo PLACEHOLDER (texto de la v1, a pedido del usuario) hasta que se
 * defina la oficial. Fase 4 agrega "cómo nace ZIARON" y fundador.
 */
@Component({
  selector: 'app-about',
  imports: [RouterLink, PageHeaderComponent, SectionTitleComponent, RevealDirective],
  templateUrl: './about.component.html',
})
export class AboutComponent {}
