import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { IRepository } from "../common/repository";
import { error, ServiceResult, success } from "../common/serviceResult";
import { ErrorCodes } from "./../common/errorCodes";
import { DBService } from "./../persistency/dbService";
import { VendorDto } from "./vendorDto";
import { VendorModel } from "./vendorModel";

@injectable()
export class VendorRepository implements IRepository<VendorModel, VendorDto> {
  constructor(private readonly db: DBService) {}

  async getAll(): Promise<ServiceResult<VendorModel[]>> {
    const vendors = await this.db.vendor.findMany({ include: { vendorItemPrices: true } });
    return success(vendors);
  }

  async get(id: number): Promise<ServiceResult<VendorModel>> {
    const vendor = await this.db.vendor.findFirst({ where: { id }, include: { vendorItemPrices: true } });

    if (vendor == null) {
      return error("", "Vendor does not exist");
    }

    return success(vendor);
  }

  async create(data: VendorDto): Promise<ServiceResult<VendorModel>> {
    try {
      const vendor = await this.db.vendor.create({ data, include: { vendorItemPrices: true } });
      return success(vendor);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("name", "Vendor already exists");
        }
      }

      return error("", "Unexpected error");
    }
  }

  async update(id: number, data: VendorDto): Promise<ServiceResult<VendorModel>> {
    try {
      const vendor = await this.db.vendor.update({ where: { id }, data, include: { vendorItemPrices: true } });
      return success(vendor);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Vendor not found");
        }
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("name", "Vendor already exists");
        }
      }
      return error("", "Unexpected error");
    }
  }

  async delete(id: number): Promise<ServiceResult<boolean>> {
    try {
      await this.db.vendor.delete({ where: { id } });
      return success(true);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Vendor not found");
        }
      }
      return error("", "Unexpected error");
    }
  }
}
