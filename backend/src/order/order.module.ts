import { Module } from '@nestjs/common';
import { AddressModule } from 'src/address/address.module';
import { CustomerModule } from 'src/customer/customer.module';
import { ProductModule } from 'src/product/product.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { OrderController } from './order.controller';
import { OrderItemService } from './services/order-item.service';
import { OrderService } from './services/order.service';
import { OrderWebhooksService } from './services/webhooks.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderItemService, OrderWebhooksService],
  imports: [AddressModule, CustomerModule, ProductModule, StripeModule]
})
export class OrderModule {}
