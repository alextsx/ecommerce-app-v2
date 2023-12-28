export type Product = {
  name: string;
  slug: string;

  price: number;
  discountedPrice: number | null;
  formattedPrice: string;
  discountedPriceFormatted?: string;

  productImages: string[];
  rating: number;
  description: string;
  inventory: number;
};

export type DetailedProduct = Product & {
  category: string;
  rating: number;
  isFeatured: boolean;
};
