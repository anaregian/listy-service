import { ItemCreateRequestData, ItemDeleteRequestData, ItemUpdateRequestData } from "@app/Item/data";
import { ItemModel } from "@app/Item/itemModel";
import { ConflictError, NotFound, PrismaErrorCodes } from "@common/exceptions";
import { IRepository } from "@common/repository";
import { DBService } from "@persistency/dbService";
import { Prisma } from "@prisma/client";
import { injectable } from "inversify";

const name = "Item";
const includeOptions = {
  category: true,
  shoppingListItems: { include: { shoppingList: true } },
  vendorItemPrices: { include: { vendor: true, unit: true } }
};

@injectable()
export class ItemRepository implements IRepository<ItemModel> {
  private readonly db: DBService;

  constructor(db: DBService) {
    this.db = db;
  }

  async getAll() {
    return await this.db.item.findMany({ include: includeOptions });
  }

  async get(id: number) {
    const item = await this.db.item.findFirst({ where: { id }, include: includeOptions });

    if (item == null) {
      throw new NotFound(name);
    }

    return item;
  }

  async create(data: ItemCreateRequestData) {
    try {
      return await this.db.item.create({
        data: { name: data.name, ...(data.categoryId && { category: { connect: { id: data.categoryId } } }) },
        include: includeOptions
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCodes.UniqueConstraintViolation) {
          throw new ConflictError(name);
        }
      }

      throw new Error();
    }
  }

  async update(data: ItemUpdateRequestData) {
    try {
      return await this.db.item.update({
        where: { id: data.id },
        data: {
          name: data.name,
          category: {
            ...(data.categoryId ? { connect: { id: data.categoryId } } : { disconnect: true })
          }
        },
        include: includeOptions
      });
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

  async delete(data: ItemDeleteRequestData) {
    try {
      await this.db.item.delete({ where: { id: data.id } });
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
