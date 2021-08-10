import { BaseError } from "./baseError";

export class NotFound extends BaseError {
  constructor(resource: string) {
    super(`${resource} was not found`);
  }
}
