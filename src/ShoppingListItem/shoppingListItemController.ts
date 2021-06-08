import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { IAssociationService } from "../common/associationService";
import { errorResponse, ResponseResult, successResponse } from "../common/responseResult";
import { TYPES } from "../modules/types";
import { ShoppingListItemDto } from "./shoppingListItemDto";
import { ShoppingListItemModel } from "./shoppingListItemModel";

@controller("/api/shoppingLists/:shoppingListId/items")
export class ShoppingListItemController {
  shoppingListItemService: IAssociationService<ShoppingListItemModel, ShoppingListItemDto>;

  constructor(
    @inject(TYPES.IShoppingListItemService)
    shoppingListItemService: IAssociationService<ShoppingListItemModel, ShoppingListItemDto>
  ) {
    this.shoppingListItemService = shoppingListItemService;
  }

  @httpGet("/")
  async index(req: Request, res: Response<ResponseResult<ShoppingListItemModel[]>>) {
    const shoppingListId = parseInt(req.params.shoppingListId);

    const result = await this.shoppingListItemService.getAll(shoppingListId);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpGet("/:itemId")
  async show(req: Request, res: Response<ResponseResult<ShoppingListItemModel>>) {
    const shoppingListId = parseInt(req.params.shoppingListId);
    const itemId = parseInt(req.params.itemId);

    const result = await this.shoppingListItemService.get(shoppingListId, itemId);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPost("/")
  async create(req: Request, res: Response<ResponseResult<ShoppingListItemModel>>) {
    const shoppingListId = parseInt(req.params.shoppingListId);
    const itemId = req.query.itemId ? parseInt(req.query.itemId as string) : null;
    const data: ShoppingListItemDto = {
      bought: req.body.bought,
      note: req.body.note,
      quantity: req.body.quantity,
      itemName: req.body.itemName
    };

    const result = await this.shoppingListItemService.create(shoppingListId, itemId, data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPut("/:itemId")
  async update(req: Request, res: Response<ResponseResult<ShoppingListItemModel>>) {
    const shoppingListId = parseInt(req.params.shoppingListId);
    const itemId = parseInt(req.params.itemId);
    const data: ShoppingListItemDto = {
      bought: req.body.bought,
      note: req.body.note,
      quantity: req.body.quantity,
      itemName: req.body.itemName
    };

    const result = await this.shoppingListItemService.update(shoppingListId, itemId, data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpDelete("/:itemId")
  async delete(req: Request, res: Response<ResponseResult<boolean>>) {
    const shoppingListId = parseInt(req.params.shoppingListId);
    const itemId = parseInt(req.params.itemId);

    const result = await this.shoppingListItemService.delete(shoppingListId, itemId);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(true));
  }
}
