import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderItemDto } from '../dtos/create-orderitem.dto';

@Injectable()
export class OrderItemService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createOrderItem(data: CreateOrderItemDto) {
    return this.prismaService.orderItem.create({
      data
    });
  }
}
