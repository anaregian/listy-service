import { ShoppingList, ShoppingListItem } from "@prisma/client";

export type ShoppingListModel = ShoppingList & {
  shoppingListItems: ShoppingListItem[];
};
