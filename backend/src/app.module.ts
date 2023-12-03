import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { AtGuard } from './common/guards';
import { config } from './config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    AuthModule,
    PrismaModule,
    ProductModule,
    CategoryModule
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AtGuard
    }
  ]
})
export class AppModule {}
