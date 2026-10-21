import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { DataTable } from '@/core/components/DataTable';

describe('Financial data table', () => {
  it('shows the description tooltip beside the acquisition value on hover', async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <DataTable
          rows={[
            [
              'Modalidade de aquisição',
              'Financiamento isolado',
              'Explicação fictícia da modalidade.',
            ],
            ['Banco', 'Banco fictício'],
          ]}
        />
      </TooltipProvider>,
    );
    expect(screen.getByText('Financiamento isolado')).toBeInTheDocument();
    const trigger = screen.getByRole('button', { name: 'Entenda modalidade de aquisição' });
    expect(trigger.parentElement).toHaveTextContent('Financiamento isolado');
    expect(screen.getAllByRole('button')).toHaveLength(1);
    await user.hover(trigger);
    expect(await screen.findByRole('tooltip')).toHaveTextContent(
      'Explicação fictícia da modalidade.',
    );
    await user.unhover(trigger);
    await user.pointer({ target: document.body, coords: { clientX: 500, clientY: 500 } });
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });
});
