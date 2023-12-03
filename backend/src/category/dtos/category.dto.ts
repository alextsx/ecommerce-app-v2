import { Category } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CategoryDto implements Category {
  @Exclude()
  id: string;
  name: string;
  slug: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
