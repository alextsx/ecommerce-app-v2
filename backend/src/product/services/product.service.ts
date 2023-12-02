import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  async getProductWithRelatedInformation(slug: string) {
    const record = await this.prismaService.product.findUnique({
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

    return plainToClass(ProductDto, record);
  }

  async getRelatedProducts(slug: string) {
    console.log(slug);
  }
}
