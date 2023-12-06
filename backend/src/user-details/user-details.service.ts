import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserDetailsService {
  constructor(private prismaService: PrismaService) {}
  public getUserDetails({ userId }: { userId: string }) {
    return this.prismaService.userDetails.findUnique({
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
  }
}
