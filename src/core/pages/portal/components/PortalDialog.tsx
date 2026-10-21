'use client';

import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import { GoogleLogo as Google, LinkAccountIcon } from '@/core/components/BrandAssets';
import { BadgeCheck } from 'lucide-react';
import type { PortalState } from '../hooks/UsePortal';
type PortalDialogProps = { state: PortalState };
export function PortalDialog({ state }: PortalDialogProps) {
  const { dialog, setDialog, linked, linkAccount, hideGoogleInvite } = state;
  return (
    <Dialog
      open={dialog !== null}
      onOpenChange={(open) => {
        if (!open) setDialog(null);
      }}
    >
      <DialogContent
        className={
          dialog === 'google'
            ? 'google-modal max-w-[900px] rounded-[6px] px-7 pt-[52px] pb-[46px] max-[760px]:px-6 max-[760px]:pt-10 max-[760px]:pb-[30px] max-[460px]:px-[22px] max-[460px]:pt-[35px] max-[460px]:pb-7 print:hidden'
            : undefined
        }
      >
        <>
          <div className="google-dialog m-0 flex items-center gap-9 [&>div]:flex-1 [&>.google-logo]:mt-[10px] [&>.google-logo]:size-[104px] max-[760px]:gap-5 max-[760px]:[&>.google-logo]:size-20 max-[460px]:grid max-[460px]:grid-cols-[1fr_54px] max-[460px]:gap-[14px] max-[460px]:[&>.google-logo]:mt-[5px] max-[460px]:[&>.google-logo]:size-[54px]">
            <div>
              <DialogTitle className="dialog-title mt-3 mb-4 text-[32px] leading-[1.4] font-normal [.google-dialog_&]:mt-0 [.google-dialog_&]:mb-[22px] [.google-dialog_&]:text-[34px] [.google-dialog_&]:leading-[1.55] [.google-dialog_&]:text-[#080808] [.google-dialog_&]:[&>span]:block [.google-dialog_&]:max-[760px]:text-[29px] [.google-dialog_&]:max-[760px]:leading-[1.4] [.google-dialog_&]:max-[460px]:text-[26px]">
                Entre de uma maneira mais fácil com o{' '}
                <span>
                  <em>Google</em>!
                </span>
              </DialogTitle>
              <DialogDescription className="dialog-description text-[17px] leading-[1.65] text-[#8a909a] [.google-dialog_&]:leading-[1.6] [.google-dialog_&]:text-[#111] [.google-dialog_&]:max-[760px]:text-[16px]">
                Vincule sua conta ORA com o Google e aproveite para entrar de uma maneira mais fácil
                e segura!
              </DialogDescription>
            </div>
            <Google />
          </div>
          <div className="dialog-actions mt-[18px] flex flex-wrap items-center gap-3 [&>button:first-child]:h-auto [&>button:first-child]:min-h-[58px] [&>button:first-child]:min-w-[132px] [&>button:first-child]:gap-[13px] [&>button:first-child]:rounded-[24px] [&>button:first-child]:border-[#cbcbcb] [&>button:first-child]:px-[18px] [&>button:first-child]:py-[15px] [&>button:first-child]:text-[20px] [&>button:first-child]:text-[#111] [&>button:first-child:disabled]:text-[17px] [&>button:nth-child(2)]:h-[38px] [&>button:nth-child(2)]:p-0 [&>button:nth-child(2)]:text-[18px] [&>button:nth-child(2)]:text-[#909090] max-[760px]:[&>button:first-child]:min-h-[52px] max-[760px]:[&>button:first-child]:min-w-[122px] max-[760px]:[&>button:first-child]:px-4 max-[760px]:[&>button:first-child]:py-3 max-[760px]:[&>button:first-child]:text-[18px] max-[760px]:[&>button:nth-child(2)]:text-[16px] max-[460px]:mt-[23px]">
            <Button variant="outline" disabled={linked} onClick={linkAccount}>
              {linked ? <BadgeCheck size={19} /> : <LinkAccountIcon />}
              {linked ? 'Vínculo simulado concluído' : 'Vincular'}
            </Button>
            <Button variant="ghost" onClick={() => setDialog(null)}>
              Fechar
            </Button>
            <button
              className="hide-google-invite border-l border-[#d9dbe1] py-2 pl-[13px] text-left text-[18px] leading-[1.6] text-[#92949b] hover:text-primary max-[760px]:text-[16px] max-[460px]:basis-full max-[460px]:border-0 max-[460px]:pl-0"
              onClick={hideGoogleInvite}
            >
              Não mostrar isso novamente
            </button>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
