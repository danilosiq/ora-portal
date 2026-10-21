import { render, screen } from '@testing-library/react';
import { Notice } from '@/core/components/Notice';

describe('Notice variants', () => {
  it.each(['pending', 'danger', 'success'] as const)(
    'renders %s without a border and with black text',
    (variant) => {
      render(<Notice variant={variant} title="Aviso fictício" />);
      const notice = screen.getByRole(variant === 'danger' ? 'alert' : 'status');
      expect(notice).toHaveAttribute('data-variant', variant);
      expect(notice).toHaveClass('border-0', 'text-black', `bg-${variant}-light`);
      expect(screen.getByRole('heading', { name: 'Aviso fictício' })).toHaveClass(
        'text-[18px]',
        'max-[760px]:text-[15px]',
      );
      expect(notice.querySelector('svg')).toHaveAttribute('width', '26');
    },
  );
  it('supports a detailed body without losing its title', () => {
    render(
      <Notice variant="pending" title="Aguardando">
        <p>Detalhes fictícios</p>
      </Notice>,
    );
    expect(screen.getByRole('heading', { name: 'Aguardando' })).toBeInTheDocument();
    expect(screen.getByText('Detalhes fictícios')).toBeInTheDocument();
  });
});
