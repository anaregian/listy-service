import { Category, Item, ShoppingList, ShoppingListItem, Unit, Vendor, VendorItemPrice } from "@prisma/client";

export interface ItemModel extends Item {
  category: Category | null;
  shoppingListItems: (ShoppingListItem & {
    shoppingList: ShoppingList;
  })[];
  vendorItemPrices: (VendorItemPrice & {
    vendor: Vendor;
    unit: Unit;
  })[];
}
