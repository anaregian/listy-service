import { ShoppingList } from ".prisma/client";
import { inject, injectable } from "inversify";
import { ServiceResult, success } from "../common/serviceResult";
import { IValidator } from "../common/validator";
import { TYPES } from "../modules/types";
import { IRepository } from "./../common/repository";
import { IService } from "./../common/service";
import { ShoppingListDto } from "./shoppingListDto";

@injectable()
export class ShoppingListService implements IService<ShoppingList, ShoppingListDto> {
  shoppingListRepository: IRepository<ShoppingList, ShoppingListDto>;
  shoppingListValidator: IValidator<ShoppingListDto>;

  constructor(
    @inject(TYPES.IShoppingListRepository) shoppingListRepository: IRepository<ShoppingList, ShoppingListDto>,
    @inject(TYPES.IShoppingListValidator) shoppingListValidator: IValidator<ShoppingListDto>
  ) {
    this.shoppingListRepository = shoppingListRepository;
    this.shoppingListValidator = shoppingListValidator;
  }

  async getAll(): Promise<ServiceResult<ShoppingList[]>> {
    const result = await this.shoppingListRepository.getAll();

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }
  async get(id: number): Promise<ServiceResult<ShoppingList>> {
    const result = await this.shoppingListRepository.get(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async create(data: ShoppingListDto): Promise<ServiceResult<ShoppingList>> {
    const validationResult = this.shoppingListValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.shoppingListRepository.create(data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async update(id: number, data: ShoppingListDto): Promise<ServiceResult<ShoppingList>> {
    const validationResult = this.shoppingListValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.shoppingListRepository.update(id, data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async delete(id: number): Promise<ServiceResult<ShoppingList>> {
    const result = await this.shoppingListRepository.delete(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }
}
