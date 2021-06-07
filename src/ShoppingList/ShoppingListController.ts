import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { ShoppingList } from ".prisma/client";

import { ResponseResult, successResponse, errorResponse } from "../common/responseResult";
import { ServiceSuccessResult } from "../common/serviceResult";
import { IShoppingListService } from "./shoppingListService";
import { ShoppingListDto } from "./dto/shoppingListDto";
import { TYPES } from "../modules/types";

@controller("/api/shoppingLists")
export class ShoppingListController {
  shoppingListService: IShoppingListService;

  constructor(@inject(TYPES.IShoppingListService) shoppingListService: IShoppingListService) {
    this.shoppingListService = shoppingListService;
  }

  @httpGet("/")
  async index(_: Request, res: Response<ResponseResult<ShoppingList[]>>) {
    const result = await this.shoppingListService.getAll();

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    const successResult = result as ServiceSuccessResult<ShoppingList[]>;
    return res.json(successResponse(successResult.data));
  }

  @httpGet("/:id")
  async show(req: Request, res: Response<ResponseResult<ShoppingList>>) {
    const id = parseInt(req.params.id);
    const result = await this.shoppingListService.get(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return res.json(successResponse(successResult.data));
  }

  @httpPost("/")
  async create(req: Request, res: Response<ResponseResult<ShoppingList>>) {
    const data: ShoppingListDto = {
      name: req.body.name
    };

    const result = await this.shoppingListService.create(data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return res.json(successResponse(successResult.data));
  }

  @httpPut("/:id")
  async update(req: Request, res: Response<ResponseResult<ShoppingList>>) {
    const id = parseInt(req.params.id);
    const data: ShoppingListDto = {
      name: req.body.name
    };

    const result = await this.shoppingListService.update(id, data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return res.json(successResponse(successResult.data));
  }

  @httpDelete("/:id")
  async delete(req: Request, res: Response<ResponseResult<ShoppingList>>) {
    const id = parseInt(req.params.id);

    const result = await this.shoppingListService.delete(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return res.json(successResponse(successResult.data));
  }
}
