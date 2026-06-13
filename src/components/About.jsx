import { useEffect, useState } from 'react';
import { education } from '../data/portfolio';

export default function About() {
  const [asciiArt, setAsciiArt] = useState('');

  useEffect(() => {
    fetch('/ascii-art.txt')
      .then((response) => response.text())
      .then(setAsciiArt)
      .catch(() => setAsciiArt('JEGANATHAN I\\nFULL STACK DEVELOPER'));
  }, []);

  return (
    <section id="about" className="section about pg">
      <p className="section-kicker">About</p>
      <div className="about-grid">
        <div>
          <h2 className="font-display ">
           I develop scalable web and real time systems with a focus on performance and reliability.
          </h2>
          <p className="about-copy">
            I work across React, Node.js, Appwrite, WebSockets, and Golang. At
            Ridemap, I built real-time geofence notification systems, migrated
            Firebase services to Appwrite, and helped support live transport
            flows for 20,000+ active users.
          </p>
          <div className="cv-actions">
            <a href="/jeganathanResume.pdf" download>
              Download My CV
            </a>
            <a href="/jeganathanResume.pdf" target="_blank" rel="noreferrer">
              View PDF
            </a>
          </div>
        </div>
<aside
  className="
    flex
    items-center
    justify-center
    overflow-hidden
    min-h-[500px]
    p-6
  "
  aria-label="ASCII portrait of Jeganathan"
>
  <pre
    className="
      font-mono
      text-[6px]
      md:text-[10px]
      leading-[0.85]
      tracking-[-0.08em]
      text-zinc-200
      whitespace-pre
      max-w-full
      max-h-full
      select-none
    "
  >
    {asciiArt}
  </pre>
</aside>
      </div>

      <div className="about-lower">
        <div className="stat-grid">
          {[
            ['10+', 'Projects'],
            ['20K+', 'Users supported'],
            ['MERN', 'Core stack'],
            ['Golang', 'Current focus'],
          ].map(([value, label]) => (
            <article key={label}>
              <strong className="font-display">{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>

        <div className="education-box">
          <p className="section-kicker">Education</p>
          <article>
            <div>
              <h3>{education.school}</h3>
              <p>{education.course}</p>
            </div>
            <span>{education.date}</span>
          </article>
        </div>
      </div>
    </section>
  );
}
