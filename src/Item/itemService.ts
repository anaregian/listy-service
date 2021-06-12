import { inject, injectable } from "inversify";
import { IAssociationRepository } from "../common/associationRepository";
import { ServiceResult, success } from "../common/serviceResult";
import { IValidator } from "../common/validator";
import { TYPES } from "../modules/types";
import { ShoppingListItemDto } from "../ShoppingListItem/shoppingListItemDto";
import { ShoppingListItemModel } from "../ShoppingListItem/shoppingListItemModel";
import { VendorItemPriceDto } from "../VendorItemPrice/vendorItemPriceDto";
import { VendorItemPriceModel } from "../VendorItemPrice/vendorItemPriceModel";
import { IRepository } from "./../common/repository";
import { IService } from "./../common/service";
import { ValidationErrorResult } from "./../common/validationResult";
import { ItemDto } from "./itemDto";
import { ItemModel } from "./itemModel";

@injectable()
export class ItemService implements IService<ItemModel, ItemDto> {
  itemRepository: IRepository<ItemModel, ItemDto>;
  shoppingListItemRepository: IAssociationRepository<ShoppingListItemModel, ShoppingListItemDto>;
  vendorItemPriceRepository: IAssociationRepository<VendorItemPriceModel, VendorItemPriceDto>;
  itemValidator: IValidator<ItemDto>;

  constructor(
    @inject(TYPES.IItemRepository) itemRepository: IRepository<ItemModel, ItemDto>,
    @inject(TYPES.IShoppingListItemRepository)
    shoppingListItemRepository: IAssociationRepository<ShoppingListItemModel, ShoppingListItemDto>,
    @inject(TYPES.IVendorItemPriceRepository)
    vendorItemPriceRepository: IAssociationRepository<VendorItemPriceModel, VendorItemPriceDto>,
    @inject(TYPES.IItemValidator) itemValidator: IValidator<ItemDto>
  ) {
    this.itemRepository = itemRepository;
    this.shoppingListItemRepository = shoppingListItemRepository;
    this.vendorItemPriceRepository = vendorItemPriceRepository;
    this.itemValidator = itemValidator;
  }

  async getAll(): Promise<ServiceResult<ItemModel[]>> {
    const result = await this.itemRepository.getAll();

    if (!result.success) {
      const errorResult = result as ValidationErrorResult;
      return errorResult;
    }

    return success(result.data);
  }

  async get(id: number): Promise<ServiceResult<ItemModel>> {
    const result = await this.itemRepository.get(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }

  async create(data: ItemDto): Promise<ServiceResult<ItemModel>> {
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

  async update(id: number, data: ItemDto): Promise<ServiceResult<ItemModel>> {
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

  async delete(id: number): Promise<ServiceResult<boolean>> {
    const shoppingListAssociationResult = await this.shoppingListItemRepository.delete(null, id);

    if (!shoppingListAssociationResult.success) {
      return shoppingListAssociationResult;
    }

    const vendorItemAssociationResult = await this.vendorItemPriceRepository.delete(id, null);

    if (!vendorItemAssociationResult.success) {
      return vendorItemAssociationResult;
    }

    const result = await this.itemRepository.delete(id);

    if (!result.success) {
      return result;
    }

    return success(result.data);
  }
}
