import { Category, ShoppingListItem, Item } from "@prisma/client";

export type ItemModel = Item & {
  category: Category | null;
  shoppingListItems: ShoppingListItem[];
};
