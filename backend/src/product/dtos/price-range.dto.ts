import { Transform } from 'class-transformer';

export class PriceRangeDto {
  //min and max toFixed(2)
  @Transform(({ value }: { value: number }) => Number(value.toFixed(2)))
  min: number;
  @Transform(({ value }: { value: number }) => Number(value.toFixed(2)))
  max: number;
}
