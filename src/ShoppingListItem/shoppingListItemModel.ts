import { Item, ShoppingList, ShoppingListItem } from "@prisma/client";

export interface ShoppingListItemModel extends ShoppingListItem {
  shoppingList: ShoppingList | null;
  item: Item | null;
}
