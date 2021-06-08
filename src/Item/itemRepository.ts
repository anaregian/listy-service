import { Item } from ".prisma/client";
import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { ErrorCodes } from "../common/errorCodes";
import { error, ServiceResult, success } from "../common/ServiceResult";
import { IRepository } from "./../common/repository";
import { DBService } from "./../persistency/dbService";
import { ItemDto } from "./itemDto";

@injectable()
export class ItemRepository implements IRepository<Item, ItemDto> {
  constructor(private readonly db: DBService) {}

  async getAll(): Promise<ServiceResult<Item[]>> {
    const items = await this.db.item.findMany({ include: { category: true } });
    return success(items);
  }

  async get(id: number): Promise<ServiceResult<Item>> {
    const item = await this.db.item.findFirst({ where: { id }, include: { category: true } });

    if (item == null) {
      return error("", "Item does not exist");
    }

    return success(item);
  }

  async create(data: ItemDto): Promise<ServiceResult<Item>> {
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
        include: { category: true }
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

  async update(id: number, data: ItemDto): Promise<ServiceResult<Item>> {
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
        include: { category: true }
      });

      return success(item);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Item not found");
        }
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return { success: false, attribute: "name", message: "Item already exists" };
        }
      }
    }
    return error("", "Unexpected error");
  }

  async delete(id: number): Promise<ServiceResult<Item>> {
    try {
      const item = await this.db.item.delete({ where: { id } });
      return success(item);
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
