import {
  VendorCreateRequestData,
  VendorDeleteRequestData,
  VendorShowRequestData,
  VendorUpdateRequestData
} from "@app/Vendor/data";
import { VendorModel } from "@app/Vendor/vendorModel";
import { HttpResponse } from "@common/httpResponse";
import { ValidateRequestMiddleware } from "@common/middleware/ValidateRequest";
import { IService } from "@common/service";
import { TYPES } from "@modules/types";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";

@controller("/api/vendors")
export class VendorController {
  vendorService: IService<VendorModel>;

  constructor(@inject(TYPES.IVendorService) vendorService: IService<VendorModel>) {
    this.vendorService = vendorService;
  }

  @httpGet("/")
  async index(_: Request, res: Response) {
    const vendors = await this.vendorService.getAll();
    const response = HttpResponse.success(vendors);
    res.status(response.statusCode).json(response);
  }

  @httpGet("/:id", ValidateRequestMiddleware.withParams(VendorShowRequestData))
  async show(req: Request, res: Response) {
    const vendor = await this.vendorService.get(req.body);
    const response = HttpResponse.success(vendor);
    res.status(response.statusCode).json(response);
  }

  @httpPost("/", ValidateRequestMiddleware.with(VendorCreateRequestData))
  async create(req: Request, res: Response) {
    const vendor = await this.vendorService.create(req.body);
    const response = HttpResponse.success(vendor);
    res.status(response.statusCode).json(response);
  }

  @httpPut("/:id", ValidateRequestMiddleware.withParams(VendorUpdateRequestData))
  async update(req: Request, res: Response) {
    const vendor = await this.vendorService.update(req.body);
    const response = HttpResponse.success(vendor);
    res.status(response.statusCode).json(response);
  }

  @httpDelete("/:id", ValidateRequestMiddleware.withParams(VendorDeleteRequestData))
  async delete(req: Request, res: Response) {
    const vendor = await this.vendorService.delete(req.body);
    const response = HttpResponse.success(vendor, 204);
    res.status(response.statusCode);
  }
}
