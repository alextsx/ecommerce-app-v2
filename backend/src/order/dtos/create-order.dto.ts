import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
  ValidateNested
} from 'class-validator';

export class CheckoutDetailsDto {
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

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(255)
  phone: string;

  @IsString()
  @IsIn(['stripe', 'cod'])
  paymentMethod: 'stripe' | 'cod';
}

export class CartItemsDto {
  @IsString()
  slug: string;
  @Min(1)
  @Transform(({ value }) => Number(value))
  quantity: number;
}
export class CreateOrderDto {
  @ValidateNested()
  @Type(() => CheckoutDetailsDto)
  checkoutDetails: CheckoutDetailsDto;
  @ValidateNested({ each: true })
  @Type(() => CartItemsDto)
  @IsArray()
  @ArrayMinSize(1)
  cartItems: CartItemsDto[];
}
