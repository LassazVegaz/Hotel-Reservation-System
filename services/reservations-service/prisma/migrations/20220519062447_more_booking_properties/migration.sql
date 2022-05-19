/*
  Warnings:

  - Added the required column `postPaidSelected` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxiSerivceSelected` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation` ADD COLUMN `postPaidSelected` BOOLEAN NOT NULL,
    ADD COLUMN `taxiSerivceSelected` BOOLEAN NOT NULL;
