import { IsBoolean, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';

export class UpdateUserDetailsDto {
  @IsBoolean()
  'billing-same-as-shipping': boolean;

  @IsString()
  @MaxLength(255)
  @ValidateIf((o) => !o['billing-same-as-shipping'])
  'billing-line1': string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ValidateIf((o) => !o['billing-same-as-shipping'])
  'billing-line2': string;

  @IsString()
  @MaxLength(255)
  @ValidateIf((o) => !o['billing-same-as-shipping'])
  'billing-city': string;

  @IsString()
  @MaxLength(255)
  @ValidateIf((o) => !o['billing-same-as-shipping'])
  'billing-state': string;

  @IsString()
  @MaxLength(255)
  @ValidateIf((o) => !o['billing-same-as-shipping'])
  'billing-country': string;

  @IsString()
  @MaxLength(255)
  @ValidateIf((o) => !o['billing-same-as-shipping'])
  'billing-zipcode': string;

  @IsString()
  @MaxLength(255)
  'shipping-line1': string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  'shipping-line2': string;

  @IsString()
  @MaxLength(255)
  'shipping-city': string;

  @IsString()
  @MaxLength(255)
  'shipping-state': string;

  @IsString()
  @MaxLength(255)
  'shipping-country': string;

  @IsString()
  @MaxLength(255)
  'shipping-zipcode': string;

  @IsString()
  @MaxLength(255)
  firstName: string;

  @IsString()
  @MaxLength(255)
  lastName: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  phone?: string;
}
