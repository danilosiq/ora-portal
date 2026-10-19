'use client';

import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import { GoogleLogo as Google, LinkAccountIcon } from '@/core/components/BrandAssets';
import { BadgeCheck, Headset } from 'lucide-react';
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
      <DialogContent className={dialog === 'google' ? 'google-modal' : undefined}>
        {dialog === 'google' ? (
          <>
            <div className="google-dialog">
              <div>
                <DialogTitle className="dialog-title">
                  Entre de uma maneira mais fácil com o{' '}
                  <span>
                    <em>Google</em>!
                  </span>
                </DialogTitle>
                <DialogDescription className="dialog-description">
                  Vincule sua conta ORA com o Google e aproveite para entrar de uma maneira mais
                  fácil e segura!
                </DialogDescription>
              </div>
              <Google />
            </div>
            <div className="dialog-actions">
              <Button variant="outline" disabled={linked} onClick={linkAccount}>
                {linked ? <BadgeCheck size={19} /> : <LinkAccountIcon />}
                {linked ? 'Vínculo simulado concluído' : 'Vincular'}
              </Button>
              <Button variant="ghost" onClick={() => setDialog(null)}>
                Fechar
              </Button>
              <button className="hide-google-invite" onClick={hideGoogleInvite}>
                Não mostrar isso novamente
              </button>
            </div>
          </>
        ) : (
          <>
            <DialogTitle className="dialog-title">
              {dialog === 'about'
                ? 'Sobre o ORA'
                : dialog === 'help'
                  ? 'Como podemos ajudar?'
                  : 'Meu perfil'}
            </DialogTitle>
            <DialogDescription className="dialog-description">
              {dialog === 'about'
                ? 'O ORA reúne as informações do seu negócio para você acompanhar cada etapa da aquisição do seu imóvel. Este portal utiliza dados fictícios e não realiza operações reais.'
                : dialog === 'help'
                  ? 'Seu consultor pode ajudar com dúvidas sobre documentos, prazos e etapas do financiamento. Os contatos abaixo são ilustrativos.'
                  : 'Dados fictícios utilizados nesta demonstração.'}
            </DialogDescription>
            {dialog === 'help' ? (
              <div className="help-contact">
                <Headset size={26} />
                <div>
                  <strong>Central de atendimento</strong>
                  <p>atendimento@example.com</p>
                  <p>Segunda a sexta, das 9h às 18h</p>
                </div>
              </div>
            ) : null}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
