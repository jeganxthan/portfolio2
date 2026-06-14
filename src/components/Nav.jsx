export default function Nav() {
  const scrollToSection = (event, id) => {
    event.preventDefault();

    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', '#home');
      return;
    }

    const target = document.getElementById(id);

    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    window.history.pushState(null, '', `#${id}`);
  };

  return (
    <header className="nav pg">
      <a
        href="#home"
        className="brand font-display"
        onClick={(event) =>
          scrollToSection(event, 'home')
        }
      >
        Jeganathan
      </a>
      <nav>
        <a
          href="#about"
          onClick={(event) =>
            scrollToSection(event, 'about')
          }
        >
          About
        </a>
        <a
          href="#projects"
          onClick={(event) =>
            scrollToSection(event, 'projects')
          }
        >
          Projects
        </a>
        <a
          href="#experience"
          onClick={(event) =>
            scrollToSection(event, 'experience')
          }
        >
          Experience
        </a>
        <a
          href="#contact"
          onClick={(event) =>
            scrollToSection(event, 'contact')
          }
        >
          Contact
        </a>
      </nav>
      <a
        className="nav-cta"
        href="#contact"
        onClick={(event) =>
          scrollToSection(event, 'contact')
        }
      >
        Hire Me
      </a>
    </header>
  );
}
