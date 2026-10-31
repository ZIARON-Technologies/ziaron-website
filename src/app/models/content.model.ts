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
}

export interface Phase {
  n: string;
  label: string;
  items: string[];
  active: boolean;
}
