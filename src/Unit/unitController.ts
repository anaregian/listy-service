import {
  UnitCreateRequestData,
  UnitDeleteRequestData,
  UnitShowRequestData,
  UnitUpdateRequestData
} from "@app/Unit/data";
import { UnitModel } from "@app/Unit/unitModel";
import { HttpResponse } from "@common/httpResponse";
import { ValidateRequestMiddleware } from "@common/middleware/ValidateRequest";
import { IService } from "@common/service";
import { TYPES } from "@modules/types";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";

@controller("/api/units")
export class UnitController {
  unitService: IService<UnitModel>;

  constructor(@inject(TYPES.IUnitService) unitService: IService<UnitModel>) {
    this.unitService = unitService;
  }

  @httpGet("/")
  async index(_: Request, res: Response) {
    const units = await this.unitService.getAll();
    const response = HttpResponse.success(units);
    res.status(response.statusCode).json(response);
  }

  @httpGet("/:id", ValidateRequestMiddleware.withParams(UnitShowRequestData))
  async show(req: Request, res: Response) {
    const unit = await this.unitService.get(req.body);
    const response = HttpResponse.success(unit);
    res.status(response.statusCode).json(response);
  }

  @httpPost("/", ValidateRequestMiddleware.with(UnitCreateRequestData))
  async create(req: Request, res: Response) {
    const unit = await this.unitService.create(req.body);
    const response = HttpResponse.success(unit);
    res.status(response.statusCode).json(response);
  }

  @httpPut("/:id", ValidateRequestMiddleware.withParams(UnitUpdateRequestData))
  async update(req: Request, res: Response) {
    const unit = await this.unitService.update(req.body);
    const response = HttpResponse.success(unit);
    res.status(response.statusCode).json(response);
  }

  @httpDelete("/:id", ValidateRequestMiddleware.withParams(UnitDeleteRequestData))
  async delete(req: Request, res: Response) {
    const unit = await this.unitService.delete(req.body);
    const response = HttpResponse.success(unit, 204);
    res.status(response.statusCode);
  }
}
