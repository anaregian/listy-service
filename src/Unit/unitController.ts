import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { errorResponse, ResponseResult, successResponse } from "../common/responseResult";
import { IService } from "../common/service";
import { TYPES } from "../modules/types";
import { UnitDto } from "./unitDto";
import { UnitModel } from "./unitModel";

@controller("/api/units")
export class UnitController {
  unitService: IService<UnitModel, UnitDto>;

  constructor(@inject(TYPES.IUnitService) unitService: IService<UnitModel, UnitDto>) {
    this.unitService = unitService;
  }

  @httpGet("/")
  async index(_: Request, res: Response<ResponseResult<UnitModel[]>>) {
    const result = await this.unitService.getAll();

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpGet("/:id")
  async show(req: Request, res: Response<ResponseResult<UnitModel>>) {
    const id = parseInt(req.params.id);
    const result = await this.unitService.get(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPost("/")
  async create(req: Request, res: Response<ResponseResult<UnitModel>>) {
    const data: UnitDto = {
      name: req.body.name,
      symbol: req.body.symbol
    };

    const result = await this.unitService.create(data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPut("/:id")
  async update(req: Request, res: Response<ResponseResult<UnitModel>>) {
    const id = parseInt(req.params.id);
    const data: UnitDto = {
      name: req.body.name,
      symbol: req.body.symbol
    };

    const result = await this.unitService.update(id, data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpDelete("/:id")
  async delete(req: Request, res: Response<ResponseResult<boolean>>) {
    const id = parseInt(req.params.id);

    const result = await this.unitService.delete(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }
}
