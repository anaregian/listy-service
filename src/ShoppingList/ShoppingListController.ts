import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Request, Response } from "express";

import { IShoppingListService } from "./ShoppingListService";
import { inject } from "inversify";
import { TYPES } from "../modules/types";
import { ShoppingListDto } from "./dto/shoppingListDto";

@controller("/api/shoppingLists")
export class ShoppingListController {
  private shoppingListService: IShoppingListService;

  constructor(@inject(TYPES.IShoppingListService) shoppingListService: IShoppingListService) {
    this.shoppingListService = shoppingListService;
  }

  @httpGet("/")
  async getAll(_: Request, res: Response) {
    const shoppingLists = await this.shoppingListService.getAll();

    res.json({ data: shoppingLists });
  }

  @httpGet("/:id")
  async show(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const shoppingList = await this.shoppingListService.get(id);

    res.json({ data: shoppingList });
  }

  @httpPost("/")
  async create(req: Request, res: Response) {
    const data: ShoppingListDto = {
      name: req.body.name
    };

    const shoppingList = await this.shoppingListService.create(data);

    res.json({ data: shoppingList });
  }

  @httpPut("/:id")
  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data: ShoppingListDto = {
      name: req.body.name
    };

    const shoppingList = await this.shoppingListService.update(id, data);

    res.json({ data: shoppingList });
  }

  @httpDelete("/:id")
  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const shoppingList = await this.shoppingListService.delete(id);

    res.json({ data: shoppingList });
  }
}
