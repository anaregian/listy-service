import { injectable } from "inversify";
import { validationError, ValidationResult, validationSuccess } from "./../common/validationResult";
import { IValidator } from "./../common/validator";
import { ShoppingListItemDto } from "./shoppingListItemDto";

@injectable()
export class ShoppingListItemValidator implements IValidator<ShoppingListItemDto> {
  validate(data: ShoppingListItemDto): ValidationResult {
    if (data.quantity.length > 50) {
      return validationError("quantity", "The shopping list item quantity cannot be more than 50 characters");
    }

    if (data.note.length > 255) {
      return validationError("name", "The shopping list item note cannot be more than 255 characters");
    }

    return validationSuccess();
  }
}
