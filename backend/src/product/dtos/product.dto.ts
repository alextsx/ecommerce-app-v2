import { Category, Product, ProductImage } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

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
  isFeatured: boolean;

  @Transform(({ value }: { value: ProductImage[] }) => value.map((image) => image.url))
  productImages: string[];
  @Exclude()
  categoryId: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
  @Transform(({ value }: { value: number }) => Number(value.toFixed(2)))
  rating: number;
}

//used for product/[slug]
export class ProductDto extends BaseProductDto {
  @Transform(({ value }: { value: Category }) => value.name)
  category: string;
}

//used for product cards (homepage,related products,products page)
export class ProductCardDto extends BaseProductDto {}

export class CreateOrUpdateProductDto {
  @Length(3, 255)
  @IsString()
  name: string;
  @IsString()
  @Length(3, 255)
  @IsOptional()
  description: string;

  @IsNumber()
  @Transform(({ value }: { value: string }) => Number(value))
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }: { value: string }) => Number(value))
  discountedPrice: number;

  @IsNumber()
  @Transform(({ value }: { value: string }) => Number(value))
  inventory: number;

  @IsBoolean()
  isFeatured: boolean;
  @IsString({
    message: 'Category must be a string'
  })
  category: string;
}
