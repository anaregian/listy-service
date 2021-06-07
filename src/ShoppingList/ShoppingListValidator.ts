import { injectable } from "inversify";
import { validationError, ValidationResult, validationSuccess } from "../common/validationResult";
import { IValidator } from "../common/validator";
import { ShoppingListDto } from "./shoppingListDto";

@injectable()
export class ShoppingListValidator implements IValidator<ShoppingListDto> {
  validate(data: ShoppingListDto): ValidationResult {
    if (!data.name) {
      return validationError("name", "The shopping list name cannot be empty");
    }

    if (data.name.length > 255) {
      return validationError("name", "The shopping list name cannot be more than 255 characters");
    }

    return validationSuccess();
  }
}
