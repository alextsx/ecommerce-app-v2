import { Controller, Post } from '@nestjs/common';
import { GetUserInfoFromAtPayload, Public } from 'src/common/decorators';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async createOrder(@GetUserInfoFromAtPayload('sub') userId: string) {
    return this.orderService.createOrder({
      userId
    });
  }

  @Post('guest')
  @Public()
  public async createGuestOrder() {
    return this.orderService.createGuestOrder();
  }
}
