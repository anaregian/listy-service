import { ValidationError } from "@common/exceptions";

interface Body {
  name: string;
}

export class VendorCreateRequestData {
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  static from(body: Partial<Body>) {
    if (!body.name) {
      throw new ValidationError("The item name cannot be empty", "name");
    }

    if (body.name.length > 255) {
      throw new ValidationError("The item name cannot be more than 255 characters", "name");
    }

    return new VendorCreateRequestData(body.name);
  }
}
