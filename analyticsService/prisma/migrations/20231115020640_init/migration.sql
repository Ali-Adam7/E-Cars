-- CreateTable
CREATE TABLE `VisitEvent` (
    `ipAddress` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `carID` INTEGER NOT NULL,
    `eventType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ipAddress`, `time`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
