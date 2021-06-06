import { ValidationErrorResult } from "./validationResult";

export interface ServiceSuccessResult<T> {
  success: true;
  data: T;
}

export type ServiceResult<T> = ServiceSuccessResult<T> | ValidationErrorResult;
