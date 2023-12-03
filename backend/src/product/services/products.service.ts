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
