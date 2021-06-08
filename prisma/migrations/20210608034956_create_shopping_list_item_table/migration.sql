-- CreateTable
CREATE TABLE `ShoppingListItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `note` VARCHAR(255) NOT NULL,
    `bought` BOOLEAN NOT NULL,
    `quantity` INTEGER NOT NULL,
    `shoppingListId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShoppingListItem` ADD FOREIGN KEY (`shoppingListId`) REFERENCES `ShoppingList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingListItem` ADD FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
