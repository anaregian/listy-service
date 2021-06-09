-- AlterTable
ALTER TABLE `ShoppingListItem` MODIFY `note` VARCHAR(255),
    MODIFY `bought` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `quantity` VARCHAR(50);

-- CreateTable
CREATE TABLE `Vendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Vendor.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
