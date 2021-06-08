import { ContainerModule } from "inversify";
import { TYPES } from "../modules/types";
import { ShoppingListItemRepository } from "./shoppingListItemRepository";
import { ShoppingListItemService } from "./shoppingListItemService";
import { ShoppingListItemValidator } from "./shoppingListItemValidator";

export const shoppingListItemModules = new ContainerModule(bind => {
  bind<ShoppingListItemService>(TYPES.IShoppingListItemService).to(ShoppingListItemService);
  bind<ShoppingListItemRepository>(TYPES.IShoppingListItemRepository).to(ShoppingListItemRepository);
  bind<ShoppingListItemValidator>(TYPES.IShoppingListItemValidator).to(ShoppingListItemValidator);
});
