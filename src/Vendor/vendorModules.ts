import { VendorRepository } from "@app/Vendor/vendorRepository";
import { VendorService } from "@app/Vendor/vendorService";
import { TYPES } from "@modules/types";
import { ContainerModule } from "inversify";

export const vendorModules = new ContainerModule(bind => {
  bind<VendorRepository>(TYPES.IVendorRepository).to(VendorRepository);
  bind<VendorService>(TYPES.IVendorService).to(VendorService);
});
