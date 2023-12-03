export type ProductSortableFields = 'price' | 'rating'; //rating isnt a keyof type Product, we'll have to aggregate and get the average rating
export type ProductSortableOrders = 'asc' | 'desc';
export class SortDto {
  sort?: `${ProductSortableFields}_${ProductSortableOrders}`;
}
