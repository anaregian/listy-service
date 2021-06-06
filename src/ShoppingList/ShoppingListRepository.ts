import { ShoppingList } from ".prisma/client";
import { injectable } from "inversify";

import { DBService } from "./../data/dbService";
import { ShoppingListDto } from "./dto/shoppingListDto";

export interface IShoppingListRepository {
  getAll: () => Promise<ShoppingList[]>;
  get: (id: number) => Promise<ShoppingList | null>;
  create: (data: ShoppingListDto) => Promise<ShoppingList>;
  update: (id: number, data: ShoppingListDto) => Promise<ShoppingList>;
  delete: (id: number) => Promise<ShoppingList>;
}

@injectable()
export class ShoppingListRepository implements IShoppingListRepository {
  constructor(private readonly db: DBService) {}

  async getAll() {
    return await this.db.shoppingList.findMany();
  }

  async get(id: number) {
    return await this.db.shoppingList.findFirst({ where: { id } });
  }

  async create(data: ShoppingListDto) {
    return await this.db.shoppingList.create({ data });
  }

  async update(id: number, data: ShoppingListDto) {
    return await this.db.shoppingList.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.db.shoppingList.delete({ where: { id } });
  }
}
