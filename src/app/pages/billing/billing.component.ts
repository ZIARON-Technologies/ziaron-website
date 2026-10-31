import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_PRODUCTS } from '../../data/content.data';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/** /productos/facturacion — "próximamente" (Billing Platform, Fase 2 del
 * roadmap). Highlights desde FEATURED_PRODUCTS (misma fuente que el home). */
@Component({
  selector: 'app-billing',
  imports: [RouterLink, PageHeaderComponent, RevealDirective],
  template: `
    <app-page-header
      eyebrow="PRODUCTO · FACTURACIÓN ELECTRÓNICA"
      title="Comprobantes electrónicos SUNAT, sin complicaciones"
      [lead]="product.tagline + ' Funcionará sola o integrada con Restaurant OS y tus propios sistemas.'"
      status="Próximamente"
    />
    <section class="page-gutter flex flex-col gap-8 py-14 sm:py-16">
      <span class="font-mono text-[10.5px] tracking-[0.14em] text-text-dim">LO QUE INCLUIRÁ</span>
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        @for (item of product.highlights; track item; let i = $index) {
          <li appReveal class="flex flex-col gap-3 rounded-2xl border border-border bg-bg-elevated p-6">
            <span class="font-mono text-[11px] text-accent-text">0{{ i + 1 }}</span>
            <span class="font-display text-[18px] font-medium tracking-[-0.01em]">{{ item }}</span>
          </li>
        }
      </ul>
      <a routerLink="/contacto" class="link-arrow self-start">
        ¿Te interesa? Escríbenos
        <svg class="link-arrow__icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </a>
    </section>
  `,
})
export class BillingComponent {
  protected readonly product = FEATURED_PRODUCTS.find((p) => p.route === '/productos/facturacion')!;
}
