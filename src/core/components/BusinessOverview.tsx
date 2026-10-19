import { addresses, intermediaries, properties } from '@/core/mocks/BusinessData';
import { Handshake, House, ShoppingCart, User } from 'lucide-react';
type BusinessOverviewProps = {
  businessId: number;
  showIntermediaries?: boolean;
};
export function BusinessOverview({
  businessId,
  showIntermediaries = false,
}: BusinessOverviewProps) {
  return (
    <>
      <article className="panel buyers-panel">
        <h2>
          <ShoppingCart size={21} /> Compradores
        </h2>
        <div className="business-party-list">
          <p>
            <User size={17} /> Alex Oliveira
          </p>
          <p>
            <User size={17} /> Camila Oliveira
          </p>
        </div>
      </article>
      <article className="panel sellers-panel">
        <h2>
          <Handshake size={21} /> Vendedores
        </h2>
        <div className="business-party-list">
          <p>
            <User size={17} /> Roberto Almeida
          </p>
          <p>
            <User size={17} /> Imobiliária Exemplo LTDA
          </p>
        </div>
      </article>
      <article className="panel properties-panel">
        <h2>
          <House size={21} /> Imóveis
        </h2>
        <p className="property-row">
          {properties[businessId]} — {addresses[businessId % addresses.length]}
        </p>
        <p className="property-row">Garagem · Vaga 45 · Subsolo 1</p>
      </article>
      {showIntermediaries && (
        <article className="panel">
          <h2>
            <Handshake size={20} /> Intermediação
          </h2>
          {intermediaries.map((person) => (
            <div className="person-row" key={person.email}>
              <User size={18} />
              <div>
                {person.name}
                <small>{person.company}</small>
              </div>
            </div>
          ))}
        </article>
      )}
    </>
  );
}
