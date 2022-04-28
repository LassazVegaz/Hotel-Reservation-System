-- CreateTable
CREATE TABLE `Hotel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `location_lng` DECIMAL(65, 30) NOT NULL,
    `location_lat` DECIMAL(65, 30) NOT NULL,
    `hotelAdminId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
