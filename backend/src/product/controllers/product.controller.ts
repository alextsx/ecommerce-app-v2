import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators';

@Controller('product')
export class ProductController {
  @Public()
  @Get(':id')
  async getProducts() {
    return 'getProducts';
  }

  @Public()
  @Get(':id/related')
  async getRelatedProducts() {
    return 'getRelatedProducts';
  }
}
