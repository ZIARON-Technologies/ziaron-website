import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * Sección "Contacto" (id `contacto`) — PLACEHOLDER, pero a diferencia de
 * Misión no inventa un correo o formulario falso: dice honestamente que
 * el canal de contacto aún no está definido. Inventar un email/formulario
 * que no funciona sería peor que no tener la sección (ver criterio ya
 * aplicado en footer/libro de reclamaciones, DESIGN.md).
 */
@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
