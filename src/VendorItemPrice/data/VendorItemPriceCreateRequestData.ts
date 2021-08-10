import { ValidationError } from "@common/exceptions";

interface Body {
  itemId: string;
  regularPrice: string;
  reducedPrice?: string;
  unitId: string;
  vendorId?: string;
  vendorName?: string;
}

export class VendorItemPriceCreateRequestData {
  public readonly itemId: number;
  public readonly unitId: number;
  public readonly regularPrice: number;
  public readonly reducedPrice: number | null;
  public readonly vendor: { id?: number; name?: string };

  constructor(
    itemId: number,
    unitId: number,
    regularPrice: number,
    reducedPrice: number | null,
    vendorId?: number,
    vendorName?: string
  ) {
    this.itemId = itemId;
    this.unitId = unitId;
    this.regularPrice = regularPrice;
    this.reducedPrice = reducedPrice;
    this.vendor = {
      id: vendorId,
      name: vendorName
    };
  }

  static from(body: Partial<Body>) {
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

    if (!body.vendorId && !body.vendorName) {
      throw new ValidationError("Vendor id or vendor name required");
    }

    return new VendorItemPriceCreateRequestData(
      parseInt(body.itemId),
      parseInt(body.unitId),
      body.regularPrice ? parseInt(body.regularPrice) : 0,
      body.reducedPrice ? parseInt(body.reducedPrice) : 0,
      body.vendorId ? parseInt(body.vendorId) : undefined,
      body.vendorName
    );
  }
}
