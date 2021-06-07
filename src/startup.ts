import "dotenv/config";
import "reflect-metadata";
import { App } from "./app";
import "./Item/itemController";
import "./ShoppingList/shoppingListController";

new App().init();
