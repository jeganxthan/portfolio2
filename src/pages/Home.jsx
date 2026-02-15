import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Download,
  Github,
  Globe,
  Linkedin,
  Lock,
  Mail,
  MapPin,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const roles = [
  "Full Stack Developer",
  "MERN Engineer",
  "Backend Developer",
  "Frontend Developer",
  "Golang Developer"
];

const services = [
  {
    title: "Frontend Development",
    description:
      "Responsive interfaces with React.js, TailwindCSS, and interaction-first UX.",
  },
  {
    title: "Full Stack Engineering",
    description:
      "Scalable MERN apps plus Golang solutions with auth, APIs, role control, and real-time modules.",
  },
  {
    title: "Backend & Automation",
    description:
      "Currently building backends with Golang, with prior experience in Node.js and Python.",
  },
];

const skills = [
  { name: "JavaScript", score: 92, icon: "/skills/js.svg" },
  { name: "React", score: 90, icon: "/skills/react.svg" },
  { name: "Node.js", score: 88, icon: "/skills/node.svg" },
  { name: "MongoDB", score: 84, icon: "/skills/MongoDB.svg" },
  { name: "Python", score: 82, icon: "/skills/python.svg" },
  { name: "Tailwind CSS", score: 90, icon: "/skills/tailwind.svg" },
  { name: "Golang", score: 78, icon: "/skills/golang.png" },
  { name: "Appwrite", score: 74, icon: "/skills/appwrite.png" },
];

const skillLogos = [
  { src: "/skills/react.svg", alt: "React" },
  { src: "/skills/js.svg", alt: "JavaScript" },
  { src: "/skills/node.svg", alt: "Node.js" },
  { src: "/skills/MongoDB.svg", alt: "MongoDB" },
  { src: "/skills/python.svg", alt: "Python" },
  { src: "/skills/tailwind.svg", alt: "TailwindCSS" },
  { src: "/skills/ts.svg", alt: "TypeScript" },
  { src: "/skills/express.svg", alt: "Express", lightOnDark: true },
  { src: "/skills/flask.svg", alt: "Flask", lightOnDark: true },
  { src: "/skills/docker.svg", alt: "Docker" },
  { src: "/skills/socket.svg", alt: "Socket.io", lightOnDark: true },
  { src: "/skills/firebase.svg", alt: "Firebase" },
  { src: "/skills/postgresql.svg", alt: "PostgreSQL" },
  { src: "/skills/redis.svg", alt: "Redis" },
  { src: "/skills/golang.png", alt: "golang" },
  { src: "/skills/appwrite.png", alt: "Appwrite" },
];

const projects = [
  {
    title: "Ridemap 365 Admin App",
    image: "/projects/ridemap365.jpeg",
    description:
      "Admin application to track buses and generate operational reports. Tech stack: React Native, Expo and TailwindCSS.",
    private: true,
    category: "Fullstack",
  },
  {
    title: "JSIP Patent Upload",
    image: "/projects/jsip.png",
    description:
      "Project for patent upload and large-scale architecture workflows, built using React, Golang and Appwrite.",
    category: "Fullstack",
    private: true,
  },
  {
    title: "Blueprint Maker",
    image: "/projects/blueprintmaker.png",
    description:
      "Blueprint generator built with React, Rust, Golang, and WASM using OpenRouter AI API to produce simple blueprint outputs.",
    github: "https://github.com/jeganxthan/blueprint_generator.git",
    category: "Fullstack",
  },
  {
    title: "RBAC-Ecommerce",
    image: "/projects/rbac.png",
    description:
      "MERN e-commerce platform with robust role-based access across admin, seller, and user flows.",
    github: "https://github.com/jeganxthan/RBAC-Ecommerce",
    live: "https://rbac-ecommerce.vercel.app/",
    category: "Fullstack",
  },
  {
    title: "Git-SH",
    image: "/projects/gitsh.png",
    description:
      "MERN app with OTP auth, follower system, real-time chat, and WebRTC calls.",
    github: "https://github.com/jeganxthan/Git-SH-react",
    category: "Fullstack",
  },
  {
    title: "Portfolio Website",
    image: "/projects/portfolio.png",
    description:
      "Animated React portfolio with smooth transitions and functional contact integration.",
    github: "https://github.com/jeganxthan/portfolio_next",
    live: "https://portfolio-next-orcin-rho.vercel.app/",
    category: "Frontend",
  },
  {
    title: "Canvas",
    image: "/projects/canvas.png",
    description:
      "Real-time collaborative whiteboard with synchronized drawing via Socket.IO.",
    github: "https://github.com/jeganxthan/canvas",
    category: "Fullstack",
  },
  {
    title: "LoadBalance",
    image: "/projects/Load.png",
    description:
      "WebSocket system using Redis Pub/Sub and Nginx load balancing for horizontal scale, following backend patterns I now apply with Golang + Appwrite.",
    github: "https://github.com/jeganxthan/Loadbalance",
    category: "Backend",
  },
  {
    title: "Resume Bot",
    image: "/projects/resume.png",
    description:
      "Flask + PostgreSQL resume assistant with JWT auth and AI-enhanced interactions.",
    github: "https://github.com/jeganxthan/resume_bot",
    category: "Backend",
  },
  {
    title: "Namaste AI",
    image: "/projects/namaste.png",
    description:
      "AI-based project focused on intelligent assistance and modern workflow support.",
    github: "https://github.com/jeganxthan/Namaste.git",
    category: "Fullstack",
  },
];

function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const rootRef = useRef(null);
  const roleRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((item) => item.category === activeCategory);
  }, [activeCategory]);
  const visibleProjects = useMemo(() => {
    if (showAllProjects) return filteredProjects;
    return filteredProjects.slice(0, 3);
  }, [filteredProjects, showAllProjects]);

  const marqueeLogos = useMemo(
    () =>
      Array.from({ length: 9 }, (_, repeatIndex) =>
        skillLogos.map((logo, logoIndex) => ({
          ...logo,
          id: `${repeatIndex}-${logoIndex}`,
        }))
      ).flat(),
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".topbar > *", {
          y: -18,
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.06,
        })
        .from(
          ".hero-line",
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.08,
          },
          "-=0.2"
        )
        .from(
          ".hero-right > *",
          {
            x: 24,
            duration: 0.65,
            stagger: 0.08,
          },
          "-=0.55"
        )
        .from(
          ".portrait-shell",
          {
            scale: 0.96,
            duration: 0.75,
          },
          "-=0.62"
        );

      gsap.utils.toArray(".reveal-section").forEach((section) => {
        gsap.from(section, {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 84%",
          },
        });
      });

      gsap.utils.toArray(".stagger-group").forEach((group) => {
        const items = group.querySelectorAll(".stagger-item");
        if (!items.length) return;
        gsap.from(items, {
          y: 16,
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: group,
            start: "top 86%",
          },
        });
      });

      gsap.utils.toArray(".meter-fill").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 88%",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!roleRef.current) return;
    gsap.fromTo(
      roleRef.current,
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.38, ease: "power2.out" }
    );
  }, [roleIndex]);

  useEffect(() => {
    gsap.fromTo(
      ".project-grid .project-card",
      { y: 14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.42, stagger: 0.06, ease: "power2.out" }
    );
  }, [activeCategory]);

  useEffect(() => {
    setShowAllProjects(false);
  }, [activeCategory]);

  useEffect(() => {
    gsap.fromTo(
      ".project-grid .project-card",
      { y: 14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.38, stagger: 0.05, ease: "power2.out" }
    );
  }, [showAllProjects]);

  const handleAnchorScroll = (event, sectionId) => {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${sectionId}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch(
        "https://portfolio-mail-x8y5.onrender.com/send_message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message.");
    }

    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className="folio" ref={rootRef}>
      <header className="topbar">
        <a className="brand" href="#home" onClick={(event) => handleAnchorScroll(event, "home")}>
          Jeganathan
        </a>
        <nav>
          <a href="#about" onClick={(event) => handleAnchorScroll(event, "about")}>
            About
          </a>
          <a href="#services" onClick={(event) => handleAnchorScroll(event, "services")}>
            Services
          </a>
          <a href="#projects" onClick={(event) => handleAnchorScroll(event, "projects")}>
            Projects
          </a>
          <a href="#experience" onClick={(event) => handleAnchorScroll(event, "experience")}>
            Experience
          </a>
          <a href="#contact" onClick={(event) => handleAnchorScroll(event, "contact")}>
            Contact
          </a>
        </nav>
        <a className="cta topbar-cta" href="#contact" onClick={(event) => handleAnchorScroll(event, "contact")}>
          Let&apos;s Talk
          <ArrowUpRight size={14} />
        </a>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-left">
          <span id="about" className="anchor-point" />
          <p className="hero-line hero-kicker">Portfolio 2026</p>
          <h1 className="hero-line">
            Building Digital
            <br />
            Products That Feel
            <br />
            Fast, Clean, and Real.
          </h1>
          <p className="hero-line hero-text">
            I’m a Full Stack Developer with strong MERN expertise, currently
            building products with Golang. I focus on clean UI,
            reliable backend logic, and practical automation to ship faster.
          </p>

          <div className="hero-line role-pill" ref={roleRef}>
            {roles[roleIndex]}
          </div>

          <div className="hero-line hero-actions">
            <a className="cta" href="/jeganathanResume.pdf" download>
              Download CV
              <Download size={14} />
            </a>
            <a className="ghost" href="#projects">
              Explore Work
            </a>
          </div>

          <div className="hero-line hero-stats">
            <span>06+ Featured Projects</span>
            <span>01 Internship</span>
            <span>24/7 Learning Mode</span>
          </div>
        </div>

        <aside className="hero-right">
          <div className="portrait-shell">
            <img src="/jegan.png" alt="Jeganathan" />
          </div>
        </aside>
      </section>

      <section className="logo-ribbon reveal-section">
        <div className="logo-marquee">
          <div className="logo-track">
            {marqueeLogos.map((logo) => (
              <div className="logo-item" key={`track-a-${logo.id}`}>
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className={logo.lightOnDark ? "logo-asset logo-asset-invert" : "logo-asset"}
                  />
                ) : (
                  <span className="logo-text">{logo.label}</span>
                )}
              </div>
            ))}
          </div>
          <div className="logo-track" aria-hidden="true">
            {marqueeLogos.map((logo) => (
              <div className="logo-item" key={`track-b-${logo.id}`}>
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className={logo.lightOnDark ? "logo-asset logo-asset-invert" : "logo-asset"}
                  />
                ) : (
                  <span className="logo-text">{logo.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell reveal-section" id="services">
        <div className="section-head">
          <p>Services</p>
          <h2>What I Do</h2>
          <small className="section-note">
            Currently building with Golang + Appwrite.
          </small>
        </div>

        <div className="services-grid stagger-group">
          {services.map((service) => (
            <article className="service-card stagger-item" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell reveal-section">
        <div className="section-head">
          <p>Skills</p>
          <h2>Professional Stack</h2>
          <small className="section-note">
            Expanding backend expertise with Golang.
          </small>
        </div>

        <div className="skills-grid stagger-group">
          {skills.map((skill) => (
            <article className="skill-card stagger-item" key={skill.name}>
              <div className="skill-head">
                <div>
                  {skill.icon ? (
                    <img src={skill.icon} alt={skill.name} />
                  ) : (
                    <span className="skill-fallback">{skill.badge}</span>
                  )}
                  <span>{skill.name}</span>
                </div>
                <p>{skill.score}%</p>
              </div>
              <div className="meter-track">
                <span className="meter-fill" style={{ width: `${skill.score}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell reveal-section" id="projects">
        <div className="section-head row">
          <div>
            <p>Portfolio</p>
            <h2>Featured Projects</h2>
            <small className="section-note">
              Also building new modules on Golang.
            </small>
          </div>
          <div className="filter-group">
            {["All", "Frontend", "Backend", "Fullstack"].map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="project-grid stagger-group">
          {visibleProjects.map((project) => (
            <article className="project-card stagger-item" key={project.title}>
              <img src={project.image} alt={project.title} />
              <div className="project-body">
                <p className="project-tag">{project.category}</p>
                <h3>{project.title}</h3>
                <small>{project.description}</small>
                <div className="project-links">
                  {project.private ? (
                    <span className="project-private">
                      <Lock size={14} /> Private Project
                    </span>
                  ) : project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Github size={14} /> GitHub
                    </a>
                  ) : null}
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <Globe size={14} /> Live
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length > 3 ? (
          <div className="more-row">
            <button
              type="button"
              className="cta"
              onClick={() => setShowAllProjects((current) => !current)}
            >
              {showAllProjects ? "Show Less Projects" : "Show All Projects"}
              {showAllProjects ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        ) : null}
      </section>

      <section className="section-shell reveal-section" id="experience">
        <div className="section-head experience-head">
          <p>Experience</p>
          <h2>My Work Experience</h2>
        </div>

        <div className="experience-timeline stagger-group">
          <div className="experience-line" />
          <article className="experience-item stagger-item">
            <div className="experience-content">
              <h3>Software Engineer Intern</h3>
              <h4>Ridemap</h4>
              <p>
                Developed a real-time geofencing platform using Node.js with WebSocket-based frontend and React Native apps, now expanding it with Golang and Appwrite.
              </p>
            </div>
            <div className="experience-node">1</div>
            <div className="experience-date">Aug 2025 - Present</div>
          </article>
        </div>
      </section>

      <section className="section-shell reveal-section" id="contact">
        <div className="section-head">
          <p>Contact</p>
          <h2>Let&apos;s Build Something</h2>
        </div>

        <div className="contact-grid">
          <aside className="contact-card">
            <article>
              <MapPin size={17} />
              <p>Pondicherry, India</p>
            </article>
            <article>
              <Mail size={17} />
              <p>jega4044@gmail.com</p>
            </article>
            <article>
              <Linkedin size={17} />
              <p>
                <a
                  href="https://www.linkedin.com/in/jeganathan-i-430869258"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <span> / </span>
                <a href="https://github.com/jeganxthan" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </p>
            </article>
          </aside>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(event) =>
                setFormData((current) => ({ ...current, name: event.target.value }))
              }
              required
            />

            <label htmlFor="email">Your Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData((current) => ({ ...current, email: event.target.value }))
              }
              required
            />

            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(event) =>
                setFormData((current) => ({ ...current, message: event.target.value }))
              }
              required
            />

            <button type="submit" className="cta">
              Send Message
              <ArrowUpRight size={14} />
            </button>
            {status ? <small className="status-text">{status}</small> : null}
          </form>
        </div>
      </section>

      <footer className="footer section-shell">
        <p>I am Jegan, a passionate developer building modern web applications.</p>
        <p>© {new Date().getFullYear()} Jegan. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
