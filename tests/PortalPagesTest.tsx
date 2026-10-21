import { fireEvent, render, screen, within } from '@testing-library/react';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { PortalProvider } from '@/core/pages/portal/components/PortalProvider';
import { PortalShell } from '@/core/pages/portal/components/PortalShell';
import { MyProfilePage } from '@/core/pages/my-profile/MyProfilePage';
import { AboutORAPage } from '@/core/pages/about/AboutORAPage';
import { IdentificationPage } from '@/core/pages/identification/IdentificationPage';
import { DealDetailsPage } from '@/core/pages/deal-details/DealDetailsPage';
import type { ReactNode } from 'react';

const push = jest.fn();
let pathname = '/myDeals';
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => pathname,
}));
function renderPage(children: ReactNode) {
  return render(
    <TooltipProvider>
      <PortalProvider>
        <PortalShell>{children}</PortalShell>
      </PortalProvider>
    </TooltipProvider>,
  );
}

describe('Portal pages and shell', () => {
  beforeEach(() => {
    pathname = '/myDeals';
    localStorage.clear();
  });

  it('expands the menu, navigates to profile and omits SAC', () => {
    renderPage(<p>Conteúdo fictício</p>);
    expect(screen.queryByText(/SAC/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Meu perfil' }));
    expect(push).toHaveBeenLastCalledWith('/user');
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('offers three mobile navigation destinations', () => {
    renderPage(<p>Conteúdo fictício</p>);
    const navigation = screen.getByRole('navigation', { name: 'Navegação principal' });
    expect(within(navigation).getAllByRole('button')).toHaveLength(3);
    fireEvent.click(within(navigation).getByRole('button', { name: 'Sobre o ORA' }));
    expect(push).toHaveBeenLastCalledWith('/about');
    fireEvent.click(within(navigation).getByRole('button', { name: 'Eu' }));
    expect(push).toHaveBeenLastCalledWith('/user');
    fireEvent.click(within(navigation).getByRole('button', { name: 'Meus negócios' }));
    expect(push).toHaveBeenLastCalledWith('/myDeals');
  });

  it('shows profile totals, links and unlinks Google accounts and logs out', () => {
    pathname = '/user';
    renderPage(<MyProfilePage />);
    expect(screen.getByRole('heading', { name: 'Alex Oliveira' })).toBeInTheDocument();
    expect(screen.getByText('Total de negócios')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Desvincular alex.pessoal@example.com' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Vincular nova conta Google' }));
    const dialog = screen.getByRole('dialog');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Vincular' }));
    expect(
      within(dialog).getByRole('button', { name: 'Vínculo simulado concluído' }),
    ).toBeDisabled();
    fireEvent.click(
      within(dialog)
        .getAllByRole('button', { name: 'Fechar' })
        .find((button) => button.textContent === 'Fechar')!,
    );
    expect(screen.getByText('alex.conta3@example.com')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sair do portal' }));
    expect(push).toHaveBeenLastCalledWith('/login');
  });

  it('saves the preference to hide the Google invitation', () => {
    renderPage(<p>Conteúdo fictício</p>);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    fireEvent.click(screen.getByRole('button', { name: 'Vincular conta Google' }));
    fireEvent.click(screen.getByRole('button', { name: 'Não mostrar isso novamente' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(localStorage.getItem('ora-hide-google-invite')).toBe('true');
  });

  it('renders the About route content', () => {
    pathname = '/about';
    renderPage(<AboutORAPage />);
    expect(screen.getByRole('heading', { name: 'Sobre o ORA' })).toBeInTheDocument();
  });

  it('keeps login outside the portal shell and supports Google entry', () => {
    pathname = '/login';
    renderPage(<IdentificationPage />);
    expect(screen.queryByRole('button', { name: 'Abrir menu' })).not.toBeInTheDocument();
    expect(screen.getByLabelText('CPF')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Entrar com Google' }));
    expect(push).toHaveBeenLastCalledWith('/myDeals');
  });

  it('places notices below the timeline, removes export and opens contact sheets', () => {
    pathname = '/myDeals/2';
    const { container } = renderPage(<DealDetailsPage businessId={2} />);
    expect(screen.queryByRole('button', { name: /Exportar/ })).not.toBeInTheDocument();
    const timeline = container.querySelector('.timeline')!;
    const notifications = screen.getByRole('region', { name: 'Avisos do negócio' });
    expect(
      timeline.compareDocumentPosition(notifications) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Expandir nome do negócio' }));
    expect(screen.getByRole('button', { name: 'Recolher nome do negócio' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    fireEvent.click(
      screen.getByRole('button', { name: /Consultor responsável Exban.*Marcelo Costa/ }),
    );
    expect(screen.getByRole('dialog', { name: 'Consultor responsável Exban' })).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    fireEvent.click(
      screen.getByRole('button', { name: /Intermediadores \(corretores\) Ver contatos/ }),
    );
    const dialog = screen.getByRole('dialog', { name: 'Intermediadores (corretores)' });
    expect(
      within(dialog).getByRole('link', { name: 'Abrir WhatsApp de Lucas Martins' }),
    ).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: 'Escape' });
    fireEvent.click(screen.getByRole('button', { name: 'Clique aqui' }));
    expect(push).toHaveBeenLastCalledWith('/myDeals/2/confirmValues');
    fireEvent.click(
      screen
        .getAllByRole('button', { name: 'Meus negócios' })
        .find((button) => button.classList.contains('back'))!,
    );
    expect(push).toHaveBeenLastCalledWith('/myDeals');
  });
});
