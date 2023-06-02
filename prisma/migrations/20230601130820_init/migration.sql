-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `password` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `hospitalId` INTEGER NULL,
    `adminVerified` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Child` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `birth` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NULL,
    `memo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `whosReservationId` INTEGER NOT NULL,
    `isUsersChildId` INTEGER NOT NULL,
    `hospitalId` INTEGER NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `posterId` INTEGER NOT NULL,
    `hospitalId` INTEGER NOT NULL,
    `vote` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `posterId` INTEGER NOT NULL,
    `hospitalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hospital` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dutyAddr` VARCHAR(191) NOT NULL,
    `dutyDiv` VARCHAR(191) NOT NULL,
    `dutyDivNam` VARCHAR(191) NOT NULL,
    `dutyEmcls` VARCHAR(191) NULL,
    `dutyEmclsName` VARCHAR(191) NULL,
    `dutyEryn` INTEGER NULL,
    `dutyEtc` VARCHAR(191) NULL,
    `dutyInf` VARCHAR(191) NULL,
    `dutyMapimg` VARCHAR(191) NULL,
    `dutyName` VARCHAR(191) NOT NULL,
    `dutyTel1` VARCHAR(191) NOT NULL,
    `dutyTel3` VARCHAR(191) NULL,
    `dutyTime1c` VARCHAR(191) NULL,
    `dutyTime1s` VARCHAR(191) NULL,
    `dutyTime2c` VARCHAR(191) NULL,
    `dutyTime2s` VARCHAR(191) NULL,
    `dutyTime3c` VARCHAR(191) NULL,
    `dutyTime3s` VARCHAR(191) NULL,
    `dutyTime4c` VARCHAR(191) NULL,
    `dutyTime4s` VARCHAR(191) NULL,
    `dutyTime5c` VARCHAR(191) NULL,
    `dutyTime5s` VARCHAR(191) NULL,
    `dutyTime6c` VARCHAR(191) NULL,
    `dutyTime6s` VARCHAR(191) NULL,
    `dutyTime7c` VARCHAR(191) NULL,
    `dutyTime7s` VARCHAR(191) NULL,
    `dutyTime8c` VARCHAR(191) NULL,
    `dutyTime8s` VARCHAR(191) NULL,
    `hpid` VARCHAR(191) NOT NULL,
    `wgs84Lat` DOUBLE NOT NULL,
    `wgs84Lon` DOUBLE NOT NULL,

    UNIQUE INDEX `Hospital_hpid_key`(`hpid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_whosReservationId_fkey` FOREIGN KEY (`whosReservationId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_isUsersChildId_fkey` FOREIGN KEY (`isUsersChildId`) REFERENCES `Child`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_posterId_fkey` FOREIGN KEY (`posterId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorate` ADD CONSTRAINT `Favorate_posterId_fkey` FOREIGN KEY (`posterId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorate` ADD CONSTRAINT `Favorate_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;