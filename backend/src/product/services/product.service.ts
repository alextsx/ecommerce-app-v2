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

    /* 
      we dont want products with 0 inventory
      we dont want the same product
    */
    return this.prismaService.product.findMany({
      where: {
        categoryId: productInDb.categoryId,
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
