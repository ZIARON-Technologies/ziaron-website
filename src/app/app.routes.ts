import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

/**
 * Rutas reales del sitio (ver docs/PLAN-LANDING-V2.md, "Mapa del sitio").
 * El home es eager (es la página de entrada); el resto lazy.
 * `title` y `data.description` alimentan ZiaronTitleStrategy (título, meta
 * description, Open Graph, canonical). `data.noindex` excluye de buscadores.
 * Si se agrega una ruta, agregarla también en `app.routes.server.ts`
 * para que se prerenderice.
 */
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Plataformas inteligentes que impulsan empresas',
    data: {
      description:
        'ZIARON Technologies crea plataformas SaaS propias con inteligencia artificial y en la nube para negocios del Perú. Conoce Restaurant OS, nuestro sistema para restaurantes.',
    },
  },
  {
    path: 'productos/restaurant-os',
    title: 'Restaurant OS — Sistema para restaurantes',
    data: {
      description:
        'Restaurant OS: pedidos, cocina, caja, delivery, menú QR y facturación electrónica en una sola plataforma para restaurantes, pollerías, pizzerías y chifas del Perú.',
    },
    loadComponent: () => import('./pages/restaurant-os/restaurant-os.component').then((m) => m.RestaurantOsComponent),
  },
  {
    path: 'productos/facturacion',
    title: 'Facturación electrónica SUNAT',
    data: {
      description:
        'Próximamente: emisión de boletas, facturas y notas de crédito y débito electrónicas SUNAT, sola o integrada a tu sistema por API.',
    },
    loadComponent: () => import('./pages/billing/billing.component').then((m) => m.BillingComponent),
  },
  {
    path: 'nosotros',
    title: 'Nosotros',
    data: {
      description:
        'Conoce a ZIARON Technologies: empresa peruana de ingeniería que construye plataformas SaaS propias. Misión, visión y valores.',
    },
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contacto',
    title: 'Contacto',
    data: { description: 'Escríbenos para contarnos qué necesita tu negocio o para unirte a la lista de espera de Restaurant OS.' },
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'legal/privacidad',
    title: 'Política de privacidad',
    data: { description: 'Cómo ZIARON Technologies recoge, usa y protege tus datos personales, conforme a la Ley N.° 29733.' },
    loadComponent: () => import('./pages/legal/privacy.component').then((m) => m.PrivacyComponent),
  },
  {
    path: 'legal/terminos',
    title: 'Términos de uso',
    data: { description: 'Términos y condiciones de uso del sitio web de ZIARON Technologies.' },
    loadComponent: () => import('./pages/legal/terms.component').then((m) => m.TermsComponent),
  },
  {
    path: '**',
    title: 'Página no encontrada',
    data: { noindex: true },
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
