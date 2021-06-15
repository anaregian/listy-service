import { Prisma } from "../../prisma/client";
import { injectable } from "inversify";
import { ErrorCodes } from "../common/errorCodes";
import { error, ServiceResult, success } from "../common/serviceResult";
import { IAssociationRepository } from "./../common/associationRepository";
import { DBService } from "./../persistency/dbService";
import { ShoppingListItemDto } from "./shoppingListItemDto";
import { ShoppingListItemModel } from "./shoppingListItemModel";

@injectable()
export class ShoppingListItemRepository implements IAssociationRepository<ShoppingListItemModel, ShoppingListItemDto> {
  constructor(private readonly db: DBService) {}

  async getAll(shoppingListId: number): Promise<ServiceResult<ShoppingListItemModel[]>> {
    const shoppingListItems = await this.db.shoppingListItem.findMany({
      where: { shoppingListId },
      include: { shoppingList: true, item: true }
    });
    return success(shoppingListItems);
  }

  async get(shoppingListId: number, itemId: number): Promise<ServiceResult<ShoppingListItemModel>> {
    const shoppingListItem = await this.db.shoppingListItem.findFirst({
      where: { shoppingListId, itemId },
      include: { shoppingList: true, item: true }
    });

    if (shoppingListItem == null) {
      return error("", "Shopping list item does not exist");
    }

    return success(shoppingListItem);
  }

  async create(
    shoppingListId: number,
    itemId: number | null,
    data: ShoppingListItemDto
  ): Promise<ServiceResult<ShoppingListItemModel>> {
    try {
      const shoppingListItem = await this.db.shoppingListItem.create({
        data: {
          bought: false,
          note: data.note,
          quantity: data.quantity,
          shoppingList: {
            connect: {
              id: shoppingListId
            }
          },
          item: {
            ...(itemId
              ? {
                  connect: {
                    id: itemId
                  }
                }
              : {
                  create: {
                    name: data.itemName!
                  }
                })
          }
        },
        include: { shoppingList: true, item: true }
      });
      return success(shoppingListItem);
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("", "Shopping list item already exists");
        }
      }

      return error("", "Unexpected error");
    }
  }

  async update(
    shoppingListId: number,
    itemId: number,
    data: ShoppingListItemDto
  ): Promise<ServiceResult<ShoppingListItemModel>> {
    try {
      const shoppingListItem = await this.db.shoppingListItem.update({
        where: { itemId_shoppingListId: { shoppingListId, itemId } },
        data: {
          bought: data.bought,
          note: data.note,
          quantity: data.quantity,
          ...(shoppingListId && {
            shoppingList: {
              connect: {
                id: shoppingListId
              }
            }
          }),
          ...(itemId && {
            item: {
              connect: {
                id: itemId
              }
            }
          })
        },
        include: { shoppingList: true, item: true }
      });
      return success(shoppingListItem);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Shopping list item not found");
        }
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("", "Shopping list item already exists");
        }
      }
    }
    return error("", "Unexpected error");
  }

  async delete(shoppingListId: number | null, itemId: number | null): Promise<ServiceResult<boolean>> {
    try {
      if (!shoppingListId && itemId) {
        await this.db.shoppingListItem.deleteMany({ where: { itemId } });

        return success(true);
      }

      if (shoppingListId && !itemId) {
        await this.db.shoppingListItem.deleteMany({ where: { shoppingListId } });

        return success(true);
      }

      if (shoppingListId && itemId) {
        await this.db.shoppingListItem.delete({
          where: { itemId_shoppingListId: { shoppingListId, itemId } }
        });
        return success(true);
      }

      return error("", "both ids are null");
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Shopping list item not found");
        }
      }
      return error("", "Unexpected error");
    }
  }
}
