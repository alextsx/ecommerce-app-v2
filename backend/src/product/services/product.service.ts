import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InsufficientQuantityError } from 'src/order/errors/insufficient-quantity.error';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrUpdateProductDto } from '../dtos/product.dto';
import { ProductInUseError } from '../errors/inuse.error';

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

  public async decreaseInventory({ productId, quantity }: { productId: string; quantity: number }) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId
      },
      select: {
        slug: true,
        inventory: true
      }
    });

    if (product.inventory < quantity) {
      throw new InsufficientQuantityError(product.slug);
    }
    return this.prismaService.product.update({
      where: {
        id: productId
      },
      data: {
        inventory: product.inventory - quantity
      }
    });
  }

  public async increaseInventory({ productId, quantity }: { productId: string; quantity: number }) {
    return this.prismaService.product.update({
      where: {
        id: productId
      },
      data: {
        inventory: {
          increment: quantity
        }
      }
    });
  }

  public async createProduct(createProductDto: CreateOrUpdateProductDto) {
    await this.prismaService.product.create({
      data: {
        ...createProductDto,
        slug: this.generateProductSlug(createProductDto.name),
        category: {
          connect: {
            slug: createProductDto.category
          }
        }
      }
    });
  }

  public async updateProduct({
    slug,
    updateProductDto
  }: {
    slug: string;
    updateProductDto: CreateOrUpdateProductDto;
  }) {
    const newData: Omit<CreateOrUpdateProductDto, 'category'> = {
      name: updateProductDto.name,
      description: updateProductDto.description,
      price: updateProductDto.price,
      discountedPrice: updateProductDto.discountedPrice,
      inventory: updateProductDto.inventory,
      isFeatured: updateProductDto.isFeatured
    };
    const oldProduct = await this.prismaService.product.findUnique({
      where: {
        slug
      },
      select: {
        name: true
      }
    });

    const hasNameChanged = oldProduct.name !== updateProductDto.name;

    await this.prismaService.product.update({
      where: {
        slug
      },
      data: {
        ...newData,
        ...(hasNameChanged && { slug: this.generateProductSlug(updateProductDto.name) })
      }
    });
  }

  public async deleteProduct(slug: string) {
    //check if any orderitems have that product
    const orderItems = await this.prismaService.orderItem.findMany({
      where: {
        product: {
          slug
        }
      }
    });

    if (orderItems.length > 0) {
      throw new ProductInUseError(slug);
    }

    await this.prismaService.product.delete({
      where: {
        slug
      }
    });
  }

  private generateProductSlug(name: string) {
    return faker.helpers.slugify(name) + '-' + faker.string.uuid().slice(0, 4);
  }
}
