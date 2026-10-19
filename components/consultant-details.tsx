import { Mail, Phone } from 'lucide-react';
import { ConsultantPhoto } from '@/components/business-content';

export function ConsultantDetails() {
  return <div className="consultant-details">
    <ConsultantPhoto large />
    <h3>Marcelo Costa</h3>
    <p className="consultant-role">Consultor de financiamento</p>
    <hr />
    <a href="tel:+554100000000"><Phone size={20} /> (41) 0000-0000</a>
    <a href="mailto:consultor@example.com"><Mail size={20} /> consultor@example.com</a>
    <hr />
    <p className="company"><strong>Empresa:</strong> Exemplo Consultoria</p>
    <span className="demo-note">Contato fictício para demonstração.</span>
  </div>;
}
