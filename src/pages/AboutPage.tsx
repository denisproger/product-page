import { Link } from 'react-router';
import PageHeader from '../components/ui/PageHeader';
import { STATS, TEAM, VALUES } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function AboutPage() {
  useDocumentTitle('About us');

  return (
    <div className="container page">
      <PageHeader title="About Stride Co." subtitle="A small sneaker brand from Brno, Czech Republic." />

      <section className="about-intro">
        <div className="about-intro__text">
          <h2>How it started</h2>
          <p>
            In 2019 our founder Anna was training for her first marathon and couldn't find a shoe that was light,
            comfortable and not crazy expensive. So she designed one herself, in a small workshop near the centre of Brno.
          </p>
          <p>
            Today we make eight models for running, the city and the basketball court. Every pair is tested by real
            people for hundreds of kilometres before it reaches our shop.
          </p>
        </div>
        <img className="about-intro__image" src={`${import.meta.env.BASE_URL}images/trail-blazer-olive-3.svg`} alt="Trail Blazer sneaker in Moss Olive" />
      </section>

      <ul className="stats">
        {STATS.map((stat) => (
          <li key={stat.label} className="stat">
            <p className="stat__value">{stat.value}</p>
            <p className="muted">{stat.label}</p>
          </li>
        ))}
      </ul>

      <section className="section">
        <h2 className="section__title">What we believe in</h2>
        <ul className="cards-3">
          {VALUES.map((value, index) => (
            <li key={value.title} className="value-card">
              <span className="value-card__number">0{index + 1}</span>
              <h3>{value.title}</h3>
              <p className="muted">{value.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section__title">The team</h2>
        <ul className="cards-3">
          {TEAM.map((person) => (
            <li key={person.name} className="team-card">
              <span className="avatar avatar--large" aria-hidden="true">
                {person.initials}
              </span>
              <h3>{person.name}</h3>
              <p className="muted">{person.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="cta">
        <h2>Ready to find your pair?</h2>
        <p className="muted">Free shipping over €150 and 30-day returns.</p>
        <div className="cta__buttons">
          <Link to="/shop" className="button button--primary button--large">
            Go to the shop
          </Link>
          <Link to="/contact" className="button button--ghost button--large">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
