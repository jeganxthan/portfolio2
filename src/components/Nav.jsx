export default function Nav() {
  return (
    <header className="nav pg">
      <a href="#home" className="brand font-display">
        Jeganathan
      </a>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="nav-cta" href="#contact">
        Hire Me
      </a>
    </header>
  );
}
