import { inject, injectable } from "inversify";
import { ServiceResult, success } from "../common/ServiceResult";
import { IValidator } from "../common/validator";
import { TYPES } from "../modules/types";
import { IAssociationRepository } from "./../common/associationRepository";
import { IAssociationService } from "./../common/associationService";
import { ShoppingListItemDto } from "./shoppingListItemDto";
import { ShoppingListItemModel } from "./shoppingListItemModel";

@injectable()
export class ShoppingListItemService implements IAssociationService<ShoppingListItemModel, ShoppingListItemDto> {
  shoppingListItemRepository: IAssociationRepository<ShoppingListItemModel, ShoppingListItemDto>;
  shoppingListItemValidator: IValidator<ShoppingListItemDto>;

  constructor(
    @inject(TYPES.IShoppingListItemRepository)
    shoppingListRepository: IAssociationRepository<ShoppingListItemModel, ShoppingListItemDto>,
    @inject(TYPES.IShoppingListItemValidator) shoppingListValidator: IValidator<ShoppingListItemDto>
  ) {
    this.shoppingListItemRepository = shoppingListRepository;
    this.shoppingListItemValidator = shoppingListValidator;
  }

  async getAll(shoppingListId: number): Promise<ServiceResult<ShoppingListItemModel[]>> {
    const result = await this.shoppingListItemRepository.getAll(shoppingListId);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async get(shoppingListId: number, itemId: number): Promise<ServiceResult<ShoppingListItemModel>> {
    const result = await this.shoppingListItemRepository.get(shoppingListId, itemId);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async create(
    shoppingListId: number,
    itemId: number | null,
    data: ShoppingListItemDto
  ): Promise<ServiceResult<ShoppingListItemModel>> {
    const validationResult = this.shoppingListItemValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.shoppingListItemRepository.create(shoppingListId, itemId, data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async update(
    shoppingListId: number,
    itemId: number,
    data: ShoppingListItemDto
  ): Promise<ServiceResult<ShoppingListItemModel>> {
    const validationResult = this.shoppingListItemValidator.validate(data);

    if (!validationResult.success) {
      return validationResult;
    }

    const result = await this.shoppingListItemRepository.update(shoppingListId, itemId, data);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async delete(shoppingListId: number | null, itemId: number | null): Promise<ServiceResult<boolean>> {
    const result = await this.shoppingListItemRepository.delete(shoppingListId, itemId);

    if (!result.success) {
      return result;
    }

    return success(true);
  }
}
