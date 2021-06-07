import { Prisma, ShoppingList } from ".prisma/client";
import { injectable } from "inversify";
import { ErrorCodes } from "../common/errorCodes";
import { error, ServiceResult, success } from "../common/ServiceResult";
import { DBService } from "../persistency/dbService";
import { IRepository } from "./../common/repository";
import { ShoppingListDto } from "./shoppingListDto";

@injectable()
export class ShoppingListRepository implements IRepository<ShoppingList, ShoppingListDto> {
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
          return error("name", "Shopping list already exists");
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
          return { success: false, attribute: "name", message: "Shopping list already exists" };
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
