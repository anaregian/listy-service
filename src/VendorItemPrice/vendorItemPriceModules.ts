import { ContainerModule } from "inversify";
import { TYPES } from "../modules/types";
import { VendorItemPriceRepository } from "./vendorItemPriceRepository";
import { VendorItemPriceService } from "./vendorItemPriceService";
import { VendorItemPriceValidator } from "./vendorItemPriceValidator";

export const vendorItemPriceModules = new ContainerModule(bind => {
  bind<VendorItemPriceService>(TYPES.IVendorItemPriceService).to(VendorItemPriceService);
  bind<VendorItemPriceRepository>(TYPES.IVendorItemPriceRepository).to(VendorItemPriceRepository);
  bind<VendorItemPriceValidator>(TYPES.IVendorItemPriceValidator).to(VendorItemPriceValidator);
});
