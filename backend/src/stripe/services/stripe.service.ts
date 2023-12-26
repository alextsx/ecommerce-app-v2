import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  public readonly stripe: Stripe;
  private readonly secretKey: string;

  constructor(private readonly configService: ConfigService<Config>) {
    this.secretKey = configService.get('STRIPE_SECRET_KEY');
    this.stripe = new Stripe(this.secretKey, {
      apiVersion: '2023-10-16'
    });
  }
}
