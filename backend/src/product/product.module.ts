import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductService } from './services/product.service';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [ProductController, ProductsController],
  providers: [ProductService, ProductsService]
})
export class ProductModule {}
