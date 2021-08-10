import { ItemModel } from "@app/Item/itemModel";

export class ItemResponseData {
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
    shoppingList: {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
  public readonly category: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  public readonly vendorItemPrices: {
    id: number;
    regularPrice: number;
    reducedPrice: number | null;
    createdAt: Date;
    updatedAt: Date;
    vendor: {
      createdAt: Date;
      updatedAt: Date;
      id: number;
      name: string;
    };
    unit: {
      id: number;
      name: string;
      symbol: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];

  constructor(item: ItemModel) {
    this.id = item.id;
    this.name = item.name;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
    this.shoppingListItems = item.shoppingListItems.map(listItem => ({
      id: listItem.id,
      note: listItem.note,
      bought: listItem.bought,
      quantity: listItem.quantity,
      createdAt: listItem.createdAt,
      updatedAt: listItem.updatedAt,
      shoppingList: {
        id: listItem.shoppingList.id,
        name: listItem.shoppingList.name,
        createdAt: listItem.shoppingList.createdAt,
        updatedAt: listItem.shoppingList.updatedAt
      }
    }));
    this.category = item.category
      ? {
          id: item.category.id,
          name: item.category.name,
          createdAt: item.category.createdAt,
          updatedAt: item.category.updatedAt
        }
      : null;
    this.vendorItemPrices = item.vendorItemPrices.map(vendorItemPrice => ({
      id: vendorItemPrice.id,
      regularPrice: vendorItemPrice.regularPrice,
      reducedPrice: vendorItemPrice.reducedPrice,
      createdAt: vendorItemPrice.createdAt,
      updatedAt: vendorItemPrice.updatedAt,
      vendor: {
        id: vendorItemPrice.vendor.id,
        name: vendorItemPrice.vendor.name,
        createdAt: vendorItemPrice.vendor.createdAt,
        updatedAt: vendorItemPrice.vendor.updatedAt
      },
      unit: {
        id: vendorItemPrice.unit.id,
        name: vendorItemPrice.unit.name,
        symbol: vendorItemPrice.unit.symbol,
        createdAt: vendorItemPrice.unit.createdAt,
        updatedAt: vendorItemPrice.unit.updatedAt
      }
    }));
  }

  static from(item: ItemModel) {
    return new ItemResponseData(item);
  }

  static fromMany(items: ItemModel[]) {
    return items.map(item => ItemResponseData.from(item));
  }
}
