import { Container } from "inversify";
import { DBService } from "../persistency/dbService";
import { shoppingListModules } from "../ShoppingList/shoppingListModules";
import { itemModules } from "../Item/itemModules";

export const container = new Container();

container.bind(DBService).toSelf().inSingletonScope();
container.load(shoppingListModules);
container.load(itemModules);
