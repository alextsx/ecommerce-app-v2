import { Controller, Get, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { Review } from '@prisma/client';
import { Public } from 'src/common/decorators';
import { PaginationResultDto } from 'src/common/dtos/pagination-result.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TransformReviewsResponse } from './interceptors/transformReviewsResponse.interceptor';
import { ReviewService } from './review.service';

const validationPipelineOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true
};

@Controller()
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get('reviews')
  @Public()
  @UseInterceptors(new TransformReviewsResponse())
  public async getReviews(
    @Query(new ValidationPipe(validationPipelineOptions))
    paginationDto: PaginationDto
  ): Promise<PaginationResultDto<Review>> {
    return this.reviewService.getReviewsWithUserData(paginationDto);
  }
}
