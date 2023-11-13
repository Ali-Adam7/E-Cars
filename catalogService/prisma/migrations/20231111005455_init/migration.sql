/*
  Warnings:

  - You are about to alter the column `history` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Car` MODIFY `history` BOOLEAN NOT NULL;
