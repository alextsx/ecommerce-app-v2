import { Category, Product, ProductImage } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

class BaseProductDto implements Partial<Product> {
  @Exclude()
  id: string;

  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice: number;

  @Expose()
  @Transform(({ obj }) => `$${obj.price.toFixed(2)}`)
  formattedPrice: string;

  @Expose()
  @Transform(({ obj }) => {
    if (obj.discountedPrice) {
      return `$${obj.discountedPrice.toFixed(2)}`;
    }
    return obj.formattedPrice;
  })
  discountedPriceFormatted: string;

  inventory: number;
  @Exclude()
  isFeatured: boolean;

  @Transform(({ value }: { value: ProductImage[] }) => value.map((image) => image.url))
  productImages: string[];
  @Exclude()
  categoryId: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

export class ProductDto extends BaseProductDto {
  rating: number;
  @Transform(({ value }: { value: Category }) => value.name)
  category: string;
}

export class ProductCardDto extends BaseProductDto {}
