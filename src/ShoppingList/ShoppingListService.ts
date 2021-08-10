import {
  ShoppingListCreateRequestData,
  ShoppingListDeleteRequestData,
  ShoppingListResponseData,
  ShoppingListShowRequestData,
  ShoppingListUpdateRequestData
} from "@app/ShoppingList/data";
import { ShoppingListModel } from "@app/ShoppingList/shoppingListModel";
import { IAssociationRepository } from "@common/associationRepository";
import { IRepository } from "@common/repository";
import { IService } from "@common/service";
import { TYPES } from "@modules/types";
import { inject, injectable } from "inversify";

@injectable()
export class ShoppingListService implements IService<ShoppingListResponseData> {
  shoppingListRepository: IRepository<ShoppingListModel>;
  shoppingListItemRepository: IAssociationRepository;

  constructor(
    @inject(TYPES.IShoppingListRepository) shoppingListRepository: IRepository<ShoppingListModel>,
    @inject(TYPES.IShoppingListItemRepository)
    shoppingListItemRepository: IAssociationRepository
  ) {
    this.shoppingListRepository = shoppingListRepository;
    this.shoppingListItemRepository = shoppingListItemRepository;
  }

  async getAll() {
    const shoppingLists = await this.shoppingListRepository.getAll();
    return ShoppingListResponseData.fromMany(shoppingLists);
  }

  async get(data: ShoppingListShowRequestData) {
    const shoppingList = await this.shoppingListRepository.get(data.id);
    return ShoppingListResponseData.from(shoppingList);
  }

  async create(data: ShoppingListCreateRequestData) {
    const shoppingList = await this.shoppingListRepository.create(data);
    return ShoppingListResponseData.from(shoppingList);
  }

  async update(data: ShoppingListUpdateRequestData) {
    const shoppingList = await this.shoppingListRepository.update(data);
    return ShoppingListResponseData.from(shoppingList);
  }

  async delete(data: ShoppingListDeleteRequestData) {
    await this.shoppingListItemRepository.delete({ shoppingListId: data.id });
    await this.shoppingListRepository.delete(data);
  }
}
