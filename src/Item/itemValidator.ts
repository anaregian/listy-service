import { injectable } from "inversify";
import { validationError, ValidationResult, validationSuccess } from "../common/validationResult";
import { IValidator } from "./../common/validator";
import { ItemDto } from "./itemDto";

@injectable()
export class ItemValidator implements IValidator<ItemDto> {
  validate(data: ItemDto): ValidationResult {
    if (!data.name) {
      return validationError("name", "The item name cannot be empty");
    }

    if (data.name.length > 255) {
      return validationError("name", "The item name cannot be more than 255 characters");
    }

    return validationSuccess();
  }
}
