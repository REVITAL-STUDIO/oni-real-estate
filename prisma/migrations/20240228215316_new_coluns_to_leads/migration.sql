/*
  Warnings:

  - Added the required column `color` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "source" TEXT NOT NULL;
