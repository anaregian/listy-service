import { VendorModel } from "@app/Vendor/vendorModel";

export class VendorResponseData {
  public readonly id: number;
  public readonly name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly vendorItemPrices: {
    id: number;
    regularPrice: number;
    reducedPrice: number | null;
    createdAt: Date;
    updatedAt: Date;
    item: {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };
    unit: {
      id: number;
      name: string;
      symbol: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];

  constructor(vendor: VendorModel) {
    this.id = vendor.id;
    this.name = vendor.name;
    this.createdAt = vendor.createdAt;
    this.updatedAt = vendor.updatedAt;
    this.vendorItemPrices = vendor.vendorItemPrices.map(vendorItemPrice => ({
      id: vendorItemPrice.id,
      regularPrice: vendorItemPrice.regularPrice,
      reducedPrice: vendorItemPrice.reducedPrice,
      createdAt: vendorItemPrice.createdAt,
      updatedAt: vendorItemPrice.updatedAt,
      item: {
        id: vendorItemPrice.item.id,
        name: vendorItemPrice.item.name,
        createdAt: vendorItemPrice.item.createdAt,
        updatedAt: vendorItemPrice.item.updatedAt
      },
      unit: {
        id: vendorItemPrice.unit.id,
        name: vendorItemPrice.unit.name,
        symbol: vendorItemPrice.unit.symbol,
        createdAt: vendorItemPrice.unit.createdAt,
        updatedAt: vendorItemPrice.unit.updatedAt
      }
    }));
  }

  static from(vendor: VendorModel) {
    return new VendorResponseData(vendor);
  }

  static fromMany(vendors: VendorModel[]) {
    return vendors.map(vendor => VendorResponseData.from(vendor));
  }
}
