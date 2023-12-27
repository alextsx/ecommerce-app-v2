import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { AtGuard } from './common/guards';
import { RoleGuard } from './common/guards/role.guard';
import { JsonBodyMiddleware } from './common/middlewares/json-body.middleware';
import { RawBodyMiddleware } from './common/middlewares/raw-body.middleware';
import { config } from './config';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { StripeModule } from './stripe/stripe.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    AuthModule,
    PrismaModule,
    ProductModule,
    CategoryModule,
    ReviewModule,
    UserModule,
    UserDetailsModule,
    OrderModule,
    StripeModule,
    AddressModule,
    CustomerModule
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AtGuard
    },
    {
      provide: 'APP_GUARD',
      useClass: RoleGuard
    }
  ]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: '/order/stripe-webhook',
        method: RequestMethod.POST
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
