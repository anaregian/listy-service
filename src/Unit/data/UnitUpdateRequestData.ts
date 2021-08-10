import { ValidationError } from "@common/exceptions";

interface Body {
  id: string;
  name: string;
  symbol: string;
}

export class UnitUpdateRequestData {
  public readonly id: number;
  public readonly name: string;
  public readonly symbol: string;

  constructor(id: number, name: string, symbol: string) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
  }

  static from(body: Partial<Body>) {
    if (!body.id) {
      throw new ValidationError("missing id property", "id");
    }

    if (!/^\d+$/.test(body.id)) {
      throw new ValidationError("Id should be a number", "id");
    }

    if (!body.name) {
      throw new ValidationError("The item name cannot be empty", "name");
    }

    if (body.name.length > 255) {
      throw new ValidationError("The item name cannot be more than 255 characters", "name");
    }

    if (!body.symbol) {
      return new ValidationError("The unit symbol cannot be empty", "symbol");
    }

    if (body.symbol.length > 10) {
      return new ValidationError("The unit name cannot be more than 10 characters", "symbol");
    }

    return new UnitUpdateRequestData(parseInt(body.id), body.name, body.symbol);
  }
}
