import { Category, Item, ShoppingListItem, VendorItemPrice } from "@prisma/client";

export interface ItemModel extends Item {
  category: Category | null;
  shoppingListItems: ShoppingListItem[];
  vendorItemPrices: VendorItemPrice[];
}
