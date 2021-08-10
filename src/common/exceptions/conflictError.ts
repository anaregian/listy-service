import { BaseError } from "./baseError";

export class ConflictError extends BaseError {
  constructor(resource: string) {
    super(`${resource} already exists`);
  }
}
