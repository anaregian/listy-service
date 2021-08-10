import { CategoryModel } from "@app/Category/categoryModel";

export class CategoryResponseData {
  public readonly id: number;
  public readonly name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly items: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];

  constructor(category: CategoryModel) {
    this.id = category.id;
    this.name = category.name;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
    this.items = category.items.map(item => ({
      id: item.id,
      name: item.name,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));
  }

  static from(category: CategoryModel) {
    return new CategoryResponseData(category);
  }

  static fromMany(categories: CategoryModel[]) {
    return categories.map(category => CategoryResponseData.from(category));
  }
}
