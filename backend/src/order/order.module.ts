import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderItemService } from './services/order-item.service';
import { OrderService } from './services/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderItemService]
})
export class OrderModule {}
