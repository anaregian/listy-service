import {
  UnitCreateRequestData,
  UnitDeleteRequestData,
  UnitResponseData,
  UnitShowRequestData,
  UnitUpdateRequestData
} from "@app/Unit/data";
import { UnitModel } from "@app/Unit/unitModel";
import { IRepository } from "@common/repository";
import { IService } from "@common/service";
import { TYPES } from "@modules/types";
import { inject, injectable } from "inversify";

@injectable()
export class UnitService implements IService<UnitResponseData> {
  unitRepository: IRepository<UnitModel>;

  constructor(@inject(TYPES.IUnitRepository) unitRepository: IRepository<UnitModel>) {
    this.unitRepository = unitRepository;
  }

  async getAll() {
    const units = await this.unitRepository.getAll();
    return UnitResponseData.fromMany(units);
  }

  async get(data: UnitShowRequestData) {
    const unit = await this.unitRepository.get(data.id);
    return UnitResponseData.from(unit);
  }

  async create(data: UnitCreateRequestData) {
    const unit = await this.unitRepository.create(data);
    return UnitResponseData.from(unit);
  }

  async update(data: UnitUpdateRequestData) {
    const unit = await this.unitRepository.update(data);
    return UnitResponseData.from(unit);
  }

  async delete(data: UnitDeleteRequestData) {
    await this.unitRepository.delete(data);
  }
}
