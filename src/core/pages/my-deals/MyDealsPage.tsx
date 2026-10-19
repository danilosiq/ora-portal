'use client';

import { DealsToolbar } from './components/DealsToolbar';

import type { ReviewResult } from '@/core/@types/Business';
import { House, Search, ShieldCheck } from 'lucide-react';
import { DealCard } from './components/DealCard';
import type { DealsListState } from './hooks/UseDealsList';
type MyDealsPageProps = {
  state: DealsListState;
  reviews: Record<number, ReviewResult>;
  onOpenBusiness: (id: number) => void;
};
export function MyDealsPage({ state, reviews, onOpenBusiness }: MyDealsPageProps) {
  const { listView, layoutPhase, finishLayoutTransition, deals } = state;
  return (
    <>
      <section className="welcome">
        <span className="eyebrow">PORTAL DO CLIENTE</span>
        <h1>
          Bem-vindo, <em>Alex!</em>
        </h1>
        <p>Acompanhe cada etapa da sua próxima conquista.</p>
        <div className="welcome-decoration">
          <House strokeWidth={1} />
        </div>
      </section>
      <section>
        <DealsToolbar state={state} />
        <div
          id="business-results"
          className={`business-grid ${listView ? 'is-list' : ''} layout-${layoutPhase}`}
          aria-busy={layoutPhase !== 'idle'}
          onAnimationEnd={finishLayoutTransition}
        >
          {deals.map(({ name, id }) => (
            <DealCard key={id} name={name} id={id} review={reviews[id]} onOpen={onOpenBusiness} />
          ))}
        </div>
        {deals.length === 0 && (
          <div className="empty">
            <Search size={32} />
            <h3>Nenhum negócio encontrado</h3>
            <p>Tente pesquisar por outro nome ou endereço.</p>
          </div>
        )}
      </section>
      <p className="page-foot">
        <ShieldCheck size={14} /> Tudo sobre seu negócio, em um só lugar.
      </p>
    </>
  );
}
