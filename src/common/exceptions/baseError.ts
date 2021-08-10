export class BaseError extends Error {
  public property?: string;

  constructor(message: string, property?: string) {
    super(message);
    this.property = property;
  }
}
