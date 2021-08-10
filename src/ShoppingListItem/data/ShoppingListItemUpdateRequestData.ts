import { ValidationError } from "@common/exceptions";

interface Body {
  id: string;
  shoppingListId: string;
  bought: string;
  note: string;
  quantity: string;
  itemName?: string;
}

export class ShoppingListItemUpdateRequestData {
  public readonly id: number;
  public readonly shoppingListId: number;
  public readonly bought: boolean;
  public readonly note: string;
  public readonly quantity: number;
  public readonly item: { name?: string };

  constructor(id: number, shoppingListId: number, bought = false, note = "", quantity = 0, itemName?: string) {
    this.id = id;
    this.shoppingListId = shoppingListId;
    this.bought = bought;
    this.note = note;
    this.quantity = quantity;
    this.item = {
      name: itemName
    };
  }

  static from(body: Partial<Body>) {
    if (!body.id) {
      throw new ValidationError("missing id property", "id");
    }

    if (!/^\d+$/.test(body.id)) {
      throw new ValidationError("Id should be a number", "id");
    }

    if (!body.shoppingListId) {
      throw new ValidationError("missing id property", "id");
    }

    if (!/^\d+$/.test(body.shoppingListId)) {
      throw new ValidationError("Id should be a number", "id");
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

    return new ShoppingListItemUpdateRequestData(
      parseInt(body.id),
      parseInt(body.shoppingListId),
      !!body.bought,
      body.note,
      body.quantity ? parseInt(body.quantity) : 0,
      body.itemName
    );
  }
}
