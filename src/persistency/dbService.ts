import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class DBService {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  get shoppingList() {
    return this.db.shoppingList;
  }

  get item() {
    return this.db.item;
  }
}
