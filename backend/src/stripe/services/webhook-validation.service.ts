import { Injectable } from '@nestjs/common';
import { StripeService } from 'src/stripe/services/stripe.service';

@Injectable()
export class WebhookValidationService {
  constructor(private readonly stripeService: StripeService) {}

  public async validateWebhook({
    stripeSignature,
    rawBody
  }: {
    stripeSignature: string;
    rawBody: string;
  }) {
    return this.stripeService.stripe.webhooks.constructEvent(
      rawBody,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  }
}
