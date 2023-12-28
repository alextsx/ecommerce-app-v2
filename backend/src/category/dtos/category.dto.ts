import { Category } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

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
  @Length(3, 255)
  name: string;
}

export class UpdateCategoryDto {
  @IsString()
  @Length(3, 255)
  name: string;
}
