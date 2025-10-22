import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_ViewTransition as ViewTransition } from 'react';

import { getSaladStoryDetail } from '@/features/salad/api/actions';
import SaladContent from '@/features/salad/components/SaladContent';

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

export default async function SaladDetailPage({
  params,
}: SaladDetailPageProps) {
  const { saladId } = await params;
  const saladDetail = await getSaladStoryDetail(saladId);

  if (!saladDetail) {
    notFound();
  }

  return (
    <ViewTransition>
      <SaladContent data={saladDetail} />
    </ViewTransition>
  );
}
