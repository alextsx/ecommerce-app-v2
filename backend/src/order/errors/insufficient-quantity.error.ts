export class InsufficientQuantityError extends Error {
  constructor(name: string) {
    const message = `Insufficient quantity for product called ${name}`;
    super(message);
    this.name = 'InsufficientQuantityError';
  }
}
