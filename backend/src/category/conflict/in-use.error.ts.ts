export class CategoryInUseError extends Error {
  constructor(name: string) {
    const message = `Category ${name} is used by a product. You cannot delete it!`;
    super(message);
    this.name = 'CategoryInUseError';
  }
}
