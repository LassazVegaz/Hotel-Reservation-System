/*
  Warnings:

  - You are about to drop the column `namber` on the `user` table. All the data in the column will be lost.
  - Added the required column `number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `namber`,
    ADD COLUMN `number` VARCHAR(191) NOT NULL;
