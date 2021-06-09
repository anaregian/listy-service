import { inject, injectable } from "inversify";
import { IRepository } from "../common/repository";
import { IService } from "../common/service";
import { ServiceResult, success } from "../common/ServiceResult";
import { IValidator } from "../common/validator";
import { TYPES } from "../modules/types";
import { VendorDto } from "./vendorDto";
import { VendorModel } from "./vendorModel";

@injectable()
export class VendorService implements IService<VendorModel, VendorDto> {
  vendorRepository: IRepository<VendorModel, VendorDto>;
  vendorValidator: IValidator<VendorDto>;

  constructor(
    @inject(TYPES.IVendorRepository) vendorRepository: IRepository<VendorModel, VendorDto>,
    @inject(TYPES.IVendorValidator) vendorValidator: IValidator<VendorDto>
  ) {
    this.vendorRepository = vendorRepository;
    this.vendorValidator = vendorValidator;
  }

  async getAll(): Promise<ServiceResult<VendorModel[]>> {
    const result = await this.vendorRepository.getAll();

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async get(id: number): Promise<ServiceResult<VendorModel>> {
    const result = await this.vendorRepository.get(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async create(data: VendorDto): Promise<ServiceResult<VendorModel>> {
    const validationResult = this.vendorValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.vendorRepository.create(data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async update(id: number, data: VendorDto): Promise<ServiceResult<VendorModel>> {
    const validationResult = this.vendorValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.vendorRepository.update(id, data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async delete(id: number): Promise<ServiceResult<boolean>> {
    const result = await this.vendorRepository.delete(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }
}
