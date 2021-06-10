import { injectable } from "inversify";
import { validationError, ValidationResult, validationSuccess } from "../common/validationResult";
import { IValidator } from "../common/validator";
import { VendorItemPriceDto } from "./vendorItemPriceDto";

@injectable()
export class VendorItemPriceValidator implements IValidator<VendorItemPriceDto> {
  validate(data: VendorItemPriceDto): ValidationResult {
    if (data.regularPrice < 0) {
      return validationError("regularPrice", "The regular price must be greater than 0");
    }

    if (data.reducedPrice != null && data.reducedPrice < 0) {
      return validationError("reducedPrice", "The reduced price must be greater than 0");
    }

    return validationSuccess();
  }
}
