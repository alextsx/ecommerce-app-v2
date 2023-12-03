import { Category, ProductImage } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

export class ProductDto implements Readonly<ProductDto> {
  @Exclude()
  id: string;

  name: string;
  description: string;
  price: number;
  inventory: number;
  slug: string;
  isFeatured: boolean;

  @Transform(({ value }: { value: ProductImage[] }) => value.map((image) => image.url))
  productImages: string[];

  @Transform(({ value }: { value: Category }) => value.name)
  category: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
