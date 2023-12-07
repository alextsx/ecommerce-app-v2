import { Product } from '../products/products.types';

export type DetailedProduct = Product & {
  inventory: number;
  isFeatured: boolean;
  category: string;
};
