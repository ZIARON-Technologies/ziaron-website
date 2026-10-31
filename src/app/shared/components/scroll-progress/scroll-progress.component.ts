import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Barra fina de progreso de lectura arriba de todo (patrón de
 * `iamwgp-portfolio`). Degradado de marca; solo visible cuando hay scroll. */
@Component({
  selector: 'app-scroll-progress',
  template: `
    <div
      class="pointer-events-none fixed left-0 top-0 z-50 h-[2px] origin-left"
      [style.width.%]="100"
      [style.transform]="'scaleX(' + progress() + ')'"
      style="background: linear-gradient(90deg, #8B5CF6, #4F7FFF, var(--accent))"
      aria-hidden="true"
    ></div>
  `,
})
export class ScrollProgressComponent {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly progress = signal(0);

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected update(): void {
    if (!this.isBrowser) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? Math.min(1, window.scrollY / max) : 0);
  }
}
