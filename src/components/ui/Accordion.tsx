import { useState } from 'react';
import type { ReactNode } from 'react';

type AccordionItem = {
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
};

// A list of sections where only one is open at a time.
function Accordion({ items }: AccordionProps) {
  // Index of the open section, or null if all are closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `accordion-panel-${index}`;

        return (
          <div key={item.title} className="accordion__item">
            <h3 className="accordion__heading">
              <button
                className="accordion__button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                {item.title}
                <span className="accordion__icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            {isOpen && (
              <div id={panelId} className="accordion__panel">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
