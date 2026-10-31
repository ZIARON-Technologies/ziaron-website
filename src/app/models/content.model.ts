export type ProductStatus = 'live' | 'building' | 'planned';

export interface ProductNode {
  id: string;
  name: string;
  status: ProductStatus;
  desc: string;
}

/** Ícono de las 4 tarjetas de "Qué hacemos" — cada uno es un SVG line
 * dibujado a medida en `CapabilitiesComponent` (ver handoff de diseño),
 * no un asset de marca. */
export type CapabilityIcon = 'saas' | 'ai' | 'automation' | 'cloud';

export interface Capability {
  icon: CapabilityIcon;
  title: string;
  desc: string;
}

export interface Principle {
  n: string;
  title: string;
  /** Bajada de una línea. PROPUESTA de redacción (06-engineering solo
   * define los títulos) — validar con el usuario. */
  desc: string;
}

export interface Phase {
  n: string;
  label: string;
  items: string[];
  active: boolean;
}

/** Producto destacado en el home (bloque `#productos`) con página propia. */
export interface FeaturedProduct {
  name: string;
  status: ProductStatus;
  route: string;
  tagline: string;
  highlights: string[];
}

/** Grupo de módulos de Restaurant OS (04-restaurant-os/README.md). */
export interface ModuleGroup {
  title: string;
  desc: string;
  items: string[];
}

/** Link de navegación. `fragment` = ancla dentro del home (`/#productos`). */
export interface NavLink {
  label: string;
  route: string;
  fragment?: string;
}

export interface FooterColumn {
  title: string;
  links: (NavLink & { soon?: boolean })[];
}
