import { Item } from "@prisma/client";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { errorResponse, ResponseResult, successResponse } from "../common/responseResult";
import { IService } from "../common/service";
import { TYPES } from "../modules/types";
import { ItemDto } from "./itemDto";

@controller("/api/items")
export class ItemController {
  itemService: IService<Item, ItemDto>;

  constructor(@inject(TYPES.IItemService) itemService: IService<Item, ItemDto>) {
    this.itemService = itemService;
  }

  @httpGet("/")
  async index(_: Request, res: Response<ResponseResult<Item[]>>) {
    const result = await this.itemService.getAll();

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpGet("/:id")
  async show(req: Request, res: Response<ResponseResult<Item>>) {
    const id = parseInt(req.params.id);
    const result = await this.itemService.get(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPost("/")
  async create(req: Request, res: Response<ResponseResult<Item>>) {
    const data: ItemDto = {
      name: req.body.name
    };

    const result = await this.itemService.create(data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPut("/:id")
  async update(req: Request, res: Response<ResponseResult<Item>>) {
    const id = parseInt(req.params.id);
    const data: ItemDto = {
      name: req.body.name
    };

    const result = await this.itemService.update(id, data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpDelete("/:id")
  async delete(req: Request, res: Response<ResponseResult<Item>>) {
    const id = parseInt(req.params.id);

    const result = await this.itemService.delete(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }
}
