import { useEffect } from "react";

const ParticlesJs = () => {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: "#1b1231" }, // Black particles
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#6928AB" },
          },
          opacity: { value: 1, random: false }, // Set to 1 for full visibility
          size: { value: 4, random: true },     // Slightly larger for clarity
          line_linked: {
            enable: true,
            distance: 100,
            color: "#6928AB", // Black lines
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
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
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            bubble: { distance: 200, size: 10, duration: 2, opacity: 0.8 },
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
    }
  }, []);

return (
  <div
    id="particles-js"
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
    background: "#0a021b",
      zIndex: -1, // Keeps it behind other elements
    }}
  />
);

};

export default ParticlesJs;
