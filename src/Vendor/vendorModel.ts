import { Vendor, VendorItemPrice } from "../../prisma/client";

export interface VendorModel extends Vendor {
  vendorItemPrices: VendorItemPrice[];
}
