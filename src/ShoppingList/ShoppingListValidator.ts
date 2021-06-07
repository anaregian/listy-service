import { injectable } from "inversify";

import { ValidationResult, validationError, validationSuccess } from "../common/validationResult";
import { ShoppingListDto } from "./dto/shoppingListDto";

export interface IShoppingListValidator {
  validate: (data: ShoppingListDto) => ValidationResult;
}

@injectable()
export class ShoppingListValidator implements IShoppingListValidator {
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
