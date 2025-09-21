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
    { src: "/skills/react.svg", alt: "React" },
    { src: "/skills/socket.svg", alt: "Socket.io" },
    { src: "/skills/tailwind.svg", alt: "TailwindCSS" },
    { src: "/skills/ts.svg", alt: "TypeScript" },
    { src: "/skills/vite.png", alt: "Vite" },
  ];

  useEffect(() => {
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
            toggleActions: "play none none reverse",
          },
          stagger: 0.3,
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">

      {/* About Section with GSAP */}
      <div
        ref={sectionRef}
        className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-18 mt-12"
      >
        <div className="about-content flex flex-col max-w-full md:max-w-lg text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Jeganathan
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            I’m a Full Stack Developer with strong expertise in the MERN stack.
            I’m passionate about building scalable web applications and
            delivering efficient solutions. Alongside full-stack development, I’m
            sharpening my backend skills with Python, while also diving into
            automation and learning how to optimize processes. I constantly work
            on improving my skills and staying up to date with modern development
            practices to become a well-rounded software engineer.
          </p>
          <div className="mt-6 w-full flex justify-center">
            <a
              href="/jeganathanResume.pdf"
              download
              className="px-6 py-3 bg-gray-300 uppercase text-black font-semibold rounded-xl shadow-lg hover:bg-gray-600 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="about-content relative w-full md:w-72 flex justify-center items-center">
          <TiltedCard
            imageSrc="/jegan.jpg"
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
      </div>
      <h1 className="text-xl sm:text-sm md:text-xl uppercase text-center mt-10 md:mb-12">
        Skills
      </h1>
      <div
        className="mt-12 md:mt-16"
        style={{
          height: "200px",
          position: "relative",
          overflow: "hidden",
          filter: "grayscale(100%)",
        }}
      >
        <LogoLoop
          logos={imageLogos}
          speed={100}
          direction="left"
          logoHeight={60}
          gap={80}
          pauseOnHover
          scaleOnHover
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
      </div>
      <div className="max-w-4xl mx-auto bg-black dark:bg-gray-800 rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-arimo font-bold text-center text-white mb-6 sm:mb-8 md:mb-10">
          Experience
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <img
            src="/ignite.png"
            alt="Ignite Skylabs"
            className="w-32 sm:w-36 md:w-40 rounded-lg shadow-md object-contain"
          />

          {/* Info */}
          <div className="text-center md:text-left space-y-2">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400">
              Ignite Skylabs
            </p>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-300">
              Software Development Internship
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
              Role: Full Stack Developer <br />
              Location: Pondicherry, India <br />
              Type: Onsite Internship
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2 md:mt-4">
              Worked on exciting projects, contributing to web development and
              innovative solutions.
            </p>
            <a href="https://ridemap.in/" className="text-violet-600">Vist the website</a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
