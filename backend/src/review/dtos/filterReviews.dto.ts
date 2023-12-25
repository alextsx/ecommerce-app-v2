import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FilterDto } from './filter.dto';

export class FilterReviewsDto extends IntersectionType(FilterDto, PaginationDto) {}
