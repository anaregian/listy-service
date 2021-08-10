import { ConflictError, NotFound, ValidationError } from "@common/exceptions";
import { HttpResponse } from "@common/httpResponse";
import { container } from "@modules/container";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";

interface IApp {
  init: () => void | Promise<void>;
}

export class App implements IApp {
  init() {
    const server = new InversifyExpressServer(container);

    server.setErrorConfig(app => {
      app.use((error: Error, _: Request, res: Response, next: NextFunction) => {
        if (error instanceof ValidationError) {
          const response = HttpResponse.error(error.message, 422);
          res.status(response.statusCode).json(response);
          return;
        }

        if (error instanceof NotFound) {
          const response = HttpResponse.error(error.message, 404);
          res.status(response.statusCode).json(response);
          return;
        }

        if (error instanceof ConflictError) {
          const response = HttpResponse.error(error.message, 409);
          res.status(response.statusCode).json(response);
          return;
        }

        if (error instanceof Error) {
          const response = HttpResponse.error(error.message, 500);
          res.status(response.statusCode).json(response);
          return;
        }

        next();
      });
    });

    server.setConfig(app => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      app.use(
        cors({
          origin: process.env.APP_URL,
          credentials: true
        })
      );
      app.use(morgan("dev"));
    });

    const app = server.build();

    app.listen(process.env.PORT, () => {
      console.log(`Running on port ${process.env.PORT}`);
    });
  }
}
