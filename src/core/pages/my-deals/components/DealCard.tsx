'use client';

import type { DealListItem, ReviewResult } from '@/core/@types/Business';
import { ConsultantPhoto } from '@/core/components/BrandAssets';
import { addresses } from '@/core/mocks/BusinessData';
import { ArrowRight, Building2, ChevronRight, TriangleAlert } from 'lucide-react';
type DealCardProps = DealListItem & { review?: ReviewResult; onOpen: (id: number) => void };
export function DealCard({ name, id, review, onOpen }: DealCardProps) {
  return (
    <button key={id} className="business-card" onClick={() => onOpen(id)}>
      <div className="card-top">
        <span className="property-icon">
          <Building2 size={23} strokeWidth={1.5} />
        </span>
        <span className={`status ${id === 1 || id === 7 ? 'complete' : ''}`}>
          {id === 1 || id === 7 ? 'Processo concluído' : 'Montagem de processo'}
        </span>
      </div>
      <h3>{name}</h3>
      <p className="address">{addresses[id % 5]}</p>
      <div className="card-bottom">
        <div className="consultant">
          <ConsultantPhoto />
          <span>
            <small>Consultor responsável Exban</small>Marcelo Costa
          </span>
        </div>
        <ChevronRight size={18} />
      </div>
      {id === 0 && !review && (
        <div className="action-needed">
          <TriangleAlert size={14} /> Ação necessária <ArrowRight size={14} />
        </div>
      )}
    </button>
  );
}
