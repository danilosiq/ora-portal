import { fireEvent, render, screen } from '@testing-library/react';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { PortalProvider } from '@/core/pages/portal/components/PortalProvider';
import { MyDealsPage } from '@/core/pages/my-deals/MyDealsPage';

const push = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/myDeals',
}));

function renderPage() {
  return render(
    <TooltipProvider>
      <PortalProvider>
        <MyDealsPage />
      </PortalProvider>
    </TooltipProvider>,
  );
}

describe('My deals page', () => {
  it('renders ten businesses and opens the selected business route', () => {
    renderPage();
    const cards = screen.getAllByRole('button', { name: /Apartamento|Casa/ });
    expect(cards).toHaveLength(10);
    fireEvent.click(cards[2]);
    expect(push).toHaveBeenCalledWith('/myDeals/2');
  });
  it('filters, shows the empty state and restores the list after clearing', () => {
    renderPage();
    fireEvent.change(screen.getByRole('textbox', { name: 'Pesquisar negócios' }), {
      target: { value: 'inexistente' },
    });
    expect(screen.getByRole('heading', { name: 'Nenhum negócio encontrado' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Limpar pesquisa' }));
    expect(
      screen.queryByRole('heading', { name: 'Nenhum negócio encontrado' }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Apartamento|Casa/ })).toHaveLength(10);
  });
  it('toggles between compact list and cards using accessible names', () => {
    const { container } = renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar em lista compacta' }));
    expect(screen.getByRole('button', { name: 'Mostrar em cards' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(container.querySelector('#business-results')).toHaveClass('is-list');
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar em cards' }));
    expect(container.querySelector('#business-results')).not.toHaveClass('is-list');
  });
});
