import { BaseError } from "./baseError";

export class ValidationError extends BaseError {
  constructor(message: string, property?: string) {
    super(message, property);
  }
}
