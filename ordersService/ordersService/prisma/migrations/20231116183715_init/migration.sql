/*
  Warnings:

  - You are about to drop the column `address` on the `PO` table. All the data in the column will be lost.
  - You are about to drop the column `fname` on the `PO` table. All the data in the column will be lost.
  - You are about to drop the column `lname` on the `PO` table. All the data in the column will be lost.
  - Added the required column `userID` to the `PO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PO` DROP COLUMN `address`,
    DROP COLUMN `fname`,
    DROP COLUMN `lname`,
    ADD COLUMN `userID` INTEGER NOT NULL;
