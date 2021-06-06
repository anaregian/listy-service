import { inject, injectable } from "inversify";
import { ShoppingList } from ".prisma/client";

import { IShoppingListRepository } from "./ShoppingListRepository";
import { ShoppingListDto } from "./dto/shoppingListDto";
import { TYPES } from "./../modules/types";

export interface IShoppingListService {
  getAll: () => Promise<ShoppingList[]>;
  get: (id: number) => Promise<ShoppingList | null>;
  create: (data: ShoppingListDto) => Promise<ShoppingList>;
  update: (id: number, data: ShoppingListDto) => Promise<ShoppingList>;
  delete: (id: number) => Promise<ShoppingList>;
}

@injectable()
export class ShoppingListService implements IShoppingListService {
  private shoppingListRepository: IShoppingListRepository;

  constructor(@inject(TYPES.IShoppingListRepository) shoppingListRepository: IShoppingListRepository) {
    this.shoppingListRepository = shoppingListRepository;
  }

  async getAll() {
    return await this.shoppingListRepository.getAll();
  }
  async get(id: number) {
    return await this.shoppingListRepository.get(id);
  }

  async create(data: ShoppingListDto) {
    return await this.shoppingListRepository.create(data);
  }

  async update(id: number, data: ShoppingListDto) {
    return await this.shoppingListRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.shoppingListRepository.delete(id);
  }
}
