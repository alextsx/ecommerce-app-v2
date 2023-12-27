import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { Public } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidatedBody } from 'src/common/decorators/validated-body.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';
import { TransformDataInterceptor } from 'src/common/interceptors/transformData.interceptor';
import { CategoryService } from './category.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dtos/category.dto';

@Controller()
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
  @UseGuards(RoleGuard)
  public async createCategory(@ValidatedBody() categoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }

  @Delete('category')
  public async deleteCategory(@Body('slug') slug: string) {
    return this.categoryService.deleteCategory(slug);
  }

  @Put('category')
  public async updateCategory(@Body() categoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(categoryDto);
  }
}
