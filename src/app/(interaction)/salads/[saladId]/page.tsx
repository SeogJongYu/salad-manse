import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getSaladStoryDetail } from '@/features/salad/api/db';
import SaladStoryContent from '@/features/salad/components/SaladStoryContent';
import { supabase } from '@/shared/lib/supabase';

interface SaladDetailPageProps {
  params: Promise<{
    saladId: string;
  }>;
}

export async function generateMetadata({
  params,
}: SaladDetailPageProps): Promise<Metadata> {
  const { saladId } = await params;
  const saladStory = await getSaladStoryDetail(saladId);

  if (!saladStory) {
    return {
      title: '샐러드 결과 없음',
      description: '존재하지 않는 샐러드 결과입니다.',
    };
  }

  return {
    title: `${saladStory.title ?? '맞춤 샐러드 결과'} | 샐러드만세`,
    description: saladStory.summary ?? '당신을 위한 맞춤 샐러드와 건강 스토리',
    openGraph: {
      title: saladStory.title ?? '맞춤 샐러드 결과',
      description:
        saladStory.summary ?? '당신을 위한 맞춤 샐러드와 건강 스토리',
    },
    twitter: {
      card: 'summary_large_image',
      title: saladStory.title ?? '맞춤 샐러드 결과',
      description:
        saladStory.summary ?? '당신을 위한 맞춤 샐러드와 건강 스토리',
    },
  };
}

export async function generateStaticParams() {
  return [];
}

export default async function SaladDetailPage({
  params,
}: SaladDetailPageProps) {
  const { saladId } = await params;
  const saladDetail = await getSaladStoryDetail(saladId);

  if (!saladDetail) {
    notFound();
  }

  const imageOptIngredients = saladDetail.ingredients.map(ingredientItem => ({
    ...ingredientItem,
    ingredient: {
      ...ingredientItem.ingredient,
      imageUrl: ingredientItem.ingredient.imageUrl
        ? supabase.storage
            .from('assets')
            .getPublicUrl(ingredientItem.ingredient.imageUrl, {
              transform: {
                width: 500,
                height: 500,
                quality: 80,
              },
            }).data.publicUrl
        : '',
    },
  }));

  return (
    <SaladStoryContent
      data={{
        ...saladDetail,
        ingredients: imageOptIngredients,
      }}
    />
  );
}
