import type { ComponentProps } from 'react';

import { Label } from '@/shared/components/atoms/Label';
import { RadioGroupItem } from '@/shared/components/atoms/RadioGroup';

interface RadioCardProps extends ComponentProps<typeof RadioGroupItem> {
  label?: string;
  description?: string;
  id: string; // 접근성을 위해 필수로 설정
}

export default function RadioCard({
  label,
  description,
  id,
  ...radioProps
}: RadioCardProps) {
  return (
    <Label
      htmlFor={id}
      className="hover:bg-accent/50 border-border has-[[aria-checked=true]]:border-primary! dark:has-[[aria-checked=true]]:border-primary flex cursor-pointer items-center gap-3 rounded-lg border bg-white p-3 py-4 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:bg-green-950"
    >
      <RadioGroupItem
        id={id}
        className="data-[state=checked]:border-primary dark:data-[state=checked]:border-primary data-[state=checked]:text-white"
        {...radioProps}
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">{label}</p>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </div>
    </Label>
  );
}
