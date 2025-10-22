import { TagKey } from '@prisma/client';
import React from 'react';

import { Badge } from '@/shared/components/ui/Badge';

interface HealthTagBadgeProps {
  tag: TagKey;
}

const tagConfig: Partial<Record<TagKey, { className: string; label: string }>> =
  {
    [TagKey.high_blood_pressure]: {
      className: 'bg-red-50 text-red-800 border-red-800',
      label: '혈압관리',
    },
    [TagKey.high_cholesterol]: {
      className: 'bg-yellow-50 text-yellow-800 border-yellow-800',
      label: '콜레스테롤관리',
    },
    [TagKey.high_blood_sugar]: {
      className: 'bg-green-50 text-green-800 border-green-800',
      label: '혈당관리',
    },
  };

export default function HealthTagBadge({ tag }: HealthTagBadgeProps) {
  const config = tagConfig[tag];

  if (!config) return null;

  return <Badge className={config.className}>{config.label}</Badge>;
}
