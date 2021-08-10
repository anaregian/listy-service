import { ItemModel } from "@app/Item/itemModel";
import {
  VendorItemPriceCreateRequestData,
  VendorItemPriceDeleteRequestData,
  VendorItemPriceUpdateRequestData
} from "@app/VendorItemPrice/data";
import { IAssociationService } from "@common/associationService";
import { HttpResponse } from "@common/httpResponse";
import { ValidateRequestMiddleware } from "@common/middleware/ValidateRequest";
import { TYPES } from "@modules/types";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpPost, httpPut } from "inversify-express-utils";

@controller("/api/vendorItemPrice")
export class VendorItemPriceController {
  vendorItemPriceService: IAssociationService<ItemModel>;

  constructor(
    @inject(TYPES.IVendorItemPriceService)
    vendorItemPriceService: IAssociationService<ItemModel>
  ) {
    this.vendorItemPriceService = vendorItemPriceService;
  }

  @httpPost("/", ValidateRequestMiddleware.with(VendorItemPriceCreateRequestData))
  async create(req: Request, res: Response) {
    const item = await this.vendorItemPriceService.create(req.body);
    const response = HttpResponse.success(item);
    res.status(response.statusCode).json(response);
  }

  @httpPut("/:id", ValidateRequestMiddleware.withParams(VendorItemPriceUpdateRequestData))
  async update(req: Request, res: Response) {
    const item = await this.vendorItemPriceService.update(req.body);
    const response = HttpResponse.success(item);
    res.status(response.statusCode).json(response);
  }

  @httpDelete("/:id", ValidateRequestMiddleware.withParams(VendorItemPriceDeleteRequestData))
  async delete(req: Request, res: Response) {
    const item = await this.vendorItemPriceService.delete(req.body);
    const response = HttpResponse.success(item, 204);
    res.status(response.statusCode);
  }
}
