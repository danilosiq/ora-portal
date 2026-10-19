'use client';
import { addresses, properties } from '@/core/mocks/BusinessData';
import { useEffect, useState, type AnimationEvent } from 'react';
export function useDealsList() {
  const [search, setSearch] = useState('');
  const [listView, setListView] = useState(false);
  const [layoutPhase, setLayoutPhase] = useState<'idle' | 'exit' | 'enter'>('idle');
  const toggleLayout = () => {
    if (layoutPhase !== 'idle') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      setListView((previous) => !previous);
    else setLayoutPhase('exit');
  };
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const settle = () => {
      if (!media.matches) return;
      if (layoutPhase === 'exit') setListView((previous) => !previous);
      setLayoutPhase('idle');
    };
    media.addEventListener('change', settle);
    return () => media.removeEventListener('change', settle);
  }, [layoutPhase]);

  const finishLayoutTransition = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (layoutPhase === 'exit') {
      setListView((previous) => !previous);
      setLayoutPhase('enter');
    } else if (layoutPhase === 'enter') setLayoutPhase('idle');
  };
  const deals = properties
    .map((name, id) => ({ name, id }))
    .filter(({ name, id }) =>
      `${name} ${addresses[id % addresses.length]}`
        .toLocaleLowerCase('pt-BR')
        .includes(search.toLocaleLowerCase('pt-BR')),
    );
  return { search, setSearch, listView, layoutPhase, toggleLayout, finishLayoutTransition, deals };
}
export type DealsListState = ReturnType<typeof useDealsList>;
