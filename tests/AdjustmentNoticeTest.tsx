import { render, screen } from '@testing-library/react';
import { AdjustmentNotice } from '@/core/components/AdjustmentNotice';
import { BusinessOverview } from '@/core/components/BusinessOverview';

describe('Detailed adjustment card', () => {
  it('preserves the shared card appearance and matching heading/icon sizes', () => {
    const { container } = render(
      <>
        <AdjustmentNotice
          request={{
            requestedBy: 'you',
            messages: [{ text: 'Ajustar nome\n- Incluir sobrenome fictício' }],
          }}
        />
        <BusinessOverview businessId={0} />
      </>,
    );
    const adjustment = container.querySelector('.adjustment-notice');
    const buyers = container.querySelector('.buyers-panel');
    expect(adjustment).toHaveClass('rounded-[10px]', 'p-6', 'shadow-[0_3px_7px_#19223306]');
    expect(buyers).toHaveClass('rounded-[10px]', 'p-6', 'shadow-[0_3px_7px_#19223306]');
    expect(adjustment?.querySelector('h2 svg')).toHaveAttribute('width', '21');
    expect(adjustment?.querySelector('h2 svg')).toHaveClass('shrink-0');
    expect(buyers?.querySelector('h2 svg')).toHaveAttribute('width', '21');
    expect(
      screen.getByRole('heading', {
        name: 'Você solicitou um ajuste! Já estamos tratando sobre...',
      }),
    ).toBeInTheDocument();
    expect(container.querySelector('.whitespace-pre-wrap')).toHaveTextContent(
      'Ajustar nome - Incluir sobrenome fictício',
    );
    expect(container.querySelector('.whitespace-pre-wrap')?.textContent).toBe(
      'Ajustar nome\n- Incluir sobrenome fictício',
    );
  });

  it('distinguishes another participant and displays every requested section', () => {
    render(
      <AdjustmentNotice
        request={{
          requestedBy: 'other',
          messages: [
            { label: 'Participantes', text: 'Ajustar cadastro fictício' },
            { label: 'Financiamento e despesas', text: 'Revisar despesa fictícia' },
          ],
        }}
      />,
    );
    expect(
      screen.getByText('Outro participante solicitou um ajuste, com a seguinte mensagem'),
    ).toBeInTheDocument();
    expect(screen.getByText('Participantes')).toBeInTheDocument();
    expect(screen.getByText('Ajustar cadastro fictício')).toBeInTheDocument();
    expect(screen.getByText('Financiamento e despesas')).toBeInTheDocument();
    expect(screen.getByText('Revisar despesa fictícia')).toBeInTheDocument();
  });
});
