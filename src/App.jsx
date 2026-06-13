import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import About from './components/About';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Nav from './components/Nav';
import Projects from './components/Projects';
import LinkHoverCursor from './components/LinkHoverCursor';
import LinkPreview from './components/LinkPreview';

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    lenis.on('scroll', () => ScrollTrigger.update());

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.from('.hero-main .eyebrow, .hero-char, .hero-subtitle, .hero-cubes, .hero-bottom > *', {
        y: 28,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.06,
        ease: 'power3.out',
      });

      gsap.utils.toArray('.section').forEach((section) => {
        gsap.from(section, {
          y: 36,
          autoAlpha: 0,
          duration: 0.78,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
          },
        });
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <Cursor />
      <LinkHoverCursor />
      <LinkPreview />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
