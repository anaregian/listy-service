import { ContainerModule } from "inversify";
import { TYPES } from "../modules/types";
import { CategoryRepository } from "./categoryRepository";
import { CategoryService } from "./categoryService";
import { CategoryValidator } from "./categoryValidator";

export const categoryModules = new ContainerModule(bind => {
  bind<CategoryRepository>(TYPES.ICategoryRepository).to(CategoryRepository);
  bind<CategoryValidator>(TYPES.ICategoryValidator).to(CategoryValidator);
  bind<CategoryService>(TYPES.ICategoryService).to(CategoryService);
});
