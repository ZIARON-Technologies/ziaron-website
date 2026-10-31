import { Component } from '@angular/core';
import { PRINCIPLES } from '../../../../data/content.data';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';

/** "Cómo trabajamos" (`#como-trabajamos`): los 6 principios de ingeniería
 * (06-engineering). Reemplaza a la sección "Valores" de la v1. */
@Component({
  selector: 'app-principles',
  imports: [RevealDirective, SectionTitleComponent],
  templateUrl: './principles.component.html',
  styles: `:host { display: contents; }`,
})
export class PrinciplesComponent {
  protected readonly principles = PRINCIPLES;
}
