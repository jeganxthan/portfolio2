export default function Footer() {
  const scrollToTop = (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    window.history.pushState(null, '', '#home');
  };

  return (
    <footer className="footer pg">
      <p>© {new Date().getFullYear()} Jeganathan I. Built with React, Vite & GSAP.</p>
      <a href="#home" onClick={scrollToTop}>Back to top</a>
    </footer>
  );
}
