import { createRef, useState } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { LinkedAccounts } from '@/core/pages/my-profile/components/LinkedAccounts';
import { ConsultantContactLinks } from '@/core/components/ConsultantContactLinks';
import { ConsultantSheet } from '@/core/components/ConsultantSheet';
import { IntermediariesPanel } from '@/core/components/IntermediariesPanel';

describe('Linked Google accounts', () => {
  it('renders the empty state and starts linking', () => {
    const onLink = jest.fn();
    render(<LinkedAccounts accounts={[]} onLink={onLink} onUnlink={jest.fn()} />);
    expect(screen.getByText('Nenhuma conta Google vinculada.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Vincular nova conta Google' }));
    expect(onLink).toHaveBeenCalledTimes(1);
  });
  it('identifies the exact account being unlinked', () => {
    const onUnlink = jest.fn();
    render(
      <LinkedAccounts
        accounts={[
          { id: 8, email: 'conta@example.com' },
          { id: 9, email: 'outra@example.com' },
        ]}
        onLink={jest.fn()}
        onUnlink={onUnlink}
      />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Desvincular outra@example.com' }));
    expect(onUnlink).toHaveBeenCalledWith(9);
  });
});

describe('Contact links', () => {
  it('uses consistent telephone, WhatsApp and email destinations', () => {
    render(
      <ConsultantContactLinks
        phone="554100000099"
        phoneLabel="(41) 0000-0099"
        email="pessoa@example.com"
        contactLabel="Pessoa Fictícia"
      />,
    );
    expect(screen.getByRole('link', { name: '(41) 0000-0099' })).toHaveAttribute(
      'href',
      'tel:+554100000099',
    );
    expect(screen.getByRole('link', { name: 'pessoa@example.com' })).toHaveAttribute(
      'href',
      'mailto:pessoa@example.com',
    );
    const whatsapp = screen.getByRole('link', { name: 'Abrir WhatsApp de Pessoa Fictícia' });
    expect(whatsapp).toHaveAttribute('href', 'https://wa.me/554100000099');
    expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
  });
  it('renders separate contact options for both intermediaries', () => {
    render(<IntermediariesPanel />);
    expect(screen.getByText('Lucas Martins')).toBeInTheDocument();
    expect(screen.getByText('Beatriz Santos')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Abrir WhatsApp de Lucas Martins' })).toHaveAttribute(
      'href',
      'https://wa.me/554100000001',
    );
    expect(screen.getByRole('link', { name: 'Abrir WhatsApp de Beatriz Santos' })).toHaveAttribute(
      'href',
      'https://wa.me/554100000002',
    );
  });
});

function ConsultantSheetHarness() {
  const [open, setOpen] = useState(false);
  const triggerRef = createRef<HTMLButtonElement>();
  return (
    <>
      <button ref={triggerRef} onClick={() => setOpen(true)}>
        Consultar contato
      </button>
      <ConsultantSheet
        open={open}
        onOpenChange={setOpen}
        triggerRef={triggerRef}
        description="Contato fictício"
      />
    </>
  );
}

describe('Consultant bottom sheet', () => {
  it('opens the contact dialog and closes with Escape', async () => {
    render(<ConsultantSheetHarness />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Consultar contato' }));
    const dialog = screen.getByRole('dialog', { name: 'Consultor responsável Exban' });
    expect(within(dialog).getByText('Marcelo Costa')).toBeInTheDocument();
    expect(
      within(dialog).getByRole('link', { name: 'Abrir WhatsApp de consultor' }),
    ).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
