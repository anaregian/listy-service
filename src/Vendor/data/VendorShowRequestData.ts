import { ValidationError } from "@common/exceptions";

interface Body {
  id: string;
}

export class VendorShowRequestData {
  public readonly id: number;

  constructor(id: number) {
    this.id = id;
  }

  static from(body: Partial<Body>) {
    if (!body.id) {
      throw new ValidationError("missing id property", "id");
    }

    if (!/^\d+$/.test(body.id)) {
      throw new ValidationError("Id should be a number", "id");
    }

    return new VendorShowRequestData(parseInt(body.id));
  }
}
