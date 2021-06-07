import { ValidationErrorResult } from "./validationResult";

export type ResponseResult<T = any> = {
  data?: T;
  error?: Pick<ValidationErrorResult, "attribute" | "message">;
};

export function successResponse<T>(data: T): ResponseResult<T> {
  return { data };
}

export const errorResponse = (validationError: ValidationErrorResult): ResponseResult => {
  return { error: { attribute: validationError.attribute, message: validationError.message } };
};
