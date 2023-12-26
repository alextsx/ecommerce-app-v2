import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { AtGuard } from './common/guards';
import { config } from './config';
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
    StripeModule
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AtGuard
    }
  ]
})
export class AppModule {}
