"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoLoop from "../components/LogoLoop";
import TiltedCard from "../components/TitledCard";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  const imageLogos = [
    { src: "/skills/css.svg", alt: "CSS" },
    { src: "/skills/docker.svg", alt: "Docker" },
    { src: "/skills/express.svg", alt: "Express" },
    { src: "/skills/firebase.svg", alt: "Firebase" },
    { src: "/skills/flask.svg", alt: "Flask" },
    { src: "/skills/git.svg", alt: "Git" },
    { src: "/skills/gsap.png", alt: "GSAP" },
    { src: "/skills/html.svg", alt: "HTML" },
    { src: "/skills/java.svg", alt: "Java" },
    { src: "/skills/js.svg", alt: "JavaScript" },
    { src: "/skills/linux.png", alt: "Linux" },
    { src: "/skills/MongoDB.svg", alt: "MongoDB" },
    { src: "/skills/next.svg", alt: "Next.js" },
    { src: "/skills/node.svg", alt: "Node.js" },
    { src: "/skills/Postman.svg", alt: "Postman" },
    { src: "/skills/python.svg", alt: "Python" },
    { src: "/skills/react.png", alt: "React" },
    { src: "/skills/socket.svg", alt: "Socket.io" },
    { src: "/skills/tailwind.svg", alt: "TailwindCSS" },
    { src: "/skills/ts.svg", alt: "TypeScript" },
    { src: "/skills/vite.png", alt: "Vite" },
    { src: "/skills/selenium.svg", alt: "selenium" },
    { src: "/skills/websocket.svg", alt: "websocket" },
    { src: "/skills/android.svg", alt: "android" },
  ];

  useEffect(() => {
    // Skip animation on mobile devices (screen width < 768px)
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-content",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            toggleActions: "play none none none",
          },
          stagger: 0.3,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="px-6 py-12 md:px-12 md:py-16" id="about">
      <div
        ref={sectionRef}
        className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-18 mt-12"
      >
        <div className="about-content flex flex-col max-w-full md:max-w-lg text-center md:text-left">
          <div
            className="md:absolute md:flex hidden rounded-full w-[500px] h-[500px] filter blur-[150px] opacity-30"
            style={{
              background: "linear-gradient(to right, #4776e6, #8e54e9)",
              zIndex: -1,
              bottom: "-70%",
              right: "-10%", // shifted left from center (50%)
              transform: "translate(-50%, -50%)",
            }}
          ></div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 bg-gradient-to-r from-white to-purple-800 text-transparent bg-clip-text">
            Jeganathan
          </h1>

          <p className="text-lg bg-gradient-to-r from-white to-purple-300 text-transparent bg-clip-text mb-4">
            I’m a Full Stack Developer with strong expertise in the MERN stack.
            I’m passionate about building scalable web applications and
            delivering efficient solutions. Alongside full-stack development,
            I’m sharpening my backend skills with Python, while also diving into
            automation and learning how to optimize processes. I constantly work
            on improving my skills and staying up to date with modern
            development practices to become a well-rounded software engineer.
          </p>
          <div className="mt-6 w-full flex justify-center">
            <a
              href="/jeganathanResume.pdf"
              download
              className="px-6 py-3 uppercase text-black font-semibold rounded-xl shadow-lg transition-all duration-500 ease-in-out bg-gradient-to-r from-white to-purple-800 hover:from-[#8e54e9] hover:to-[#4776e6] hover:bg-gradient-to-r"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="about-content relative w-full md:w-72 flex justify-center items-center">
          <TiltedCard
            imageSrc="/jegan.png"
            altText="jeganathan"
            captionText="Developer"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
          />
        </div>
        <div
          className="absolute rounded-full w-[500px] h-[500px] filter blur-[150px] opacity-40"
          style={{
            background: "linear-gradient(to right, #00416a, #e4e5e6)",
            zIndex: -1,
            right: "10%",
            top: "37%", // shifted left from center (50%)
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>
      <h1 className="text-xl sm:text-sm md:text-xl uppercase text-center mt-10 md:mb-12 bg-gradient-to-r from-white to-purple-800 text-transparent bg-clip-text">
        Skills
      </h1>
      <div
        className="mt-12 md:mt-16 mb-[-100px]"
        style={{
          height: "200px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <LogoLoop
          logos={imageLogos}
          speed={100}
          direction="left"
          logoHeight={48}
          gap={80}
          pauseOnHover
          scaleOnHover
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
      </div>
    </div>
  );
};

export default About;
