import { Exclude } from 'class-transformer';

export class ReviewDto {
  @Exclude()
  id: string;
  title: string;
  rating: number;
  @Exclude()
  productId: string;
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  body: string;
  @Exclude()
  userId: string;
}
