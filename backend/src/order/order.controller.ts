import { Controller, Post } from '@nestjs/common';
import { GetUserInfoFromAtPayload, Public } from 'src/common/decorators';
import { ValidatedBody } from 'src/common/decorators/validated-body.decorator';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async createOrder(
    @GetUserInfoFromAtPayload('sub') userId: string,
    @ValidatedBody()
    createOrderDto: CreateOrderDto
  ) {
    return this.orderService.createOrder({
      userId,
      createOrderDto
    });
  }

  @Post('guest')
  @Public()
  public async createGuestOrder() {
    return this.orderService.createGuestOrder();
  }
}
