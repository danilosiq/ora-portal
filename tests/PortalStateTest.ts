import { act, renderHook } from '@testing-library/react';
import { usePortalState } from '@/core/pages/portal/hooks/UsePortal';

const push = jest.fn();
let pathname = '/myDeals';
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => pathname,
}));

describe('Portal session and navigation', () => {
  beforeEach(() => {
    pathname = '/myDeals';
    localStorage.clear();
  });

  it('navigates to native routes and closes expanded menus', () => {
    const { result } = renderHook(usePortalState);
    act(() => result.current.setMenu(true));
    act(() => result.current.navigate('profile'));
    expect(push).toHaveBeenLastCalledWith('/user');
    expect(result.current.menu).toBe(false);
    act(() => result.current.openBusiness(5));
    expect(push).toHaveBeenLastCalledWith('/myDeals/5');
    act(() => result.current.startConfirmation(5));
    expect(push).toHaveBeenLastCalledWith('/myDeals/5/confirmValues');
    act(() => result.current.exitConfirmation(5));
    expect(push).toHaveBeenLastCalledWith('/myDeals/5');
  });
  it('preserves reviews independently for each business', () => {
    const { result } = renderHook(usePortalState);
    const first = {
      status: 'adjustments' as const,
      adjustments: ['Ajustar nome fictício', '', ''],
    };
    const second = { status: 'confirmed' as const, adjustments: ['', '', ''] };
    act(() => result.current.completeReview(0, first));
    act(() => result.current.completeReview(3, second));
    expect(result.current.reviews).toEqual({ 0: first, 3: second });
  });
  it('links unique mock accounts, unlinks one, then clears session state on logout', () => {
    const { result } = renderHook(usePortalState);
    act(() => result.current.openGoogleLink());
    expect(result.current.dialog).toBe('google');
    act(() => result.current.linkAccount());
    expect(result.current.accounts).toHaveLength(3);
    expect(result.current.accounts[2]).toEqual({ id: 3, email: 'alex.conta3@example.com' });
    expect(result.current.linked).toBe(true);
    act(() => result.current.unlinkAccount(2));
    expect(result.current.accounts.map((account) => account.id)).toEqual([1, 3]);
    act(() => result.current.completeReview(0, { status: 'confirmed', adjustments: ['', '', ''] }));
    act(() => result.current.listing.setSearch('Insight'));
    act(() => result.current.logout());
    expect(result.current.reviews).toEqual({});
    expect(result.current.accounts).toEqual([]);
    expect(result.current.linked).toBe(false);
    expect(result.current.listing.search).toBe('');
    expect(push).toHaveBeenLastCalledWith('/login');
  });
  it('shows the Google invite after identification unless the preference was saved', () => {
    pathname = '/login';
    const { result, rerender } = renderHook(usePortalState);
    act(() => result.current.completeIdentification(false));
    expect(push).toHaveBeenLastCalledWith('/myDeals');
    pathname = '/myDeals';
    rerender();
    expect(result.current.dialog).toBe('google');
    act(() => result.current.hideGoogleInvite());
    expect(localStorage.getItem('ora-hide-google-invite')).toBe('true');
    expect(result.current.dialog).toBeNull();
    pathname = '/login';
    rerender();
    act(() => result.current.completeIdentification(false));
    pathname = '/myDeals';
    rerender();
    expect(result.current.dialog).toBeNull();
  });
  it('does not invite an account that entered using Google', () => {
    pathname = '/login';
    const { result, rerender } = renderHook(usePortalState);
    act(() => result.current.completeIdentification(true));
    pathname = '/myDeals';
    rerender();
    expect(result.current.dialog).toBeNull();
    expect(result.current.linked).toBe(true);
  });
});
