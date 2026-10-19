'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

import { Button } from '@/components/ui/Button';
import { Handshake, LayoutGrid, List, Search, X } from 'lucide-react';

import type { DealsListState } from '../hooks/UseDealsList';
type DealsToolbarProps = { state: DealsListState };
export function DealsToolbar({ state }: DealsToolbarProps) {
  const { search, setSearch, listView, layoutPhase, toggleLayout } = state;
  return (
    <div className="business-toolbar">
      <div className="business-title">
        <span className="icon-tile">
          <Handshake size={22} />
        </span>
        <h2>
          Meus negócios <span>10</span>
        </h2>
      </div>
      <div className="business-view-controls">
        <span className="view-toggle-wrapper">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="view-toggle"
                aria-label={listView ? 'Mostrar em cards' : 'Mostrar em lista compacta'}
                aria-pressed={listView}
                aria-controls="business-results"
                aria-disabled={layoutPhase !== 'idle'}
                onClick={toggleLayout}
              >
                <span className={`view-toggle-icon layout-${layoutPhase}`} aria-hidden="true">
                  {listView ? <LayoutGrid size={23} /> : <List size={24} />}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" align="end">
              {listView ? 'Mostrar em cards' : 'Mostrar em lista compacta'}
            </TooltipContent>
          </Tooltip>
        </span>
        <label className="search">
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
