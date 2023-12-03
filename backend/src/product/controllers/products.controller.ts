import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { TransformDataInterceptor } from 'src/common/interceptors/transformData.interceptor';
import { ProductCardDto } from '../dtos/product.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Post()
  async getFilteredProducts() {
    return 'getFilteredProducts';
  }

  @Public()
  @Get('featured')
  @UseInterceptors(new TransformDataInterceptor(ProductCardDto))
  async getFeaturedProducts() {
    return this.productsService.getFeaturedProducts();
  }

  @Public()
  @Get('new-arrivals')
  async getNewArrivalsProducts() {
    return 'getNewArrivalsProducts';
  }

  @Public()
  @Get('best-sellers')
  async getBestSellersProducts() {
    return 'getBestSellersProducts';
  }
}
