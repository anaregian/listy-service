import { BaseMiddleware } from "./BaseMiddleware";
import { Request, Response, NextFunction } from "express";

export class ValidateRequestMiddleware extends BaseMiddleware {
  private readonly dtoClass: { from: any };
  private readonly withParams: boolean;

  constructor(dtoClass: { from: any }, withParams: boolean) {
    super();
    this.dtoClass = dtoClass;
    this.withParams = withParams;
  }

  public execute(req: Request, _: Response, next: NextFunction): void | Promise<void> {
    if (this.withParams) {
      req.body = {
        ...req.body,
        ...req.params
      };
    }
    req.body = this.dtoClass.from(req.body);

    next();
  }

  static with(dto: any) {
    return new ValidateRequestMiddleware(dto, false).execute;
  }

  static withParams(dto: any) {
    return new ValidateRequestMiddleware(dto, true).execute;
  }
}
