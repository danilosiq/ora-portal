import { fireEvent, render, screen } from '@testing-library/react';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { DealTabs } from '@/core/pages/deal-details/components/DealTabs';
import { useDealDetails } from '@/core/pages/deal-details/hooks/UseDealDetails';

function DealTabsHarness() {
  const state = useDealDetails();
  return (
    <TooltipProvider>
      <DealTabs businessId={0} state={state} />
    </TooltipProvider>
  );
}

describe('Business details tabs', () => {
  it('shows buyers, sellers and properties in that order, with the detailed adjustment', () => {
    render(<DealTabsHarness />);
    const panel = screen.getByRole('tabpanel', { name: 'Participantes' });
    expect(panel).toBeVisible();
    const headings = Array.from(panel.querySelectorAll('h2')).map((node) => node.textContent);
    expect(headings.slice(-3)).toEqual([' Compradores', ' Vendedores', ' Imóveis']);
    expect(screen.getByText('Você solicitou um ajuste, com a seguinte mensagem')).toBeVisible();
  });

  it('switches all four tabs while keeping their contents mounted for native printing', () => {
    const { container } = render(<DealTabsHarness />);
    for (const [name, content] of [
      ['Valores da compra e venda', 'Financiamento isolado'],
      ['Financiamento e despesas', '420 meses'],
      ['Avisos gerais', 'Tarifa de avaliação'],
      ['Participantes', 'Alex Oliveira'],
    ]) {
      fireEvent.click(screen.getByRole('tab', { name }));
      expect(screen.getByRole('tab', { name })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tabpanel', { name })).toBeVisible();
      expect(screen.getByRole('tabpanel', { name })).toHaveTextContent(content);
      expect(screen.getByRole('tabpanel', { name })).not.toHaveClass('hidden');
      expect(container.querySelectorAll('[role=tabpanel].hidden')).toHaveLength(3);
    }
    expect(container.querySelectorAll('[role=tabpanel]')).toHaveLength(4);
    for (const panel of container.querySelectorAll('[role=tabpanel]'))
      expect(panel).toHaveClass('print:!block');
  });
});
