import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { ProductDto } from '../dtos/product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get(':slug')
  async getProduct(@Param('slug') slug: string): Promise<ProductDto | null> {
    const product = await this.productService.getProductWithRelatedInformation(slug);
    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }
    return product;
  }

  @Public()
  @Get(':slug/related')
  async getRelatedProducts() {
    return 'getRelatedProducts';
  }
}
