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
const stages = [
  { name: 'Análise de crédito', icon: Clock3 },
  { name: 'Avaliação do imóvel', icon: House },
  { name: 'Análise jurídica', icon: FolderSearch },
  { name: 'Assinatura do contrato', icon: FilePenLine },
  { name: 'Registro do contrato', icon: FileCheck2 },
  { name: 'Liberação de recursos', icon: Wallet },
  { name: 'Processo concluído', icon: HandCoins },
];
type DealTimelineProps = { businessId: number };
export function DealTimeline({ businessId }: DealTimelineProps) {
  const selected = businessId;
  return (
    <div className="timeline">
      {stages.map(({ name, icon: Icon }, i) => {
        const current = selected === 1 || selected === 7 ? 6 : 0;
        return (
          <div
            className={`stage ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`}
            key={name}
          >
            {i === current && <span className="you-are-here">Você está aqui!</span>}
            <Icon size={37} strokeWidth={1.4} />
            <span>{name}</span>
            {i < 6 && <ChevronRight className="stage-arrow" size={24} />}
          </div>
        );
      })}
    </div>
  );
}
