import {
  Select as SelectSCN,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cva, VariantProps } from 'class-variance-authority';

interface SelectProps extends ComponentProps<typeof SelectPrimitive.Root> {
  variant?: 'default' | 'ghost';
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  size?: 'default' | 'full';
}

const selectVariants = cva('', {
  variants: {
    variant: {
      default: 'input-select',
      ghost: 'input-select--ghost'
    },
    size: {
      default: 'w-auto',
      full: 'w-full'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

export const Select = ({
  options,
  placeholder,
  variant = 'default',
  size = 'default',
  ...props
}: SelectProps & VariantProps<typeof selectVariants>) => {
  return (
    <SelectSCN {...props}>
      <SelectTrigger className={cn(selectVariants({ variant, size }))}>
        <SelectValue
          placeholder={placeholder}
          className="input-select__value"
        />
      </SelectTrigger>
      <SelectContent className="input-select__content">
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectSCN>
  );
};
