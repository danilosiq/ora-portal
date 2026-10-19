import { ConsultantContactLinks } from '@/core/components/ConsultantContactLinks';
import { intermediaries } from '@/core/mocks/BusinessData';
import { User } from 'lucide-react';

type IntermediariesPanelProps = { inSheet?: boolean };
export function IntermediariesPanel({ inSheet = false }: IntermediariesPanelProps) {
  return (
    <section
      className={inSheet ? 'intermediaries-contacts' : 'panel intermediaries-panel'}
      aria-label="Contatos dos intermediadores"
    >
      {!inSheet && <h2>Intermediadores (corretores)</h2>}
      {intermediaries.map((person) => (
        <article className="intermediary-contact" key={person.email}>
          <div className="intermediary-person">
            <User size={21} fill="currentColor" />
            <div>
              <h3>{person.name}</h3>
              <p>{person.company}</p>
            </div>
          </div>
          <ConsultantContactLinks
            phone={person.phone}
            phoneLabel={person.phoneLabel}
            email={person.email}
            contactLabel={person.name}
          />
        </article>
      ))}
    </section>
  );
}
