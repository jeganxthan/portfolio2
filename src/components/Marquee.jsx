import { skills } from '../data/portfolio';

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Technology stack">
      <div>
        {[0, 1].map((set) => (
          <span key={set}>
            {skills.map((skill) => (
              <b className="font-display" key={`${set}-${skill}`}>
                {skill}
                <i />
              </b>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}
