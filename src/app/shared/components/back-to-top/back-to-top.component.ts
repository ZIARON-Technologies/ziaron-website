import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SITE } from '../../../data/site.config';

/** Botón flotante "volver arriba" (patrón de `iamwgp-portfolio`): aparece
 * después de ~1 pantalla de scroll. Abajo a la derecha — si en Fase 5 se
 * configura WhatsApp (SITE.whatsapp), este se apila encima. */
@Component({
  selector: 'app-back-to-top',
  template: `
    <button
      type="button"
      (click)="toTop()"
      aria-label="Volver arriba"
      class="fixed right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elevated text-text-muted outline-none transition-all duration-300 hover:border-accent-border hover:text-accent-text focus-visible:ring-2 focus-visible:ring-accent sm:right-8"
      [class]="stacked ? 'bottom-[84px] sm:bottom-[100px]' : 'bottom-5 sm:bottom-8'"
      [class.pointer-events-none]="!visible()"
      [class.opacity-0]="!visible()"
      [class.translate-y-3]="!visible()"
      [attr.tabindex]="visible() ? 0 : -1"
      style="box-shadow: var(--shadow-panel)"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  `,
})
export class BackToTopComponent {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly visible = signal(false);
  /** Si existe el botón de WhatsApp, este se apila encima. */
  protected readonly stacked = !!SITE.whatsapp;

  @HostListener('window:scroll')
  protected onScroll(): void {
    if (this.isBrowser) this.visible.set(window.scrollY > window.innerHeight * 0.9);
  }

  protected toTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
