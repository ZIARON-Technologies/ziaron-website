import { Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * Encabezado estándar de sección: eyebrow mono (opcional) + H2 + bajada
 * (opcional) + dato a la derecha (opcional, ej. "04 LÍNEAS DE TRABAJO").
 * Patrón tomado de `iamwgp-portfolio` (shared/components/section-title).
 * Usarlo en TODA sección nueva en vez de repetir el markup.
 */
@Component({
  selector: 'app-section-title',
  imports: [RevealDirective],
  template: `
    <div appReveal class="reveal-delay-1 flex flex-col gap-3 border-b border-line pb-[14px] sm:pb-[18px]">
      @if (eyebrow()) {
        <span class="font-mono text-[10px] tracking-[0.16em] text-accent-text sm:text-[11px]">{{ eyebrow() }}</span>
      }
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="font-display text-[24px] font-medium leading-[1.2] tracking-[-0.015em] text-balance sm:text-[28px] lg:text-[32px]">
          {{ title() }}
        </h2>
        @if (meta()) {
          <span class="hidden shrink-0 font-mono text-[10px] tracking-[0.14em] text-text-dim sm:inline sm:text-[11px]">{{ meta() }}</span>
        }
      </div>
      @if (subtitle()) {
        <p class="max-w-[62ch] text-[15px] leading-[1.65] text-text-muted sm:text-[16px]">{{ subtitle() }}</p>
      }
    </div>
  `,
  styles: `:host { display: block; }`,
})
export class SectionTitleComponent {
  readonly title = input.required<string>();
  readonly eyebrow = input<string>();
  readonly subtitle = input<string>();
  readonly meta = input<string>();
}
