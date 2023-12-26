import { Module } from '@nestjs/common';
import { PaymentIntentService } from './services/payment-intent.service';
import { StripeService } from './services/stripe.service';
import { WebhookService } from './services/webhook.service';

@Module({
  providers: [StripeService, PaymentIntentService, WebhookService],
  exports: [StripeService, PaymentIntentService, WebhookService]
})
export class StripeModule {}
