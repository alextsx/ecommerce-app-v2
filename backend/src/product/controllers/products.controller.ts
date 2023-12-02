import { Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';

@Controller('products')
export class ProductsController {
  @Public()
  @Post()
  async getFilteredProducts() {
    return 'getFilteredProducts';
  }

  @Public()
  @Get('featured')
  async getFeaturedProducts() {
    return 'getFeaturedProducts';
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
