import { Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { StatusPillComponent } from '../status-pill/status-pill.component';

/**
 * Cabecera de páginas internas (/nosotros, /contacto, /productos/*): eyebrow
 * con línea degradada (mismo patrón que el hero del home) + H1 + bajada +
 * pill de estado opcional. Es el "hero chico" de cada ruta.
 */
@Component({
  selector: 'app-page-header',
  imports: [RevealDirective, StatusPillComponent],
  template: `
    <header class="page-gutter flex flex-col gap-5 border-b border-line pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pt-20">
      <div appReveal class="reveal-delay-1 flex flex-wrap items-center gap-3">
        <span class="flex items-center gap-3 font-mono text-[10px] tracking-[0.16em] text-accent-text sm:text-[11.5px]">
          <span class="h-px w-4 shrink-0 sm:w-[26px]" style="background: linear-gradient(90deg, #8B5CF6, var(--accent))"></span>
          {{ eyebrow() }}
        </span>
        @if (status()) {
          <app-status-pill [label]="status()!" />
        }
      </div>
      <h1 appReveal class="reveal-delay-2 max-w-[24ch] font-display text-[32px] font-medium leading-[1.12] tracking-[-0.02em] text-balance sm:text-[42px] lg:text-[52px]">
        {{ title() }}
      </h1>
      @if (lead()) {
        <p appReveal class="reveal-delay-3 max-w-[60ch] text-[15.5px] leading-[1.65] text-text-muted sm:text-[17px]">{{ lead() }}</p>
      }
    </header>
  `,
  styles: `:host { display: block; }`,
})
export class PageHeaderComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input<string>();
  readonly status = input<string>();
}
