import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { errorResponse, ResponseResult, successResponse } from "../common/responseResult";
import { IService } from "../common/service";
import { TYPES } from "../modules/types";
import { CategoryDto } from "./categoryDto";
import { CategoryModel } from "./categoryModel";

@controller("/api/categories")
export class CategoryController {
  categoryService: IService<CategoryModel, CategoryDto>;

  constructor(@inject(TYPES.ICategoryService) categoryService: IService<CategoryModel, CategoryDto>) {
    this.categoryService = categoryService;
  }

  @httpGet("/")
  async index(_: Request, res: Response<ResponseResult<CategoryModel[]>>) {
    const result = await this.categoryService.getAll();

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpGet("/:id")
  async show(req: Request, res: Response<ResponseResult<CategoryModel>>) {
    const id = parseInt(req.params.id);
    const result = await this.categoryService.get(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPost("/")
  async create(req: Request, res: Response<ResponseResult<CategoryModel>>) {
    const data: CategoryDto = {
      name: req.body.name
    };

    const result = await this.categoryService.create(data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpPut("/:id")
  async update(req: Request, res: Response<ResponseResult<CategoryModel>>) {
    const id = parseInt(req.params.id);
    const data: CategoryDto = {
      name: req.body.name
    };

    const result = await this.categoryService.update(id, data);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }

  @httpDelete("/:id")
  async delete(req: Request, res: Response<ResponseResult<boolean>>) {
    const id = parseInt(req.params.id);

    const result = await this.categoryService.delete(id);

    if (!result.success) {
      res.status(400);
      return res.json(errorResponse(result));
    }

    return res.json(successResponse(result.data));
  }
}
