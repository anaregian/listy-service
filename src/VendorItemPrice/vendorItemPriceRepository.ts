import { Prisma } from "../../prisma/client";
import { injectable } from "inversify";
import { IAssociationRepository } from "../common/associationRepository";
import { error, ServiceResult, success } from "../common/serviceResult";
import { ErrorCodes } from "./../common/errorCodes";
import { DBService } from "./../persistency/dbService";
import { VendorItemPriceDto } from "./vendorItemPriceDto";
import { VendorItemPriceModel } from "./vendorItemPriceModel";

@injectable()
export class VendorItemPriceRepository implements IAssociationRepository<VendorItemPriceModel, VendorItemPriceDto> {
  constructor(private readonly db: DBService) {}

  async getAll(itemId: number): Promise<ServiceResult<VendorItemPriceModel[]>> {
    const vendorItemPrices = await this.db.vendorItemPrice.findMany({
      where: { itemId },
      include: { vendor: true, item: true, unit: true }
    });
    return success(vendorItemPrices);
  }

  async get(itemId: number, vendorId: number): Promise<ServiceResult<VendorItemPriceModel>> {
    const vendorItemPrice = await this.db.vendorItemPrice.findFirst({
      where: { itemId, vendorId },
      include: { vendor: true, item: true, unit: true }
    });

    if (vendorItemPrice == null) {
      return error("", "Vendor item price does not exist");
    }

    return success(vendorItemPrice);
  }

  async create(
    itemId: number,
    vendorId: number | null,
    data: VendorItemPriceDto
  ): Promise<ServiceResult<VendorItemPriceModel>> {
    try {
      const vendorItemPrice = await this.db.vendorItemPrice.create({
        data: {
          regularPrice: data.regularPrice,
          reducedPrice: data.reducedPrice,
          unit: {
            connect: {
              id: data.unitId
            }
          },
          item: {
            connect: {
              id: itemId
            }
          },
          vendor: {
            ...(vendorId
              ? {
                  connect: {
                    id: vendorId
                  }
                }
              : {
                  create: {
                    name: data.vendorName!
                  }
                })
          }
        },
        include: { vendor: true, item: true, unit: true }
      });
      return success(vendorItemPrice);
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("", "Vendor item price already exists");
        }
      }

      return error("", "Unexpected error");
    }
  }

  async update(
    itemId: number,
    vendorId: number,
    data: VendorItemPriceDto
  ): Promise<ServiceResult<VendorItemPriceModel>> {
    try {
      const vendorItemPrice = await this.db.vendorItemPrice.update({
        where: { itemId_vendorId: { itemId, vendorId } },
        data: {
          regularPrice: data.regularPrice,
          reducedPrice: data.reducedPrice,
          unit: {
            connect: {
              id: data.unitId
            }
          },
          ...(itemId && {
            item: {
              connect: {
                id: itemId
              }
            }
          }),
          ...(vendorId && {
            vendor: {
              connect: {
                id: vendorId
              }
            }
          })
        },
        include: { vendor: true, item: true, unit: true }
      });
      return success(vendorItemPrice);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Vendor item price not found");
        }
        if (e.code === ErrorCodes.UniqueConstraintViolation) {
          return error("", "Vendor item price already exists");
        }
      }
    }
    return error("", "Unexpected error");
  }

  async delete(itemId: number | null, vendorId: number | null): Promise<ServiceResult<boolean>> {
    try {
      if (!itemId && vendorId) {
        await this.db.vendorItemPrice.deleteMany({ where: { vendorId } });

        return success(true);
      }

      if (itemId && !vendorId) {
        await this.db.vendorItemPrice.deleteMany({ where: { itemId } });

        return success(true);
      }

      if (itemId && vendorId) {
        await this.db.vendorItemPrice.delete({
          where: { itemId_vendorId: { itemId, vendorId } }
        });
        return success(true);
      }

      return error("", "both ids are null");
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ErrorCodes.RecordNotFound) {
          return error("", "Vendor item price not found");
        }
      }
      return error("", "Unexpected error");
    }
  }
}
