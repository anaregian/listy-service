import { ShoppingListRepository } from "@app/ShoppingList/shoppingListRepository";
import { ShoppingListService } from "@app/ShoppingList/shoppingListService";
import { TYPES } from "@modules/types";
import { ContainerModule } from "inversify";

export const shoppingListModules = new ContainerModule(bind => {
  bind<ShoppingListRepository>(TYPES.IShoppingListRepository).to(ShoppingListRepository);
  bind<ShoppingListService>(TYPES.IShoppingListService).to(ShoppingListService);
});
