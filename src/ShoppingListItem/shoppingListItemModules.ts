import { ShoppingListItemRepository } from "@app/ShoppingListItem/shoppingListItemRepository";
import { ShoppingListItemService } from "@app/ShoppingListItem/shoppingListItemService";
import { TYPES } from "@modules/types";
import { ContainerModule } from "inversify";

export const shoppingListItemModules = new ContainerModule(bind => {
  bind<ShoppingListItemService>(TYPES.IShoppingListItemService).to(ShoppingListItemService);
  bind<ShoppingListItemRepository>(TYPES.IShoppingListItemRepository).to(ShoppingListItemRepository);
});
