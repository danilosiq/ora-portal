'use client';
import type { ClipboardEvent, KeyboardEvent } from 'react';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent,
  type FormEvent,
} from 'react';
type UseIdentificationProps = { onComplete: (google: boolean) => void };
type Step = 'cpf' | 'channel' | 'code';
type Channel = 'sms' | 'email';
export function useIdentification({ onComplete }: UseIdentificationProps) {
  const [step, setStep] = useState<Step>('cpf');
  const [phase, setPhase] = useState<'enter' | 'idle' | 'exit'>('idle');
  const [cpf, setCpf] = useState('');
  const [channel, setChannel] = useState<Channel>('email');
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const shellRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cpfRef = useRef<HTMLInputElement>(null);
  const channelRef = useRef<HTMLParagraphElement>(null);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);
  const nextStep = useRef<Step | 'portal' | null>(null);
  const googleEntry = useRef(false);
  const moved = useRef(false);
  const leaving = phase === 'exit';

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPhase('enter');
  }, []);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    let previousHeight = content.offsetHeight;
    let animation: Animation | undefined;
    const measure = () => {
      const nextHeight = content.offsetHeight;
      if (nextHeight === previousHeight) return;
      const shell = shellRef.current;
      if (shell && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const startHeight =
          animation?.playState === 'running'
            ? shell.getBoundingClientRect().height
            : previousHeight;
        animation?.cancel();
        animation = shell.animate([{ height: `${startHeight}px` }, { height: `${nextHeight}px` }], {
          duration: 420,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        });
      }
      previousHeight = nextHeight;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, []);

  useEffect(() => {
    if (!moved.current) return;
    if (step === 'cpf') cpfRef.current?.focus({ preventScroll: true });
    if (step === 'channel') channelRef.current?.focus({ preventScroll: true });
    if (step === 'code') codeRefs.current[0]?.focus({ preventScroll: true });
  }, [step]);

  function finishExit() {
    const target = nextStep.current;
    if (!target) return;
    nextStep.current = null;
    if (target === 'portal') {
      onComplete(googleEntry.current);
      return;
    }
    moved.current = true;
    setStep(target);
    setError('');
    setPhase(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'idle' : 'enter');
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finishWithoutMotion = () => {
      if (!media.matches) return;
      const target = nextStep.current;
      if (!target) {
        setPhase('idle');
        return;
      }
      nextStep.current = null;
      if (target === 'portal') {
        onComplete(googleEntry.current);
        return;
      }
      moved.current = true;
      setStep(target);
      setError('');
      setPhase('idle');
    };
    finishWithoutMotion();
    media.addEventListener('change', finishWithoutMotion);
    return () => media.removeEventListener('change', finishWithoutMotion);
  }, [onComplete]);

  function transitionTo(target: Step | 'portal', google = false) {
    if (nextStep.current) return;
    googleEntry.current = google;
    nextStep.current = target;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finishExit();
    else setPhase('exit');
  }
  function animationFinished(event: AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (phase === 'exit') finishExit();
    else if (phase === 'enter') setPhase('idle');
  }
  function selectChannel(value: Channel) {
    setChannel(value);
    setCode(['', '', '', '']);
    transitionTo('code');
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    if (leaving) return;
    if (step === 'cpf') {
      if (cpf.replace(/\D/g, '').length !== 11) {
        setError('Digite os 11 dígitos do CPF para continuar.');
        return;
      }
      transitionTo('channel');
    } else if (step === 'code') {
      if (code.some((digit) => !digit)) {
        setError('Preencha os quatro dígitos do código.');
        return;
      }
      transitionTo('portal');
    }
  }

  function updateCpf(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    setCpf(
      digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
    );
    setError('');
  }
  function updateCode(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1);
    setCode((previous) => previous.map((existing, i) => (i === index ? digit : existing)));
    setError('');
    if (digit) codeRefs.current[index + 1]?.focus();
  }
  function handleCodePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4).split('');
    setCode(Array.from({ length: 4 }, (_, i) => digits[i] || ''));
    codeRefs.current[Math.min(digits.length, 3)]?.focus();
    setError('');
  }
  function handleCodeKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace' && !code[index]) codeRefs.current[index - 1]?.focus();
  }
  return {
    updateCpf,
    updateCode,
    handleCodePaste,
    handleCodeKeyDown,
    step,
    phase,
    cpf,
    channel,
    code,
    error,
    shellRef,
    contentRef,
    cpfRef,
    channelRef,
    codeRefs,
    leaving,
    transitionTo,
    animationFinished,
    selectChannel,
    submit,
  };
}

export type IdentificationState = ReturnType<typeof useIdentification>;
