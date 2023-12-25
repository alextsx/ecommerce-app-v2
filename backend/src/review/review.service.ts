import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PaginationResultDto } from 'src/common/dtos/pagination-result.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterReviewsDto } from './dtos/filterReviews.dto';

@Injectable()
export class ReviewService {
  constructor(private prismaService: PrismaService) {}
  public async getReviewsWithUserData(
    filterReviewsDto: FilterReviewsDto
  ): Promise<PaginationResultDto<Review>> {
    const { limit = 5, page = 1 } = filterReviewsDto;

    const reviews = await this.prismaService.review.findMany({
      take: limit,
      skip: (page - 1) * limit,
      include: {
        user: {
          include: {
            UserDetails: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      },
      where: {
        product: {
          slug: filterReviewsDto.slug
        }
      }
    });

    const total = await this.prismaService.review.count({
      where: {
        product: {
          slug: filterReviewsDto.slug
        }
      }
    });
    const last_page = Math.ceil(total / limit);

    return {
      data: reviews,
      meta: {
        total,
        currentPage: page,
        last_page,
        first_page: 1,
        items_per_page: limit
      }
    };
  }
}
