'use client';

import { cn } from '@/core/utils/Cn';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ComponentProps } from 'react';

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipContentProps = ComponentProps<typeof TooltipPrimitive.Content>;

export function TooltipContent({ className, sideOffset = 8, ...props }: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn('tooltip-content', className)}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}
