import { ContainerModule } from "inversify";
import { TYPES } from "../modules/types";
import { VendorRepository } from "./vendorRepository";
import { VendorService } from "./vendorService";
import { VendorValidator } from "./vendorValidator";

export const vendorModules = new ContainerModule(bind => {
  bind<VendorRepository>(TYPES.IVendorRepository).to(VendorRepository);
  bind<VendorValidator>(TYPES.IVendorValidator).to(VendorValidator);
  bind<VendorService>(TYPES.IVendorService).to(VendorService);
});
