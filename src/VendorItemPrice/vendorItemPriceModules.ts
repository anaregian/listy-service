import { VendorItemPriceRepository } from "@app/VendorItemPrice/vendorItemPriceRepository";
import { VendorItemPriceService } from "@app/VendorItemPrice/vendorItemPriceService";
import { TYPES } from "@modules/types";
import { ContainerModule } from "inversify";

export const vendorItemPriceModules = new ContainerModule(bind => {
  bind<VendorItemPriceService>(TYPES.IVendorItemPriceService).to(VendorItemPriceService);
  bind<VendorItemPriceRepository>(TYPES.IVendorItemPriceRepository).to(VendorItemPriceRepository);
});
