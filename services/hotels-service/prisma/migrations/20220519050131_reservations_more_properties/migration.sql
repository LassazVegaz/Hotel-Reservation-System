-- AlterTable
ALTER TABLE `reservation` ADD COLUMN `allowPostPaid` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `taxiServiceAvailable` BOOLEAN NOT NULL DEFAULT false;
