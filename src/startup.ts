import "dotenv/config";
import "reflect-metadata";
import { App } from "./app";
import "./Category/categoryController";
import "./Item/itemController";
import "./ShoppingList/shoppingListController";
import "./ShoppingListItem/shoppingListItemController";
import "./Unit/unitController";
import "./Vendor/vendorController";
import "./VendorItemPrice/vendorItemPriceController";

new App().init();
