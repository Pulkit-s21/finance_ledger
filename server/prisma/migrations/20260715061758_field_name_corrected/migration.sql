/*
  Warnings:

  - You are about to drop the column `desccription` on the `Record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "desccription",
ADD COLUMN     "description" TEXT;
