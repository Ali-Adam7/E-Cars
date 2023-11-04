-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NOT NULL,
    `make` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `history` VARCHAR(191) NOT NULL,
    `milage` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;