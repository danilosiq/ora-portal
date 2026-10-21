'use client';
import type { ReviewResult } from '@/core/@types/Business';
import { notices } from '@/core/mocks/BusinessData';
import { useRef, useState, type FormEvent } from 'react';
type UseValueConfirmationProps = { onComplete: (result: ReviewResult) => void };
export function useValueConfirmation({ onComplete }: UseValueConfirmationProps) {
  const [consultantOpen, setConsultantOpen] = useState(false);
  const consultantTriggerRef = useRef<HTMLButtonElement>(null);
  const [step, setStep] = useState(-1);
  const [initialAccepted, setInitialAccepted] = useState(false);
  const [accepted, setAccepted] = useState(notices.map(() => false));
  const [adjustments, setAdjustments] = useState(['', '', '']);
  const [adjustmentOpen, setAdjustmentOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ReviewResult | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasAdjustments = adjustments.some((text) => text.trim());
  const allAccepted = accepted.every(Boolean);

  function goTo(next: number) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  }
  function openAdjustment() {
    setDraft(adjustments[step]);
    setError('');
    setAdjustmentOpen(true);
  }
  function finish(status: ReviewResult['status']) {
    if (
      !allAccepted ||
      (status === 'confirmed' && hasAdjustments) ||
      (status === 'adjustments' && !hasAdjustments)
    )
      return;
    const completed = { status, adjustments: [...adjustments] };
    onComplete(completed);
    setResult(completed);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function submitAdjustment(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) {
      setError('Descreva o ajuste antes de prosseguir.');
      return;
    }
    setAdjustments((previous) =>
      previous.map((text, index) => (index === step ? draft.trim() : text)),
    );
    setAdjustmentOpen(false);
    goTo(step + 1);
  }
  function updateDraft(value: string) {
    setDraft(value);
    setError('');
  }
  return {
    submitAdjustment,
    updateDraft,
    consultantOpen,
    setConsultantOpen,
    consultantTriggerRef,
    step,
    initialAccepted,
    setInitialAccepted,
    accepted,
    setAccepted,
    adjustments,
    setAdjustments,
    adjustmentOpen,
    setAdjustmentOpen,
    draft,
    error,
    result,
    headingRef,
    hasAdjustments,
    allAccepted,
    goTo,
    openAdjustment,
    finish,
  };
}
export type ConfirmationState = ReturnType<typeof useValueConfirmation>;
