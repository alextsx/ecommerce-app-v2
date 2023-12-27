import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/services/product.service';
import { WebhookValidationService } from 'src/stripe/services/webhook-validation.service';
import Stripe from 'stripe';

@Injectable()
export class OrderWebhooksService {
  constructor(
    private readonly webhookValidationService: WebhookValidationService,
    private readonly prismaService: PrismaService,
    private readonly productService: ProductService
  ) {}
  public async processOrderWebhook({
    stripeSignature,
    rawBody
  }: {
    stripeSignature: string;
    rawBody: string;
  }) {
    //can throw invalid signature error, but we catch it in the order controller
    const event = await this.webhookValidationService.validateWebhook({
      stripeSignature,
      rawBody
    });

    const type = event.type;
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata.order_id;

    console.log(` Received event with type: ${type} for order with id: ${orderId}`);

    switch (type) {
      case 'checkout.session.completed':
        return this.handlePaymentIntentSucceededEvent({ orderId });
      case 'checkout.session.expired':
        return this.handlePaymentIntentExpiredEvent({ orderId });
    }
  }
  /*   public async handlePaymentIntentCanceledEvent({ orderId }: { orderId: string }) {
    return this.handleFailEvent({
      orderId,
      status: 'CANCELLED'
    });
  } */

  public async handlePaymentIntentExpiredEvent({ orderId }: { orderId: string }) {
    return this.handleFailEvent({
      orderId,
      status: 'EXPIRED'
    });
  }

  public async handlePaymentIntentSucceededEvent({ orderId }: { orderId: string }) {
    //there is no handleSuccessEvent for this, theres only 1

    const orderInDb = await this.prismaService.order.findUnique({
      where: {
        id: orderId
      }
    });
    if (!orderInDb) {
      return;
    }

    if (orderInDb.paymentStatus !== 'PENDING') {
      return;
    }

    return this.prismaService.order.update({
      where: {
        id: orderId
      },
      data: {
        paymentStatus: 'PAID'
      }
    });
  }

  private async handleFailEvent({ orderId, status }: { orderId: string; status: PaymentStatus }) {
    const orderInDb = await this.prismaService.order.findUnique({
      where: {
        id: orderId
      }
    });
    if (!orderInDb) {
      return;
    }

    if (orderInDb.paymentStatus !== 'PENDING') {
      return;
    }

    const order = await this.prismaService.order.update({
      where: {
        id: orderId
      },
      data: {
        paymentStatus: status
      },
      include: {
        orderItems: true
      }
    });

    const increasedStockPromises = order.orderItems.map(async (orderItem) => {
      return this.productService.increaseInventory({
        productId: orderItem.productId,
        quantity: orderItem.quantity
      });
    });

    return Promise.all(increasedStockPromises);
  }
}
