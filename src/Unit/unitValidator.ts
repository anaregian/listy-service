import { injectable } from "inversify";
import { validationError, ValidationResult, validationSuccess } from "../common/validationResult";
import { IValidator } from "../common/validator";
import { UnitDto } from "./unitDto";

@injectable()
export class UnitValidator implements IValidator<UnitDto> {
  validate(data: UnitDto): ValidationResult {
    if (!data.name) {
      return validationError("name", "The unit name cannot be empty");
    }

    if (data.name.length > 100) {
      return validationError("name", "The unit name cannot be more than 100 characters");
    }

    if (!data.symbol) {
      return validationError("name", "The unit symbol cannot be empty");
    }

    if (data.symbol.length > 10) {
      return validationError("name", "The unit name cannot be more than 10 characters");
    }

    return validationSuccess();
  }
}
