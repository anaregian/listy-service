import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { ErrorCodes } from "../common/errorCodes";
import { error, ServiceResult, success } from "../common/serviceResult";
import { DBService } from "../persistency/dbService";
import { IRepository } from "./../common/repository";
import { ShoppingListDto } from "./shoppingListDto";
import { ShoppingListModel } from "./shoppingListModel";

@injectable()
export class ShoppingListRepository implements IRepository<ShoppingListModel, ShoppingListDto> {
  constructor(private readonly db: DBService) {}

  async getAll(): Promise<ServiceResult<ShoppingListModel[]>> {
    const shoppingLists = await this.db.shoppingList.findMany({ include: { shoppingListItems: true } });
    return success(shoppingLists);
  }

  async get(id: number): Promise<ServiceResult<ShoppingListModel>> {
    const shoppingList = await this.db.shoppingList.findFirst({ where: { id }, include: { shoppingListItems: true } });

    if (shoppingList == null) {
      return error("", "Shopping list does not exist");
    }

    return success(shoppingList);
  }

  async create(data: ShoppingListDto): Promise<ServiceResult<ShoppingListModel>> {
    try {
      const shoppingList = await this.db.shoppingList.create({ data, include: { shoppingListItems: true } });
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

  async update(id: number, data: ShoppingListDto): Promise<ServiceResult<ShoppingListModel>> {
    try {
      const shoppingList = await this.db.shoppingList.update({
        where: { id },
        data,
        include: { shoppingListItems: true }
      });
      return success(shoppingList);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Shopping list not found");
        }
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("name", "Shopping list already exists");
        }
      }
    }
    return error("", "Unexpected error");
  }

  async delete(id: number): Promise<ServiceResult<boolean>> {
    try {
      await this.db.shoppingList.delete({ where: { id } });
      return success(true);
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
