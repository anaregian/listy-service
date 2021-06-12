import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { IRepository } from "../common/repository";
import { error, ServiceResult, success } from "../common/serviceResult";
import { ErrorCodes } from "./../common/errorCodes";
import { DBService } from "./../persistency/dbService";
import { UnitDto } from "./unitDto";
import { UnitModel } from "./unitModel";

@injectable()
export class UnitRepository implements IRepository<UnitModel, UnitDto> {
  constructor(private readonly db: DBService) {}

  async getAll(): Promise<ServiceResult<UnitModel[]>> {
    const units = await this.db.unit.findMany();
    return success(units);
  }

  async get(id: number): Promise<ServiceResult<UnitModel>> {
    const unit = await this.db.unit.findFirst({ where: { id } });

    if (unit == null) {
      return error("", "Unit does not exist");
    }

    return success(unit);
  }

  async create(data: UnitDto): Promise<ServiceResult<UnitModel>> {
    try {
      const unit = await this.db.unit.create({ data });
      return success(unit);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("name", "Unit already exists");
        }
      }

      return error("", "Unexpected error");
    }
  }

  async update(id: number, data: UnitDto): Promise<ServiceResult<UnitModel>> {
    try {
      const unit = await this.db.unit.update({ where: { id }, data });
      return success(unit);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Unit not found");
        }
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("name", "Unit already exists");
        }
      }
      return error("", "Unexpected error");
    }
  }

  async delete(id: number): Promise<ServiceResult<boolean>> {
    try {
      await this.db.unit.delete({ where: { id } });
      return success(true);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Unit not found");
        }
      }
      return error("", "Unexpected error");
    }
  }
}
