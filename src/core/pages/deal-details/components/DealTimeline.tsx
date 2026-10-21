'use client';

import {
  ChevronRight,
  Clock3,
  FileCheck2,
  FilePenLine,
  FolderSearch,
  HandCoins,
  House,
  Wallet,
} from 'lucide-react';
import { businessStages } from '@/core/mocks/BusinessData';
import { getBusinessProgress } from '@/core/utils/BusinessProgress';
const stageIcons = [Clock3, House, FolderSearch, FilePenLine, FileCheck2, Wallet, HandCoins];
type DealTimelineProps = { businessId: number };
export function DealTimeline({ businessId }: DealTimelineProps) {
  const { index: current } = getBusinessProgress({ businessId });
  return (
    <div className="timeline mt-[65px] mb-[34px] flex justify-between gap-[9px] px-2 max-[1100px]:gap-[3px] max-[1100px]:p-0 max-[900px]:mt-5 max-[900px]:overflow-x-auto max-[900px]:pt-[30px] max-[760px]:mx-[-19px] max-[760px]:mt-[23px] max-[760px]:mb-[22px] max-[760px]:justify-start max-[760px]:gap-[15px] max-[760px]:px-[19px] max-[760px]:pt-[30px] max-[760px]:pb-[15px] max-[760px]:[overscroll-behavior-x:contain] max-[760px]:[scrollbar-width:thin] max-[760px]:[scrollbar-color:#ffcd9f_transparent] print:overflow-visible">
      {businessStages.map(({ name }, i) => {
        const Icon = stageIcons[i];
        return (
          <div
            className={`stage relative flex flex-1 flex-col items-center gap-[15px] text-center max-[760px]:gap-[11px] text-[#a3a5ac] [&.active]:text-primary [&.done]:text-[#39a879] [&>span:not(.you-are-here)]:max-w-[100px] [&>span:not(.you-are-here)]:text-[12px] [&>span:not(.you-are-here)]:leading-[1.5] max-[760px]:[&>span:not(.you-are-here)]:leading-[1.4] [&>span:not(.you-are-here)]:font-medium max-[1200px]:[&>span:not(.you-are-here)]:text-[10px] max-[1100px]:[&>span:not(.you-are-here)]:text-[8px] max-[1100px]:[&>svg:not(.stage-arrow)]:w-[29px] max-[900px]:min-w-[95px] max-[760px]:flex-[0_0_95px] max-[760px]:[&>svg:not(.stage-arrow)]:size-[35px] max-[760px]:[&>span:not(.you-are-here)]:text-[10px] ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`}
            key={name}
          >
            {i === current && (
              <span className="you-are-here absolute top-[-27px] text-[12px] font-semibold whitespace-nowrap max-[1200px]:text-[10px] max-[760px]:top-[-24px]">
                Você está aqui!
              </span>
            )}
            <Icon size={37} strokeWidth={1.4} />
            <span>{name}</span>
            {i < 6 && (
              <ChevronRight
                className="stage-arrow absolute top-[6px] right-[-20px] w-[22px] text-[#c9cbd0] max-[1100px]:right-[-8px] max-[1100px]:w-[14px] max-[760px]:right-[-20px] max-[760px]:w-[22px]"
                size={24}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
