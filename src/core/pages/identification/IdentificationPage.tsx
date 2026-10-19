'use client';
import { IdentificationForm } from './components/IdentificationForm';

import { Button } from '@/components/ui/Button';
import { GoogleLogo, Logo } from '@/core/components/BrandAssets';
import { ShieldCheck } from 'lucide-react';

import { useIdentification } from './hooks/UseIdentification';
export type IdentificationProps = { onComplete: (google: boolean) => void };
export function Identification({ onComplete }: IdentificationProps) {
  const state = useIdentification({ onComplete });
  const { step, phase, height, contentRef, leaving, transitionTo, animationFinished } = state;
  return (
    <main className="login identification-page">
      <div className="login-background" aria-hidden="true">
        <div className="login-background-photo" />
        <div className="login-background-wash" />
      </div>
      <section className="login-inner">
        <Logo />
        <h1>
          <em>Olá!</em> Bem-vindo à portal ORA!
        </h1>
        <h2>
          Primeiro, <em>identifique-se</em>
        </h2>
        <div className="login-step-shell" style={{ height }}>
          <div
            ref={contentRef}
            className={`login-step-content step-${phase}`}
            data-step={step}
            onAnimationEnd={animationFinished}
          >
            <IdentificationForm state={state} />
            {step !== 'cpf' && (
              <button
                type="button"
                className="back-login"
                disabled={leaving}
                onClick={() => transitionTo(step === 'code' ? 'channel' : 'cpf')}
              >
                {step === 'code' ? 'Escolher outro canal' : 'Voltar para identificação'}
              </button>
            )}
          </div>
        </div>
        <div className="login-google">
          <span>Entrar via</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Entrar com Google"
            disabled={leaving}
            onClick={() => transitionTo('portal', true)}
          >
            <GoogleLogo />
          </Button>
        </div>
        <span className="login-foot">
          <ShieldCheck size={14} /> Seu próximo passo começa com segurança.
        </span>
      </section>
    </main>
  );
}
