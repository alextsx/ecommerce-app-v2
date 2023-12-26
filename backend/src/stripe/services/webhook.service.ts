import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Injectable()
export class WebhookService {
  constructor(private readonly stripeService: StripeService) {}
}
