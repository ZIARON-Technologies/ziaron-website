import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_PRODUCTS, PRODUCTS, productStatusLabel } from '../../../../data/content.data';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { StatusPillComponent } from '../../../../shared/components/status-pill/status-pill.component';

/** Bloque "Productos" (`#productos`): productos con página propia
 * (FEATURED_PRODUCTS). El primero va destacado (más ancho en desktop). */
@Component({
  selector: 'app-products',
  imports: [RouterLink, RevealDirective, SectionTitleComponent, StatusPillComponent],
  templateUrl: './products.component.html',
  styles: `:host { display: contents; }`,
})
export class ProductsComponent {
  protected readonly products = FEATURED_PRODUCTS;
  protected readonly statusLabel = productStatusLabel;
  protected readonly otherCount = PRODUCTS.length - FEATURED_PRODUCTS.length;
}
