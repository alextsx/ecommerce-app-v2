export class ProductInUseError extends Error {
  constructor(slug) {
    const message = `Product with slug ${slug} is in use and cannot be deleted`;
    super(message);
    this.name = 'ProductInUseError';
  }
}
