import { injectable } from "inversify";
import { validationError, ValidationResult, validationSuccess } from "../common/validationResult";
import { IValidator } from "../common/validator";
import { CategoryDto } from "./categoryDto";

@injectable()
export class CategoryValidator implements IValidator<CategoryDto> {
  validate(data: CategoryDto): ValidationResult {
    if (!data.name) {
      return validationError("name", "The category name cannot be empty");
    }

    if (data.name.length > 255) {
      return validationError("name", "The category name cannot be more than 255 characters");
    }

    return validationSuccess();
  }
}
