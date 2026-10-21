'use client';

import { DealsToolbar } from './components/DealsToolbar';

import { usePortal } from '@/core/pages/portal/hooks/UsePortal';
import { House, Search, ShieldCheck } from 'lucide-react';
import { DealCard } from './components/DealCard';
export function MyDealsPage() {
  const { listing: state, reviews, openBusiness: onOpenBusiness } = usePortal();
  const { listView, layoutPhase, finishLayoutTransition, deals } = state;
  return (
    <>
      <section className="welcome relative overflow-hidden border-b border-line pt-3 pb-[33px] max-[760px]:pb-[25px] [&>h1]:mt-[11px] [&>h1]:mb-[10px] [&>h1]:text-[39px] [&>h1]:font-normal [&>h1]:tracking-[-1px] [&_em]:font-semibold [&>p]:relative [&>p]:text-[17px] max-[760px]:[&>p]:leading-[1.8] [&>p]:text-[#7d828c] max-[760px]:[&>h1]:text-[34px] max-[760px]:[&>p]:max-w-[310px] max-[760px]:[&>p]:text-[16px]">
        <span className="eyebrow text-[12px] font-semibold tracking-[1.6px] text-muted">
          PORTAL DO CLIENTE
        </span>
        <h1>
          Bem-vindo, <em>Alex!</em>
        </h1>
        <p>Acompanhe cada etapa da sua próxima conquista.</p>
        <div className="welcome-decoration absolute right-[-15px] bottom-[-30px] -rotate-[10deg] text-[#fff0e2] opacity-70 [&>svg]:size-[135px]">
          <House strokeWidth={1} />
        </div>
      </section>
      <section>
        <DealsToolbar state={state} />
        <div
          id="business-results"
          className={`business-grid grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[760px]:grid-cols-1 max-[760px]:gap-[13px] [&.is-list]:grid-cols-[minmax(0,1fr)] [&.is-list]:gap-[9px] [&.layout-exit]:animate-[business-layout-out_0.22s_cubic-bezier(0.4,0,1,1)_both] [&.layout-enter]:animate-[business-layout-in_0.34s_cubic-bezier(0.16,1,0.3,1)_both] [&.layout-exit]:pointer-events-none [&.layout-enter]:pointer-events-none motion-reduce:animate-none ${listView ? 'is-list' : ''} layout-${layoutPhase}`}
          aria-busy={layoutPhase !== 'idle'}
          onAnimationEnd={finishLayoutTransition}
        >
          {deals.map(({ name, id }) => (
            <DealCard key={id} name={name} id={id} review={reviews[id]} onOpen={onOpenBusiness} />
          ))}
        </div>
        {deals.length === 0 && (
          <div className="empty p-[65px] text-center text-[#9499a2] [&>svg]:mx-auto [&>svg]:mb-[15px] [&>h3]:mb-2 [&>h3]:text-ink">
            <Search size={32} />
            <h3>Nenhum negócio encontrado</h3>
            <p>Tente pesquisar por outro nome ou endereço.</p>
          </div>
        )}
      </section>
      <p className="page-foot flex items-center justify-center gap-[6px] py-[35px] text-[14px] text-[#a2a6ae]">
        <ShieldCheck size={14} /> Tudo sobre seu negócio, em um só lugar.
      </p>
    </>
  );
}
