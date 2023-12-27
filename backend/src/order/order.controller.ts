import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { GetUserInfoFromAtPayload, Public } from 'src/common/decorators';
import { ValidatedBody } from 'src/common/decorators/validated-body.decorator';
import { StripeSignature } from 'src/stripe/decorators/stripe-signature.decorator';
import { InvalidSignatureExceptionFilter } from 'src/stripe/filters/invalid-signature.filter';
import { WebhookService } from 'src/stripe/services/webhook.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderExceptionFilter } from './filters/orderexception.filter';
import { OrderService } from './services/order.service';

@Controller('order')
@UseFilters(OrderExceptionFilter)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly webhookService: WebhookService
  ) {}

  @Post()
  public async createOrder(
    @GetUserInfoFromAtPayload('sub') userId: string,
    @ValidatedBody()
    createOrderDto: CreateOrderDto
  ) {
    return this.orderService.processOrder({
      userId,
      createOrderDto
    });
  }

  @Post('guest')
  @Public()
  public async createGuestOrder(
    @ValidatedBody()
    createOrderDto: CreateOrderDto
  ) {
    return this.orderService.processOrder({
      createOrderDto
    });
  }
  @Post('stripe-webhook')
  @Public()
  @UseFilters(InvalidSignatureExceptionFilter)
  public async stripeWebhook(@StripeSignature() stripeSignature: string, @Body() rawBody: string) {
    return this.webhookService.processStripeWebhook({
      stripeSignature,
      rawBody
    });
  }
}
