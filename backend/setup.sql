-- CreateTable
CREATE TABLE `Employee` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'EMPLOYEE',
    `phone` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `avatar` VARCHAR(191) NULL,
    `plainPassword` VARCHAR(191) NULL,
    `hourlyRate` DOUBLE NULL DEFAULT 0.0,
    `overtimeType` VARCHAR(191) NOT NULL DEFAULT 'MULTIPLIER',
    `overtimeValue` DOUBLE NULL DEFAULT 1.5,
    `passportNumber` VARCHAR(191) NULL,
    `passportExpiry` DATETIME(3) NULL,
    `passportIssue` DATETIME(3) NULL,
    `dob` DATETIME(3) NULL,
    `cvPath` VARCHAR(191) NULL,
    `idDocPath` VARCHAR(191) NULL,
    `bankName` VARCHAR(191) NULL,
    `accountNumber` VARCHAR(191) NULL,
    `accountHolderName` VARCHAR(191) NULL,
    `swiftCode` VARCHAR(191) NULL,
    `siteId` VARCHAR(191) NULL,
    `isBiometricEnrolled` BOOLEAN NOT NULL DEFAULT false,
    `biometricToken` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Employee_employeeId_key`(`employeeId`),
    UNIQUE INDEX `Employee_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Site` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `displayAddress` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL DEFAULT 0.0,
    `longitude` DOUBLE NULL DEFAULT 0.0,
    `geofenceRadius` DOUBLE NOT NULL DEFAULT 500,
    `managerName` VARCHAR(191) NULL,
    `workingStartTime` VARCHAR(191) NULL DEFAULT '07:00',
    `lunchStartTime` VARCHAR(191) NULL DEFAULT '12:00',
    `lunchEndTime` VARCHAR(191) NULL DEFAULT '13:00',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Holiday` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Holiday_date_key`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `siteId` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `clockIn` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `clockOut` DATETIME(3) NULL,
    `clockInLat` DOUBLE NULL,
    `clockInLong` DOUBLE NULL,
    `clockOutLat` DOUBLE NULL,
    `clockOutLong` DOUBLE NULL,
    `biometricProof` VARCHAR(191) NULL,
    `biometricProofOut` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Break` (
    `id` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endTime` DATETIME(3) NULL,
    `attendanceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tracking` (
    `id` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `employeeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SecurityAlert` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `severity` VARCHAR(191) NOT NULL DEFAULT 'LOW',
    `employeeId` VARCHAR(191) NULL,
    `siteId` VARCHAR(191) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payslip` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `regularHours` DOUBLE NOT NULL,
    `overtimeHours` DOUBLE NOT NULL,
    `grossPay` DOUBLE NOT NULL,
    `netPay` DOUBLE NOT NULL,
    `foodAllowance` DOUBLE NOT NULL,
    `otherAllowance` DOUBLE NOT NULL,
    `taxRate` DOUBLE NOT NULL,
    `taxAmount` DOUBLE NOT NULL,
    `insurance` DOUBLE NOT NULL,
    `advancePayment` DOUBLE NOT NULL,
    `otherDeductions` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'GENERATED',
    `transactionId` VARCHAR(191) NULL,
    `receiptPath` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Payslip_employeeId_month_key`(`employeeId`, `month`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Break` ADD CONSTRAINT `Break_attendanceId_fkey` FOREIGN KEY (`attendanceId`) REFERENCES `Attendance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tracking` ADD CONSTRAINT `Tracking_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payslip` ADD CONSTRAINT `Payslip_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;




-- Insert Custom Admin User (ELE001)
INSERT INTO Employee (id, employeeId, firstName, lastName, email, password, plainPassword, role, status, isBiometricEnrolled, updatedAt) 
VALUES ('61af29f9-e225-4894-b8ef-9a7ce0a7279d', 'ELE001', 'Admin', 'Elemecs', 'ELE001', '$2b$10$RZDR0zjJAV9AVs6JdVPameaH0FIThVfX5rN9YXN9iRgrQXuT6qTvK', 'Elemecs@825314', 'ADMIN', 'ACTIVE', 0, CURRENT_TIMESTAMP(3));
