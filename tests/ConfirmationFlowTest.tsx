import { fireEvent, render, screen, within } from '@testing-library/react';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { PortalProvider } from '@/core/pages/portal/components/PortalProvider';
import { usePortal } from '@/core/pages/portal/hooks/UsePortal';
import { ValueConfirmationPage } from '@/core/pages/value-confirmation/ValueConfirmationPage';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/myDeals/2/confirmValues',
}));

function ConfirmationHarness() {
  const { reviews } = usePortal();
  return (
    <>
      <ValueConfirmationPage businessId={2} />
      <output aria-label="Resultado da sessão">{JSON.stringify(reviews[2] ?? null)}</output>
    </>
  );
}
function renderFlow() {
  return render(
    <TooltipProvider>
      <PortalProvider>
        <ConfirmationHarness />
      </PortalProvider>
    </TooltipProvider>,
  );
}
function begin() {
  expect(screen.getByRole('button', { name: 'Começar' })).toBeDisabled();
  fireEvent.click(screen.getByRole('checkbox'));
  fireEvent.click(screen.getByRole('button', { name: 'Começar' }));
}
function acceptAll() {
  for (const checkbox of screen.getAllByRole('checkbox')) fireEvent.click(checkbox);
}

describe('Full confirmation UI', () => {
  it('requires consent, advances through all steps and stores confirmed values in the portal', () => {
    renderFlow();
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    begin();
    expect(
      screen.getByRole('complementary', { name: 'Consultor responsável pela confirmação' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Compradores' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sim, próximo' }));
    expect(screen.getByText('Financiamento isolado')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sim, próximo' }));
    expect(screen.getByText('420 meses')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sim, próximo' }));
    expect(screen.getByRole('button', { name: 'Finalizar e confirmar valores' })).toBeDisabled();
    acceptAll();
    expect(screen.getByRole('button', { name: 'Finalizar e enviar solicitações' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Finalizar e confirmar valores' }));
    expect(screen.getByRole('heading', { name: 'Valores confirmados!' })).toBeInTheDocument();
    expect(JSON.parse(screen.getByLabelText('Resultado da sessão').textContent ?? '')).toEqual({
      status: 'confirmed',
      adjustments: ['', '', ''],
    });
  });

  it('validates the adjustment dialog, supports editing/removal and stores the final message', () => {
    renderFlow();
    begin();
    fireEvent.click(screen.getByRole('button', { name: 'Não, solicitar ajuste' }));
    expect(screen.getByRole('dialog', { name: 'Solicitação de ajuste' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar e prosseguir' }));
    expect(screen.getByText('Descreva o ajuste antes de prosseguir.')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox', { name: 'O que precisa ser ajustado?' }), {
      target: { value: 'Ajustar nome fictício\n- Incluir sobrenome' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar e prosseguir' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Etapa anterior' }));
    expect(screen.getByText('Ajustar nome fictício - Incluir sobrenome')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Remover ajuste' }));
    expect(
      screen.queryByRole('heading', { name: 'Ajuste solicitado nesta etapa' }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Não, solicitar ajuste' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'O que precisa ser ajustado?' }), {
      target: { value: 'Ajuste definitivo fictício' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar e prosseguir' }));
    for (let i = 0; i < 2; i++)
      fireEvent.click(screen.getByRole('button', { name: 'Sim, próximo' }));
    acceptAll();
    expect(screen.getByRole('button', { name: 'Finalizar e confirmar valores' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Finalizar e enviar solicitações' }));
    const success = screen.getByRole('heading', { name: 'Solicitações de ajuste registradas!' });
    expect(success).toBeInTheDocument();
    expect(
      within(success.parentElement as HTMLElement).getByText('Ajuste definitivo fictício'),
    ).toBeInTheDocument();
    expect(JSON.parse(screen.getByLabelText('Resultado da sessão').textContent ?? '')).toEqual({
      status: 'adjustments',
      adjustments: ['Ajuste definitivo fictício', '', ''],
    });
  });
});
