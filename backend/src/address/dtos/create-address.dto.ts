import { Address } from '@prisma/client';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAddressDto implements Omit<Address, 'id' | 'user' | 'createdAt' | 'updatedAt'> {
  @IsString()
  @MaxLength(255)
  'line1': string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  'line2': string;

  @IsString()
  @MaxLength(255)
  'city': string;

  @IsString()
  @MaxLength(255)
  'state': string;

  @IsString()
  @MaxLength(255)
  'country': string;

  @IsString()
  @MaxLength(255)
  'zipcode': string;
}
