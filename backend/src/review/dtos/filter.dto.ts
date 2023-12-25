import { IsString } from 'class-validator';

export class FilterDto {
  @IsString()
  slug: string;
}
