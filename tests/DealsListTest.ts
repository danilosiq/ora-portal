import { act, renderHook } from '@testing-library/react';
import type { AnimationEvent } from 'react';
import { useDealsList } from '@/core/pages/my-deals/hooks/UseDealsList';

describe('Business listing', () => {
  it('starts with ten cards and filters by title or address without case sensitivity', () => {
    const { result } = renderHook(useDealsList);
    expect(result.current.deals).toHaveLength(10);
    expect(result.current.listView).toBe(false);
    act(() => result.current.setSearch('INSIGHT'));
    expect(result.current.deals.map((deal) => deal.id)).toEqual([0]);
    act(() => result.current.setSearch('palmeiras'));
    expect(result.current.deals.some((deal) => deal.id === 0)).toBe(true);
    act(() => result.current.setSearch('endereço inexistente'));
    expect(result.current.deals).toEqual([]);
    act(() => result.current.setSearch(''));
    expect(result.current.deals).toHaveLength(10);
  });
  it('changes layout immediately with reduced motion and preserves the search', () => {
    const { result } = renderHook(useDealsList);
    act(() => result.current.setSearch('Insight'));
    act(() => result.current.toggleLayout());
    expect(result.current.listView).toBe(true);
    expect(result.current.layoutPhase).toBe('idle');
    expect(result.current.deals.map((deal) => deal.id)).toEqual([0]);
    act(() => result.current.toggleLayout());
    expect(result.current.listView).toBe(false);
  });
  it('waits for exit before switching layout and ignores nested animation events and repeated toggles', () => {
    jest
      .mocked(window.matchMedia)
      .mockReturnValueOnce({ ...window.matchMedia(''), matches: false });
    const { result } = renderHook(useDealsList);
    jest
      .mocked(window.matchMedia)
      .mockReturnValueOnce({ ...window.matchMedia(''), matches: false });
    act(() => result.current.toggleLayout());
    expect(result.current.layoutPhase).toBe('exit');
    expect(result.current.listView).toBe(false);
    act(() => result.current.toggleLayout());
    const element = document.createElement('div');
    act(() =>
      result.current.finishLayoutTransition({
        target: document.createElement('span'),
        currentTarget: element,
      } as unknown as AnimationEvent<HTMLDivElement>),
    );
    expect(result.current.listView).toBe(false);
    const event = {
      target: element,
      currentTarget: element,
    } as unknown as AnimationEvent<HTMLDivElement>;
    act(() => result.current.finishLayoutTransition(event));
    expect(result.current.listView).toBe(true);
    expect(result.current.layoutPhase).toBe('enter');
    act(() => result.current.finishLayoutTransition(event));
    expect(result.current.layoutPhase).toBe('idle');
  });
});
