import { PrismaClient } from '@prisma/client';

// import { ingredients } from './data/ingredients';
import { ingredientTags } from './data/ingredientTags';
// import { tags } from './data/tags';
const prisma = new PrismaClient();

// async function main() {
//   // ID 시퀀스 값을 현재 테이블의 최대 ID 값으로 되돌리는 SQL 명령
//   // await prisma.$executeRawUnsafe(
//   //   'SELECT setval(\'"Ingredient_id_seq"\', COALESCE((SELECT MAX(id) FROM "Ingredient"), 0), true);',
//   // );

//   await prisma.ingredient.createMany({
//     data: ingredients,
//     skipDuplicates: true,
//   });
// }

// async function seedTags() {
//   await prisma.tag.createMany({
//     data: tags,
//     skipDuplicates: true,
//   });
// }

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
