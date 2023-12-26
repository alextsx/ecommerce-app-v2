import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Injectable()
export class PaymentIntentService {
  constructor(private readonly stripeService: StripeService) {}
}
