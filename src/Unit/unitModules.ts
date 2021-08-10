import { UnitRepository } from "@app/Unit/unitRepository";
import { UnitService } from "@app/Unit/unitService";
import { TYPES } from "@modules/types";
import { ContainerModule } from "inversify";

export const unitModules = new ContainerModule(bind => {
  bind<UnitRepository>(TYPES.IUnitRepository).to(UnitRepository);
  bind<UnitService>(TYPES.IUnitService).to(UnitService);
});
