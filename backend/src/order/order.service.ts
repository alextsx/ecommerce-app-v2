import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrderService {
  public async createOrder({
    userId,
    createOrderDto
  }: {
    userId: string;
    createOrderDto: CreateOrderDto;
  }) {
    console.log('creating order for this user:', userId);
    console.log('order details:', createOrderDto);
  }

  public async createGuestOrder() {
    console.log('creating guest order');
  }
}
