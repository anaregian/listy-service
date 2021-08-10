import { CategoryRepository } from "@app/Category/categoryRepository";
import { CategoryService } from "@app/Category/categoryService";
import { TYPES } from "@modules/types";
import { ContainerModule } from "inversify";

export const categoryModules = new ContainerModule(bind => {
  bind<CategoryRepository>(TYPES.ICategoryRepository).to(CategoryRepository);
  bind<CategoryService>(TYPES.ICategoryService).to(CategoryService);
});
