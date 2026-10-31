import { Component } from '@angular/core';
import { PRINCIPLES } from '../../data/content.data';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * Sección "Valores" (id `valores`) — a diferencia de Misión/Contacto, esta
 * SÍ usa contenido real: los Principios de ingeniería ya definidos en
 * `content.data.ts` (`PRINCIPLES`), que estaban listos desde hace tiempo
 * pero sin componente que los mostrara. Reactivarlos acá bajo el nombre
 * "Valores" (pedido por el usuario para llenar el nav) cumple dos
 * pendientes a la vez — ver DESIGN.md.
 */
@Component({
  selector: 'app-values',
  imports: [RevealDirective],
  templateUrl: './values.component.html',
  styleUrl: './values.component.scss',
})
export class ValuesComponent {
  protected readonly principles = PRINCIPLES;
}
