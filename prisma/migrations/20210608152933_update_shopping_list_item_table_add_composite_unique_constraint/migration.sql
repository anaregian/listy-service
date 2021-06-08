/*
  Warnings:

  - A unique constraint covering the columns `[itemId,shoppingListId]` on the table `ShoppingListItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ShoppingListItem.itemId_shoppingListId_unique` ON `ShoppingListItem`(`itemId`, `shoppingListId`);
