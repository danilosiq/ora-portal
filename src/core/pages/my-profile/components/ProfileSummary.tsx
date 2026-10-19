'use client';

import { Handshake, Mail, Phone, User } from 'lucide-react';

type ProfileSummaryProps = { totalBusinesses: number };
export function ProfileSummary({ totalBusinesses }: ProfileSummaryProps) {
  return (
    <div className="profile-summary">
      <span className="profile-avatar">
        <User size={43} fill="currentColor" strokeWidth={1.5} />
      </span>
      <div className="profile-information">
        <h1 id="profile-title">Alex Oliveira</h1>
        <p>
          <span className="profile-cpf-label">CPF:</span> xxx.xxx.000-00
        </p>
        <p>
          <Phone size={18} /> (41) 0000-0000
        </p>
        <p>
          <Mail size={18} /> exemplo@exmplo.com
        </p>
      </div>
      <div className="profile-count">
        <span>
          <Handshake size={23} /> Total de negócios
        </span>
        <strong>{totalBusinesses}</strong>
      </div>
    </div>
  );
}
