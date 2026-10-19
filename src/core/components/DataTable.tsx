'use client';

import { cn } from '@/core/utils/Cn';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { overviewPanelClassName } from '@/core/utils/Presentation';
import { CircleHelp } from 'lucide-react';

type DataTableProps = { rows: string[][] };
export function DataTable({ rows }: DataTableProps) {
  return (
    <div
      className={cn(
        overviewPanelClassName,
        'panel data-table mx-auto w-[580px] max-w-full px-6 py-[7px] [.review-values_&]:px-4 [.review-values_&]:py-[3px]',
      )}
    >
      {rows.map(([label, value, description]) => (
        <div
          className="flex items-center justify-between gap-6 border-b border-line py-[18px] text-[18px] last:border-0 max-[760px]:gap-[15px] [.has-business-detail_&]:max-[760px]:text-[17px] [.review-values_&]:py-[13px] [.review-values_&]:text-[17px] [.review-values_&]:max-[460px]:gap-3 [.review-values_&]:max-[460px]:text-[16px]"
          key={label}
        >
          <span className="text-[#7b8390]">{label}</span>
          <strong className="inline-flex items-center justify-end gap-2 text-right font-medium max-[760px]:max-w-1/2 [.review-values_&]:max-[460px]:max-w-[55%]">
            {description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Entenda ${label.toLocaleLowerCase('pt-BR')}`}
                    className="inline-flex shrink-0 cursor-help items-center justify-center rounded-full text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <CircleHelp size={18} aria-hidden="true" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-72 text-left" side="top">
                  {description}
                </TooltipContent>
              </Tooltip>
            )}
            {value}
          </strong>
        </div>
      ))}
    </div>
  );
}
