import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

/**
 * Rutas reales del sitio (ver docs/PLAN-LANDING-V2.md, "Mapa del sitio").
 * El home es eager (es la página de entrada); el resto lazy.
 * `title` lo completa ZiaronTitleStrategy con " · ZIARON Technologies".
 * Si se agrega una ruta, agregarla también en `app.routes.server.ts`
 * para que se prerenderice.
 */
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Plataformas inteligentes que impulsan empresas' },
  {
    path: 'productos/restaurant-os',
    title: 'Restaurant OS',
    loadComponent: () => import('./pages/restaurant-os/restaurant-os.component').then((m) => m.RestaurantOsComponent),
  },
  {
    path: 'productos/facturacion',
    title: 'Facturación electrónica',
    loadComponent: () => import('./pages/billing/billing.component').then((m) => m.BillingComponent),
  },
  {
    path: 'nosotros',
    title: 'Nosotros',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contacto',
    title: 'Contacto',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: '**',
    title: 'Página no encontrada',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
