import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  orderId: string;
  @IsString()
  productId: string;
  @IsNumber()
  @Min(1)
  quantity: number;
  unitPrice: number;
  total: number;
}
