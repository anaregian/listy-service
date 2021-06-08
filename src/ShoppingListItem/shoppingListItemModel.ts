import { Item, ShoppingList, ShoppingListItem } from "@prisma/client";

export type ShoppingListItemModel = ShoppingListItem & {
  shoppingList: ShoppingList | null;
  item: Item | null;
};
