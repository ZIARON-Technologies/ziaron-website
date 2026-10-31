import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** CTA final del home (`#empezar`): dirigido al primer cliente objetivo
 * (dueños de negocios gastronómicos). En Fase 5 el botón principal pasa a
 * apuntar al formulario de lista de espera. */
@Component({
  selector: 'app-cta',
  imports: [RouterLink, RevealDirective],
  templateUrl: './cta.component.html',
  styles: `:host { display: contents; }`,
})
export class CtaComponent {}
