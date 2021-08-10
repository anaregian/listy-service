import {
  ItemCreateRequestData,
  ItemDeleteRequestData,
  ItemShowRequestData,
  ItemUpdateRequestData
} from "@app/Item/data";
import { ItemModel } from "@app/Item/itemModel";
import { HttpResponse } from "@common/httpResponse";
import { ValidateRequestMiddleware } from "@common/middleware/ValidateRequest";
import { IService } from "@common/service";
import { TYPES } from "@modules/types";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";

@controller("/api/items")
export class ItemController {
  itemService: IService<ItemModel>;

  constructor(@inject(TYPES.IItemService) itemService: IService<ItemModel>) {
    this.itemService = itemService;
  }

  @httpGet("/")
  async index(_: Request, res: Response) {
    const items = await this.itemService.getAll();
    const response = HttpResponse.success(items);
    res.status(response.statusCode).json(response);
  }

  @httpGet("/:id", ValidateRequestMiddleware.withParams(ItemShowRequestData))
  async show(req: Request, res: Response) {
    const item = await this.itemService.get(req.body);
    const response = HttpResponse.success(item);
    res.status(response.statusCode).json(response);
  }

  @httpPost("/", ValidateRequestMiddleware.with(ItemCreateRequestData))
  async create(req: Request, res: Response) {
    const item = await this.itemService.create(req.body);
    const response = HttpResponse.success(item);
    res.status(response.statusCode).json(response);
  }

  @httpPut("/:id", ValidateRequestMiddleware.withParams(ItemUpdateRequestData))
  async update(req: Request, res: Response) {
    const item = await this.itemService.update(req.body);
    const response = HttpResponse.success(item);
    res.status(response.statusCode).json(response);
  }

  @httpDelete("/:id", ValidateRequestMiddleware.withParams(ItemDeleteRequestData))
  async delete(req: Request, res: Response) {
    const item = await this.itemService.delete(req.body);
    const response = HttpResponse.success(item, 204);
    res.status(response.statusCode);
  }
}
