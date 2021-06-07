import "reflect-metadata";
import "dotenv/config";
import { App } from "./app";

import "./ShoppingList/shoppingListController";

new App().init();
