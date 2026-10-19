'use client';

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
      <div className="tabs" role="tablist" aria-label="Informações do negócio">
        {tabs.map((name, i) => (
          <button
            key={name}
            id={`tab-${i}`}
            role="tab"
            aria-selected={tab === i}
            aria-controls="tab-content"
            onClick={() => setTab(i)}
          >
            {name}
          </button>
        ))}
      </div>
      <section
        id="tab-content"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        className="tab-content"
        key={tab}
      >
        {tab === 0 ? (
          <>
            {reviews[selected]?.status === 'adjustments' ? (
              <article className="panel adjustment">
                <h2>
                  <CircleHelp size={20} /> Solicitações de ajuste
                </h2>
                {reviews[selected].adjustments.map(
                  (text, index) =>
                    text && (
                      <div className="detail-adjustment" key={index}>
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
                <article className="panel adjustment">
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
        ) : tab === 1 ? (
          <DataTable rows={purchaseRows} />
        ) : tab === 2 ? (
          <DataTable rows={financingRows} />
        ) : (
          <div className="notices">
            {notices.map((notice) => (
              <article className="panel" key={notice.title}>
                <h2>{notice.title}</h2>
                <p>{notice.text}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
