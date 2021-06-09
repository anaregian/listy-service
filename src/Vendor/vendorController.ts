import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { errorResponse, ResponseResult, successResponse } from "../common/responseResult";
import { IService } from "../common/service";
import { TYPES } from "../modules/types";
import { VendorDto } from "./vendorDto";
import { VendorModel } from "./vendorModel";

@controller("/api/vendors")
export class VendorController {
  vendorService: IService<VendorModel, VendorDto>;

  constructor(@inject(TYPES.IVendorService) vendorService: IService<VendorModel, VendorDto>) {
    this.vendorService = vendorService;
  }

  @httpGet("/")
  async index(_: Request, res: Response<ResponseResult<VendorModel[]>>) {
    const result = await this.vendorService.getAll();

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpGet("/:id")
  async show(req: Request, res: Response<ResponseResult<VendorModel>>) {
    const id = parseInt(req.params.id);
    const result = await this.vendorService.get(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPost("/")
  async create(req: Request, res: Response<ResponseResult<VendorModel>>) {
    const data: VendorDto = {
      name: req.body.name
    };

    const result = await this.vendorService.create(data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPut("/:id")
  async update(req: Request, res: Response<ResponseResult<VendorModel>>) {
    const id = parseInt(req.params.id);
    const data: VendorDto = {
      name: req.body.name
    };

    const result = await this.vendorService.update(id, data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpDelete("/:id")
  async delete(req: Request, res: Response<ResponseResult<boolean>>) {
    const id = parseInt(req.params.id);

    const result = await this.vendorService.delete(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }
}
