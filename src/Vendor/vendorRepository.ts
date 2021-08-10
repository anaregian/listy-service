import { VendorCreateRequestData, VendorDeleteRequestData, VendorUpdateRequestData } from "@app/Vendor/data";
import { VendorModel } from "@app/Vendor/vendorModel";
import { ConflictError, NotFound, PrismaErrorCodes } from "@common/exceptions";
import { IRepository } from "@common/repository";
import { DBService } from "@persistency/dbService";
import { Prisma } from "@prisma/client";
import { injectable } from "inversify";

const name = "Vendor";
const includeOptions = { vendorItemPrices: { include: { unit: true, item: true } } };

@injectable()
export class VendorRepository implements IRepository<VendorModel> {
  private readonly db: DBService;

  constructor(db: DBService) {
    this.db = db;
  }

  async getAll() {
    return await this.db.vendor.findMany({ include: includeOptions });
  }

  async get(id: number) {
    const vendor = await this.db.vendor.findFirst({ where: { id }, include: includeOptions });

    if (vendor == null) {
      throw new NotFound(name);
    }

    return vendor;
  }

  async create(data: VendorCreateRequestData) {
    try {
      return await this.db.vendor.create({ data, include: includeOptions });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCodes.UniqueConstraintViolation) {
          throw new ConflictError(name);
        }
      }

      throw new Error();
    }
  }

  async update(data: VendorUpdateRequestData) {
    try {
      return await this.db.vendor.update({ where: { id: data.id }, data, include: includeOptions });
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

  async delete(data: VendorDeleteRequestData) {
    try {
      await this.db.vendor.delete({ where: { id: data.id } });
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
