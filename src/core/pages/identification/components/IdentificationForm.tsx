'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRight, ChevronRight, IdCard } from 'lucide-react';
import type { IdentificationState } from '../hooks/UseIdentification';
const destinations = { sms: '(41) XXXX-0000', email: 'ex***@exmplo.com' };
type IdentificationFormProps = { state: IdentificationState };
export function IdentificationForm({ state }: IdentificationFormProps) {
  const {
    updateCpf,
    updateCode,
    handleCodePaste,
    handleCodeKeyDown,
    step,
    cpf,
    channel,
    code,
    error,
    cpfRef,
    channelRef,
    codeRefs,
    leaving,
    selectChannel,
    submit,
  } = state;
  return (
    <form
      className={`panel login-panel rounded-[10px] border border-[#f5f5f5] bg-white px-6 pt-5 pb-[29px] shadow-[0_3px_5px_#0002] max-[760px]:p-5 [&.channel-panel]:mx-auto [&.channel-panel]:w-[524px] [&.channel-panel]:max-w-full [&.channel-panel]:rounded-xl [&.channel-panel]:px-3 [&.channel-panel]:pt-[13px] [&.channel-panel]:pb-[6px] max-[760px]:[&.channel-panel]:px-[13px] max-[760px]:[&.channel-panel]:pt-[15px] max-[760px]:[&.channel-panel]:pb-[7px] ${step === 'channel' ? 'channel-panel' : ''}`}
      onSubmit={submit}
    >
      <fieldset className="m-0 min-w-0 border-0 p-0" disabled={leaving}>
        {step !== 'channel' && (
          <div className="section-label muted flex items-center gap-[7px] text-[21px] font-semibold text-[#a2a2b0]">
            <IdCard size={21} /> Identificação
          </div>
        )}
        {step === 'cpf' ? (
          <>
            <label
              className="cpf-label mt-[25px] block text-left text-[16px] text-[#9295a0]"
              htmlFor="cpf"
            >
              CPF
            </label>
            <input
              ref={cpfRef}
              id="cpf"
              autoComplete="off"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={cpf}
              aria-invalid={!!error}
              onChange={(event) => updateCpf(event.target.value)}
              className="cpf-input w-full rounded-none border-0 border-b border-[#b9bac0] bg-transparent py-[10px] text-[20px] outline-none placeholder:text-[#c2c3c9] focus:border-primary focus:shadow-none focus:outline-none focus-visible:outline-none"
            />
            <Button
              variant="outline"
              className="login-submit text-primary mx-auto mt-7 h-11 min-w-[150px]"
            >
              Continuar <ArrowRight size={18} />
            </Button>
          </>
        ) : step === 'channel' ? (
          <>
            <p
              ref={channelRef}
              className="channel-prompt mx-auto mb-[5px] max-w-[370px] text-center text-[16px] leading-[1.65] outline-none max-[760px]:max-w-[290px]"
              tabIndex={-1}
              id="channel-prompt"
            >
              Escolha o canal para o envio do código de autenticação
            </p>
            <div
              className="channel-options flex flex-col [&>button]:flex [&>button]:min-h-[43px] [&>button]:w-full [&>button]:items-center [&>button]:justify-between [&>button]:gap-3 [&>button]:border-b [&>button]:border-[#d0d0d9] [&>button]:bg-transparent [&>button]:py-[10px] [&>button]:text-left [&>button]:text-[15px] [&>button]:leading-[1.5] [&>button]:text-[#9393a3] [&>button]:transition-[color,background] [&>button]:duration-200 [&>button:last-child]:border-b-0 [&>button>svg]:shrink-0 [&>button:hover]:bg-[#fffaf5] [&>button:hover]:text-primary [&>button:focus-visible]:rounded-[3px] [&>button:focus-visible]:text-primary [&>button:focus-visible]:outline-offset-1 max-[760px]:[&>button]:min-h-[49px] max-[760px]:[&>button]:gap-[9px] max-[760px]:[&>button]:text-[14px]"
              role="group"
              aria-labelledby="channel-prompt"
            >
              <button type="button" onClick={() => selectChannel('sms')}>
                <span>Enviar código via SMS para número {destinations.sms}</span>
                <ChevronRight size={20} />
              </button>
              <button type="button" onClick={() => selectChannel('email')}>
                <span>Enviar código via e-mail para {destinations.email}</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="code-description mt-5 text-[16px] leading-[1.75]">
              Enviamos um código {channel === 'sms' ? 'via SMS' : 'por e-mail'} para{' '}
              <strong>{destinations[channel]}</strong>.<br />
              Insira abaixo para continuar.
            </p>
            <div className="code-inputs my-[18px] flex justify-center gap-[14px] [&>input]:h-[65px] [&>input]:w-[52px] [&>input]:rounded-lg [&>input]:border [&>input]:border-[#e3e4e7] [&>input]:bg-[#f1f2f4] [&>input]:text-center [&>input]:text-[27px] [&>input]:text-ink">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    codeRefs.current[index] = element;
                  }}
                  aria-label={`Dígito ${index + 1}`}
                  inputMode="numeric"
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  maxLength={1}
                  value={digit}
                  onPaste={handleCodePaste}
                  onKeyDown={(event) => handleCodeKeyDown(index, event)}
                  onChange={(event) => updateCode(index, event.target.value)}
                />
              ))}
            </div>
            <p className="demo-note text-[16px] leading-[1.75] text-muted">
              Demonstração: use qualquer código de 4 dígitos.
            </p>
            <Button
              variant="outline"
              className="login-submit text-primary mx-auto mt-7 h-11 min-w-[150px]"
            >
              Validar <ArrowRight size={18} />
            </Button>
          </>
        )}
        {error && (
          <p role="alert" className="error mt-4 text-[16px] leading-[1.75] text-red-600">
            {error}
          </p>
        )}
      </fieldset>
    </form>
  );
}
