import { Category, Item } from "@prisma/client";

export interface CategoryModel extends Category {
  items: Item[];
}
