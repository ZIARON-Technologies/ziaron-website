import { Component, afterNextRender, inject, isDevMode } from '@angular/core';
import { inject as injectVercelAnalytics } from '@vercel/analytics';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { ScrollProgressComponent } from './shared/components/scroll-progress/scroll-progress.component';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top.component';
import { WhatsappFloatComponent } from './shared/components/whatsapp-float/whatsapp-float.component';
import { ToastComponent } from './shared/components/toast/toast.component';

/** Altura del header ya encogido (desktop) + aire — offset usado por el
 * router al hacer scroll a un ancla (`/#productos`) para que el título de
 * la sección no quede tapado por el header sticky. */
const ANCHOR_SCROLL_OFFSET = 88;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, ScrollProgressComponent, HeaderComponent, FooterComponent, WhatsappFloatComponent, BackToTopComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    inject(ViewportScroller).setOffset([0, ANCHOR_SCROLL_OFFSET]);

    // Analítica (Vercel Web Analytics): sin cookies, datos agregados y
    // anónimos (coherente con /legal/privacidad). Solo en el navegador y solo
    // en producción; requiere activar "Analytics" en el proyecto de Vercel.
    afterNextRender(() => {
      if (!isDevMode()) injectVercelAnalytics({ framework: 'angular' });
    });
  }
}
