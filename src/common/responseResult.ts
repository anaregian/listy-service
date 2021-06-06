import { ValidationErrorResult } from "./validationResult";

export type ResponseResult<T> = {
  data?: T;
  error?: Pick<ValidationErrorResult, "attribute" | "message">;
};
