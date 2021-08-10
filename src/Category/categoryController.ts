import {
  CategoryCreateRequestData,
  CategoryDeleteRequestData,
  CategoryResponseData,
  CategoryShowRequestData,
  CategoryUpdateRequestData
} from "@app/Category/data";
import { HttpResponse } from "@common/httpResponse";
import { ValidateRequestMiddleware } from "@common/middleware/ValidateRequest";
import { IService } from "@common/service";
import { TYPES } from "@modules/types";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";

@controller("/api/categories")
export class CategoryController {
  categoryService: IService<CategoryResponseData>;

  constructor(@inject(TYPES.ICategoryService) categoryService: IService<CategoryResponseData>) {
    this.categoryService = categoryService;
  }

  @httpGet("/")
  async index(_: Request, res: Response) {
    const categories = await this.categoryService.getAll();
    const response = HttpResponse.success(categories);
    res.status(response.statusCode).json(response);
  }

  @httpGet("/:id", ValidateRequestMiddleware.withParams(CategoryShowRequestData))
  async show(req: Request, res: Response) {
    const category = await this.categoryService.get(req.body);
    const response = HttpResponse.success(category);
    res.status(response.statusCode).json(response);
  }

  @httpPost("/", ValidateRequestMiddleware.with(CategoryCreateRequestData))
  async create(req: Request, res: Response) {
    const category = await this.categoryService.create(req.body);
    const response = HttpResponse.success(category);
    res.status(response.statusCode).json(response);
  }

  @httpPut("/:id", ValidateRequestMiddleware.withParams(CategoryUpdateRequestData))
  async update(req: Request, res: Response) {
    const category = await this.categoryService.update(req.body);
    const response = HttpResponse.success(category);
    res.status(response.statusCode).json(response);
  }

  @httpDelete("/:id", ValidateRequestMiddleware.withParams(CategoryDeleteRequestData))
  async delete(req: Request, res: Response) {
    const category = await this.categoryService.delete(req.body);
    const response = HttpResponse.success(category, 204);
    res.status(response.statusCode);
  }
}
