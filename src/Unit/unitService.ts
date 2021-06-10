import { inject, injectable } from "inversify";
import { IRepository } from "../common/repository";
import { IService } from "../common/service";
import { ServiceResult, success } from "../common/ServiceResult";
import { IValidator } from "../common/validator";
import { TYPES } from "../modules/types";
import { UnitDto } from "./unitDto";
import { UnitModel } from "./unitModel";

@injectable()
export class UnitService implements IService<UnitModel, UnitDto> {
  unitRepository: IRepository<UnitModel, UnitDto>;
  unitValidator: IValidator<UnitDto>;

  constructor(
    @inject(TYPES.IUnitRepository) unitRepository: IRepository<UnitModel, UnitDto>,
    @inject(TYPES.IUnitValidator) unitValidator: IValidator<UnitDto>
  ) {
    this.unitRepository = unitRepository;
    this.unitValidator = unitValidator;
  }

  async getAll(): Promise<ServiceResult<UnitModel[]>> {
    const result = await this.unitRepository.getAll();

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async get(id: number): Promise<ServiceResult<UnitModel>> {
    const result = await this.unitRepository.get(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async create(data: UnitDto): Promise<ServiceResult<UnitModel>> {
    const validationResult = this.unitValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.unitRepository.create(data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async update(id: number, data: UnitDto): Promise<ServiceResult<UnitModel>> {
    const validationResult = this.unitValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.unitRepository.update(id, data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async delete(id: number): Promise<ServiceResult<boolean>> {
    const result = await this.unitRepository.delete(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }
}
