import { getBusinessAdjustment } from '@/core/utils/BusinessAdjustments';
import { getBusinessProgress } from '@/core/utils/BusinessProgress';
import { getBusinessId, portalRoutes } from '@/core/utils/PortalRoutes';

describe('Business route identifiers', () => {
  it.each(['0', '1', '9'])('accepts existing business %s', (id) => {
    expect(getBusinessId({ id })).toBe(Number(id));
  });
  it.each(['', '-1', '10', '01', '1.5', '1e0', 'abc', ' 1', '999999999999999999999'])(
    'rejects invalid business %s',
    (id) => {
      expect(getBusinessId({ id })).toBeNull();
    },
  );
  it('builds detail and confirmation URLs for the same business', () => {
    expect(portalRoutes.business(8)).toBe('/myDeals/8');
    expect(portalRoutes.confirmation(8)).toBe('/myDeals/8/confirmValues');
  });
});

describe('Adjustment precedence', () => {
  it('returns the mock owner and message when no review exists', () => {
    expect(getBusinessAdjustment({ businessId: 0 })).toMatchObject({ requestedBy: 'you' });
    expect(getBusinessAdjustment({ businessId: 3 })).toMatchObject({ requestedBy: 'other' });
    expect(getBusinessAdjustment({ businessId: 2 })).toBeUndefined();
  });
  it('clears mock adjustments after confirmation', () => {
    expect(
      getBusinessAdjustment({
        businessId: 3,
        review: { status: 'confirmed', adjustments: ['', '', ''] },
      }),
    ).toBeUndefined();
  });
  it('maps each nonblank message to its original section, preserving line breaks', () => {
    expect(
      getBusinessAdjustment({
        businessId: 3,
        review: {
          status: 'adjustments',
          adjustments: ['Nome fictício\n- Ajustar sobrenome', '  ', 'Revisar despesa'],
        },
      }),
    ).toEqual({
      requestedBy: 'you',
      messages: [
        { label: 'Participantes', text: 'Nome fictício\n- Ajustar sobrenome' },
        { label: 'Financiamento e despesas', text: 'Revisar despesa' },
      ],
    });
  });
});

describe('Business progress', () => {
  it.each([1, 7])('identifies completed business %s', (businessId) => {
    expect(getBusinessProgress({ businessId })).toMatchObject({
      completed: true,
      name: 'Processo concluído',
      index: 6,
    });
  });
  it.each([0, 2, 3, 4, 5, 6, 8, 9])('identifies current stage of business %s', (businessId) => {
    expect(getBusinessProgress({ businessId })).toMatchObject({
      completed: false,
      name: 'Análise de crédito',
      index: 0,
    });
  });
});
