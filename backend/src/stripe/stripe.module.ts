import { Module } from '@nestjs/common';
import { CheckoutSessionService } from './services/checkout-session.service';
import { LineItemsService } from './services/line-items.service';
import { StripeService } from './services/stripe.service';
import { WebhookValidationService } from './services/webhook-validation.service';

@Module({
  providers: [StripeService, CheckoutSessionService, WebhookValidationService, LineItemsService],
  exports: [StripeService, CheckoutSessionService, WebhookValidationService, LineItemsService]
})
export class StripeModule {}
