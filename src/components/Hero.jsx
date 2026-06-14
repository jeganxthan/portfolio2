import IsometricCubes from "./IsometricCubes";
import PointerHighlight from "./PointerHighlight";

export default function Hero() {
  const name = "JEGANATHAN".split("");

  return (
    <section id="home" className="hero pg">
      <div className="hero-location">
        India
      </div>

      <div className="hero-layout">
        <div className="hero-main">
          <p className="eyebrow">
            Software Engineer 
          </p>

          <h1
            className="font-display"
            aria-label="JEGANATHAN"
          >
            {name.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={
                  index < 3
                    ? "hero-char hero-char-solid"
                    : "hero-char"
                }
              >
                {letter}
              </span>
            ))}
          </h1>

          <p className="hero-subtitle font-display">
            Building fast clean digital products.
          </p>
        </div>

        <div className="hero-cubes" aria-hidden="true">
          <IsometricCubes />
        </div>
      </div>

      <div className="hero-bottom">
        <p>
          B.Tech graduate and{" "}
          <PointerHighlight color="#22c55e">
            <span>Backend Developer</span>
          </PointerHighlight>{" "}
          passionate about scalable applications, APIs,
          real-time systems, and{" "}
           <PointerHighlight color="#22c55e">
            <span>clean product</span>
          </PointerHighlight>{" "}  interfaces.
        </p>

        <div className="scroll-cue">
          <span>Scroll</span>
          <i />
        </div>

        <div className="hero-links">
          <a
            href="https://github.com/jeganxthan"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-400 hover:text-white"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/jeganathan-i-430869258"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-400 hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
