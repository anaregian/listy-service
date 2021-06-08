import { Category } from "@prisma/client";
import { inject, injectable } from "inversify";
import { IRepository } from "../common/repository";
import { IService } from "../common/service";
import { ServiceResult, success } from "../common/ServiceResult";
import { ValidationErrorResult } from "../common/validationResult";
import { IValidator } from "../common/validator";
import { TYPES } from "../modules/types";
import { CategoryDto } from "./categoryDto";

@injectable()
export class CategoryService implements IService<Category, CategoryDto> {
  categoryRepository: IRepository<Category, CategoryDto>;
  categoryValidator: IValidator<CategoryDto>;

  constructor(
    @inject(TYPES.ICategoryRepository) categoryRepository: IRepository<Category, CategoryDto>,
    @inject(TYPES.ICategoryValidator) categoryValidator: IValidator<CategoryDto>
  ) {
    this.categoryRepository = categoryRepository;
    this.categoryValidator = categoryValidator;
  }

  async getAll(): Promise<ServiceResult<Category[]>> {
    const result = await this.categoryRepository.getAll();

    if (!result.success) {
      const errorResult = result as ValidationErrorResult;
      return errorResult;
    }

    return success(result.data);
  }

  async get(id: number): Promise<ServiceResult<Category>> {
    const result = await this.categoryRepository.get(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async create(data: CategoryDto): Promise<ServiceResult<Category>> {
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

  async update(id: number, data: CategoryDto): Promise<ServiceResult<Category>> {
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

  async delete(id: number): Promise<ServiceResult<Category>> {
    const result = await this.categoryRepository.delete(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }
}
