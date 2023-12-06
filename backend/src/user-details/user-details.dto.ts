import { UserDetails } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDetailsDto implements UserDetails {
  firstName: string;
  lastName: string;
  phone: string;
  @Exclude()
  billingAddressId: string;
  @Exclude()
  shippingAddressId: string;
  @Exclude()
  id: string;
  @Exclude()
  userId: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
