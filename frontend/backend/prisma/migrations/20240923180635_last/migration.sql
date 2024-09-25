/*
  Warnings:

  - Added the required column `publishedBy` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "publishedBy" TEXT NOT NULL;
