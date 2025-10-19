import type { ComponentProps } from 'react';

import { Checkbox } from '@/shared/components/ui/Checkbox';
import { Label } from '@/shared/components/ui/Label';

interface CheckboxCardProps extends ComponentProps<typeof Checkbox> {
  label?: string;
  description?: string;
  value: string; // CheckboxCard의 고유 값
}

export default function CheckboxCard({
  label,
  description,
  value,
  ...checkboxProps
}: CheckboxCardProps) {
  return (
    <Label className="hover:bg-accent/50 has-[[aria-checked=true]]:border-primary! dark:has-[[aria-checked=true]]:border-primary flex cursor-pointer items-center gap-3 rounded-lg border bg-white p-3 py-4 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:bg-green-950">
      <Checkbox
        className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary data-[state=checked]:border-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700"
        {...checkboxProps}
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
