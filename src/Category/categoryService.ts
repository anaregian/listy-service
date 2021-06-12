import { inject, injectable } from "inversify";
import { IRepository } from "../common/repository";
import { IService } from "../common/service";
import { ServiceResult, success } from "../common/serviceResult";
import { IValidator } from "../common/validator";
import { TYPES } from "../modules/types";
import { CategoryDto } from "./categoryDto";
import { CategoryModel } from "./categoryModel";

@injectable()
export class CategoryService implements IService<CategoryModel, CategoryDto> {
  categoryRepository: IRepository<CategoryModel, CategoryDto>;
  categoryValidator: IValidator<CategoryDto>;

  constructor(
    @inject(TYPES.ICategoryRepository) categoryRepository: IRepository<CategoryModel, CategoryDto>,
    @inject(TYPES.ICategoryValidator) categoryValidator: IValidator<CategoryDto>
  ) {
    this.categoryRepository = categoryRepository;
    this.categoryValidator = categoryValidator;
  }

  async getAll(): Promise<ServiceResult<CategoryModel[]>> {
    const result = await this.categoryRepository.getAll();

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async get(id: number): Promise<ServiceResult<CategoryModel>> {
    const result = await this.categoryRepository.get(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async create(data: CategoryDto): Promise<ServiceResult<CategoryModel>> {
    const validationResult = this.categoryValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.categoryRepository.create(data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async update(id: number, data: CategoryDto): Promise<ServiceResult<CategoryModel>> {
    const validationResult = this.categoryValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.categoryRepository.update(id, data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async delete(id: number): Promise<ServiceResult<boolean>> {
    const result = await this.categoryRepository.delete(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }
}
