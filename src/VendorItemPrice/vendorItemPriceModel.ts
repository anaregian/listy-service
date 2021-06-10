import { Item, Unit, Vendor, VendorItemPrice } from "@prisma/client";

export interface VendorItemPriceModel extends VendorItemPrice {
  item: Item | null;
  vendor: Vendor | null;
  unit: Unit;
}
