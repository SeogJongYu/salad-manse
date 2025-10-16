/*
  Warnings:

  - Changed the type of `key` on the `Tag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TagKey" AS ENUM ('overall_health', 'weight_loss', 'muscle_gain', 'light_meal', 'high_blood_pressure', 'high_cholesterol', 'high_blood_sugar');

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "key",
ADD COLUMN     "key" "TagKey" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tag_key_key" ON "Tag"("key");
