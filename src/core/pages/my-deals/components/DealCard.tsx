'use client';

import type { DealListItem, ReviewResult } from '@/core/@types/Business';
import { ConsultantPhoto } from '@/core/components/BrandAssets';
import { addresses } from '@/core/mocks/BusinessData';
import { ArrowRight, Building2, ChevronRight, TriangleAlert } from 'lucide-react';
type DealCardProps = DealListItem & { review?: ReviewResult; onOpen: (id: number) => void };
export function DealCard({ name, id, review, onOpen }: DealCardProps) {
  return (
    <button
      key={id}
      className="business-card relative overflow-hidden rounded-xl border border-[#e1e3e8] bg-white p-5 text-left transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:border-[#ffb776] hover:shadow-[0_8px_24px_#1824310c] min-[1500px]:p-6 max-[760px]:p-4 [.is-list_&]:grid [.is-list_&]:min-h-20 [.is-list_&]:grid-cols-[minmax(0,1fr)_auto_185px_225px] [.is-list_&]:[grid-template-areas:'name_action_status_consultant'_'address_._._.'] [.is-list_&]:items-center [.is-list_&]:gap-x-4 [.is-list_&]:gap-y-[3px] [.is-list_&]:rounded-[10px] [.is-list_&]:px-[18px] [.is-list_&]:py-[13px] [.is-list_&]:hover:translate-y-0 [.is-list_&]:min-[761px]:max-[1100px]:grid-cols-[minmax(0,1fr)_auto_160px_175px] [.is-list_&]:min-[761px]:max-[1100px]:gap-x-[10px] [.is-list_&]:max-[760px]:min-h-0 [.is-list_&]:max-[760px]:grid-cols-[auto_minmax(0,1fr)] [.is-list_&]:max-[760px]:[grid-template-areas:'name_name'_'address_address'_'action_status'_'consultant_consultant'] [.is-list_&]:max-[760px]:gap-x-[10px] [.is-list_&]:max-[760px]:gap-y-[6px] [.is-list_&]:max-[760px]:px-[14px] [.is-list_&]:max-[760px]:py-3 motion-reduce:transition-none"
      onClick={() => onOpen(id)}
    >
      <div className="card-top mb-[17px] flex flex-wrap items-center justify-between gap-2 max-[460px]:flex-nowrap max-[460px]:gap-[5px] [.is-list_&]:m-0 [.is-list_&]:[grid-area:status] [.is-list_&]:justify-start [.is-list_&]:justify-self-start [.is-list_&]:max-[760px]:justify-self-end">
        <span className="property-icon grid size-[39px] place-items-center rounded-[9px] bg-primary-light text-primary max-[760px]:size-[31px] [.is-list_&]:hidden">
          <Building2 size={23} strokeWidth={1.5} />
        </span>
        <span
          className={`status rounded-[20px] border border-[#ffd5ad] bg-[#fffbf6] px-[10px] py-[5px] text-[12px] whitespace-nowrap text-[#e97100] [&.complete]:border-[#c4e6d5] [&.complete]:bg-[#f2fbf6] [&.complete]:text-[#209364] [.is-list_&]:max-[900px]:text-[11px] [.is-list_&]:max-[760px]:px-[6px] [.is-list_&]:max-[760px]:py-1 [.is-list_&]:max-[760px]:text-[10px] [.is-list_&]:max-[380px]:text-[9px] ${id === 1 || id === 7 ? 'complete' : ''}`}
        >
          {id === 1 || id === 7 ? 'Processo concluído' : 'Montagem de processo'}
        </span>
      </div>
      <h3 className="min-h-[54px] text-[18px] leading-[1.5] font-semibold max-[1200px]:text-[17px] max-[900px]:text-[18px] max-[460px]:min-h-0 max-[460px]:text-[19px] [.is-list_&]:min-h-0 [.is-list_&]:text-[17px] [.is-list_&]:leading-[1.4] [.is-list_&]:[grid-area:name] [.is-list_&]:max-[1100px]:text-[16px] [.is-list_&]:max-[760px]:text-[17px] [.is-list_&]:max-[380px]:text-[16px]">
        {name}
      </h3>
      <p className="address mt-[7px] mb-[22px] text-[15px] text-[#979ba5] max-[460px]:mb-[17px] [.is-list_&]:m-0 [.is-list_&]:[grid-area:address] [.is-list_&]:text-[14px] [.is-list_&]:max-[760px]:mb-[5px]">
        {addresses[id % 5]}
      </p>
      <div className="card-bottom flex items-center justify-between border-t border-[#f0f1f3] pt-[14px] text-[#a2a6b0] [.is-list_&]:gap-3 [.is-list_&]:border-0 [.is-list_&]:p-0 [.is-list_&]:[grid-area:consultant] [.is-list_&]:max-[760px]:gap-2 [.is-list_&]:max-[760px]:pt-[2px] [&>svg]:shrink-0">
        <div className="consultant flex items-center gap-2 text-[14px] text-[#616978] [&_small]:mb-[3px] [&_small]:block [&_small]:text-[12px] [&_small]:text-[#a1a4ad] [.is-list_&]:[&_small]:text-[11px] [.is-list_&]:max-[1100px]:[&_small]:hidden [.is-list_&]:[&_.consultant-photo]:size-[30px] [.is-list_&]:max-[900px]:text-[13px] [.is-list_&]:max-[760px]:gap-[6px] [.is-list_&]:max-[760px]:[&_.consultant-photo]:size-[25px] [.is-list_&]:max-[380px]:text-[12px]">
          <ConsultantPhoto />
          <span>
            <small>Consultor responsável Exban</small>Marcelo Costa
          </span>
        </div>
        <ChevronRight size={18} />
      </div>
      {id === 0 && !review && (
        <div className="action-needed mt-[15px] -mx-5 -mb-5 flex items-center gap-[6px] bg-[#fff3f1] px-5 py-[10px] max-[760px]:mt-[13px] max-[760px]:py-[9px] text-[14px] text-[#dc6661] [&>svg:last-child]:ml-auto min-[1500px]:mt-[15px] min-[1500px]:-mx-6 min-[1500px]:-mb-6 min-[1500px]:px-6 min-[1500px]:py-[10px] max-[760px]:-mx-4 max-[760px]:-mb-4 max-[760px]:px-4 [.is-list_&]:m-0 [.is-list_&]:w-fit [.is-list_&]:self-center [.is-list_&]:rounded-[5px] [.is-list_&]:px-2 [.is-list_&]:py-[3px] [.is-list_&]:text-[12px] [.is-list_&]:whitespace-nowrap [.is-list_&]:[grid-area:action] [.is-list_&]:[&>svg:last-child]:hidden [.is-list_&]:min-[761px]:max-[1100px]:px-[5px] [.is-list_&]:max-[1100px]:text-[10px] [.is-list_&]:max-[760px]:text-[11px]">
          <TriangleAlert size={14} /> Ação necessária <ArrowRight size={14} />
        </div>
      )}
    </button>
  );
}
