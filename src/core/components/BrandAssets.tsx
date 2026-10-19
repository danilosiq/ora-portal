import linkAccountIcon from '@/core/assets/icons/LinkAccount.svg';
import consultantPhoto from '@/core/assets/images/Consultant.png';
import googleLogo from '@/core/assets/images/GoogleLogo.png';
import oraLogo from '@/core/assets/images/OraLogo.png';
import Image from 'next/image';
export function Logo() {
  return (
    <Image
      className="ora-logo block h-auto w-[126px] shrink-0 object-contain max-[760px]:w-[120px] print:[print-color-adjust:exact]"
      src={oraLogo}
      width={160}
      height={57}
      alt="ORA"
      priority
    />
  );
}
export function GoogleLogo() {
  return (
    <Image
      className="google-logo block size-[26px] shrink-0 object-contain"
      src={googleLogo}
      width={95}
      height={95}
      alt=""
    />
  );
}
export function LinkAccountIcon() {
  return (
    <Image
      className="link-account-icon block size-6 shrink-0 object-contain"
      src={linkAccountIcon}
      width={24}
      height={24}
      alt=""
    />
  );
}
type ConsultantPhotoProps = { large?: boolean };
export function ConsultantPhoto({ large = false }: ConsultantPhotoProps) {
  return (
    <Image
      className={`consultant-photo block shrink-0 rounded-full object-cover ${large ? 'large my-[22px] mb-[17px] size-[100px]' : 'size-[34px]'}`}
      src={consultantPhoto}
      width={large ? 100 : 32}
      height={large ? 100 : 32}
      alt="Foto ilustrativa do consultor"
    />
  );
}
