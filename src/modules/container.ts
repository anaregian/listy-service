import { shoppingListModules } from "./../ShoppingList/modules/ShoppingListModules";
import { Container } from "inversify";

import { DBService } from "../data/dbService";

export const container = new Container();

container.bind(DBService).toSelf().inSingletonScope();
container.load(shoppingListModules);
