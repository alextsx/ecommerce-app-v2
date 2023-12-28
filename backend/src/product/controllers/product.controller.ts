import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { Public } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidatedBody } from 'src/common/decorators/validated-body.decorator';
import { TransformDataInterceptor } from 'src/common/interceptors/transformData.interceptor';
import { CreateOrUpdateProductDto, ProductCardDto, ProductDto } from '../dtos/product.dto';
import { ProductExceptionFilter } from '../filters/product-exception.filter';
import { ProductPrismaExceptionFilter } from '../filters/product-prisma-exception.filter';
import { ProductService } from '../services/product.service';

@Controller('product')
@UseFilters(ProductPrismaExceptionFilter, ProductExceptionFilter)
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
  @UseInterceptors(new TransformDataInterceptor(ProductCardDto))
  async getRelatedProducts(@Param('slug') slug: string): Promise<Product[]> {
    // we dont throw error if no related products found, we just dont display any on the frontend
    return this.productService.getRelatedProducts(slug);
  }

  @Post()
  @Roles('ADMIN')
  async createProduct(@ValidatedBody() createProductDto: CreateOrUpdateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':slug')
  @Roles('ADMIN')
  async updateProduct(
    @Param('slug') slug: string,
    @ValidatedBody() updateProductDto: CreateOrUpdateProductDto
  ) {
    return this.productService.updateProduct({ slug, updateProductDto });
  }

  @Delete(':slug')
  @Roles('ADMIN')
  async deleteProduct(@Param('slug') slug: string) {
    return this.productService.deleteProduct(slug);
  }
}
