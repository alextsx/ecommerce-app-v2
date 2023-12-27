import { Injectable } from '@nestjs/common';
import { CheckoutEventsService } from 'src/order/services/checkout-events.service';
import { StripeService } from 'src/stripe/services/stripe.service';
import Stripe from 'stripe';

@Injectable()
export class WebhookService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly checkoutEventService: CheckoutEventsService
  ) {}

  public async processStripeWebhook({
    stripeSignature,
    rawBody
  }: {
    stripeSignature: string;
    rawBody: string;
  }) {
    //can throw invalid signature error, but we catch it in the order controller
    const event = await this.validateWebhook({
      stripeSignature,
      rawBody
    });

    const type = event.type;
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata.order_id;

    switch (type) {
      case 'payment_intent.succeeded':
        return this.checkoutEventService.handlePaymentIntentSucceededEvent({ orderId });
      case 'payment_intent.canceled':
        return this.checkoutEventService.handlePaymentIntentCanceledEvent({ orderId });
      case 'payment_intent.payment_failed':
        return this.checkoutEventService.handlePaymentIntentExpiredEvent({ orderId });
      default:
        return;
    }
  }

  private async validateWebhook({
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
