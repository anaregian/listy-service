import { CategoryModel } from "@app/Category/categoryModel";
import { CategoryCreateRequestData, CategoryDeleteRequestData, CategoryUpdateRequestData } from "@app/Category/data";
import { ConflictError, NotFound, PrismaErrorCodes } from "@common/exceptions";
import { IRepository } from "@common/repository";
import { DBService } from "@persistency/dbService";
import { Prisma } from "@prisma/client";
import { injectable } from "inversify";

const name = "Category";
const includeOptions = { items: true };

@injectable()
export class CategoryRepository implements IRepository<CategoryModel> {
  private readonly db: DBService;

  constructor(db: DBService) {
    this.db = db;
  }

  async getAll() {
    return await this.db.category.findMany({ include: includeOptions });
  }

  async get(id: number) {
    const category = await this.db.category.findFirst({ where: { id }, include: includeOptions });

    if (category == null) {
      throw new NotFound(name);
    }

    return category;
  }

  async create(data: CategoryCreateRequestData) {
    try {
      return await this.db.category.create({ data, include: includeOptions });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCodes.UniqueConstraintViolation) {
          throw new ConflictError(name);
        }
      }

      throw new Error();
    }
  }

  async update(data: CategoryUpdateRequestData) {
    try {
      return await this.db.category.update({ where: { id: data.id }, data, include: includeOptions });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCodes.RecordNotFound) {
          throw new NotFound(name);
        }
        if (e.code === PrismaErrorCodes.UniqueConstraintViolation) {
          throw new ConflictError(name);
        }
      }
      throw new Error();
    }
  }

  async delete(data: CategoryDeleteRequestData) {
    try {
      await this.db.category.delete({ where: { id: data.id }, include: includeOptions });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCodes.RecordNotFound) {
          throw new NotFound(name);
        }
      }
      throw new Error();
    }
  }
}
