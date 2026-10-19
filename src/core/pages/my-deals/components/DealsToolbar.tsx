'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

import { Button } from '@/components/ui/Button';
import { Handshake, LayoutGrid, List, Search, X } from 'lucide-react';

import type { DealsListState } from '../hooks/UseDealsList';
type DealsToolbarProps = { state: DealsListState };
export function DealsToolbar({ state }: DealsToolbarProps) {
  const { search, setSearch, listView, layoutPhase, toggleLayout } = state;
  return (
    <div className="business-toolbar mt-[29px] mb-[22px] flex items-center justify-between gap-5 max-[760px]:mt-6 max-[760px]:mb-[18px] max-[760px]:flex-wrap max-[760px]:gap-[17px]">
      <div className="business-title flex items-center gap-[10px] [&>h2]:flex [&>h2]:items-center [&>h2]:gap-[9px] [&>h2]:text-[21px] [&>h2]:font-semibold [&_h2>span]:rounded-[6px] [&_h2>span]:bg-[#eeeff2] [&_h2>span]:px-[7px] [&_h2>span]:py-[3px] [&_h2>span]:text-[14px] [&_h2>span]:text-[#777e89] max-[760px]:[&>h2]:text-[20px]">
        <span className="icon-tile grid size-[38px] place-items-center rounded-[10px] bg-primary-light text-primary">
          <Handshake size={22} />
        </span>
        <h2>
          Meus negócios <span>10</span>
        </h2>
      </div>
      <div className="business-view-controls flex min-w-0 items-center gap-[9px] max-[760px]:w-full max-[760px]:gap-[7px]">
        <span className="view-toggle-wrapper relative inline-flex shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="view-toggle rounded-[10px] text-primary aria-pressed:bg-transparent aria-pressed:hover:bg-transparent"
                aria-label={listView ? 'Mostrar em cards' : 'Mostrar em lista compacta'}
                aria-pressed={listView}
                aria-controls="business-results"
                aria-disabled={layoutPhase !== 'idle'}
                onClick={toggleLayout}
              >
                <span
                  className={`view-toggle-icon grid place-items-center [&.layout-exit]:animate-[layout-icon-out_0.22s_ease-in_both] [&.layout-enter]:animate-[layout-icon-in_0.34s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none layout-${layoutPhase}`}
                  aria-hidden="true"
                >
                  {listView ? <LayoutGrid size={23} /> : <List size={24} />}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" align="end">
              {listView ? 'Mostrar em cards' : 'Mostrar em lista compacta'}
            </TooltipContent>
          </Tooltip>
        </span>
        <label className="search flex w-[380px] items-center gap-[9px] rounded-[30px] border border-[#dedfe4] bg-white px-4 py-[11px] text-[#a2a5ae] focus-within:border-primary [&>input]:w-full [&>input]:bg-transparent [&>input]:text-[16px] [&>input]:text-ink [&>input]:outline-none max-[760px]:w-auto max-[760px]:min-w-0 max-[760px]:flex-1 max-[380px]:[&>input]:text-[14px]">
          <Search size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar negócio ou endereço"
            aria-label="Pesquisar negócios"
          />
          {search && (
            <button aria-label="Limpar pesquisa" onClick={() => setSearch('')}>
              <X size={16} />
            </button>
          )}
        </label>
      </div>
    </div>
  );
}
