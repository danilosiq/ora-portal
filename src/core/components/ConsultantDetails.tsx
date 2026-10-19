import { ConsultantPhoto } from '@/core/components/BrandAssets';
import { ConsultantContactLinks } from '@/core/components/ConsultantContactLinks';

export function ConsultantDetails() {
  return (
    <div className="consultant-details">
      <ConsultantPhoto large />
      <h3>Marcelo Costa</h3>
      <p className="consultant-role">Consultor de financiamento</p>
      <hr />
      <ConsultantContactLinks />
      <span className="demo-note">Contato fictício para demonstração.</span>
    </div>
  );
}

export function ConsultantCard() {
  return (
    <div className="panel consultant-panel">
      <span className="consultant-panel-label">Consultor responsável Exban</span>
      <ConsultantDetails />
    </div>
  );
}
