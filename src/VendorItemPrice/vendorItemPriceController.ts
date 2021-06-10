import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { IAssociationService } from "../common/associationService";
import { errorResponse, ResponseResult, successResponse } from "../common/responseResult";
import { TYPES } from "../modules/types";
import { VendorItemPriceDto } from "./vendorItemPriceDto";
import { VendorItemPriceModel } from "./vendorItemPriceModel";

@controller("/api/items/:itemId/vendors")
export class VendorItemPriceController {
  vendorItemPriceService: IAssociationService<VendorItemPriceModel, VendorItemPriceDto>;

  constructor(
    @inject(TYPES.IVendorItemPriceService)
    vendorItemPriceService: IAssociationService<VendorItemPriceModel, VendorItemPriceDto>
  ) {
    this.vendorItemPriceService = vendorItemPriceService;
  }

  @httpGet("/")
  async index(req: Request, res: Response<ResponseResult<VendorItemPriceModel[]>>) {
    const itemId = parseInt(req.params.itemId);

    const result = await this.vendorItemPriceService.getAll(itemId);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpGet("/:vendorId")
  async show(req: Request, res: Response<ResponseResult<VendorItemPriceModel>>) {
    const itemId = parseInt(req.params.itemId);
    const vendorId = parseInt(req.params.vendorId);

    const result = await this.vendorItemPriceService.get(vendorId, itemId);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPost("/")
  async create(req: Request, res: Response<ResponseResult<VendorItemPriceModel>>) {
    const itemId = parseInt(req.params.itemId);
    const vendorId = req.query.vendorId ? parseInt(req.query.vendorId as string) : null;
    const data: VendorItemPriceDto = {
      regularPrice: req.body.regularPrice,
      reducedPrice: req.body.reducedPrice,
      unitId: req.body.unitId,
      vendorName: req.body.vendorName
    };

    const result = await this.vendorItemPriceService.create(itemId, vendorId, data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPut("/:vendorId")
  async update(req: Request, res: Response<ResponseResult<VendorItemPriceModel>>) {
    const itemId = parseInt(req.params.itemId);
    const vendorId = parseInt(req.params.vendorId);
    const data: VendorItemPriceDto = {
      regularPrice: req.body.regularPrice,
      reducedPrice: req.body.reducedPrice,
      unitId: req.body.unitId,
      vendorName: req.body.vendorName
    };

    const result = await this.vendorItemPriceService.update(itemId, vendorId, data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpDelete("/:itemId")
  async delete(req: Request, res: Response<ResponseResult<boolean>>) {
    const itemId = parseInt(req.params.itemId);
    const vendorId = parseInt(req.params.vendorId);

    const result = await this.vendorItemPriceService.delete(itemId, vendorId);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(true));
  }
}
