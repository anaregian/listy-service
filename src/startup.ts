import "reflect-metadata";
import "dotenv/config";
import { Service } from "./app";

import "./ShoppingList/ShoppingListController";

(() => {
  new Service().init();
})();
