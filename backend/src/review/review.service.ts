import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PaginationResultDto } from 'src/common/dtos/pagination-result.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prismaService: PrismaService) {}
  public async getReviewsWithUserData(
    paginationDto: PaginationDto
  ): Promise<PaginationResultDto<Review>> {
    const { limit = 5, page = 1 } = paginationDto;

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
      }
    });

    const total = await this.prismaService.review.count();
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
