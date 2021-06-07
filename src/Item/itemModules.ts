import { ContainerModule } from "inversify";
import { TYPES } from "../modules/types";
import { ItemRepository } from "./itemRepository";
import { ItemService } from "./itemService";
import { ItemValidator } from "./itemValidator";

export const itemModules = new ContainerModule(bind => {
  bind<ItemRepository>(TYPES.IItemRepository).to(ItemRepository);
  bind<ItemService>(TYPES.IItemService).to(ItemService);
  bind<ItemValidator>(TYPES.IItemValidator).to(ItemValidator);
});
