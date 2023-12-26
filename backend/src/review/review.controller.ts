import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Review } from '@prisma/client';
import { Public } from 'src/common/decorators';
import { ValidatedQuery } from 'src/common/decorators/validated-query.decorator';
import { PaginationResultDto } from 'src/common/dtos/pagination-result.dto';
import { FilterReviewsDto } from './dtos/filterReviews.dto';
import { TransformReviewsResponse } from './interceptors/transformReviewsResponse.interceptor';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get('reviews')
  @Public()
  @UseInterceptors(new TransformReviewsResponse())
  public async getReviews(
    @ValidatedQuery() filterReviewsDto: FilterReviewsDto
  ): Promise<PaginationResultDto<Review>> {
    return this.reviewService.getReviewsWithUserData(filterReviewsDto);
  }
}
