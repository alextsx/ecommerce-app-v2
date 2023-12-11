import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PaginationResultDto } from 'src/common/dtos/pagination-result.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterDto } from '../dtos/filter.dto';
import { ProductSortableOrders, SortDto } from '../dtos/sort.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public async getFeaturedProducts(): Promise<Product[]> {
    const featuredProducts = await this.prismaService.product.findMany({
      where: {
        isFeatured: true,
        inventory: {
          gt: 0
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

    if (!featuredProducts.length) {
      return this.getFallbackProducts();
    }

    return featuredProducts;
  }

  public async getNewArrivalsProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        inventory: {
          gt: 0
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
        },
        inventory: {
          gt: 0
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
      where: {
        inventory: {
          gt: 0
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

  //TODO refactor this into separate helper functions
  public async getProducts({
    paginationDto,
    filterDto,
    sortDto
  }: {
    paginationDto: PaginationDto;
    filterDto: FilterDto;
    sortDto: SortDto;
  }): Promise<PaginationResultDto<Product>> {
    const where = {};
    const include = {
      productImages: {
        select: {
          url: true
        }
      }
    };

    const uniqueFilters = ['category', 'rating', 'minPrice', 'maxPrice'];

    if (filterDto.category) {
      where['category'] = { slug: { equals: filterDto.category, mode: 'insensitive' } };
      include['category'] = {
        select: {
          name: true
        }
      };
    }

    if (filterDto.rating) {
      //minimum rating, gte
      where['rating'] = {
        gte: filterDto.rating
      };
    }

    if (filterDto.minPrice || filterDto.maxPrice) {
      where['OR'] = [
        {
          AND: [
            { discountedPrice: { not: null } },
            filterDto.minPrice ? { discountedPrice: { gte: filterDto.minPrice } } : {},
            filterDto.maxPrice ? { discountedPrice: { lte: filterDto.maxPrice } } : {}
          ]
        },
        {
          AND: [
            { discountedPrice: null },
            filterDto.minPrice ? { price: { gte: filterDto.minPrice } } : {},
            filterDto.maxPrice ? { price: { lte: filterDto.maxPrice } } : {}
          ]
        }
      ];
    }

    const filters = Object.keys(filterDto).filter(
      (filter) => !uniqueFilters.includes(filter) && filterDto[filter]
    );

    filters.forEach((filter) => {
      where[filter] = {
        contains: filterDto[filter],
        mode: 'insensitive'
      };
    });

    const orderBy = {};
    if (sortDto.sort) {
      const [column, order] = sortDto.sort.split('_');
      orderBy[column as ProductSortableOrders] = order;
    }

    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const total = await this.prismaService.product.count({ where });
    const last_page = Math.ceil(total / limit);

    const findManyOptions = {
      where,
      include,
      orderBy,
      skip,
      take: limit
    };

    console.log(JSON.stringify(findManyOptions, null, 2));

    const products = await this.prismaService.product.findMany({
      where,
      include,
      orderBy,
      skip,
      take: limit
    });

    const meta = {
      items_per_page: limit,
      currentPage: page,
      total,
      last_page,
      first_page: 1
    };

    return {
      data: products,
      meta
    };
  }

  public async getPriceRange() {
    const { _max, _min } = await this.prismaService.product.aggregate({
      _min: {
        price: true
      },
      _max: {
        price: true
      }
    });

    return {
      min: _min.price,
      max: _max.price
    };
  }
}
