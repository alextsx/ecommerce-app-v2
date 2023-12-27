import { Injectable } from '@nestjs/common';
import { AddressService } from 'src/address/address.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDetailsDto } from './dtos/update-user-details.dto';

@Injectable()
export class UserDetailsService {
  constructor(
    private prismaService: PrismaService,
    private addressService: AddressService
  ) {}
  public async getUserDetails({ userId }: { userId: string }) {
    const response = await this.prismaService.userDetails.findUnique({
      where: {
        userId
      },
      include: {
        billingAddress: {
          select: {
            line1: true,
            line2: true,
            state: true,
            city: true,
            zipcode: true,
            country: true
          }
        },
        shippingAddress: {
          select: {
            line1: true,
            line2: true,
            state: true,
            city: true,
            zipcode: true,
            country: true
          }
        }
      }
    });

    if (response.billingAddressId === null && response.shippingAddressId === null) {
      response['billing-same-as-shipping'] = false;
    } else {
      response['billing-same-as-shipping'] =
        response.billingAddressId === response.shippingAddressId;
    }

    return response;
  }

  public async updateUserDetails({
    userId,
    updatedUserDetailsDto
  }: {
    userId: string;
    updatedUserDetailsDto: UpdateUserDetailsDto;
  }) {
    /*
      we create addresses if userdetails has no billing/shippingaddress
      if userdetails has billing/shippingaddress, we update them
      if user details has billing-same-as-shipping, we update billingaddress to be the same as shippingaddress
    */
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      },
      include: {
        UserDetails: {
          select: {
            billingAddressId: true,
            shippingAddressId: true
          }
        }
      }
    });

    const { 'billing-same-as-shipping': billingSameAsShipping } = updatedUserDetailsDto;

    //userdetailsdto has stuff in this format billing-line1 etc

    const billingAddressData = this.addressService.extractAddressDetails({
      checkoutDetails: updatedUserDetailsDto,
      prefix: 'billing'
    });

    const shippingAddressData = this.addressService.extractAddressDetails({
      checkoutDetails: updatedUserDetailsDto,
      prefix: 'shipping'
    });

    let billingAddressId = user.UserDetails.billingAddressId;
    let shippingAddressId = user.UserDetails.shippingAddressId;

    //for simplicity, we delete the old addresses and create new ones ( i dont have time for it :))
    //TODO - update addresses instead of deleting and creating new ones
    if (shippingAddressId !== null) {
      await this.addressService.deleteAddress({ addressId: shippingAddressId });
    }

    if (billingAddressId !== null && billingAddressId !== shippingAddressId) {
      await this.addressService.deleteAddress({ addressId: billingAddressId });
    }

    if (billingSameAsShipping) {
      const shippingAddress = await this.addressService.createAddress(shippingAddressData);
      billingAddressId = shippingAddress.id;
      shippingAddressId = shippingAddress.id;
    } else {
      const billingAddress = await this.addressService.createAddress(billingAddressData);
      const shippingAddress = await this.addressService.createAddress(shippingAddressData);
      billingAddressId = billingAddress.id;
      shippingAddressId = shippingAddress.id;
    }

    const { phone, firstName, lastName } = updatedUserDetailsDto;

    return this.prismaService.userDetails.update({
      where: {
        userId
      },
      data: {
        firstName,
        lastName,
        ...(phone && { phone }),
        billingAddressId,
        shippingAddressId
      }
    });
  }
}
