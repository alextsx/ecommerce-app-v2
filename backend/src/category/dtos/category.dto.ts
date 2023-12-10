import { Category } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

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
