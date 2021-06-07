import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./modules/container";

interface IApp {
  init: () => void | Promise<void>;
}

export class App implements IApp {
  init() {
    const server = new InversifyExpressServer(container);

    server.setConfig(app => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
    });

    const app = server.build();

    app.listen(process.env.PORT, () => {
      console.log(`Running on port ${process.env.PORT}`);
    });
  }
}
