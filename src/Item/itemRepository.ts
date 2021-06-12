import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { ErrorCodes } from "../common/errorCodes";
import { error, ServiceResult, success } from "../common/serviceResult";
import { IRepository } from "./../common/repository";
import { DBService } from "./../persistency/dbService";
import { ItemDto } from "./itemDto";
import { ItemModel } from "./itemModel";

@injectable()
export class ItemRepository implements IRepository<ItemModel, ItemDto> {
  constructor(private readonly db: DBService) {}

  async getAll(): Promise<ServiceResult<ItemModel[]>> {
    const items = await this.db.item.findMany({
      include: { category: true, shoppingListItems: true, vendorItemPrices: true }
    });
    return success(items);
  }

  async get(id: number): Promise<ServiceResult<ItemModel>> {
    const item = await this.db.item.findFirst({
      where: { id },
      include: { category: true, shoppingListItems: true, vendorItemPrices: true }
    });

    if (item == null) {
      return error("", "Item does not exist");
    }

    return success(item);
  }

  async create(data: ItemDto): Promise<ServiceResult<ItemModel>> {
    try {
      const item = await this.db.item.create({
        data: {
          name: data.name,
          ...(data.categoryId && {
            category: {
              connect: {
                id: data.categoryId
              }
            }
          })
        },
        include: { category: true, shoppingListItems: true, vendorItemPrices: true }
      });

      return success(item);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("name", "Item already exists");
        }
      }

      return error("", "Unexpected error");
    }
  }

  async update(id: number, data: ItemDto): Promise<ServiceResult<ItemModel>> {
    try {
      const item = await this.db.item.update({
        where: { id },
        data: {
          name: data.name,
          category: {
            ...(data.categoryId
              ? {
                  connect: {
                    id: data.categoryId
                  }
                }
              : {
                  disconnect: true
                })
          }
        },
        include: { category: true, shoppingListItems: true, vendorItemPrices: true }
      });

      return success(item);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Item not found");
        }
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("name", "Item already exists");
        }
      }
    }
    return error("", "Unexpected error");
  }

  async delete(id: number): Promise<ServiceResult<boolean>> {
    try {
      await this.db.item.delete({ where: { id } });
      return success(true);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Item not found");
        }
      }
      return error("", "Unexpected error");
    }
  }
}
