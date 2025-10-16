import { PrismaClient } from '@prisma/client';

import { ingredients } from './data/ingredients';
import { ingredientTags } from './data/ingredientTags';
import { tags } from './data/tags';
const prisma = new PrismaClient();

async function main() {
  await prisma.ingredient.createMany({
    data: ingredients,
    skipDuplicates: true,
  });
}

async function seedTags() {
  await prisma.tag.createMany({
    data: tags,
    skipDuplicates: true,
  });
}

async function seedIngredientTags() {
  await prisma.ingredientTag.createMany({
    data: ingredientTags,
    skipDuplicates: true,
  });
}

seedIngredientTags()
  .catch(e => {
    console.error('❌ 시딩 에러:', e);
    prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => {
    console.log('✅ 시딩 완료');
    prisma.$disconnect();
  });
