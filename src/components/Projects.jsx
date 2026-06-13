import { useMemo, useState } from 'react';
import { projects } from '../data/portfolio';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = useMemo(
    () => (showAll ? projects : projects.slice(0, 4)),
    [showAll]
  );

  return (
    <section id="projects" className="section pg">
      <div className="section-row">
        <div>
          <p className="section-kicker">Projects</p>
          <h2 className="font-display section-title">Selected work</h2>
        </div>
        <a href="https://github.com/jeganxthan" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>

      <div className="projects-grid">
        {visibleProjects.map((project) => (
          <a
            className="project-card"
            href={project.href || '#contact'}
            target={project.href ? '_blank' : undefined}
            rel={project.href ? 'noreferrer' : undefined}
            key={project.title}
          >
            <span>{project.num}</span>
            <img src={project.image} alt={project.title} loading="lazy" />
            <div>
              <h3 className="font-display">{project.title}</h3>
              <p>{project.desc}</p>
              <div>
                {project.tags.map((tag) => (
                  <em key={tag}>{tag}</em>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      {projects.length > 4 ? (
        <div className="show-more-row">
          <button type="button" onClick={() => setShowAll((current) => !current)}>
            {showAll ? 'Show Less Projects' : 'Show More Projects'}
          </button>
        </div>
      ) : null}
    </section>
  );
}
