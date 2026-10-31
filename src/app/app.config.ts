import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { TitleStrategy, provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { ZiaronTitleStrategy } from './core/services/title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Navegación híbrida: rutas reales + anclas (`/#productos`) dentro del
      // home. `anchorScrolling` hace scroll al fragmento; el offset del
      // header sticky se fija en `App` (ViewportScroller.setOffset).
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      // Permite volver a hacer scroll al mismo ancla al hacer clic dos veces
      // en el mismo link del nav (sin esto el router ignora la navegación).
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    // El HTML llega prerenderizado (SSG); la hidratación reutiliza ese DOM
    // en vez de volver a pintarlo.
    provideClientHydration(withEventReplay()),
    { provide: TitleStrategy, useClass: ZiaronTitleStrategy },
  ],
};
