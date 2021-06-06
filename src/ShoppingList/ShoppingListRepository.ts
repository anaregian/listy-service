import { Prisma, ShoppingList } from ".prisma/client";
import { injectable } from "inversify";

import { ServiceResult } from "./../common/ServiceResult";
import { ErrorCodes } from "./../common/errorCodes";
import { DBService } from "./../data/dbService";
import { ShoppingListDto } from "./dto/shoppingListDto";

export interface IShoppingListRepository {
  getAll: () => Promise<ServiceResult<ShoppingList[]>>;
  get: (id: number) => Promise<ServiceResult<ShoppingList>>;
  create: (data: ShoppingListDto) => Promise<ServiceResult<ShoppingList>>;
  update: (id: number, data: ShoppingListDto) => Promise<ServiceResult<ShoppingList>>;
  delete: (id: number) => Promise<ServiceResult<ShoppingList>>;
}

@injectable()
export class ShoppingListRepository implements IShoppingListRepository {
  constructor(private readonly db: DBService) {}

  async getAll(): Promise<ServiceResult<ShoppingList[]>> {
    const shoppingLists = await this.db.shoppingList.findMany();
    return { success: true, data: shoppingLists };
  }

  async get(id: number): Promise<ServiceResult<ShoppingList>> {
    const shoppingList = await this.db.shoppingList.findFirst({ where: { id } });

    if (shoppingList == null) {
      return { success: false, message: "Shopping list does not exist" };
    }

    return { success: true, data: shoppingList };
  }

  async create(data: ShoppingListDto): Promise<ServiceResult<ShoppingList>> {
    try {
      const shoppingList = await this.db.shoppingList.create({ data });
      return { success: true, data: shoppingList };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return { success: false, attribute: "name", message: "Name already exists" };
        }
      }

      return { success: false, message: "Unexpected error" };
    }
  }

  async update(id: number, data: ShoppingListDto): Promise<ServiceResult<ShoppingList>> {
    try {
      const shoppingList = await this.db.shoppingList.update({ where: { id }, data });
      return { success: true, data: shoppingList };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return { success: false, message: "Shopping list not found" };
        }
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return { success: false, attribute: "name", message: "Name already exists" };
        }
      }
    }
    return { success: false, message: "Unexpected error" };
  }

  async delete(id: number): Promise<ServiceResult<ShoppingList>> {
    try {
      const shoppingList = await this.db.shoppingList.delete({ where: { id } });
      return { success: true, data: shoppingList };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return { success: false, message: "Shopping list not found" };
        }
      }
      return { success: false, message: "Unexpected error" };
    }
  }
}
