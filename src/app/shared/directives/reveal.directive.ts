import { Directive, ElementRef, OnDestroy, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Marca el elemento como "reveal" y le agrega la clase `.visible` cuando
 * entra al viewport (una sola vez). El estilo base vive en `styles.scss`
 * (`.reveal` / `.reveal.visible` / `.reveal-delay-N`), no acá — la
 * directiva solo controla el timing, no la apariencia.
 *
 * SSR/SSG: la clase `reveal` se pone también en el HTML prerenderizado (así
 * no hay "parpadeo" visible → oculto → visible al hidratar; el loader cubre
 * esos primeros ms). El IntersectionObserver solo existe en el navegador,
 * por eso se crea en `afterNextRender`. Sin JavaScript, el `<noscript>` de
 * index.html fuerza todo visible.
 *
 * Uso: `<p appReveal class="reveal-delay-1">...</p>`
 */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;

    afterNextRender(() => {
      const host = this.el.nativeElement;
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            host.classList.add('visible');
            this.observer?.unobserve(host);
          }
        },
        { threshold: 0.12 },
      );
      this.observer.observe(host);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
