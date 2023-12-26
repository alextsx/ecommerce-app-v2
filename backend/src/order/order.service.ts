import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  public async createOrder({ userId }: { userId: string }) {
    console.log('creating order for this user:', userId);
  }

  public async createGuestOrder() {
    console.log('creating guest order');
  }
}
