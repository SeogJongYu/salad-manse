-- CreateTable
CREATE TABLE "SaladStory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaladStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaladStoryIngredient" (
    "id" SERIAL NOT NULL,
    "storyId" TEXT NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "SaladStoryIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaladStoryIngredient_storyId_ingredientId_key" ON "SaladStoryIngredient"("storyId", "ingredientId");

-- AddForeignKey
ALTER TABLE "SaladStoryIngredient" ADD CONSTRAINT "SaladStoryIngredient_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "SaladStory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaladStoryIngredient" ADD CONSTRAINT "SaladStoryIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
