import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * Sección "Quiénes somos" (id de ancla `nosotros`) — segundo link real del
 * nav, agregado junto con "ECOSISTEMA" para que el header no dependa de un
 * solo destino. Contenido real tomado de la Visión/Filosofía de
 * `01-company/README.md` (repo ziaron-foundation), no relleno genérico:
 * no repite la frase de marca del hero, la complementa con la posición
 * "no somos consultora ni fábrica de software" que hoy no aparece en
 * ningún otro lado del sitio.
 */
@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
