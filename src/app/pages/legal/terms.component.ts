import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../data/site.config';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

/** /legal/terminos — Términos de uso del sitio. Mismo aviso que privacidad:
 * texto base, revisar con un abogado antes del lanzamiento comercial. */
@Component({
  selector: 'app-terms',
  imports: [RouterLink, PageHeaderComponent],
  templateUrl: './terms.component.html',
  styleUrl: './legal-layout.scss',
})
export class TermsComponent {
  protected readonly site = SITE;
}
