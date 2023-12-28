export class CategoryConflictError extends Error {
  constructor(name: string) {
    const message = `Category ${name} already exists!`;
    super(message);
    this.name = 'CategoryConflictError';
  }
}
