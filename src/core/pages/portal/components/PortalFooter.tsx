'use client';

import { Logo } from '@/core/components/BrandAssets';
export function PortalFooter() {
  return (
    <footer className="mt-[35px] flex items-center justify-between gap-[15px] border-t border-line py-[25px] text-[14px] text-[#a5a7ae] [&>.ora-logo]:w-[70px] max-[760px]:mt-[25px] max-[760px]:py-5 max-[760px]:hidden print:!hidden">
      <Logo />
    </footer>
  );
}
