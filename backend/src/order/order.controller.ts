import { Controller, Post, UseFilters } from '@nestjs/common';
import { GetUserInfoFromAtPayload, Public } from 'src/common/decorators';
import { ValidatedBody } from 'src/common/decorators/validated-body.decorator';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderExceptionFilter } from './filters/orderexception.filter';
import { OrderService } from './services/order.service';

@Controller('order')
@UseFilters(OrderExceptionFilter)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async createOrder(
    @GetUserInfoFromAtPayload('sub') userId: string,
    @ValidatedBody()
    createOrderDto: CreateOrderDto
  ) {
    return this.orderService.processOrder({
      userId,
      createOrderDto
    });
  }

  @Post('guest')
  @Public()
  public async createGuestOrder(
    @ValidatedBody()
    createOrderDto: CreateOrderDto
  ) {
    return this.orderService.processOrder({
      createOrderDto
    });
  }
}
