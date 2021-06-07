import { Prisma, ShoppingList } from ".prisma/client";
import { injectable } from "inversify";

import { ServiceResult, success, error } from "../common/ServiceResult";
import { ErrorCodes } from "../common/errorCodes";
import { DBService } from "../persistency/dbService";
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
    return success(shoppingLists);
  }

  async get(id: number): Promise<ServiceResult<ShoppingList>> {
    const shoppingList = await this.db.shoppingList.findFirst({ where: { id } });

    if (shoppingList == null) {
      return error("", "Shopping list does not exist");
    }

    return success(shoppingList);
  }

  async create(data: ShoppingListDto): Promise<ServiceResult<ShoppingList>> {
    try {
      const shoppingList = await this.db.shoppingList.create({ data });
      return success(shoppingList);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("name", "Name already exists");
        }
      }

      return error("", "Unexpected error");
    }
  }

  async update(id: number, data: ShoppingListDto): Promise<ServiceResult<ShoppingList>> {
    try {
      const shoppingList = await this.db.shoppingList.update({ where: { id }, data });
      return success(shoppingList);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Shopping list not found");
        }
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return { success: false, attribute: "name", message: "Name already exists" };
        }
      }
    }
    return error("", "Unexpected error");
  }

  async delete(id: number): Promise<ServiceResult<ShoppingList>> {
    try {
      const shoppingList = await this.db.shoppingList.delete({ where: { id } });
      return success(shoppingList);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Shopping list not found");
        }
      }
      return error("", "Unexpected error");
    }
  }
}
