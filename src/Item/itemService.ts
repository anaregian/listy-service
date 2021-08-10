import {
  ItemCreateRequestData,
  ItemDeleteRequestData,
  ItemResponseData,
  ItemShowRequestData,
  ItemUpdateRequestData
} from "@app/Item/data";
import { ItemModel } from "@app/Item/itemModel";
import { IAssociationRepository } from "@common/associationRepository";
import { IRepository } from "@common/repository";
import { IService } from "@common/service";
import { TYPES } from "@modules/types";
import { inject, injectable } from "inversify";

@injectable()
export class ItemService implements IService<ItemResponseData> {
  itemRepository: IRepository<ItemModel>;
  shoppingListItemRepository: IAssociationRepository;
  vendorItemPriceRepository: IAssociationRepository;

  constructor(
    @inject(TYPES.IItemRepository) itemRepository: IRepository<ItemModel>,
    @inject(TYPES.IShoppingListItemRepository)
    shoppingListItemRepository: IAssociationRepository,
    @inject(TYPES.IVendorItemPriceRepository)
    vendorItemPriceRepository: IAssociationRepository
  ) {
    this.itemRepository = itemRepository;
    this.shoppingListItemRepository = shoppingListItemRepository;
    this.vendorItemPriceRepository = vendorItemPriceRepository;
  }

  async getAll() {
    const items = await this.itemRepository.getAll();
    return ItemResponseData.fromMany(items);
  }

  async get(data: ItemShowRequestData) {
    const item = await this.itemRepository.get(data.id);
    return ItemResponseData.from(item);
  }

  async create(data: ItemCreateRequestData) {
    const item = await this.itemRepository.create(data);
    return ItemResponseData.from(item);
  }

  async update(data: ItemUpdateRequestData) {
    const item = await this.itemRepository.update(data);
    return ItemResponseData.from(item);
  }

  async delete(data: ItemDeleteRequestData) {
    await this.shoppingListItemRepository.delete({ itemId: data.id });
    await this.vendorItemPriceRepository.delete({ itemId: data.id });
    await this.itemRepository.delete(data);
  }
}
