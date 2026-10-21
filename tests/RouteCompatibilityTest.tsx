import RootRoutePage from '@/app/page';
import DealDetailsRoutePage from '@/app/myDeals/[id]/page';
import ConfirmValuesRoutePage from '@/app/myDeals/[id]/confirmValues/page';
import { DealDetailsPage } from '@/core/pages/deal-details/DealDetailsPage';
import { ValueConfirmationPage } from '@/core/pages/value-confirmation/ValueConfirmationPage';

jest.mock('next/navigation', () => ({
  redirect: (path: string) => {
    throw new Error('REDIRECT:' + path);
  },
  notFound: () => {
    throw new Error('NOT_FOUND');
  },
}));

describe('App Router compatibility', () => {
  it('redirects the entry route to identification', () => {
    expect(() => RootRoutePage()).toThrow('REDIRECT:/login');
  });

  it.each(['0', '9'])(
    'awaits route params and forwards business %s to its detail page',
    async (id) => {
      const page = await DealDetailsRoutePage({ params: Promise.resolve({ id }) });
      expect(page.type).toBe(DealDetailsPage);
      expect(page.props.businessId).toBe(Number(id));
      expect(page.key).toBe(id);
    },
  );

  it.each(['0', '9'])(
    'awaits route params and forwards business %s to confirmation',
    async (id) => {
      const page = await ConfirmValuesRoutePage({ params: Promise.resolve({ id }) });
      expect(page.type).toBe(ValueConfirmationPage);
      expect(page.props.businessId).toBe(Number(id));
      expect(page.key).toBe(id);
    },
  );

  it.each(['10', '-1', '01', 'invalid'])(
    'returns not-found for invalid business %s in both routes',
    async (id) => {
      await expect(DealDetailsRoutePage({ params: Promise.resolve({ id }) })).rejects.toThrow(
        'NOT_FOUND',
      );
      await expect(ConfirmValuesRoutePage({ params: Promise.resolve({ id }) })).rejects.toThrow(
        'NOT_FOUND',
      );
    },
  );
});
