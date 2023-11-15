/*
  Warnings:

  - The primary key for the `VisitEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ipAddress` on the `VisitEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `VisitEvent` DROP PRIMARY KEY,
    DROP COLUMN `ipAddress`,
    ADD PRIMARY KEY (`carID`, `time`, `eventType`);
