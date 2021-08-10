import { UnitModel } from "@app/Unit/unitModel";

export class UnitResponseData {
  public readonly id: number;
  public readonly name: string;
  public readonly symbol: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(unit: UnitModel) {
    this.id = unit.id;
    this.name = unit.name;
    this.symbol = unit.symbol;
    this.createdAt = unit.createdAt;
    this.updatedAt = unit.updatedAt;
  }

  static from(unit: UnitModel) {
    return new UnitResponseData(unit);
  }

  static fromMany(units: UnitModel[]) {
    return units.map(unit => UnitResponseData.from(unit));
  }
}
