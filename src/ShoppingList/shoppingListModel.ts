import { Category, Item, ShoppingList, ShoppingListItem } from "@prisma/client";

export interface ShoppingListModel extends ShoppingList {
  shoppingListItems: (ShoppingListItem & {
    item: Item & {
      category: Category | null;
    };
  })[];
}
