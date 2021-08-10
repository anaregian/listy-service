import {
  ShoppingListItemCreateRequestData,
  ShoppingListItemDeleteRequestData,
  ShoppingListItemUpdateRequestData
} from "@app/ShoppingListItem/data";
import { IAssociationRepository } from "@common/associationRepository";
import { ConflictError, NotFound, PrismaErrorCodes } from "@common/exceptions";
import { DBService } from "@persistency/dbService";
import { Prisma } from "@prisma/client";
import { injectable } from "inversify";

const name = "Shopping list Item";

@injectable()
export class ShoppingListItemRepository implements IAssociationRepository {
  private readonly db: DBService;

  constructor(db: DBService) {
    this.db = db;
  }

  async create(data: ShoppingListItemCreateRequestData) {
    try {
      await this.db.shoppingListItem.create({
        data: {
          bought: false,
          note: data.note,
          quantity: data.quantity,
          shoppingList: { connect: { id: data.shoppingListId } },
          item: { ...(data.item.id ? { connect: { id: data.item.id } } : { create: { name: data.item.name! } }) }
        }
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

  async update(data: ShoppingListItemUpdateRequestData) {
    try {
      await this.db.shoppingListItem.update({
        where: { id: data.id },
        data: {
          bought: data.bought,
          note: data.note,
          quantity: data.quantity,
          item: { update: { name: data.item.name } }
        }
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCodes.RecordNotFound || e.code === PrismaErrorCodes.QueryInterpretationError) {
          throw new NotFound(name);
        }
        if (e.code === PrismaErrorCodes.UniqueConstraintViolation) {
          throw new ConflictError(name);
        }
      }
      throw new Error();
    }
  }

  async delete(data: ShoppingListItemDeleteRequestData) {
    try {
      if (data.id) {
        await this.db.shoppingListItem.delete({ where: { id: data.id } });
        return;
      }

      if (data.shoppingListId) {
        await this.db.shoppingListItem.deleteMany({ where: { shoppingListId: data.shoppingListId } });
        return;
      }

      if (data.itemId) {
        await this.db.shoppingListItem.deleteMany({ where: { itemId: data.itemId } });
        return;
      }
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
