import { ContainerModule } from "inversify";
import { TYPES } from "../modules/types";
import { UnitRepository } from "./unitRepository";
import { UnitService } from "./unitService";
import { UnitValidator } from "./unitValidator";

export const unitModules = new ContainerModule(bind => {
  bind<UnitRepository>(TYPES.IUnitRepository).to(UnitRepository);
  bind<UnitValidator>(TYPES.IUnitValidator).to(UnitValidator);
  bind<UnitService>(TYPES.IUnitService).to(UnitService);
});
