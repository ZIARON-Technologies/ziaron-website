import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** 404 — se renderiza en el cliente (RenderMode.Client en
 * app.routes.server.ts); en Vercel llega por el fallback `index.csr.html`. */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="page-gutter flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
      <span class="font-mono text-[11px] tracking-[0.16em] text-accent-text">ERROR 404 · RUTA NO ENCONTRADA</span>
      <h1 class="max-w-[20ch] font-display text-[34px] font-medium leading-[1.12] tracking-[-0.02em] sm:text-[48px]">
        Esta página no existe <span class="text-text-dim">(todavía).</span>
      </h1>
      <p class="max-w-[50ch] text-[15.5px] leading-[1.65] text-text-muted">
        Puede que el enlace esté mal escrito o que la página se haya movido.
      </p>
      <div class="font-mono text-[12px] text-text-dim"><span class="text-accent-text">$</span> ziaron goto --home</div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <a routerLink="/" class="btn btn-primary">Volver al inicio</a>
        <a routerLink="/productos/restaurant-os" class="btn btn-ghost">Ver Restaurant OS</a>
      </div>
    </section>
  `,
})
export class NotFoundComponent {}
