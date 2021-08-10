import { ValidationError } from "@common/exceptions";

interface Body {
  id: string;
  name: string;
  categoryId: string;
}

export class ItemUpdateRequestData {
  public readonly id: number;
  public readonly name: string;
  public readonly categoryId: number;

  constructor(id: number, name: string, categoryId: number) {
    this.id = id;
    this.name = name;
    this.categoryId = categoryId;
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

    if (!body.categoryId) {
      throw new ValidationError("missing category id property", "id");
    }

    if (!/^\d+$/.test(body.categoryId)) {
      throw new ValidationError("Category id should be a number", "id");
    }

    return new ItemUpdateRequestData(parseInt(body.id), body.name, parseInt(body.categoryId));
  }
}
