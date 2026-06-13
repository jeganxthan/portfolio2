import { useState } from 'react';

export default function Contact() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact" className={showForm ? 'contact contact-form-view section pg' : 'contact contact-start section pg'}>
      {!showForm ? (
        <div className="got-project">
          <p className="section-kicker">Let&apos;s work together</p>
          <h2 className="font-display">
            Got a <span>project?</span>
          </h2>
          <a href="mailto:jega4044@gmail.com" className="mail-link">
            jega4044@gmail.com
          </a>
          <div className="contact-actions">
            <button type="button" onClick={() => setShowForm(true)}>
              Send Message
              <span aria-hidden="true">↗</span>
            </button>
            <a
              href="https://www.linkedin.com/in/jeganathan-i-430869258"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="contact-copy">
            <p className="section-kicker">Contact</p>
            <h2 className="font-display">
              Let&apos;s work
              <span>together.</span>
            </h2>
            <p>
              Have a project in mind or looking to hire a Full Stack Developer?
              Drop a message and I&apos;ll reply within 24 hours.
            </p>
            <div className="contact-details">
              <article>
                <span>Email</span>
                <a href="mailto:jega4044@gmail.com">jega4044@gmail.com</a>
              </article>
              <article>
                <span>Location</span>
                <p>India</p>
              </article>
              <article>
                <span>Availability</span>
                <p>Open to opportunities</p>
              </article>
            </div>
          </div>

          <form className="contact-form">
            <label>
              <span>Name *</span>
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              <span>Email *</span>
              <input type="email" placeholder="your@email.com" />
            </label>
            <label className="wide">
              <span>Subject *</span>
              <input type="text" placeholder="Project enquiry / Job opportunity / Collaboration" />
            </label>
            <label className="wide">
              <span>Message *</span>
              <textarea placeholder="Tell me about your project, timeline, and budget..." />
            </label>
            <button type="button">Send Message</button>
          </form>
        </>
      )}
    </section>
  );
}
