export class ProductNotFoundError extends Error {
  constructor(slug) {
    const message = `Product with slug ${slug} not found`;
    super(message);
    this.name = 'ProductNotFoundError';
  }
}
