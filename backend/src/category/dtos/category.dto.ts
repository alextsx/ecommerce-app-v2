import { Category } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { IsString, Min } from 'class-validator';

export class CategoryDto implements Category {
  @Exclude()
  id: string;
  name: string;
  @Transform(({ value }) => value.toLowerCase())
  slug: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}

export class CreateCategoryDto {
  @IsString()
  @Min(3)
  name: string;
  @IsString()
  @Min(3)
  slug: string;
}

export class UpdateCategoryDto {
  @IsString()
  @Min(3)
  oldSlug: string;
  @IsString()
  @Min(3)
  new_name: string;
}
