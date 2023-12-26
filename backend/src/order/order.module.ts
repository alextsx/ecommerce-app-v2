import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderItemsService } from './services/order-items.service';
import { OrderService } from './services/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderItemsService]
})
export class OrderModule {}
