import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductService } from './services/product.service';

@Module({
  controllers: [ProductController, ProductsController],
  providers: [ProductService]
})
export class ProductModule {}
