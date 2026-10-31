import { Component } from '@angular/core';
import { BILLING_FAQ, BILLING_STEPS, FEATURED_PRODUCTS } from '../../data/content.data';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';
import { FaqComponent } from '../../shared/components/faq/faq.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/** /productos/facturacion — "próximamente" (Billing Platform, Fase 2 del
 * roadmap): qué incluirá, cómo funcionará, registro de interés y FAQ. */
@Component({
  selector: 'app-billing',
  imports: [PageHeaderComponent, SectionTitleComponent, LeadFormComponent, FaqComponent, RevealDirective],
  templateUrl: './billing.component.html',
})
export class BillingComponent {
  protected readonly product = FEATURED_PRODUCTS.find((p) => p.route === '/productos/facturacion')!;
  protected readonly steps = BILLING_STEPS;
  protected readonly faq = BILLING_FAQ;
}
