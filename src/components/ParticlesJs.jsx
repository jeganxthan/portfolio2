import { useEffect } from "react";

const ParticlesJs = () => {
  useEffect(() => {
    // Load the global particlesJS object when the script is ready
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 30, density: { enable: true, value_area: 1000 } },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
          },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 80,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 20, line_linked: { opacity: 1 } },
            bubble: { distance: 20, size: 40, duration: 2, opacity: 8 },
            repulse: { distance: 10, duration: 0.4 },
            push: { particles_nb: 2 },
            remove: { particles_nb: 1 },
          },
        },
        retina_detect: true,
      });
    }
  }, []);

  return <div id="particles-js" style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#07020c" }}></div>;
};

export default ParticlesJs;
