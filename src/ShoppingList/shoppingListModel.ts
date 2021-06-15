import { ShoppingList, ShoppingListItem } from "../../prisma/client";

export interface ShoppingListModel extends ShoppingList {
  shoppingListItems: ShoppingListItem[];
}
