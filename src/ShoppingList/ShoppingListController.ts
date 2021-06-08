import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { errorResponse, ResponseResult, successResponse } from "../common/responseResult";
import { TYPES } from "../modules/types";
import { IService } from "./../common/service";
import { ShoppingListDto } from "./shoppingListDto";
import { ShoppingListModel } from "./shoppingListModel";

@controller("/api/shoppingLists")
export class ShoppingListController {
  shoppingListService: IService<ShoppingListModel, ShoppingListDto>;

  constructor(@inject(TYPES.IShoppingListService) shoppingListService: IService<ShoppingListModel, ShoppingListDto>) {
    this.shoppingListService = shoppingListService;
  }

  @httpGet("/")
  async index(_: Request, res: Response<ResponseResult<ShoppingListModel[]>>) {
    const result = await this.shoppingListService.getAll();

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpGet("/:id")
  async show(req: Request, res: Response<ResponseResult<ShoppingListModel>>) {
    const id = parseInt(req.params.id);
    const result = await this.shoppingListService.get(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPost("/")
  async create(req: Request, res: Response<ResponseResult<ShoppingListModel>>) {
    const data: ShoppingListDto = {
      name: req.body.name
    };

    const result = await this.shoppingListService.create(data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPut("/:id")
  async update(req: Request, res: Response<ResponseResult<ShoppingListModel>>) {
    const id = parseInt(req.params.id);
    const data: ShoppingListDto = {
      name: req.body.name
    };

    const result = await this.shoppingListService.update(id, data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpDelete("/:id")
  async delete(req: Request, res: Response<ResponseResult<boolean>>) {
    const id = parseInt(req.params.id);

    const result = await this.shoppingListService.delete(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(true));
  }
}
