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
        className={cn(
          'tooltip-content z-50 w-max max-w-[220px] rounded-[7px] bg-[#25303d] px-[11px] py-2 text-[14px] leading-[1.4] text-white origin-[var(--radix-tooltip-content-transform-origin)] animate-[reveal_0.16s_ease-out] max-[760px]:text-[13px] motion-reduce:animate-none',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}
