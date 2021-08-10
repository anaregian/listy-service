import { ValidationError } from "@common/exceptions";

interface Body {
  id: string;
  vendorId: string;
  itemId: string;
}

export class VendorItemPriceDeleteRequestData {
  public readonly id?: number;
  public readonly vendorId?: number;
  public readonly itemId?: number;

  constructor(id?: number, vendorId?: number, itemId?: number) {
    this.id = id;
    this.vendorId = vendorId;
    this.itemId = itemId;
  }

  static from(body: Partial<Body>) {
    if (!body.id && !body.vendorId && !body.itemId) {
      throw new ValidationError("missing id property", "id");
    }

    if (body.id && !/^\d+$/.test(body.id)) {
      throw new ValidationError("Id should be a number", "id");
    }

    if (body.vendorId && !/^\d+$/.test(body.vendorId)) {
      throw new ValidationError("Id should be a number", "id");
    }

    if (body.itemId && !/^\d+$/.test(body.itemId)) {
      throw new ValidationError("Id should be a number", "id");
    }

    return new VendorItemPriceDeleteRequestData(
      body.id ? parseInt(body.id) : undefined,
      body.vendorId ? parseInt(body.vendorId) : undefined,
      body.itemId ? parseInt(body.itemId) : undefined
    );
  }
}
