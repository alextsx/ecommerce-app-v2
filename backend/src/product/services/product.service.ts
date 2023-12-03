import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  public getProductWithRelatedInformation(slug: string) {
    return this.prismaService.product.findUnique({
      where: {
        slug
      },
      include: {
        category: {
          select: {
            name: true
          }
        },
        productImages: {
          select: {
            url: true
          }
        }
      }
    });
  }

  public async getRelatedProducts(slug: string) {
    const productInDb = await this.getProductBySlugWithCategory(slug);

    if (!productInDb) {
      return [];
    }

    const findManyOptions = {
      where: {
        inventory: {
          gt: 0
        },
        slug: {
          not: slug
        }
      },
      take: 4,
      include: {
        productImages: {
          select: {
            url: true
          }
        }
      }
    };

    /* 
      we dont want products with 0 inventory
      we dont want the same product
    */
    const relatedProducts = await this.prismaService.product.findMany({
      ...findManyOptions,
      where: {
        ...findManyOptions.where,
        categoryId: productInDb.categoryId
      }
    });

    if (relatedProducts.length > 0) {
      return relatedProducts;
    }

    //if we get no products back we find random 4

    return this.prismaService.product.findMany({
      ...findManyOptions
    });
  }

  private getProductBySlugWithCategory(slug: string) {
    return this.prismaService.product.findUnique({
      where: {
        slug
      },
      select: {
        categoryId: true
      }
    });
  }
}
