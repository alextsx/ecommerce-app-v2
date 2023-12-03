import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public async getFeaturedProducts(): Promise<Product[]> {
    const featuredProducts = await this.prismaService.product.findMany({
      where: {
        isFeatured: true
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

    if (!featuredProducts.length) {
      return this.getFallbackProducts();
    }
  }

  public async getNewArrivalsProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      orderBy: {
        createdAt: 'desc'
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

  public async getBestSellerProducts() {
    //we need to group orderItems by productId and count them
    //then we need to sort them by count
    //then we need to get the first 4 products
    const mostSoldProductsInDb = await this.prismaService.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      }
    });

    const mostSoldProductsIds = mostSoldProductsInDb.map((orderItem) => orderItem.productId);

    if (!mostSoldProductsIds.length) {
      return this.getFallbackProducts();
    }

    const firstFourMostSoldProductsIds = mostSoldProductsIds.slice(0, 4);

    //these arent sorted by most sold, but we dont care
    return this.prismaService.product.findMany({
      where: {
        id: {
          in: firstFourMostSoldProductsIds
        }
      },
      include: {
        productImages: {
          select: {
            url: true
          }
        }
      }
    });
  }

  private getFallbackProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany({
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
}
