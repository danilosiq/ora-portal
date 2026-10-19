'use client';
import { IdentificationForm } from './components/IdentificationForm';

import { Button } from '@/components/ui/Button';
import { GoogleLogo, Logo } from '@/core/components/BrandAssets';
import { ShieldCheck } from 'lucide-react';

import { useIdentification } from './hooks/UseIdentification';
export type IdentificationProps = { onComplete: (google: boolean) => void };
export function Identification({ onComplete }: IdentificationProps) {
  const state = useIdentification({ onComplete });
  const { step, phase, shellRef, contentRef, leaving, transitionTo, animationFinished } = state;
  return (
    <main className="login identification-page relative isolate flex min-h-svh items-center justify-center overflow-x-clip bg-white px-5 py-10 min-[761px]:items-start min-[761px]:justify-start min-[761px]:p-0">
      <div
        className="login-background pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white"
        aria-hidden="true"
      >
        <div className="login-background-photo absolute top-1/2 left-0 h-[max(100svh,calc(100vw*944/1678))] w-[max(100vw,calc(100svh*1678/944))] -translate-y-1/2 bg-[url('/LoginBackground.png')] bg-[length:100%_100%] bg-center bg-no-repeat transition-[width,height] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[760px]:left-[65%] max-[760px]:-translate-x-[65%] motion-reduce:transition-none" />
        <div className="login-background-wash absolute inset-0 bg-[linear-gradient(90deg,#fff_35%,rgba(255,255,255,0.88)_48%,rgba(255,255,255,0)_78%)] max-[760px]:bg-[#ffffffdc] max-[760px]:bg-none" />
      </div>
      <section className="login-inner relative mx-auto w-[560px] max-w-full text-center min-[761px]:mt-[15vh] min-[761px]:mr-0 min-[761px]:mb-[60px] min-[761px]:ml-[max(32px,calc((100vw-1040px)/2))] min-[761px]:w-[568px] min-[761px]:max-w-[calc(100%-48px)] [&>.ora-logo]:mx-auto [&>.ora-logo]:mb-9 [&>.ora-logo]:w-[160px] min-[761px]:[&>.ora-logo]:mb-6 max-[760px]:[&>.ora-logo]:w-[145px]">
        <Logo />
        <h1 className="text-[31px] leading-[1.4] font-normal tracking-normal min-[761px]:text-[30px] min-[761px]:whitespace-nowrap max-[460px]:text-[25px] max-[760px]:leading-[1.5] [&_em]:font-bold">
          <em>Olá!</em> Bem-vindo à portal ORA!
        </h1>
        <h2 className="mt-[15px] text-[23px] font-medium min-[761px]:mt-[14px] max-[460px]:text-[21px] [&_em]:font-semibold">
          Primeiro, <em>identifique-se</em>
        </h2>
        <div className="login-step-shell relative mt-7 min-[761px]:mt-8" ref={shellRef}>
          <div
            ref={contentRef}
            className={`login-step-content flow-root w-full will-change-[transform,opacity] [&.step-enter]:animate-[identification-in_0.36s_cubic-bezier(0.16,1,0.3,1)_both] [&.step-exit]:animate-[identification-out_0.24s_cubic-bezier(0.4,0,1,1)_both] [&.step-exit]:pointer-events-none motion-reduce:animate-none step-${phase}`}
            data-step={step}
            onAnimationEnd={animationFinished}
          >
            <IdentificationForm state={state} />
            {step !== 'cpf' && (
              <button
                type="button"
                className="back-login mx-auto mt-4 block pb-[3px] text-[15px] text-muted"
                disabled={leaving}
                onClick={() => transitionTo(step === 'code' ? 'channel' : 'cpf')}
              >
                {step === 'code' ? 'Escolher outro canal' : 'Voltar para identificação'}
              </button>
            )}
          </div>
        </div>
        <div className="login-google mt-[29px] flex flex-col items-center gap-[9px] [&>span]:text-[15px] [&>button]:size-[49px] [&>button]:rounded-[20px] [&>button]:border-[#c8c9ce] [&>button]:bg-white [&_.google-logo]:size-[25px]">
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
        <span className="login-foot mt-7 flex justify-center gap-[6px] text-[13px] text-[#9295a0]">
          <ShieldCheck size={14} /> Seu próximo passo começa com segurança.
        </span>
      </section>
    </main>
  );
}
