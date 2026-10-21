import { fireEvent, render, screen, within } from '@testing-library/react';
import { DealNotifications } from '@/core/pages/deal-details/components/DealNotifications';
import type { ReviewResult } from '@/core/@types/Business';

const message =
  'Um participante realizou uma solicitação de ajuste, mas ja estamos tratando isso! Você não precisa realizar nenhuma ação, aguarde e jaja terá atualizações';

describe('Business notifications', () => {
  it('keeps your adjustment only in the detailed card, without asking for another action', () => {
    render(<DealNotifications businessId={0} onConfirm={jest.fn()} />);
    expect(screen.queryByText(/Você solicitou um ajuste/)).not.toBeInTheDocument();
    expect(screen.queryByText(message)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clique aqui' })).not.toBeInTheDocument();
    expect(screen.getByText(/Análise de crédito: O banco analisa/)).toBeInTheDocument();
  });

  it('shows the other participant message exactly once, without requesting action', () => {
    render(<DealNotifications businessId={3} onConfirm={jest.fn()} />);
    expect(screen.getAllByText(message)).toHaveLength(1);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clique aqui' })).not.toBeInTheDocument();
  });

  it('opens confirmation when the business needs an action', () => {
    const onConfirm = jest.fn();
    render(<DealNotifications businessId={2} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clique aqui' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('alert')).toHaveTextContent('precisamos de uma ação sua');
  });

  it('shows pending instead of asking for an action while awaiting the bank', () => {
    render(<DealNotifications businessId={4} onConfirm={jest.fn()} />);
    expect(
      screen.getByText('Aguardando o retorno do banco para avançar à próxima etapa.'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('clears a previous adjustment when values are confirmed', () => {
    render(
      <DealNotifications
        businessId={3}
        review={{ status: 'confirmed', adjustments: ['', '', ''] }}
        onConfirm={jest.fn()}
      />,
    );
    expect(screen.queryByText(message)).not.toBeInTheDocument();
    expect(
      screen.getByText('Você concluiu a confirmação dos valores deste negócio.'),
    ).toBeInTheDocument();
  });

  it('does not duplicate an adjustment submitted in the current session', () => {
    render(
      <DealNotifications
        businessId={3}
        review={{ status: 'adjustments', adjustments: ['Ajustar nome fictício', '', ''] }}
        onConfirm={jest.fn()}
      />,
    );
    expect(screen.queryByText(message)).not.toBeInTheDocument();
    expect(screen.queryByText(/Você solicitou um ajuste/)).not.toBeInTheDocument();
  });

  it.each([1, 7])('does not ask for action on completed business %s', (businessId) => {
    render(<DealNotifications businessId={businessId} onConfirm={jest.fn()} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText(/Processo concluído:/)).toBeInTheDocument();
  });

  it.each(Array.from({ length: 10 }, (_, id) => id))(
    'limits business %s to two notices for every review state',
    (businessId) => {
      const reviews: (ReviewResult | undefined)[] = [
        undefined,
        { status: 'confirmed', adjustments: ['', '', ''] },
        { status: 'adjustments', adjustments: ['Ajustar dado fictício', '', ''] },
      ];
      const { rerender } = render(
        <DealNotifications businessId={businessId} onConfirm={jest.fn()} />,
      );
      for (const review of reviews) {
        rerender(
          <DealNotifications businessId={businessId} review={review} onConfirm={jest.fn()} />,
        );
        const region = screen.getByRole('region', { name: 'Avisos do negócio' });
        const notices = [
          ...within(region).queryAllByRole('status'),
          ...within(region).queryAllByRole('alert'),
        ];
        expect(notices.length).toBeGreaterThanOrEqual(1);
        expect(notices.length).toBeLessThanOrEqual(2);
      }
    },
  );
});
