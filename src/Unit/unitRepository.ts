import { UnitCreateRequestData, UnitDeleteRequestData, UnitUpdateRequestData } from "@app/Unit/data";
import { UnitModel } from "@app/Unit/unitModel";
import { ConflictError, NotFound, PrismaErrorCodes } from "@common/exceptions";
import { IRepository } from "@common/repository";
import { DBService } from "@persistency/dbService";
import { Prisma } from "@prisma/client";
import { injectable } from "inversify";

const name = "Unit";
@injectable()
export class UnitRepository implements IRepository<UnitModel> {
  private readonly db: DBService;

  constructor(db: DBService) {
    this.db = db;
  }

  async getAll() {
    return await this.db.unit.findMany();
  }

  async get(id: number) {
    const unit = await this.db.unit.findFirst({ where: { id } });

    if (unit == null) {
      throw new NotFound(name);
    }

    return unit;
  }

  async create(data: UnitCreateRequestData) {
    try {
      return await this.db.unit.create({ data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCodes.UniqueConstraintViolation) {
          throw new ConflictError(name);
        }
      }

      throw new Error();
    }
  }

  async update(data: UnitUpdateRequestData) {
    try {
      return await this.db.unit.update({ where: { id: data.id }, data });
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

  async delete(data: UnitDeleteRequestData) {
    try {
      await this.db.unit.delete({ where: { id: data.id } });
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
