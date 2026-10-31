import { Component } from '@angular/core';
import { CAPABILITIES } from '../../../../data/content.data';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';

/** Bloque "Qué hacemos" (`#que-hacemos`): las 4 líneas de trabajo reales
 * de ZIARON (01-company) como tarjetas con ícono line dibujado a medida. */
@Component({
  selector: 'app-capabilities',
  imports: [RevealDirective, SectionTitleComponent],
  templateUrl: './capabilities.component.html',
  styleUrl: './capabilities.component.scss',
})
export class CapabilitiesComponent {
  protected readonly capabilities = CAPABILITIES;
}
