import { Module } from '@nestjs/common';
import { CheckoutSessionService } from './services/checkout-session.service';
import { LineItemsService } from './services/line-items.service';
import { StripeService } from './services/stripe.service';
import { WebhookService } from './services/webhook.service';

@Module({
  providers: [StripeService, CheckoutSessionService, WebhookService, LineItemsService],
  exports: [StripeService, CheckoutSessionService, WebhookService, LineItemsService]
})
export class StripeModule {}
