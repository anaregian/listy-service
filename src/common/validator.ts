import { ValidationResult } from "./validationResult";

export interface IValidator<T> {
  validate: (data: T) => ValidationResult;
}
