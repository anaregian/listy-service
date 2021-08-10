import { ValidationError } from "@common/exceptions";

interface Body {
  id: string;
  shoppingListId: string;
  itemId: string;
}

export class ShoppingListItemDeleteRequestData {
  public readonly id?: number;
  public readonly shoppingListId?: number;
  public readonly itemId?: number;

  constructor(id?: number, shoppingListId?: number, itemId?: number) {
    this.id = id;
    this.shoppingListId = shoppingListId;
    this.itemId = itemId;
  }

  static from(body: Partial<Body>) {
    if (!body.id && !body.shoppingListId && !body.itemId) {
      throw new ValidationError("No id found", "id");
    }

    if (body.id && !/^\d+$/.test(body.id)) {
      throw new ValidationError("Id should be a number", "id");
    }

    if (body.shoppingListId && !/^\d+$/.test(body.shoppingListId)) {
      throw new ValidationError("Id should be a number", "id");
    }

    if (body.itemId && !/^\d+$/.test(body.itemId)) {
      throw new ValidationError("Id should be a number", "id");
    }

    return new ShoppingListItemDeleteRequestData(
      body.id ? parseInt(body.id) : undefined,
      body.shoppingListId ? parseInt(body.shoppingListId) : undefined,
      body.itemId ? parseInt(body.itemId) : undefined
    );
  }
}
