/*
  Warnings:

  - The primary key for the `POItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `quantity` to the `POItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `POItem` DROP PRIMARY KEY,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`, `vid`);
