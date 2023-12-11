import { Transform } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class FilterDto {
  @IsOptional()
  category?: string;
  @IsOptional()
  name?: string;
  @IsOptional()
  @Transform(({ value }) => Number(value))
  minPrice?: number;
  @IsOptional()
  @Transform(({ value }) => Number(value))
  maxPrice?: number;

  @Min(1)
  @Max(5)
  @IsOptional()
  @Transform(({ value }) => Number(value))
  rating?: number;
}
