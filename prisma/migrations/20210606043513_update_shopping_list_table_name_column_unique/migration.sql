/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ShoppingList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ShoppingList.name_unique` ON `ShoppingList`(`name`);
