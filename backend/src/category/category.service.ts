import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryConflictError } from './conflict/conflict.error';
import { CategoryInUseError } from './conflict/in-use.error.ts';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/category.dto';

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
        slug: slug.toLocaleLowerCase()
      }
    });
  }

  public async createCategory(data: CreateCategoryDto) {
    const categories = await this.prismaService.category.findMany({
      where: {
        name: data.name
      }
    });

    if (categories.length > 0) {
      throw new CategoryConflictError(data.name);
    }

    return this.prismaService.category.create({
      data: {
        name: data.name,
        slug: data.name.toLowerCase()
      }
    });
  }

  public async deleteCategory(slug: string) {
    //check if any products have this category
    const products = await this.prismaService.product.findFirst({
      where: {
        category: {
          slug: slug.toLocaleLowerCase()
        }
      }
    });

    if (products) {
      throw new CategoryInUseError(slug);
    }

    return this.prismaService.category.delete({
      where: {
        slug: slug.toLocaleLowerCase()
      }
    });
  }

  public async updateCategory({ data, oldSlug }: { oldSlug: string; data: UpdateCategoryDto }) {
    //categories with new namne
    const categories = await this.prismaService.category.findMany({
      where: {
        name: {
          equals: data.name,
          mode: 'insensitive'
        }
      }
    });

    if (categories.length > 0) {
      throw new CategoryConflictError(data.name);
    }

    return this.prismaService.category.update({
      where: {
        slug: oldSlug
      },
      data: {
        name: data.name,
        slug: data.name.toLowerCase()
      }
    });
  }
}
