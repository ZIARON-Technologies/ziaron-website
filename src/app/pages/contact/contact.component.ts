import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * /contacto — HONESTO a propósito: todavía no hay canal oficial (correo,
 * WhatsApp, formulario). No se inventa un correo/formulario que no funciona
 * (criterio de la v1). Fase 4/5 lo reemplaza por el formulario real.
 */
@Component({
  selector: 'app-contact',
  imports: [RouterLink, PageHeaderComponent, RevealDirective],
  template: `
    <app-page-header
      eyebrow="CONTACTO"
      title="Hablemos de tu negocio"
      lead="¿Tienes un restaurante, una pollería o una idea en la que podamos ayudarte? Muy pronto podrás escribirnos directamente desde aquí."
    />
    <section class="page-gutter grid grid-cols-1 gap-5 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-3">
      <div appReveal class="flex flex-col gap-3 rounded-2xl border border-border bg-bg-elevated p-6 lg:col-span-2">
        <span class="font-mono text-[10.5px] tracking-[0.14em] text-text-dim">CANAL OFICIAL · EN PREPARACIÓN</span>
        <p class="max-w-[56ch] text-[15px] leading-[1.65] text-text-muted">
          Estamos habilitando nuestro canal de contacto oficial (formulario, correo y WhatsApp).
          Lo publicaremos aquí en cuanto esté activo — preferimos no mostrar un medio que todavía no responde.
        </p>
      </div>
      <div appReveal class="flex flex-col gap-3 rounded-2xl border border-border bg-bg-elevated p-6">
        <span class="font-mono text-[10.5px] tracking-[0.14em] text-text-dim">UBICACIÓN</span>
        <p class="font-display text-[20px] font-medium">Lima, Perú</p>
        <a routerLink="/productos/restaurant-os" class="link-arrow mt-auto self-start">
          Mientras tanto, conoce Restaurant OS
          <svg class="link-arrow__icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>
    </section>
  `,
})
export class ContactComponent {}
