import { ValidationError } from "@common/exceptions";

interface Body {
  name: string;
  symbol: string;
}

export class UnitCreateRequestData {
  public readonly name: string;
  public readonly symbol: string;

  constructor(name: string, symbol: string) {
    this.name = name;
    this.symbol = symbol;
  }

  static from(body: Partial<Body>) {
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

    return new UnitCreateRequestData(body.name, body.symbol);
  }
}
