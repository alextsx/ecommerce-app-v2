import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { Public } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidatedBody } from 'src/common/decorators/validated-body.decorator';
import { TransformDataInterceptor } from 'src/common/interceptors/transformData.interceptor';
import { CategoryService } from './category.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dtos/category.dto';
import { CategoryExceptionFilter } from './filters/category-exception.filter';

@Controller()
@UseFilters(CategoryExceptionFilter)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseInterceptors(new TransformDataInterceptor(CategoryDto))
  @Get('categories')
  @Public()
  public async getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Post('category')
  @Roles('ADMIN')
  public async createCategory(@ValidatedBody() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Delete('category/:slug')
  @Roles('ADMIN')
  public async deleteCategory(@Param('slug') slug: string) {
    return this.categoryService.deleteCategory(slug);
  }

  @Get('category/:slug')
  @Roles('ADMIN')
  public async getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoryService.getCategoryBySlug(slug);
  }

  @Put('category/:slug')
  @Roles('ADMIN')
  public async updateCategory(
    @Param('slug') slug: string,
    @ValidatedBody() categoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.updateCategory({
      oldSlug: slug,
      data: categoryDto
    });
  }
}
