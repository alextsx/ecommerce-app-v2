export type CartItem = {
  slug: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

export type CartState = CartItem[];
