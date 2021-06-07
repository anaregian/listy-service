import { ValidationErrorResult } from "./validationResult";

export interface ServiceSuccessResult<T> {
  success: true;
  data: T;
}

export type ServiceResult<T> = ServiceSuccessResult<T> | ValidationErrorResult;

export function success<T>(data: T): ServiceSuccessResult<T> {
  return { success: true, data };
}

export const error = (attribute: string, message: string): ValidationErrorResult => {
  return { success: false, attribute, message };
};
