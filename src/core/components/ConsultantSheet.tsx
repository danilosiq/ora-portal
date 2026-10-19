'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import { consultantSheetClassName } from '@/core/utils/Presentation';
import type { RefObject } from 'react';
import { ConsultantDetails } from './ConsultantDetails';
type ConsultantSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  description: string;
};
export function ConsultantSheet({
  open,
  onOpenChange,
  triggerRef,
  description,
}: ConsultantSheetProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={consultantSheetClassName}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <DialogTitle className="consultant-sheet-title pr-8 text-[24px] font-semibold max-[760px]:mb-5 max-[760px]:text-[23px] max-[760px]:leading-[1.4]">
          Consultor responsável Exban
        </DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <ConsultantDetails />
      </DialogContent>
    </Dialog>
  );
}
