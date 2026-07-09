export type ProductStatus = 'live' | 'building' | 'planned';

export interface ProductNode {
  id: string;
  name: string;
  status: ProductStatus;
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
