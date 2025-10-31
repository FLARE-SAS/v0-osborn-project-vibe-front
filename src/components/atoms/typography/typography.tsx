import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import './typography.css';

interface TypographyProps {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'label'
    | 'thead'
    | 'captionMedium';
  children?: ReactNode;
  className?: string;
  htmlFor?: string;
}

const variantMapping: Record<TypographyProps['variant'], ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  label: 'label',
  thead: 'thead',
  captionMedium: 'span'
};

const variantStyles: Record<TypographyProps['variant'], string> = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
  h6: 'scroll-m-20 text-base font-semibold tracking-tight',
  p: 'leading-7',
  span: '',
  label: '',
  thead: 'text-[16px] font-bold leading-[24px] text-grey-100',
  captionMedium: 'font-mulish text-[10px] leading-[16px] font-medium'
};

export function Typography({
  variant,
  children,
  className,
  htmlFor
}: TypographyProps) {
  const Component = variantMapping[variant];
  const baseStyles = variantStyles[variant];

  const componentProps: { className: string; htmlFor?: string } = {
    className: cn(baseStyles, className)
  };

  if (variant === 'label' && htmlFor) {
    componentProps.htmlFor = htmlFor;
  }

  return <Component {...componentProps}>{children}</Component>;
}
