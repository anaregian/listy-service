import { ShoppingListResponseData } from "@app/ShoppingList/data";
import { ShoppingListModel } from "@app/ShoppingList/shoppingListModel";
import {
  ShoppingListItemCreateRequestData,
  ShoppingListItemDeleteRequestData,
  ShoppingListItemUpdateRequestData
} from "@app/ShoppingListItem/data";
import { IAssociationRepository } from "@common/associationRepository";
import { IAssociationService } from "@common/associationService";
import { IRepository } from "@common/repository";
import { TYPES } from "@modules/types";
import { inject, injectable } from "inversify";

@injectable()
export class ShoppingListItemService implements IAssociationService<ShoppingListResponseData> {
  shoppingListItemRepository: IAssociationRepository;
  shoppingListRepository: IRepository<ShoppingListModel>;

  constructor(
    @inject(TYPES.IShoppingListItemRepository)
    shoppingListItemRepository: IAssociationRepository,
    @inject(TYPES.IShoppingListRepository)
    shoppingListRepository: IRepository<ShoppingListModel>
  ) {
    this.shoppingListItemRepository = shoppingListItemRepository;
    this.shoppingListRepository = shoppingListRepository;
  }

  async create(data: ShoppingListItemCreateRequestData) {
    await this.shoppingListItemRepository.create(data);
    const shoppingList = await this.shoppingListRepository.get(data.shoppingListId);
    return ShoppingListResponseData.from(shoppingList);
  }

  async update(data: ShoppingListItemUpdateRequestData) {
    await this.shoppingListItemRepository.update(data);
    const shoppingList = await this.shoppingListRepository.get(data.shoppingListId);
    return ShoppingListResponseData.from(shoppingList);
  }

  async delete(data: ShoppingListItemDeleteRequestData) {
    await this.shoppingListItemRepository.delete(data);
  }
}
