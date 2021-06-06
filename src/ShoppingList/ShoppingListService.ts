import { ValidationErrorResult } from "./../common/validationResult";
import { ServiceResult, ServiceSuccessResult } from "./../common/serviceResult";
import { inject, injectable } from "inversify";
import { ShoppingList } from ".prisma/client";

import { IShoppingListRepository } from "./ShoppingListRepository";
import { ShoppingListDto } from "./dto/shoppingListDto";
import { TYPES } from "../modules/types";
import { IShoppingListValidator } from "./ShoppingListValidator";

export interface IShoppingListService {
  getAll: () => Promise<ServiceResult<ShoppingList[]>>;
  get: (id: number) => Promise<ServiceResult<ShoppingList | null>>;
  create: (data: ShoppingListDto) => Promise<ServiceResult<ShoppingList>>;
  update: (id: number, data: ShoppingListDto) => Promise<ServiceResult<ShoppingList>>;
  delete: (id: number) => Promise<ServiceResult<ShoppingList>>;
}

@injectable()
export class ShoppingListService implements IShoppingListService {
  private shoppingListRepository: IShoppingListRepository;
  private shoppingListValidator: IShoppingListValidator;

  constructor(
    @inject(TYPES.IShoppingListRepository) shoppingListRepository: IShoppingListRepository,
    @inject(TYPES.IShoppingListValidator) shoppingListValidator: IShoppingListValidator
  ) {
    this.shoppingListRepository = shoppingListRepository;
    this.shoppingListValidator = shoppingListValidator;
  }

  async getAll(): Promise<ServiceResult<ShoppingList[]>> {
    const result = await this.shoppingListRepository.getAll();

    if (!result.success) {
      const errorResult = result as ValidationErrorResult;
      return errorResult;
    }

    const successResult = result as ServiceSuccessResult<ShoppingList[]>;
    return { success: true, data: successResult.data };
  }
  async get(id: number): Promise<ServiceResult<ShoppingList | null>> {
    const result = await this.shoppingListRepository.get(id);

    if (!result.success) {
      const errorResult = result as ValidationErrorResult;
      return errorResult;
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return { success: true, data: successResult.data };
  }

  async create(data: ShoppingListDto): Promise<ServiceResult<ShoppingList>> {
    const validationResult = this.shoppingListValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.shoppingListRepository.create(data);

    if (!result.success) {
      const errorResult = result as ValidationErrorResult;
      return errorResult;
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return { success: true, data: successResult.data };
  }

  async update(id: number, data: ShoppingListDto): Promise<ServiceResult<ShoppingList>> {
    const validationResult = this.shoppingListValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.shoppingListRepository.update(id, data);

    if (!result.success) {
      const errorResult = result as ValidationErrorResult;
      return errorResult;
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return { success: true, data: successResult.data };
  }

  async delete(id: number): Promise<ServiceResult<ShoppingList>> {
    const result = await this.shoppingListRepository.delete(id);

    if (!result.success) {
      const errorResult = result as ValidationErrorResult;
      return errorResult;
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return { success: true, data: successResult.data };
  }
}
