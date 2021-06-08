import "dotenv/config";
import "reflect-metadata";
import { App } from "./app";
import "./Category/categoryController";
import "./Item/itemController";
import "./ShoppingList/shoppingListController";

new App().init();
