import { IsOptional, Max, Min } from 'class-validator';

export class FilterDto {
  @IsOptional()
  category?: string;
  @IsOptional()
  name?: string;

  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;
}
