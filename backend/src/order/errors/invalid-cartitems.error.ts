export class InvalidCartItemsError extends Error {
  constructor() {
    const message = `Invalid cart items`;
    super(message);
    this.name = 'InvalidCartItemsError';
  }
}
