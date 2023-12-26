import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createCustomer(data: CreateCustomerDto) {
    return this.prismaService.customer.create({
      data
    });
  }
}
