import { fireEvent, render, screen } from '@testing-library/react';
import { useIdentification } from '@/core/pages/identification/hooks/UseIdentification';
import { IdentificationForm } from '@/core/pages/identification/components/IdentificationForm';

type IdentificationHarnessProps = { onComplete: (google: boolean) => void };
function IdentificationHarness({ onComplete }: IdentificationHarnessProps) {
  const state = useIdentification({ onComplete });
  return (
    <div onAnimationEnd={state.animationFinished}>
      <IdentificationForm state={state} />
      <button onClick={() => state.transitionTo('portal', true)}>Google simulado</button>
      <button onClick={() => state.transitionTo('channel')}>Outro canal</button>
      <span data-testid="phase">{state.phase}</span>
    </div>
  );
}

describe('Simulated identification', () => {
  it('validates and masks CPF before allowing channel selection', () => {
    render(<IdentificationHarness onComplete={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Digite os 11 dígitos do CPF para continuar.',
    );
    fireEvent.change(screen.getByLabelText('CPF'), { target: { value: '00000000000extra' } });
    expect(screen.getByLabelText('CPF')).toHaveValue('000.000.000-00');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(
      screen.getByRole('group', { name: 'Escolha o canal para o envio do código de autenticação' }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText('CPF')).not.toBeInTheDocument();
  });

  it.each(['SMS', 'e-mail'])(
    'selects %s, rejects incomplete codes and completes with four digits',
    (channel) => {
      const onComplete = jest.fn();
      render(<IdentificationHarness onComplete={onComplete} />);
      fireEvent.change(screen.getByLabelText('CPF'), { target: { value: '00000000000' } });
      fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
      fireEvent.click(
        screen.getByRole('button', { name: new RegExp('Enviar código via ' + channel) }),
      );
      expect(
        screen.getByText(
          channel === 'SMS' ? /Enviamos um código via SMS/ : /Enviamos um código por e-mail/,
        ),
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Validar' }));
      expect(screen.getByRole('alert')).toHaveTextContent('Preencha os quatro dígitos do código.');
      expect(onComplete).not.toHaveBeenCalled();
      for (let i = 1; i <= 4; i++)
        fireEvent.change(screen.getByLabelText('Dígito ' + i), { target: { value: String(i) } });
      fireEvent.click(screen.getByRole('button', { name: 'Validar' }));
      expect(onComplete).toHaveBeenCalledWith(false);
    },
  );

  it('pastes only four numeric digits and clears the code when switching channels', () => {
    render(<IdentificationHarness onComplete={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Outro canal' }));
    fireEvent.click(screen.getByRole('button', { name: /Enviar código via e-mail/ }));
    fireEvent.paste(screen.getByLabelText('Dígito 1'), {
      clipboardData: { getData: () => 'ab12345' },
    });
    for (let i = 1; i <= 4; i++)
      expect(screen.getByLabelText('Dígito ' + i)).toHaveValue(String(i));
    fireEvent.click(screen.getByRole('button', { name: 'Outro canal' }));
    fireEvent.click(screen.getByRole('button', { name: /Enviar código via SMS/ }));
    for (let i = 1; i <= 4; i++) expect(screen.getByLabelText('Dígito ' + i)).toHaveValue('');
  });

  it('supports simulated Google entry', () => {
    const onComplete = jest.fn();
    render(<IdentificationHarness onComplete={onComplete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Google simulado' }));
    expect(onComplete).toHaveBeenCalledWith(true);
  });

  it('waits for its own exit animation before replacing the step', () => {
    const mediaState = window.matchMedia('');
    const originalImplementation = jest.mocked(window.matchMedia).getMockImplementation();
    jest
      .spyOn(window, 'matchMedia')
      .mockImplementation((media) => ({ ...mediaState, media, matches: false }));
    const { container } = render(<IdentificationHarness onComplete={jest.fn()} />);
    fireEvent.animationEnd(container.firstChild as HTMLElement);
    expect(screen.getByTestId('phase')).toHaveTextContent('idle');
    fireEvent.change(screen.getByLabelText('CPF'), { target: { value: '00000000000' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(screen.getByTestId('phase')).toHaveTextContent('exit');
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled();
    fireEvent.animationEnd(screen.getByRole('button', { name: 'Continuar' }));
    expect(screen.getByLabelText('CPF')).toBeInTheDocument();
    fireEvent.animationEnd(container.firstChild as HTMLElement);
    expect(
      screen.getByRole('group', { name: 'Escolha o canal para o envio do código de autenticação' }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('phase')).toHaveTextContent('enter');
    jest.mocked(window.matchMedia).mockImplementation(originalImplementation!);
  });
});
