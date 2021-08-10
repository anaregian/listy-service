import { ValidationError } from "@common/exceptions";

interface Body {
  id: string;
  name: string;
}

export class ShoppingListUpdateRequestData {
  public readonly id: number;
  public readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static from(body: Partial<Body>) {
    if (!body.id) {
      throw new ValidationError("missing id property", "id");
    }

    if (!/^\d+$/.test(body.id)) {
      throw new ValidationError("Id should be a number", "id");
    }

    if (!body.name) {
      throw new ValidationError("The item name cannot be empty", "name");
    }

    if (body.name.length > 255) {
      throw new ValidationError("The item name cannot be more than 255 characters", "name");
    }

    return new ShoppingListUpdateRequestData(parseInt(body.id), body.name);
  }
}
