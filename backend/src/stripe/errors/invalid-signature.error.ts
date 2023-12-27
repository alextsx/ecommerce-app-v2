export class InvalidSignatureError extends Error {
  constructor() {
    super('Invalid Stripe signature');
  }
}
