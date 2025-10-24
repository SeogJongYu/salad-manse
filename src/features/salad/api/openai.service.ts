import { openai } from '@ai-sdk/openai';
import type { Category, TagKey } from '@prisma/client';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function generateSaladStoryData(params: {
  goal: TagKey;
  categories: Record<Category, string[]>;
}): Promise<{ title: string; summary: string }> {
  try {
    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        title: z.string(),
        summary: z.string(),
      }),
      prompt: getPrompt(params.categories, params.goal),
    });

    return object;
  } catch (error) {
    console.error('Error generating salad story:', error);
    throw new Error('샐러드 스토리를 생성하는 데 실패했습니다.');
  }
}

function getPrompt(data: Record<Category, string[]>, goal: string) {
  const { BASE, PROTEIN, FAT, TOPPING, DRESSING } = data;
  return `
    너는 '샐러드 스토리'를 만드는 전문 푸드 카피라이터야.
    내가 제공하는 재료 조합과 핵심 테마를 바탕으로, 식욕을 돋우고 건강한 느낌을 주는 '제목(title)'과 '요약(summary)'을 생성해 줘.

    [재료 정보]
    * 베이스: ${BASE}
    * 프로틴: ${PROTEIN}
    * 지방: ${FAT}
    * 토핑: ${TOPPING}
    * 드레싱: ${DRESSING}

    [핵심 테마]
    * ${goal}

    [출력 형식]
    {
      "title": "여기에 제목 작성",
      "summary": "여기에 요약 작성 (2~3문장)"
    }
  `;
}
