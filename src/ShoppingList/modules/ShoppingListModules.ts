import { TYPES } from "../../modules/types";
import { ContainerModule } from "inversify";
import { ShoppingListRepository } from "../ShoppingListRepository";
import { ShoppingListService } from "../ShoppingListService";
import { ShoppingListValidator } from "../ShoppingListValidator";

export const shoppingListModules = new ContainerModule(bind => {
  bind<ShoppingListRepository>(TYPES.IShoppingListRepository).to(ShoppingListRepository);
  bind<ShoppingListService>(TYPES.IShoppingListService).to(ShoppingListService);
  bind<ShoppingListValidator>(TYPES.IShoppingListValidator).to(ShoppingListValidator);
});
