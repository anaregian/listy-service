import { ValidationError } from "@common/exceptions";

interface Body {
  shoppingListId: string;
  bought: string;
  note: string;
  quantity: string;
  itemId?: string;
  itemName?: string;
}

export class ShoppingListItemCreateRequestData {
  public readonly shoppingListId: number;
  public readonly bought: boolean;
  public readonly note: string;
  public readonly quantity: number;
  public readonly item: { id?: number; name?: string };

  constructor(shoppingListId: number, bought = false, note = "", quantity = 0, itemId?: number, itemName?: string) {
    this.shoppingListId = shoppingListId;
    this.bought = bought;
    this.note = note;
    this.quantity = quantity;
    this.item = {
      id: itemId,
      name: itemName
    };
  }

  static from(body: Partial<Body>) {
    if (!body.shoppingListId) {
      throw new ValidationError("missing shoppingListId property", "ishoppingListIdd");
    }

    if (!/^\d+$/.test(body.shoppingListId)) {
      throw new ValidationError("shoppingListId should be a number", "shoppingListId");
    }

    if (body.quantity && parseInt(body.quantity) < 0) {
      throw new ValidationError("The shopping list item quantity cannot be less than 0", "quantity");
    }

    if (body.note && body.note.length > 255) {
      throw new ValidationError("name", "The shopping list item note cannot be more than 255 characters");
    }

    if (body.itemName && body.itemName.length > 255) {
      throw new ValidationError("The item name cannot be more than 255 characters", "name");
    }

    if (!body.itemId && !body.itemName) {
      throw new ValidationError("Item id or item name required");
    }

    return new ShoppingListItemCreateRequestData(
      parseInt(body.shoppingListId),
      !!body.bought,
      body.note,
      body.quantity ? parseInt(body.quantity) : 0,
      body.itemId ? parseInt(body.itemId) : undefined,
      body.itemName
    );
  }
}
