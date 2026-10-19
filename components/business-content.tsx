import Image from 'next/image';
import { Handshake, House, Mail, Phone, User, Users } from 'lucide-react';
import { addresses, properties } from '@/lib/business-data';

export function Logo() {
  return <Image className="ora-logo" src="/ora-logo.png" width={160} height={57} alt="ORA" priority />;
}
export function GoogleLogo() {
  return <Image className="google-logo" src="/google-logo.png" width={95} height={95} alt="" />;
}
export function LinkAccountIcon() {
  return <Image className="link-account-icon" src="/link-account.svg" width={24} height={24} alt="" />;
}
export function ConsultantPhoto({ large = false }: { large?: boolean }) {
  return <Image className={large ? 'consultant-photo large' : 'consultant-photo'} src="/consultant.png" width={large ? 100 : 32} height={large ? 100 : 32} alt="Foto ilustrativa do consultor" />;
}
export function DataTable({ rows }: { rows: string[][] }) {
  return <div className="panel data-table">{rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>;
}
export function BusinessOverview({ businessId, showContact = false }: { businessId: number; showContact?: boolean }) {
  return <>
    <article className="panel"><h2><Users size={20} /> Participantes</h2><div className="participants">
      <div><h3>Compradores</h3><p><User size={16} /> Alex Oliveira</p><p><User size={16} /> Camila Oliveira</p></div>
      <div><h3>Vendedores</h3><p><User size={16} /> Roberto Almeida</p><p><User size={16} /> Imobiliária Exemplo LTDA</p></div>
    </div></article>
    <article className="panel"><h2><Handshake size={20} /> Intermediação</h2>
      <div className="person-row"><span className="avatar">LM</span><div>Lucas Martins<small>Imobiliária Exemplo LTDA</small></div></div>
      <div className="person-row"><span className="avatar">BS</span><div>Beatriz Santos<small>Imobiliária Exemplo LTDA</small></div></div>
    </article>
    <article className="panel"><h2><House size={20} /> Imóveis</h2><p className="property-row">{properties[businessId]} — {addresses[businessId % addresses.length]}</p><p className="property-row">Garagem · Vaga 45 · Subsolo 1</p></article>
    {showContact && <article className="panel review-contact"><h2><Phone size={20} /> Contato Exban</h2><div className="contact-person"><ConsultantPhoto /><strong>Marcelo Costa</strong></div><a href="tel:+554100000000"><Phone size={17} /> (41) 0000-0000</a><a href="mailto:consultor@example.com"><Mail size={17} /> consultor@example.com</a><small>Contato ilustrativo para demonstração.</small></article>}
  </>;
}
