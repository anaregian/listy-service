import { ResponseResult } from "./../common/responseResult";
import { ServiceSuccessResult } from "./../common/serviceResult";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Request, Response } from "express";

import { IShoppingListService } from "./ShoppingListService";
import { inject } from "inversify";
import { ShoppingListDto } from "./dto/shoppingListDto";
import { TYPES } from "../modules/types";
import { ShoppingList } from ".prisma/client";

@controller("/api/shoppingLists")
export class ShoppingListController {
  private shoppingListService: IShoppingListService;

  constructor(@inject(TYPES.IShoppingListService) shoppingListService: IShoppingListService) {
    this.shoppingListService = shoppingListService;
  }

  @httpGet("/")
  async index(_: Request, res: Response<ResponseResult<ShoppingList[]>>) {
    const result = await this.shoppingListService.getAll();

    if (!result.success) {
      res.status(400);
      return res.json({ error: result });
    }

    const successResult = result as ServiceSuccessResult<ShoppingList[]>;
    return res.json({ data: successResult.data });
  }

  @httpGet("/:id")
  async show(req: Request, res: Response<ResponseResult<ShoppingList>>) {
    const id = parseInt(req.params.id);
    const result = await this.shoppingListService.get(id);

    if (!result.success) {
      res.status(400);
      return res.json({ error: result });
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return res.json({ data: successResult.data });
  }

  @httpPost("/")
  async create(req: Request, res: Response<ResponseResult<ShoppingList>>) {
    const data: ShoppingListDto = {
      name: req.body.name
    };

    const result = await this.shoppingListService.create(data);

    if (!result.success) {
      res.status(400);
      return res.json({ error: result });
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return res.json({ data: successResult.data });
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
      return res.json({ error: result });
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return res.json({ data: successResult.data });
  }

  @httpDelete("/:id")
  async delete(req: Request, res: Response<ResponseResult<ShoppingList>>) {
    const id = parseInt(req.params.id);

    const result = await this.shoppingListService.delete(id);

    if (!result.success) {
      res.status(400);
      return res.json({ error: result });
    }

    const successResult = result as ServiceSuccessResult<ShoppingList>;
    return res.json({ data: successResult.data });
  }
}
