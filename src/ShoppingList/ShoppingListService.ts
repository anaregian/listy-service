import { inject, injectable } from "inversify";
import { ServiceResult, success } from "../common/serviceResult";
import { IValidator } from "../common/validator";
import { TYPES } from "../modules/types";
import { ShoppingListItemDto } from "../ShoppingListItem/shoppingListItemDto";
import { ShoppingListItemModel } from "../ShoppingListItem/shoppingListItemModel";
import { IAssociationRepository } from "./../common/associationRepository";
import { IRepository } from "./../common/repository";
import { IService } from "./../common/service";
import { ShoppingListDto } from "./shoppingListDto";
import { ShoppingListModel } from "./shoppingListModel";

@injectable()
export class ShoppingListService implements IService<ShoppingListModel, ShoppingListDto> {
  shoppingListRepository: IRepository<ShoppingListModel, ShoppingListDto>;
  shoppingListItemRepository: IAssociationRepository<ShoppingListItemModel, ShoppingListItemDto>;
  shoppingListValidator: IValidator<ShoppingListDto>;

  constructor(
    @inject(TYPES.IShoppingListRepository) shoppingListRepository: IRepository<ShoppingListModel, ShoppingListDto>,
    @inject(TYPES.IShoppingListItemRepository)
    shoppingListItemRepository: IAssociationRepository<ShoppingListItemModel, ShoppingListItemDto>,
    @inject(TYPES.IShoppingListValidator) shoppingListValidator: IValidator<ShoppingListDto>
  ) {
    this.shoppingListRepository = shoppingListRepository;
    this.shoppingListItemRepository = shoppingListItemRepository;
    this.shoppingListValidator = shoppingListValidator;
  }

  async getAll(): Promise<ServiceResult<ShoppingListModel[]>> {
    const result = await this.shoppingListRepository.getAll();

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async get(id: number): Promise<ServiceResult<ShoppingListModel>> {
    const result = await this.shoppingListRepository.get(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async create(data: ShoppingListDto): Promise<ServiceResult<ShoppingListModel>> {
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

  async update(id: number, data: ShoppingListDto): Promise<ServiceResult<ShoppingListModel>> {
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

  async delete(id: number): Promise<ServiceResult<boolean>> {
    const associationResult = await this.shoppingListItemRepository.delete(id, null);

    if (!associationResult.success) {
      return associationResult;
    }

    const result = await this.shoppingListRepository.delete(id);

    if (!result.success) {
      return result;
    }

    return success(true);
  }
}
