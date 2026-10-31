import { PrismaClient } from '@prisma/client'
import { sampleRecipes as recipes } from '../lib/sample-recipes'

const prisma = new PrismaClient()

// tasting_notes و steps تُخزَّن كنص JSON. بيانات الوصفات في lib/sample-recipes.ts

async function main() {
  // إعادة البذر من الصفر
  await prisma.review.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.recipe.deleteMany()

  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: {
        ...recipe,
        tasting_notes: JSON.stringify(recipe.tasting_notes),
        steps: JSON.stringify(recipe.steps),
      },
    })
  }

  console.log(`✅ تم بذر قاعدة البيانات بـ ${recipes.length} وصفات بنجاح!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
