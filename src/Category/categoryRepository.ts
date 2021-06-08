import { Category } from ".prisma/client";
import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { IRepository } from "../common/repository";
import { error, ServiceResult, success } from "../common/ServiceResult";
import { ErrorCodes } from "./../common/errorCodes";
import { DBService } from "./../persistency/dbService";
import { CategoryDto } from "./categoryDto";

@injectable()
export class CategoryRepository implements IRepository<Category, CategoryDto> {
  constructor(private readonly db: DBService) {}

  async getAll(): Promise<ServiceResult<Category[]>> {
    const categories = await this.db.category.findMany();
    return success(categories);
  }

  async get(id: number): Promise<ServiceResult<Category>> {
    const category = await this.db.category.findFirst({ where: { id } });

    if (category == null) {
      return error("", "Category does not exist");
    }

    return success(category);
  }

  async create(data: CategoryDto): Promise<ServiceResult<Category>> {
    try {
      const category = await this.db.category.create({ data });
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

  async update(id: number, data: CategoryDto): Promise<ServiceResult<Category>> {
    try {
      const category = await this.db.category.update({ where: { id }, data });
      return success(category);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Category not found");
        }
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return { success: false, attribute: "name", message: "Category already exists" };
        }
      }
      return error("", "Unexpected error");
    }
  }

  async delete(id: number): Promise<ServiceResult<Category>> {
    try {
      const category = await this.db.category.delete({ where: { id } });
      return success(category);
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
