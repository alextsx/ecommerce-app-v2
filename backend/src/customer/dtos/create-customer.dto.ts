import { Customer } from '@prisma/client';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCustomerDto
  implements Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
{
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
  billingAddressId: string;
  shippingAddressId: string;
  @IsString()
  @MaxLength(255)
  @IsOptional()
  userId?: string;
}
