import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config';
import { LineItemType } from './line-items.service';
import { StripeService } from './stripe.service';

@Injectable()
export class CheckoutSessionService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly configService: ConfigService<Config>
  ) {}

  public createCheckoutSession({
    line_items,
    orderId
  }: {
    line_items: LineItemType[];
    orderId: string;
  }) {
    const success_url = this.configService.get<string>('success_url');
    const cancel_url = this.configService.get<string>('cancel_url');
    const currency = this.configService.get<string>('currency');
    return this.stripeService.stripe.checkout.sessions.create({
      line_items,
      success_url,
      cancel_url,
      payment_method_types: ['card'],
      mode: 'payment',
      metadata: {
        order_id: orderId
      },
      currency
    });
  }
}
