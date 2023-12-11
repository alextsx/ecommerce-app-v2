import { Product } from '../product/product.types';

export type CartItem = Product & {
  imageUrl: string;
  quantity: number;
};

export type CartState = CartItem[];
