import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AddressModule } from 'src/address/address.module';
import { RawBodyMiddleware } from 'src/common/middlewares/raw-body.middleware';
import { CustomerModule } from 'src/customer/customer.module';
import { ProductModule } from 'src/product/product.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { OrderController } from './order.controller';
import { CheckoutEventsService } from './services/checkout-events.service';
import { OrderItemService } from './services/order-item.service';
import { OrderService } from './services/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderItemService, CheckoutEventsService],
  imports: [AddressModule, CustomerModule, ProductModule, StripeModule],
  exports: [CheckoutEventsService]
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes('order/stripe-webhook');
  }
}
