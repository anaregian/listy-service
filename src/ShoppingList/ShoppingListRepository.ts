import {
  ShoppingListCreateRequestData,
  ShoppingListDeleteRequestData,
  ShoppingListResponseData,
  ShoppingListUpdateRequestData
} from "@app/ShoppingList/data";
import { ConflictError, NotFound, PrismaErrorCodes } from "@common/exceptions";
import { IRepository } from "@common/repository";
import { DBService } from "@persistency/dbService";
import { Prisma } from "@prisma/client";
import { injectable } from "inversify";

const name = "Shopping list";
const includeOptions = { shoppingListItems: { include: { item: { include: { category: true } } } } };

@injectable()
export class ShoppingListRepository implements IRepository<ShoppingListResponseData> {
  private readonly db: DBService;

  constructor(db: DBService) {
    this.db = db;
  }

  async getAll() {
    return await this.db.shoppingList.findMany({ include: includeOptions });
  }

  async get(id: number) {
    const shoppingList = await this.db.shoppingList.findFirst({ where: { id }, include: includeOptions });

    if (shoppingList == null) {
      throw new NotFound(name);
    }

    return shoppingList;
  }

  async create(data: ShoppingListCreateRequestData) {
    try {
      return await this.db.shoppingList.create({ data, include: includeOptions });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCodes.UniqueConstraintViolation) {
          throw new ConflictError(name);
        }
      }

      throw new Error();
    }
  }

  async update(data: ShoppingListUpdateRequestData) {
    try {
      return await this.db.shoppingList.update({ where: { id: data.id }, data, include: includeOptions });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCodes.RecordNotFound) {
          throw new NotFound(name);
        }
        if (e.code === PrismaErrorCodes.UniqueConstraintViolation) {
          throw new ConflictError(name);
        }
      }
    }

    throw new Error();
  }

  async delete(data: ShoppingListDeleteRequestData) {
    try {
      await this.db.shoppingList.delete({ where: { id: data.id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCodes.RecordNotFound) {
          throw new NotFound(name);
        }
      }

      throw new Error();
    }
  }
}
