import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getSaladStoryDetail } from '@/features/salad/api/db';
import SaladStoryActions from '@/features/salad/components/SaladStoryActions';
import SaladStoryHeader from '@/features/salad/components/SaladStoryHeader';
import { SaladStoryIngredients } from '@/features/salad/components/SaladStoryIngredients';
import { optimizeIngredientImages } from '@/features/salad/utils/optimizeIngredientImages';

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

  return (
    <div className="bg-primary">
      <SaladStoryHeader
        title={saladDetail.title}
        summary={saladDetail.summary}
      />

      <div className="bg-background relative z-10 rounded-t-3xl px-4 py-10 lg:rounded-t-4xl">
        <SaladStoryIngredients
          ingredients={optimizeIngredientImages(saladDetail.ingredients)}
        />
        <SaladStoryActions />
      </div>
    </div>
  );
}
