import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { IRepository } from "../common/repository";
import { error, ServiceResult, success } from "../common/serviceResult";
import { ErrorCodes } from "./../common/errorCodes";
import { DBService } from "./../persistency/dbService";
import { CategoryDto } from "./categoryDto";
import { CategoryModel } from "./categoryModel";

@injectable()
export class CategoryRepository implements IRepository<CategoryModel, CategoryDto> {
  constructor(private readonly db: DBService) {}

  async getAll(): Promise<ServiceResult<CategoryModel[]>> {
    const categories = await this.db.category.findMany({ include: { items: true } });
    return success(categories);
  }

  async get(id: number): Promise<ServiceResult<CategoryModel>> {
    const category = await this.db.category.findFirst({ where: { id }, include: { items: true } });

    if (category == null) {
      return error("", "Category does not exist");
    }

    return success(category);
  }

  async create(data: CategoryDto): Promise<ServiceResult<CategoryModel>> {
    try {
      const category = await this.db.category.create({ data, include: { items: true } });
      return success(category);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("name", "Category already exists");
        }
      }

      return error("", "Unexpected error");
    }
  }

  async update(id: number, data: CategoryDto): Promise<ServiceResult<CategoryModel>> {
    try {
      const category = await this.db.category.update({ where: { id }, data, include: { items: true } });
      return success(category);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Category not found");
        }
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("name", "Category already exists");
        }
      }
      return error("", "Unexpected error");
    }
  }

  async delete(id: number): Promise<ServiceResult<boolean>> {
    try {
      await this.db.category.delete({ where: { id }, include: { items: true } });
      return success(true);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Category not found");
        }
      }
      return error("", "Unexpected error");
    }
  }
}
