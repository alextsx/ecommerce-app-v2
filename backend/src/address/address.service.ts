import { Injectable } from '@nestjs/common';
import { CheckoutDetailsDto } from 'src/order/dtos/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDetailsDto } from 'src/user-details/dtos/update-user-details.dto';
import { CreateAddressDto } from './dtos/create-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createAddress(data: CreateAddressDto) {
    return this.prismaService.address.create({
      data
    });
  }

  public extractAddressDetails({
    checkoutDetails,
    prefix
  }: {
    checkoutDetails: CheckoutDetailsDto | UpdateUserDetailsDto;
    prefix: string;
  }): CreateAddressDto {
    return {
      city: checkoutDetails[`${prefix}-city`],
      country: checkoutDetails[`${prefix}-country`],
      line1: checkoutDetails[`${prefix}-line1`],
      line2: checkoutDetails[`${prefix}-line2`],
      state: checkoutDetails[`${prefix}-state`],
      zipcode: checkoutDetails[`${prefix}-zipcode`]
    };
  }
}
