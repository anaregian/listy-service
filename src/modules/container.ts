import { ShoppingListRepository } from "../ShoppingList/ShoppingListRepository";
import { ShoppingListService } from "../ShoppingList/ShoppingListService";
import { DBService } from "../data/dbService";
import { Container } from "inversify";
import { TYPES } from "./types";

export const container = new Container();

container.bind(DBService).toSelf().inSingletonScope();
container.bind<ShoppingListRepository>(TYPES.IShoppingListRepository).to(ShoppingListRepository);
container.bind<ShoppingListService>(TYPES.IShoppingListService).to(ShoppingListService);
