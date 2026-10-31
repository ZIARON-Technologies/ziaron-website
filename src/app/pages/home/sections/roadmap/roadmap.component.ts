import { Component } from '@angular/core';
import { PHASES } from '../../../../data/content.data';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';

/** "Roadmap" (`#roadmap`): las 3 fases de 09-roadmap. La fase activa se
 * marca con acento y "EN CURSO". Sin fechas a propósito (no definidas). */
@Component({
  selector: 'app-roadmap',
  imports: [RevealDirective, SectionTitleComponent],
  templateUrl: './roadmap.component.html',
  styles: `:host { display: contents; }`,
})
export class RoadmapComponent {
  protected readonly phases = PHASES;
}
