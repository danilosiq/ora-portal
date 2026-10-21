import { act, renderHook } from '@testing-library/react';
import type { FormEvent } from 'react';
import { useValueConfirmation } from '@/core/pages/value-confirmation/hooks/UseValueConfirmation';

const event = { preventDefault: jest.fn() } as unknown as FormEvent;

describe('Value confirmation', () => {
  it('starts before the participant step, without accepted notices or adjustments', () => {
    const { result } = renderHook(() => useValueConfirmation({ onComplete: jest.fn() }));
    expect(result.current.step).toBe(-1);
    expect(result.current.initialAccepted).toBe(false);
    expect(result.current.allAccepted).toBe(false);
    expect(result.current.hasAdjustments).toBe(false);
    expect(result.current.result).toBeNull();
  });
  it('requires a nonblank adjustment and preserves the current step on error', () => {
    const { result } = renderHook(() => useValueConfirmation({ onComplete: jest.fn() }));
    act(() => result.current.goTo(0));
    act(() => result.current.openAdjustment());
    act(() => result.current.updateDraft('   '));
    act(() => result.current.submitAdjustment(event));
    expect(result.current.error).toBe('Descreva o ajuste antes de prosseguir.');
    expect(result.current.adjustmentOpen).toBe(true);
    expect(result.current.step).toBe(0);
    expect(result.current.adjustments).toEqual(['', '', '']);
  });
  it('saves, reopens, edits and removes the adjustment in its own section', () => {
    const { result } = renderHook(() => useValueConfirmation({ onComplete: jest.fn() }));
    act(() => result.current.goTo(1));
    act(() => result.current.openAdjustment());
    act(() => result.current.updateDraft('  Revisar entrada fictícia\n- Conferir valor  '));
    act(() => result.current.submitAdjustment(event));
    expect(result.current.adjustments).toEqual([
      '',
      'Revisar entrada fictícia\n- Conferir valor',
      '',
    ]);
    expect(result.current.step).toBe(2);
    expect(result.current.adjustmentOpen).toBe(false);
    act(() => result.current.goTo(1));
    act(() => result.current.openAdjustment());
    expect(result.current.draft).toBe('Revisar entrada fictícia\n- Conferir valor');
    act(() => result.current.updateDraft('Ajuste revisado'));
    act(() => result.current.submitAdjustment(event));
    expect(result.current.adjustments[1]).toBe('Ajuste revisado');
    act(() => result.current.setAdjustments(['', '', '']));
    expect(result.current.hasAdjustments).toBe(false);
  });
  it('blocks completion until every final notice is accepted', () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() => useValueConfirmation({ onComplete }));
    act(() => result.current.setAccepted([true, true, true, false]));
    act(() => result.current.finish('confirmed'));
    expect(onComplete).not.toHaveBeenCalled();
    expect(result.current.result).toBeNull();
  });
  it('confirms values only when there are no adjustments', () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() => useValueConfirmation({ onComplete }));
    act(() => result.current.setAccepted([true, true, true, true]));
    act(() => result.current.finish('adjustments'));
    expect(result.current.result).toBeNull();
    act(() => result.current.finish('confirmed'));
    expect(onComplete).toHaveBeenCalledWith({ status: 'confirmed', adjustments: ['', '', ''] });
    expect(result.current.result).toEqual({ status: 'confirmed', adjustments: ['', '', ''] });
  });
  it('requires adjustment submission when any section has an adjustment', () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() => useValueConfirmation({ onComplete }));
    act(() => result.current.setAccepted([true, true, true, true]));
    act(() =>
      result.current.setAdjustments(['Ajustar nome fictício', '', 'Ajustar despesa fictícia']),
    );
    act(() => result.current.finish('confirmed'));
    expect(result.current.result).toBeNull();
    expect(onComplete).not.toHaveBeenCalled();
    act(() => result.current.finish('adjustments'));
    const expected = {
      status: 'adjustments',
      adjustments: ['Ajustar nome fictício', '', 'Ajustar despesa fictícia'],
    };
    expect(onComplete).toHaveBeenCalledWith(expected);
    expect(result.current.result).toEqual(expected);
  });
});
