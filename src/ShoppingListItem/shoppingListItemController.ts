import { ShoppingListModel } from "@app/ShoppingList/shoppingListModel";
import {
  ShoppingListItemCreateRequestData,
  ShoppingListItemDeleteRequestData,
  ShoppingListItemUpdateRequestData
} from "@app/ShoppingListItem/data";
import { IAssociationService } from "@common/associationService";
import { HttpResponse } from "@common/httpResponse";
import { ValidateRequestMiddleware } from "@common/middleware/ValidateRequest";
import { TYPES } from "@modules/types";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpPost, httpPut } from "inversify-express-utils";

@controller("/api/shoppingListItems")
export class ShoppingListItemController {
  shoppingListItemService: IAssociationService<ShoppingListModel>;

  constructor(
    @inject(TYPES.IShoppingListItemService)
    shoppingListItemService: IAssociationService<ShoppingListModel>
  ) {
    this.shoppingListItemService = shoppingListItemService;
  }

  @httpPost("/", ValidateRequestMiddleware.with(ShoppingListItemCreateRequestData))
  async create(req: Request, res: Response) {
    const shoppingList = await this.shoppingListItemService.create(req.body);
    const response = HttpResponse.success(shoppingList);
    res.status(response.statusCode).json(response);
  }

  @httpPut("/:id", ValidateRequestMiddleware.withParams(ShoppingListItemUpdateRequestData))
  async update(req: Request, res: Response) {
    const shoppingList = await this.shoppingListItemService.update(req.body);
    const response = HttpResponse.success(shoppingList);
    res.status(response.statusCode).json(response);
  }

  @httpDelete("/:id", ValidateRequestMiddleware.withParams(ShoppingListItemDeleteRequestData))
  async delete(req: Request, res: Response) {
    const shoppingList = await this.shoppingListItemService.delete(req.body);
    const response = HttpResponse.success(shoppingList, 204);
    res.status(response.statusCode);
  }
}
