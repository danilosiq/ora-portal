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
      className={`panel login-panel ${step === 'channel' ? 'channel-panel' : ''}`}
      onSubmit={submit}
    >
      <fieldset disabled={leaving}>
        {step !== 'channel' && (
          <div className="section-label muted">
            <IdCard size={21} /> Identificação
          </div>
        )}
        {step === 'cpf' ? (
          <>
            <label className="cpf-label" htmlFor="cpf">
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
              className="cpf-input"
            />
            <Button variant="outline" className="login-submit text-primary">
              Continuar <ArrowRight size={18} />
            </Button>
          </>
        ) : step === 'channel' ? (
          <>
            <p ref={channelRef} className="channel-prompt" tabIndex={-1} id="channel-prompt">
              Escolha o canal para o envio do código de autenticação
            </p>
            <div className="channel-options" role="group" aria-labelledby="channel-prompt">
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
            <p className="code-description">
              Enviamos um código {channel === 'sms' ? 'via SMS' : 'por e-mail'} para{' '}
              <strong>{destinations[channel]}</strong>.<br />
              Insira abaixo para continuar.
            </p>
            <div className="code-inputs">
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
            <p className="demo-note">Demonstração: use qualquer código de 4 dígitos.</p>
            <Button variant="outline" className="login-submit text-primary">
              Validar <ArrowRight size={18} />
            </Button>
          </>
        )}
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
      </fieldset>
    </form>
  );
}
