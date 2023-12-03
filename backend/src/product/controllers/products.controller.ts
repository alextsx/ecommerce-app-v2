import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Product } from '@prisma/client';
import { Public } from 'src/common/decorators';
import { PaginationResultDto } from 'src/common/dtos/pagination-result.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TransformDataInterceptor } from 'src/common/interceptors/transformData.interceptor';
import { TransformNestedDataInterceptor } from 'src/common/interceptors/transformNestedData.interceptor';
import { ValidatedQuery } from '../decorators/validated-query.decorator';
import { FilterDto } from '../dtos/filter.dto';
import { ProductCardDto } from '../dtos/product.dto';
import { SortDto } from '../dtos/sort.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  @UseInterceptors(new TransformNestedDataInterceptor(ProductCardDto))
  async getFilteredProducts(
    @ValidatedQuery() paginationDto: PaginationDto,
    @ValidatedQuery()
    filterDto: FilterDto,
    @ValidatedQuery()
    sortDto: SortDto
  ): Promise<PaginationResultDto<Product>> {
    return this.productsService.getProducts({ paginationDto, filterDto, sortDto });
  }

  @Public()
  @Get('featured')
  @UseInterceptors(new TransformDataInterceptor(ProductCardDto))
  async getFeaturedProducts() {
    return this.productsService.getFeaturedProducts();
  }

  @Public()
  @Get('new-arrivals')
  @UseInterceptors(new TransformDataInterceptor(ProductCardDto))
  async getNewArrivalsProducts() {
    return this.productsService.getNewArrivalsProducts();
  }

  @Public()
  @Get('best-sellers')
  @UseInterceptors(new TransformDataInterceptor(ProductCardDto))
  async getBestSellersProducts() {
    return this.productsService.getBestSellerProducts();
  }
}
