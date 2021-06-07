import { Item } from ".prisma/client";
import { inject, injectable } from "inversify";
import { ServiceResult, success } from "../common/ServiceResult";
import { IValidator } from "../common/validator";
import { TYPES } from "../modules/types";
import { IRepository } from "./../common/repository";
import { IService } from "./../common/service";
import { ValidationErrorResult } from "./../common/validationResult";
import { ItemDto } from "./itemDto";

@injectable()
export class ItemService implements IService<Item, ItemDto> {
  itemRepository: IRepository<Item, ItemDto>;
  itemValidator: IValidator<ItemDto>;

  constructor(
    @inject(TYPES.IItemRepository) itemRepository: IRepository<Item, ItemDto>,
    @inject(TYPES.IItemValidator) itemValidator: IValidator<ItemDto>
  ) {
    this.itemRepository = itemRepository;
    this.itemValidator = itemValidator;
  }
  async getAll(): Promise<ServiceResult<Item[]>> {
    const result = await this.itemRepository.getAll();

    if (!result.success) {
      const errorResult = result as ValidationErrorResult;
      return errorResult;
    }

    return success(result.data);
  }

  async get(id: number): Promise<ServiceResult<Item>> {
    const result = await this.itemRepository.get(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async create(data: ItemDto): Promise<ServiceResult<Item>> {
    const validationResult = this.itemValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.itemRepository.create(data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async update(id: number, data: ItemDto): Promise<ServiceResult<Item>> {
    const validationResult = this.itemValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.itemRepository.update(id, data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async delete(id: number): Promise<ServiceResult<Item>> {
    const result = await this.itemRepository.delete(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }
}
