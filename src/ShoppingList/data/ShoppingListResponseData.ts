import { ShoppingListModel } from "@app/ShoppingList/shoppingListModel";

export class ShoppingListResponseData {
  public readonly id: number;
  public readonly name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly shoppingListItems: {
    id: number;
    note: string | null;
    bought: boolean;
    quantity: number | null;
    createdAt: Date;
    updatedAt: Date;
    item: {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      category: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    };
  }[];

  constructor(shoppingList: ShoppingListModel) {
    this.id = shoppingList.id;
    this.name = shoppingList.name;
    this.createdAt = shoppingList.createdAt;
    this.updatedAt = shoppingList.updatedAt;
    this.shoppingListItems = shoppingList.shoppingListItems.map(listItem => ({
      id: listItem.id,
      note: listItem.note,
      bought: listItem.bought,
      quantity: listItem.quantity,
      createdAt: listItem.createdAt,
      updatedAt: listItem.updatedAt,
      item: {
        id: listItem.item.id,
        name: listItem.item.name,
        createdAt: listItem.item.createdAt,
        updatedAt: listItem.item.updatedAt,
        category: listItem.item.category
          ? {
              id: listItem.item.category.id,
              name: listItem.item.category.name,
              createdAt: listItem.item.category.createdAt,
              updatedAt: listItem.item.category.updatedAt
            }
          : null
      }
    }));
  }

  static from(shoppingList: ShoppingListModel) {
    return new ShoppingListResponseData(shoppingList);
  }

  static fromMany(shoppingLists: ShoppingListModel[]) {
    return shoppingLists.map(shoppingList => ShoppingListResponseData.from(shoppingList));
  }
}
