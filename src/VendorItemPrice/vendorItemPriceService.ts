import { ItemResponseData } from "@app/Item/data";
import { ItemModel } from "@app/Item/itemModel";
import {
  VendorItemPriceCreateRequestData,
  VendorItemPriceDeleteRequestData,
  VendorItemPriceUpdateRequestData
} from "@app/VendorItemPrice/data";
import { IAssociationRepository } from "@common/associationRepository";
import { IAssociationService } from "@common/associationService";
import { IRepository } from "@common/repository";
import { TYPES } from "@modules/types";
import { inject, injectable } from "inversify";

@injectable()
export class VendorItemPriceService implements IAssociationService<ItemResponseData> {
  vendorItemPriceRepository: IAssociationRepository;
  itemRepository: IRepository<ItemModel>;

  constructor(
    @inject(TYPES.IVendorItemPriceRepository)
    vendorItemPriceRepository: IAssociationRepository,
    @inject(TYPES.IItemRepository)
    itemRepository: IRepository<ItemModel>
  ) {
    this.vendorItemPriceRepository = vendorItemPriceRepository;
    this.itemRepository = itemRepository;
  }

  async create(data: VendorItemPriceCreateRequestData) {
    await this.vendorItemPriceRepository.create(data);
    const item = await this.itemRepository.get(data.itemId);
    return ItemResponseData.from(item);
  }

  async update(data: VendorItemPriceUpdateRequestData) {
    await this.vendorItemPriceRepository.update(data);
    const item = await this.itemRepository.get(data.itemId);
    return ItemResponseData.from(item);
  }

  async delete(data: VendorItemPriceDeleteRequestData) {
    await this.vendorItemPriceRepository.delete(data);
  }
}
