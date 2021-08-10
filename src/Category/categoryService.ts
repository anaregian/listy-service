import { CategoryModel } from "@app/Category/categoryModel";
import {
  CategoryCreateRequestData,
  CategoryDeleteRequestData,
  CategoryResponseData,
  CategoryShowRequestData,
  CategoryUpdateRequestData
} from "@app/Category/data";
import { IRepository } from "@common/repository";
import { IService } from "@common/service";
import { TYPES } from "@modules/types";
import { inject, injectable } from "inversify";

@injectable()
export class CategoryService implements IService<CategoryResponseData> {
  categoryRepository: IRepository<CategoryModel>;

  constructor(@inject(TYPES.ICategoryRepository) categoryRepository: IRepository<CategoryModel>) {
    this.categoryRepository = categoryRepository;
  }

  async getAll() {
    const categories = await this.categoryRepository.getAll();
    return CategoryResponseData.fromMany(categories);
  }

  async get(data: CategoryShowRequestData) {
    const category = await this.categoryRepository.get(data.id);
    return CategoryResponseData.from(category);
  }

  async create(data: CategoryCreateRequestData) {
    const category = await this.categoryRepository.create(data);
    return CategoryResponseData.from(category);
  }

  async update(data: CategoryUpdateRequestData) {
    const category = await this.categoryRepository.update(data);
    return CategoryResponseData.from(category);
  }

  async delete(data: CategoryDeleteRequestData) {
    await this.categoryRepository.delete(data);
  }
}
