export interface ValidationSuccessResult {
  success: true;
}

export interface ValidationErrorResult {
  success: false;
  attribute: string;
  message: string;
}

export type ValidationResult = ValidationErrorResult | ValidationSuccessResult;

export const validationSuccess = (): ValidationSuccessResult => {
  return { success: true };
};

export const validationError = (attribute: string, message: string): ValidationErrorResult => {
  return { success: false, attribute, message };
};
