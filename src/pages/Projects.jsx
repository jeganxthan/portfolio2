"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, Github, Globe, X } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);
  const imageRefs = useRef([]);
  const containerRefs = useRef([]);

  const projectTitles = [
    "RBAC",
    "Git-SH",
    "Gsap",
    "Canvas",
    "LoadBalance",
    "Resume Bot",
  ];

  const projectImages = [
    { src: "/fullstack/rbac.png", alt: "RBAC" },
    { src: "/fullstack/gitsh.png", alt: "Git-SH" },
    { src: "/frontend/portfolio.png", alt: "Gsap Portfolio" },
    { src: "/fullstack/canvas.png", alt: "Canvas" },
    { src: "/backend/Load.png", alt: "Loadbalance" },
    { src: "/backend/resume.png", alt: "Resume" },
  ];

  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container");

    const handleScroll = () => {
      const offsets = imageRefs.current.map((el) => {
        const rect = el.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        return Math.abs(rect.top - containerRect.top);
      });

      const closestIndex = offsets.indexOf(Math.min(...offsets));
      setActiveIndex(closestIndex);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const colors = [];

    containerRefs.current.forEach((container, index) => {
      if (!container) return;

      const overlay = container.querySelector(".overlay");
      const image = container.querySelector("img");

      const onEnter = () => {
        gsap.to(overlay, {
          backgroundColor: colors[index],
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(image, {
          scale: 1.05,
          duration: 0.5,
          ease: "power3.out",
          filter: "brightness(0.5)",
        });
      };

      const onLeave = () => {
        gsap.to(overlay, {
          backgroundColor: "transparent",
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(image, {
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          filter: "brightness(1)",
        });
      };

      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);

      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
      };
    });
  }, []);

  return (
    <div id="project">
      <div className="text-white py-16 px-4 sm:px-6 md:px-12 mt-10 mb-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-arimo font-bold mb-8 sm:mb-10 md:mb-12 text-left uppercase bg-gradient-to-r from-white to-purple-800 bg-clip-text text-transparent">
            Projects
          </h1>
          <div
            className="md:absolute md:flex hidden rounded-full w-[500px] h-[500px] filter blur-[200px] opacity-40"
            style={{
              background: "linear-gradient(to right, #00416a, #e4e5e6)",
              right: "55%",
              top: "69%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
          <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10">
            <div className="md:w-1/3 h-[400px] sm:h-[450px] md:h-[500px] overflow-y-scroll no-scrollbar space-y-2 sm:space-y-3 md:space-y-4 md:flex flex-col hidden ">
              {projectTitles.map((title, index) => (
                <p
                  key={index}
                  className={`transition-all duration-300 font-semibold cursor-pointer ${
                    activeIndex === index
                      ? "opacity-100 bg-gradient-to-r from-white to-purple-800 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-6xl pl-3 "
                      : "opacity-40 text-gray-400 text-3xl sm:text-4xl md:text-6xl"
                  }`}
                  onClick={() => {
                    const target = containerRefs.current[index];
                    if (target) {
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  {title}
                </p>
              ))}
            </div>

            {/* Images */}
            <div className="md:w-2/3 h-[400px] sm:h-[450px] md:h-[500px] overflow-y-scroll no-scrollbar rounded-xl p-2 sm:p-4 space-y-4 sm:space-y-5 md:space-y-6 scroll-container">
              {projectImages.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    imageRefs.current[index] = el;
                    containerRefs.current[index] = el;
                  }}
                  data-index={index}
                  className="relative group w-full rounded-lg overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => setModalIndex(index)}
                >
                  <div className="overlay absolute inset-0 rounded-lg pointer-events-none bg-transparent z-0"></div>

                  <img
                    src={project.src}
                    alt={project.alt}
                    className="w-full h-auto rounded-lg transition-transform duration-500 relative z-10"
                  />

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-black p-2 rounded-xl flex flex-row justify-center items-center gap-2 sm:gap-3">
                      <p className="text-xl sm:text-2xl md:text-3xl text-white">
                        {project.alt}
                      </p>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="md:absolute md:flex hidden rounded-full w-[600px] h-[600px] filter blur-[200px] opacity-40"
            style={{
              background: "linear-gradient(to right, #4776e6, #8e54e9)",
              left: "70%",
              top: "70%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>

        {/* Modal */}
        {modalIndex !== null && (
          <div className="fixed inset-0 backdrop-blur-lg bg-white/20 flex items-center justify-center z-50 p-4">
            <div className="relative bg-black rounded-xl p-6 max-w-3xl w-full shadow-xl">
              <button
                className="absolute top-3 right-1 text-white text-2xl hover:text-red-500 transition-colors"
                onClick={() => setModalIndex(null)}
              >
                <X />
              </button>

              <img
                src={projectImages[modalIndex].src}
                alt={projectImages[modalIndex].alt}
                className="w-full h-auto rounded-lg mb-4"
              />

              <h1 className="text-white text-2xl font-bold mb-2">
                {projectImages[modalIndex].alt}
              </h1>

              <p className="text-gray-300 mb-4">
                {modalIndex === 0 &&
                  "MERN e-commerce website with Role-Based Access Control (RBAC). Admins can manage everything, sellers manage their products, and users browse, add to cart, and order. Implements strong security and user separation."}
                {modalIndex === 1 &&
                  "MERN stack platform combining secure OTP authentication, a follower system, real-time chat with Socket.IO, and WebRTC for calls. Demonstrates scalable real-time app development."}
                {modalIndex === 2 &&
                  "Portfolio website built with React.js, TailwindCSS, and GSAP animations. Includes smooth scroll effects, hover animations, and a contact form powered by NodeMailer."}
                {modalIndex === 3 &&
                  "Real-time collaborative drawing board using React, TailwindCSS, Socket.IO, Express, and MongoDB. Features include pencil, eraser, color picker, undo/redo, and canvas synchronization."}
                {modalIndex === 4 &&
                  "Real-time WebSocket communication system with Redis Pub/Sub and Nginx load balancing. Allows scalable messaging between clients across servers."}
                {modalIndex === 5 &&
                  "Resume Bot built with Flask, PostgreSQL, and Google Gemini API. Extracts resume details, supports JWT authentication, email verification, and real-time messaging with Flask-SocketIO."}
              </p>
            </div>
          </div>
        )}

        <div className="mt-10 md:mt-6 flex justify-start md:justify-start">
          <Link
            to="/main-project"
            className="flex flex-row gap-2 items-center group cursor-pointer text-white hover:text-purple-400 transition-colors"
          >
            <p>Show All</p>
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              <ArrowRight size={20} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
