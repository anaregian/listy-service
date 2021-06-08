import { Container } from "inversify";
import { itemModules } from "../Item/itemModules";
import { DBService } from "../persistency/dbService";
import { shoppingListModules } from "../ShoppingList/shoppingListModules";
import { categoryModules } from "./../Category/categoryModules";

export const container = new Container();

container.bind(DBService).toSelf().inSingletonScope();
container.load(shoppingListModules);
container.load(itemModules);
container.load(categoryModules);
