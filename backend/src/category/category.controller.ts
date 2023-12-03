import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Category } from '@prisma/client';
import { Public } from 'src/common/decorators';
import { TransformDataInterceptor } from 'src/common/interceptors/transformData.interceptor';
import { CategoryService } from './category.service';
import { CategoryDto } from './dtos/category.dto';

@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseInterceptors(new TransformDataInterceptor(CategoryDto))
  @Get('categories')
  @Public()
  public async getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }
}
