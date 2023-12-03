import { Controller, Get, NotFoundException, Param, UseInterceptors } from '@nestjs/common';
import { Product } from '@prisma/client';
import { Public } from 'src/common/decorators';
import { TransformDataInterceptor } from 'src/common/interceptors/transformData.interceptor';
import { ProductDto, RelatedProductDto } from '../dtos/product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get(':slug')
  @UseInterceptors(new TransformDataInterceptor(ProductDto))
  async getProduct(@Param('slug') slug: string): Promise<Product> {
    const product = await this.productService.getProductWithRelatedInformation(slug);

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    return product;
  }

  @Public()
  @Get(':slug/related')
  @UseInterceptors(new TransformDataInterceptor(RelatedProductDto))
  async getRelatedProducts(@Param('slug') slug: string): Promise<Product[]> {
    // we dont throw error if no related products found, we just dont display any on the frontend
    return this.productService.getRelatedProducts(slug);
  }
}
