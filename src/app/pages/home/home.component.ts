import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { CapabilitiesComponent } from './sections/capabilities/capabilities.component';
import { ProductsComponent } from './sections/products/products.component';
import { PrinciplesComponent } from './sections/principles/principles.component';
import { RoadmapComponent } from './sections/roadmap/roadmap.component';
import { CtaComponent } from './sections/cta/cta.component';

/**
 * Página "Home" (ruta `/`). Solo compone secciones, en este orden:
 * #inicio · #que-hacemos · #productos · #como-trabajamos · #roadmap · #empezar.
 * Si se agrega/renombra una sección con ancla, actualizar también
 * HOME_SECTION_IDS en layout/header/header.component.ts (scroll spy).
 */
@Component({
  selector: 'app-home',
  imports: [HeroComponent, CapabilitiesComponent, ProductsComponent, PrinciplesComponent, RoadmapComponent, CtaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
