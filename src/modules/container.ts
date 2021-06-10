import { Container } from "inversify";
import { itemModules } from "../Item/itemModules";
import { DBService } from "../persistency/dbService";
import { shoppingListModules } from "../ShoppingList/shoppingListModules";
import { vendorModules } from "../Vendor/vendorModules";
import { vendorItemPriceModules } from "../VendorItemPrice/vendorItemPriceModules";
import { categoryModules } from "./../Category/categoryModules";
import { shoppingListItemModules } from "./../ShoppingListItem/shoppingListItemModules";
import { unitModules } from "./../Unit/unitModules";

export const container = new Container();

container.bind(DBService).toSelf().inSingletonScope();
container.load(shoppingListModules);
container.load(itemModules);
container.load(categoryModules);
container.load(shoppingListItemModules);
container.load(vendorModules);
container.load(vendorItemPriceModules);
container.load(unitModules);
