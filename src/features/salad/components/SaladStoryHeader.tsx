import { Sparkles } from 'lucide-react';

import { Badge } from '@/shared/components/ui/Badge';

interface SaladStoryHeaderProps {
  title: string;
  summary: string;
}

export default function SaladStoryHeader({
  title,
  summary,
}: SaladStoryHeaderProps) {
  return (
    <div className="sticky top-(--header-height) container mx-auto space-y-6 px-4 py-10 text-center lg:py-20">
      <Badge className="text-primary rounded-full bg-white px-4 py-1.5 text-sm">
        <Sparkles className="size-3.5!" />
        맞춤 추천
      </Badge>
      <h1 className="text-4xl font-bold text-pretty text-white lg:text-5xl">
        {title}
      </h1>
      <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-pretty text-white">
        {summary}
      </p>
    </div>
  );
}
