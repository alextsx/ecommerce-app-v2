import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCategoryDto } from './dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  public getCategories() {
    return this.prismaService.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });
  }

  public getCategoryBySlug(slug: string) {
    return this.prismaService.category.findUnique({
      where: {
        slug
      }
    });
  }

  public createCategory(data: any) {
    return this.prismaService.category.create({
      data
    });
  }

  public async deleteCategory(slug: string) {
    //check if any products have this category
    const products = await this.prismaService.product.findFirst({
      where: {
        category: {
          slug
        }
      }
    });

    if (products) {
      throw new Error('Cannot delete category with products');
    }

    return this.prismaService.category.delete({
      where: {
        slug
      }
    });
  }

  public async updateCategory(data: UpdateCategoryDto) {
    const oldSlug = data.oldSlug;

    //categories with new namne
    const categories = await this.prismaService.category.findMany({
      where: {
        name: data.new_name
      }
    });

    if (categories.length > 0) {
      throw new Error('Category with this name already exists');
    }

    return this.prismaService.category.update({
      where: {
        slug: oldSlug
      },
      data: {
        name: data.new_name,
        slug: data.new_name.toLowerCase()
      }
    });
  }
}
