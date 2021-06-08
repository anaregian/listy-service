import { Category, Item } from "@prisma/client";

export type CategoryModel = Category & {
  items: Item[];
};
