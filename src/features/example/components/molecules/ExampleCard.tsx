import { clsx } from 'clsx';
import { XIcon } from 'lucide-react';

import { ExampleItem } from '@/features/example/model/types';
import { formatExampleItem } from '@/features/example/utils/formatter';
import { Card } from '@/shared/components/molecules/Card';
import { cn } from '@/shared/utils';

interface ExampleCardProps {
  item: ExampleItem;
}

export function ExampleCard({ item }: ExampleCardProps) {
  const formatted = formatExampleItem(item);

  return (
    <Card className={clsx('')}>
      <Card.Header>
        <Card.Title>{formatted.title}</Card.Title>
      </Card.Header>
      <XIcon />
      <Card.Content>
        <p className="text-muted-foreground text-sm">
          {formatted.shortDescription}
        </p>
        <time className="text-xs text-gray-500">
          {formatted.createdAtFormatted}
        </time>
        <div className={cn('')}></div>
      </Card.Content>
    </Card>
  );
}
