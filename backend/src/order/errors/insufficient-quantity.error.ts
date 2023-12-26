export class InsufficientQuantityError extends Error {
  constructor(slug: string) {
    const message = `Insufficient quantity for product with slug ${slug}`;
    super(message);
    this.name = 'InsufficientQuantityError';
  }
}
