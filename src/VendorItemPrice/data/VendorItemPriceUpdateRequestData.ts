import { ValidationError } from "@common/exceptions";

interface Body {
  id: string;
  itemId: string;
  regularPrice: string;
  reducedPrice?: string;
  unitId: string;
}

export class VendorItemPriceUpdateRequestData {
  public readonly id: number;
  public readonly itemId: number;
  public readonly unitId: number;
  public readonly regularPrice: number;
  public readonly reducedPrice: number | null;

  constructor(id: number, itemId: number, unitId: number, regularPrice: number, reducedPrice: number | null) {
    this.id = id;
    this.itemId = itemId;
    this.unitId = unitId;
    this.regularPrice = regularPrice;
    this.reducedPrice = reducedPrice;
  }

  static from(body: Partial<Body>) {
    if (!body.id) {
      throw new ValidationError("missing id property", "id");
    }

    if (!/^\d+$/.test(body.id)) {
      throw new ValidationError("Id should be a number", "id");
    }

    if (!body.itemId) {
      throw new ValidationError("missing id property", "id");
    }

    if (!/^\d+$/.test(body.itemId)) {
      throw new ValidationError("Id should be a number", "id");
    }

    if (!body.unitId) {
      throw new ValidationError("missing id property", "id");
    }

    if (!/^\d+$/.test(body.unitId)) {
      throw new ValidationError("Id should be a number", "id");
    }

    if (body.regularPrice && parseInt(body.regularPrice) < 0) {
      throw new ValidationError("The regular price must be greater than 0", "regularPrice");
    }

    if (body.reducedPrice && parseInt(body.reducedPrice) < 0) {
      throw new ValidationError("The reduced price must be greater than 0", "reducedPrice");
    }

    return new VendorItemPriceUpdateRequestData(
      parseInt(body.id),
      parseInt(body.itemId),
      parseInt(body.unitId),
      body.regularPrice ? parseInt(body.regularPrice) : 0,
      body.reducedPrice ? parseInt(body.reducedPrice) : 0
    );
  }
}
