import { render, screen, within } from '@testing-library/react';
import { BusinessOverview } from '@/core/components/BusinessOverview';
import { BusinessParticipantsCard } from '@/core/components/BusinessParticipantsCard';

describe('Participant attorneys', () => {
  it.each(['buyers', 'sellers'] as const)(
    'shows attorneys inside the %s card with the represented name',
    (role) => {
      const { container } = render(
        <BusinessParticipantsCard
          role={role}
          participants={['Pessoa Fictícia']}
          attorneys={[{ name: 'Procurador Fictício', representedName: 'Pessoa Fictícia' }]}
        />,
      );
      const card = container.querySelector('.' + role + '-panel') as HTMLElement;
      expect(
        within(card).getByRole('heading', {
          level: 2,
          name: role === 'buyers' ? 'Compradores' : 'Vendedores',
        }),
      ).toBeInTheDocument();
      expect(within(card).getByText('Pessoa Fictícia', { exact: true })).toBeInTheDocument();
      const section = within(card).getByRole('region', { name: 'Procuradores' });
      expect(
        within(section).getByRole('heading', { level: 3, name: 'Procuradores' }),
      ).toBeInTheDocument();
      expect(within(section).getByText('Procurador Fictício')).toHaveTextContent(
        '(Representando: Pessoa Fictícia)',
      );
      expect(within(section).getByText('(Representando: Pessoa Fictícia)')).toHaveClass(
        'text-muted',
      );
      expect(section.querySelector('h3 svg')).toHaveAttribute('width', '21');
      expect(section.querySelector('h3 svg')).toHaveClass('shrink-0');
    },
  );

  it.each([undefined, []])('omits the section when attorneys are %s', (attorneys) => {
    render(
      <BusinessParticipantsCard
        role="buyers"
        participants={['Pessoa Fictícia']}
        attorneys={attorneys}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Compradores' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Procuradores' })).not.toBeInTheDocument();
    expect(screen.queryByText(/Representando:/)).not.toBeInTheDocument();
  });

  it('preserves each attorney and represented person when several attorneys exist', () => {
    render(
      <BusinessParticipantsCard
        role="sellers"
        participants={['Pessoa A', 'Pessoa B']}
        attorneys={[
          { name: 'Procurador A', representedName: 'Pessoa A' },
          { name: 'Procurador B', representedName: 'Pessoa B' },
        ]}
      />,
    );
    const section = screen.getByRole('region', { name: 'Procuradores' });
    expect(within(section).getByText('Procurador A')).toHaveTextContent(
      '(Representando: Pessoa A)',
    );
    expect(within(section).getByText('Procurador B')).toHaveTextContent(
      '(Representando: Pessoa B)',
    );
    expect(within(section).getAllByText(/Representando:/)).toHaveLength(2);
  });

  it.each([
    [0, true, true],
    [2, false, false],
    [3, true, false],
    [4, false, true],
  ])('keeps attorneys in the correct party for business %s', (businessId, buyers, sellers) => {
    const { container } = render(
      <BusinessOverview businessId={businessId as number} showIntermediaries />,
    );
    for (const [role, visible] of [
      ['buyers', buyers],
      ['sellers', sellers],
    ] as const) {
      const card = container.querySelector('.' + role + '-panel') as HTMLElement;
      const attorneys = within(card).queryByRole('region', { name: 'Procuradores' });
      if (visible) expect(attorneys).toBeInTheDocument();
      else expect(attorneys).not.toBeInTheDocument();
    }
    expect(screen.getByRole('heading', { name: 'Imóveis' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Intermediação' })).toBeInTheDocument();
  });
});
