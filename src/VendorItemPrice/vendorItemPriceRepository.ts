import {
  VendorItemPriceCreateRequestData,
  VendorItemPriceDeleteRequestData,
  VendorItemPriceUpdateRequestData
} from "@app/VendorItemPrice/data";
import { IAssociationRepository } from "@common/associationRepository";
import { ConflictError, NotFound, PrismaErrorCodes } from "@common/exceptions";
import { DBService } from "@persistency/dbService";
import { Prisma } from "@prisma/client";
import { injectable } from "inversify";

const name = "Vendor Item Price";

@injectable()
export class VendorItemPriceRepository implements IAssociationRepository {
  private readonly db: DBService;

  constructor(db: DBService) {
    this.db = db;
  }

  async create(data: VendorItemPriceCreateRequestData) {
    try {
      await this.db.vendorItemPrice.create({
        data: {
          regularPrice: data.regularPrice,
          reducedPrice: data.reducedPrice,
          unit: { connect: { id: data.unitId } },
          item: { connect: { id: data.itemId } },
          vendor: {
            ...(data.vendor.id ? { connect: { id: data.vendor.id } } : { create: { name: data.vendor.name! } })
          }
        }
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCodes.UniqueConstraintViolation) {
          throw new ConflictError(name);
        }
      }

      throw new Error();
    }
  }

  async update(data: VendorItemPriceUpdateRequestData) {
    try {
      await this.db.vendorItemPrice.update({
        where: { id: data.id },
        data: {
          regularPrice: data.regularPrice,
          reducedPrice: data.reducedPrice,
          unit: { connect: { id: data.unitId } }
        }
      });
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

  async delete(data: VendorItemPriceDeleteRequestData) {
    try {
      if (data.id) {
        await this.db.vendorItemPrice.delete({ where: { id: data.id } });
        return;
      }

      if (data.vendorId) {
        await this.db.vendorItemPrice.deleteMany({ where: { vendorId: data.vendorId } });
        return;
      }

      if (data.itemId) {
        await this.db.vendorItemPrice.deleteMany({ where: { itemId: data.itemId } });
        return;
      }
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
