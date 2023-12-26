import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class OrderService {
  public async createOrder({
    userId,
    createOrderDto
  }: {
    userId: string;
    createOrderDto: CreateOrderDto;
  }) {
    /* 
      creating 2 addresses from createOrderDto.checkoutDetails.
      If same as shipping is checked we use the same id.
      Once we are done with that we create a customer with the rest of checkout details
      Then we connect the user to the customer (get the user from the userId)
      Then we create orderItems for each cartItem in the cartItems array

      then we create an order with the orderItems and the customer id

      And then we create a payment intent

      and then we return the payment url
    */
    console.log('userId', userId);
    console.log('createOrderDto', createOrderDto);
  }

  public async createGuestOrder() {
    console.log('creating guest order');
  }
}
