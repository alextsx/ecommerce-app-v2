import { IsIn, IsOptional } from 'class-validator';

export type ProductSortableFields = 'price' | 'rating'; //rating isnt a keyof type Product, we'll have to aggregate and get the average rating
export type ProductSortableOrders = 'asc' | 'desc';
export type ProductSortable = `${ProductSortableFields}_${ProductSortableOrders}`[];

const sortable = ['price_asc', 'price_desc', 'rating_asc', 'rating_desc'];

export class SortDto {
  @IsOptional()
  @IsIn(sortable)
  sort?: string;
}
