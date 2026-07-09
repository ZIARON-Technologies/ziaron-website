import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Marca el elemento como "reveal" y le agrega la clase `.visible` cuando
 * entra al viewport (una sola vez). El estilo base vive en `styles.scss`
 * (`.reveal` / `.reveal.visible` / `.reveal-delay-N`), no acá — la
 * directiva solo controla el timing, no la apariencia.
 *
 * Uso: `<p appReveal class="reveal-delay-1">...</p>`
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const host = this.el.nativeElement;
    host.classList.add('reveal');

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
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
