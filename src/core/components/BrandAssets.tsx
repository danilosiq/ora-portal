import linkAccountIcon from '@/core/assets/icons/LinkAccount.svg';
import consultantPhoto from '@/core/assets/images/Consultant.png';
import googleLogo from '@/core/assets/images/GoogleLogo.png';
import oraLogo from '@/core/assets/images/OraLogo.png';
import Image from 'next/image';
export function Logo() {
  return <Image className="ora-logo" src={oraLogo} width={160} height={57} alt="ORA" priority />;
}
export function GoogleLogo() {
  return <Image className="google-logo" src={googleLogo} width={95} height={95} alt="" />;
}
export function LinkAccountIcon() {
  return (
    <Image className="link-account-icon" src={linkAccountIcon} width={24} height={24} alt="" />
  );
}
type ConsultantPhotoProps = { large?: boolean };
export function ConsultantPhoto({ large = false }: ConsultantPhotoProps) {
  return (
    <Image
      className={large ? 'consultant-photo large' : 'consultant-photo'}
      src={consultantPhoto}
      width={large ? 100 : 32}
      height={large ? 100 : 32}
      alt="Foto ilustrativa do consultor"
    />
  );
}
