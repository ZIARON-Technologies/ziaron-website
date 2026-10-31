import { Component } from '@angular/core';
import { CAPABILITIES } from '../../data/content.data';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * Bloque "Qué hacemos" (id de ancla `ecosistema`, ver README del handoff):
 * las 4 líneas de trabajo reales de ZIARON como tarjetas simples. Es el
 * único destino de navegación del sitio hoy (link "ECOSISTEMA" del header).
 */
@Component({
  selector: 'app-capabilities',
  imports: [RevealDirective],
  templateUrl: './capabilities.component.html',
  styleUrl: './capabilities.component.scss',
})
export class CapabilitiesComponent {
  protected readonly capabilities = CAPABILITIES;
}
