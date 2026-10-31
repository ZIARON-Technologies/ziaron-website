import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * Sección "Misión" (id `mision`) — PLACEHOLDER a pedido explícito del
 * usuario: texto genérico inventado, solo para que el link "MISIÓN" del
 * nav lleve a contenido real en vez de a un "#" vacío. Reemplazar por la
 * misión oficial de la empresa cuando se defina (ver DESIGN.md/CLAUDE.md).
 */
@Component({
  selector: 'app-mission',
  imports: [RevealDirective],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss',
})
export class MissionComponent {}
