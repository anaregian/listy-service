import {
  ShoppingListCreateRequestData,
  ShoppingListDeleteRequestData,
  ShoppingListShowRequestData,
  ShoppingListUpdateRequestData
} from "@app/ShoppingList/data";
import { ShoppingListModel } from "@app/ShoppingList/shoppingListModel";
import { HttpResponse } from "@common/httpResponse";
import { ValidateRequestMiddleware } from "@common/middleware/ValidateRequest";
import { IService } from "@common/service";
import { TYPES } from "@modules/types";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";

@controller("/api/shoppingLists")
export class ShoppingListController {
  shoppingListService: IService<ShoppingListModel>;

  constructor(
    @inject(TYPES.IShoppingListService)
    shoppingListService: IService<ShoppingListModel>
  ) {
    this.shoppingListService = shoppingListService;
  }

  @httpGet("/")
  async index(_: Request, res: Response) {
    const shoppingLists = await this.shoppingListService.getAll();
    const response = HttpResponse.success(shoppingLists);
    res.status(response.statusCode).json(response);
  }

  @httpGet("/:id", ValidateRequestMiddleware.withParams(ShoppingListShowRequestData))
  async show(req: Request, res: Response) {
    const shoppingList = await this.shoppingListService.get(req.body);
    const response = HttpResponse.success(shoppingList);
    res.status(response.statusCode).json(response);
  }

  @httpPost("/", ValidateRequestMiddleware.with(ShoppingListCreateRequestData))
  async create(req: Request, res: Response) {
    const shoppingList = await this.shoppingListService.create(req.body);
    const response = HttpResponse.success(shoppingList);
    res.status(response.statusCode).json(response);
  }

  @httpPut("/:id", ValidateRequestMiddleware.withParams(ShoppingListUpdateRequestData))
  async update(req: Request, res: Response) {
    const shoppingList = await this.shoppingListService.update(req.body);
    const response = HttpResponse.success(shoppingList);
    res.status(response.statusCode).json(response);
  }

  @httpDelete("/:id", ValidateRequestMiddleware.withParams(ShoppingListDeleteRequestData))
  async delete(req: Request, res: Response) {
    const shoppingList = await this.shoppingListService.delete(req.body);
    const response = HttpResponse.success(shoppingList, 204);
    res.status(response.statusCode);
  }
}
