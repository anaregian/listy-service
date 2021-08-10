import { categoryModules } from "@app/Category/categoryModules";
import { itemModules } from "@app/Item/itemModules";
import { shoppingListModules } from "@app/ShoppingList/shoppingListModules";
import { shoppingListItemModules } from "@app/ShoppingListItem/shoppingListItemModules";
import { unitModules } from "@app/Unit/unitModules";
import { vendorModules } from "@app/Vendor/vendorModules";
import { vendorItemPriceModules } from "@app/VendorItemPrice/vendorItemPriceModules";
import { DBService } from "@persistency/dbService";
import { Container } from "inversify";

export const container = new Container();

container.bind(DBService).toSelf().inSingletonScope();
container.load(shoppingListModules);
container.load(itemModules);
container.load(categoryModules);
container.load(shoppingListItemModules);
container.load(vendorModules);
container.load(vendorItemPriceModules);
container.load(unitModules);
