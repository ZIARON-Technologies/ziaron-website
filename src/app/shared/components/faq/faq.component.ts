import { Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

export interface FaqItem {
  q: string;
  a: string;
}

/** Preguntas frecuentes con <details>/<summary> nativo: accesible, sin JS,
 * y el texto queda en el HTML prerenderizado (bueno para SEO). */
@Component({
  selector: 'app-faq',
  imports: [RevealDirective],
  template: `
    <div class="flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated">
      @for (item of items(); track item.q; let last = $last) {
        <details appReveal class="faq-item group" [class.border-b]="!last" [class.border-line]="!last">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15.5px] font-medium text-text outline-none focus-visible:bg-accent-bg sm:px-7">
            {{ item.q }}
            <svg class="faq-icon shrink-0 text-text-dim transition-transform duration-200" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </summary>
          <p class="max-w-[70ch] px-6 pb-6 text-[14.5px] leading-[1.65] text-text-muted sm:px-7">{{ item.a }}</p>
        </details>
      }
    </div>
  `,
  styles: `
    summary::-webkit-details-marker { display: none; }
    details[open] .faq-icon { transform: rotate(45deg); }
  `,
})
export class FaqComponent {
  readonly items = input.required<FaqItem[]>();
}
