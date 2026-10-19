'use client';

import { cn } from '@/core/utils/Cn';

import { overviewPanelClassName } from '@/core/utils/Presentation';
import type { ReviewResult } from '@/core/@types/Business';
import { BusinessOverview } from '@/core/components/BusinessOverview';
import { DataTable } from '@/core/components/DataTable';
import { financingRows, notices, purchaseRows } from '@/core/mocks/BusinessData';
import { CircleHelp } from 'lucide-react';
import { useDealDetails } from '../hooks/UseDealDetails';
const tabs = [
  'Dados gerais',
  'Valores da compra e venda',
  'Financiamento e despesas',
  'Avisos gerais',
];
type DealTabsProps = {
  businessId: number;
  review?: ReviewResult;
  state: ReturnType<typeof useDealDetails>;
};
export function DealTabs({ businessId, review, state }: DealTabsProps) {
  const selected = businessId;
  const reviews: Record<number, ReviewResult | undefined> = { [businessId]: review };
  const { tab, setTab } = state;
  return (
    <>
      <div
        className="tabs print:!hidden mb-[26px] flex gap-0 border-b border-[#e6e7ec] [&>button]:flex-1 [&>button]:border-b-2 [&>button]:border-transparent [&>button]:px-[10px] [&>button]:py-[18px] [&>button]:text-[14px] [&>button]:leading-[1.5] [&>button]:uppercase [&>button[aria-selected=true]]:border-primary [&>button[aria-selected=true]]:text-primary max-[1200px]:[&>button]:text-[12px] max-[1100px]:[&>button]:text-[9px] max-[760px]:mb-[23px] max-[760px]:gap-4 max-[760px]:overflow-x-auto max-[760px]:border-t max-[760px]:border-b-0 max-[760px]:border-[#d9dade] max-[760px]:pt-4 max-[760px]:[scrollbar-width:none] max-[760px]:[scroll-snap-type:x_proximity] max-[760px]:[&::-webkit-scrollbar]:hidden max-[760px]:[&>button]:min-w-[180px] max-[760px]:[&>button]:flex-none max-[760px]:[&>button]:px-4 max-[760px]:[&>button]:py-5 max-[760px]:[&>button]:text-[16px] max-[760px]:[&>button]:whitespace-nowrap max-[760px]:[&>button]:[scroll-snap-align:start]"
        role="tablist"
        aria-label="Informações do negócio"
      >
        {tabs.map((name, i) => (
          <button
            key={name}
            id={`tab-${i}`}
            role="tab"
            aria-selected={tab === i}
            aria-controls={`tab-content-${i}`}
            onClick={() => setTab(i)}
          >
            {name}
          </button>
        ))}
      </div>
      {tabs.map((name, index) => (
        <section
          id={`tab-content-${index}`}
          role="tabpanel"
          aria-labelledby={`tab-${index}`}
          className={`tab-content animate-[reveal_0.25s_ease] motion-reduce:animate-none print:animate-none ${tab === index ? '' : 'hidden'} print:!block`}
          key={name}
        >
          <h2 className="mb-4 hidden text-xl font-semibold text-primary print:!block">{name}</h2>
          {index === 0 ? (
            <>
              {reviews[selected]?.status === 'adjustments' ? (
                <article
                  className={cn(
                    overviewPanelClassName,
                    'panel adjustment border-[#f3d7d3] bg-[#fffdfc] [&_h2]:mb-[15px] [&_h2]:border-b [&_h2]:border-[#f0dedb] [&_h2]:pb-[15px] [&_h2]:text-[#e96459]',
                  )}
                >
                  <h2>
                    <CircleHelp size={20} /> Solicitações de ajuste
                  </h2>
                  {reviews[selected].adjustments.map(
                    (text, index) =>
                      text && (
                        <div
                          className="detail-adjustment [&+&]:mt-[15px] [&+&]:border-t [&+&]:border-[#eeded6] [&+&]:pt-[15px] [&>strong]:text-[17px] [&>p]:whitespace-pre-wrap [&>p]:[overflow-wrap:anywhere]"
                          key={index}
                        >
                          <strong>
                            {
                              [
                                'Participantes',
                                'Valores da compra e venda',
                                'Financiamento e despesas',
                              ][index]
                            }
                          </strong>
                          <p>{text}</p>
                        </div>
                      ),
                  )}
                </article>
              ) : (
                selected === 0 &&
                !reviews[selected] && (
                  <article
                    className={cn(
                      overviewPanelClassName,
                      'panel adjustment border-[#f3d7d3] bg-[#fffdfc] [&_h2]:mb-[15px] [&_h2]:border-b [&_h2]:border-[#f0dedb] [&_h2]:pb-[15px] [&_h2]:text-[#e96459]',
                    )}
                  >
                    <h2>
                      <CircleHelp size={20} /> Solicitação de ajuste
                    </h2>
                    <p>
                      Confira os dados do imóvel e entre em contato com seu consultor para atualizar
                      as informações pendentes.
                    </p>
                  </article>
                )
              )}
              <BusinessOverview businessId={selected} />
            </>
          ) : index === 1 ? (
            <DataTable rows={purchaseRows} />
          ) : index === 2 ? (
            <DataTable rows={financingRows} />
          ) : (
            <div className="notices [&>.panel_h2]:mb-[10px] [&_p]:whitespace-pre-line [&_p]:text-[#68727e]">
              {notices.map((notice) => (
                <article className={cn(overviewPanelClassName, 'panel')} key={notice.title}>
                  <h2>{notice.title}</h2>
                  <p>{notice.text}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      ))}
    </>
  );
}
