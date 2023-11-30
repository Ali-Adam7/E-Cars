-- CreateTable
CREATE TABLE `VisitEvent` (
    `time` DATETIME(3) NOT NULL,
    `year` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `carID` INTEGER NOT NULL,
    `eventType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`carID`, `time`, `eventType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
