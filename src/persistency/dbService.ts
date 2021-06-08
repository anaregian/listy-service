import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class DBService {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient({
      log: ["error", "info", "query", "warn"],
      errorFormat: "pretty"
    });
  }

  get shoppingList() {
    return this.db.shoppingList;
  }

  get item() {
    return this.db.item;
  }

  get category() {
    return this.db.category;
  }
}
