import {
  VendorCreateRequestData,
  VendorDeleteRequestData,
  VendorResponseData,
  VendorShowRequestData,
  VendorUpdateRequestData
} from "@app/Vendor/data";
import { VendorModel } from "@app/Vendor/vendorModel";
import { IAssociationRepository } from "@common/associationRepository";
import { IRepository } from "@common/repository";
import { IService } from "@common/service";
import { TYPES } from "@modules/types";
import { inject, injectable } from "inversify";

@injectable()
export class VendorService implements IService<VendorResponseData> {
  vendorRepository: IRepository<VendorModel>;
  vendorItemPriceRepository: IAssociationRepository;

  constructor(
    @inject(TYPES.IVendorRepository) vendorRepository: IRepository<VendorModel>,
    @inject(TYPES.IVendorItemPriceRepository)
    vendorItemPriceRepository: IAssociationRepository
  ) {
    this.vendorRepository = vendorRepository;
    this.vendorItemPriceRepository = vendorItemPriceRepository;
  }

  async getAll() {
    const vendors = await this.vendorRepository.getAll();
    return VendorResponseData.fromMany(vendors);
  }

  async get(data: VendorShowRequestData) {
    const vendor = await this.vendorRepository.get(data.id);
    return VendorResponseData.from(vendor);
  }

  async create(data: VendorCreateRequestData) {
    const vendor = await this.vendorRepository.create(data);
    return VendorResponseData.from(vendor);
  }

  async update(data: VendorUpdateRequestData) {
    const vendor = await this.vendorRepository.update(data);
    return VendorResponseData.from(vendor);
  }

  async delete(data: VendorDeleteRequestData) {
    await this.vendorItemPriceRepository.delete({ vendorId: data.id });
    await this.vendorRepository.delete(data);
  }
}
