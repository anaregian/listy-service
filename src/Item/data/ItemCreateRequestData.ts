import { ValidationError } from "@common/exceptions";

interface Body {
  name: string;
  categoryId: string;
}

export class ItemCreateRequestData {
  public readonly name: string;
  public readonly categoryId: number;

  constructor(name: string, categoryId: number) {
    this.name = name;
    this.categoryId = categoryId;
  }

  static from(body: Partial<Body>) {
    if (!body.name) {
      throw new ValidationError("The item name cannot be empty", "name");
    }

    if (body.name.length > 255) {
      throw new ValidationError("The item name cannot be more than 255 characters", "name");
    }

    if (!body.categoryId) {
      throw new ValidationError("missing category id property", "id");
    }

    if (!/^\d+$/.test(body.categoryId)) {
      throw new ValidationError("Category id should be a number", "id");
    }

    return new ItemCreateRequestData(body.name, parseInt(body.categoryId));
  }
}
