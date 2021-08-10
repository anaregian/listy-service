import { ItemRepository } from "@app/Item/itemRepository";
import { ItemService } from "@app/Item/itemService";
import { TYPES } from "@modules/types";
import { ContainerModule } from "inversify";

export const itemModules = new ContainerModule(bind => {
  bind<ItemRepository>(TYPES.IItemRepository).to(ItemRepository);
  bind<ItemService>(TYPES.IItemService).to(ItemService);
});
