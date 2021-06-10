import { inject, injectable } from "inversify";
import { IAssociationRepository } from "../common/associationRepository";
import { ServiceResult, success } from "../common/ServiceResult";
import { IValidator } from "../common/validator";
import { TYPES } from "../modules/types";
import { IAssociationService } from "./../common/associationService";
import { VendorItemPriceDto } from "./vendorItemPriceDto";
import { VendorItemPriceModel } from "./vendorItemPriceModel";

@injectable()
export class VendorItemPriceService implements IAssociationService<VendorItemPriceModel, VendorItemPriceDto> {
  vendorItemPriceRepository: IAssociationRepository<VendorItemPriceModel, VendorItemPriceDto>;
  vendorItemPriceValidator: IValidator<VendorItemPriceDto>;

  constructor(
    @inject(TYPES.IVendorItemPriceRepository)
    vendorItemPriceRepository: IAssociationRepository<VendorItemPriceModel, VendorItemPriceDto>,
    @inject(TYPES.IVendorItemPriceValidator) vendorItemPriceValidator: IValidator<VendorItemPriceDto>
  ) {
    this.vendorItemPriceRepository = vendorItemPriceRepository;
    this.vendorItemPriceValidator = vendorItemPriceValidator;
  }

  async getAll(itemId: number): Promise<ServiceResult<VendorItemPriceModel[]>> {
    const result = await this.vendorItemPriceRepository.getAll(itemId);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async get(itemId: number, vendorId: number): Promise<ServiceResult<VendorItemPriceModel>> {
    const result = await this.vendorItemPriceRepository.get(itemId, vendorId);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async create(
    itemId: number,
    vendorId: number | null,
    data: VendorItemPriceDto
  ): Promise<ServiceResult<VendorItemPriceModel>> {
    const validationResult = this.vendorItemPriceValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.vendorItemPriceRepository.create(itemId, vendorId, data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async update(
    itemId: number,
    vendorId: number,
    data: VendorItemPriceDto
  ): Promise<ServiceResult<VendorItemPriceModel>> {
    const validationResult = this.vendorItemPriceValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.vendorItemPriceRepository.update(itemId, vendorId, data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async delete(itemId: number | null, vendorId: number | null): Promise<ServiceResult<boolean>> {
    const result = await this.vendorItemPriceRepository.delete(itemId, vendorId);

    if (!result.success) {
      return result;
    }

    return success(true);
  }
}
