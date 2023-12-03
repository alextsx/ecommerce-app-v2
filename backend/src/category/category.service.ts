import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  public getCategories() {
    return this.prismaService.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });
  }
}
