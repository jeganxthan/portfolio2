import IsometricCubes from "./IsometricCubes";
import PointerHighlight from "./PointerHighlight";

export default function Hero() {
  const name = "JEGANATHAN".split("");

  return (
    <section id="home" className="hero pg">
      <div className="hero-location">
        India
      </div>

      <div className="grid  items-center gap-8 lg:gap-16 flex-1 min-h-0">
        {/* Left */}
        <div className="min-w-0 flex flex-col justify-center">
          <p className="text-[11px] tracking-[0.28em] uppercase text-zinc-400 mb-3">
            Software Engineer 
          </p>

          <h1
            className="font-display m-0 leading-[0.78] text-[clamp(80px,11vw,180px)]"
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

          <p className="font-display text-[clamp(24px,3vw,48px)] text-zinc-400 mt-4">
            Building fast clean digital products.
          </p>
        </div>

        {/* Right */}
<div
  className="
    hidden lg:block
    absolute
    right-0
    top-1/2
    -translate-y-1/2
    w-[700px]
    h-[700px]
    opacity-100
    pointer-events-none
  "
  aria-hidden="true"
>
  <IsometricCubes />
</div>
      </div>

      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-end pt-6">
        <p className="max-w-[520px] text-sm leading-7 text-zinc-400">
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

        <div className="hidden lg:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-zinc-400">
          <span>Scroll</span>
          <div className="w-px h-14 bg-gradient-to-b from-white/30 to-transparent" />
        </div>

        <div className="flex gap-5 lg:justify-end">
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