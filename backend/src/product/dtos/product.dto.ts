import { Category, ProductImage } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

export class ProductDto {
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

export class ProductCardDto {
  @Exclude()
  id: string;

  name: string;
  slug: string;
  price: number;
  @Exclude()
  inventory: number;
  @Exclude()
  isFeatured: boolean;

  @Transform(({ value }: { value: ProductImage[] }) => value.map((image) => image.url))
  productImages: string[];
  @Exclude()
  category: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
