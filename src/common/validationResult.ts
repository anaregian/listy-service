export interface ValidationSuccessResult {
  success: true;
}

export interface ValidationErrorResult {
  success: false;
  attribute?: string;
  message: string;
}

export type ValidationResult = ValidationErrorResult | ValidationSuccessResult;
