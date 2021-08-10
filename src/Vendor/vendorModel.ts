import { Item, Unit, Vendor, VendorItemPrice } from "@prisma/client";

export interface VendorModel extends Vendor {
  vendorItemPrices: (VendorItemPrice & {
    unit: Unit;
    item: Item;
  })[];
}
