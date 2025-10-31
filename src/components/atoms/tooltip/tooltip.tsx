import { ExclamationIcon } from '@/components/atoms/icons/icons';
import { Label } from '@/components/ui/label';
import {
  Tooltip as TooltipProvider,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export enum TooltipSize {
  LABEL = 'label',
  ICON = 'icon'
}

interface TooltipProps {
  className?: string;
  size?: TooltipSize;
  children?: ReactNode;
  tooltip: ReactNode;
}

export const Tooltip = ({
  className,
  children,
  size = TooltipSize.LABEL,
  tooltip
}: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipTrigger asChild>
        <button className="flex items-center gap-[6px]">
          {children && (
            <Label className="text-grey-300 text-[10px] leading-[16px]">
              {children}
            </Label>
          )}
          <ExclamationIcon
            className={cn(
              'text-grey-200',
              size === TooltipSize.ICON &&
                'max-h-[16px] min-h-[16px] max-w-[16px] min-w-[16px]',
              size === TooltipSize.LABEL &&
                'max-h-[10px] min-h-[10px] max-w-[10px] min-w-[10px]'
            )}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent className={cn('tooltip-content', className)}>
        {tooltip}
      </TooltipContent>
    </TooltipProvider>
  );
};
