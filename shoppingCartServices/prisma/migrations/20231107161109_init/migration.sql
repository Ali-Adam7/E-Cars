-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL,
    `carID` INTEGER NOT NULL,

    PRIMARY KEY (`id`, `carID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
