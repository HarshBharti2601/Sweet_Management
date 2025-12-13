/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "InventoryAction" AS ENUM ('PURCHASE', 'RESTOCK');

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_productId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_storeId_fkey";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Sale";

-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sweet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sweetId" TEXT NOT NULL,
    "action" "InventoryAction" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Sweet_name_idx" ON "Sweet"("name");

-- CreateIndex
CREATE INDEX "Sweet_category_idx" ON "Sweet"("category");

-- AddForeignKey
ALTER TABLE "InventoryLog" ADD CONSTRAINT "InventoryLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLog" ADD CONSTRAINT "InventoryLog_sweetId_fkey" FOREIGN KEY ("sweetId") REFERENCES "Sweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
