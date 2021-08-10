import "reflect-metadata";
import "module-alias/register";
import "dotenv/config";
import { App } from "@app/app";
import "@app/Category/categoryController";
import "@app/Item/itemController";
import "@app/ShoppingList/shoppingListController";
import "@app/ShoppingListItem/shoppingListItemController";
import "@app/Unit/unitController";
import "@app/Vendor/vendorController";
import "@app/VendorItemPrice/vendorItemPriceController";

new App().init();
