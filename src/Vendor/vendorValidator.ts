import { injectable } from "inversify";
import { validationError, ValidationResult, validationSuccess } from "../common/validationResult";
import { IValidator } from "../common/validator";
import { VendorDto } from "./vendorDto";

@injectable()
export class VendorValidator implements IValidator<VendorDto> {
  validate(data: VendorDto): ValidationResult {
    if (!data.name) {
      return validationError("name", "The vendor name cannot be empty");
    }

    if (data.name.length > 255) {
      return validationError("name", "The vendor name cannot be more than 255 characters");
    }

    return validationSuccess();
  }
}
