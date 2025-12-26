"use client";

import { Globe } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const element = cardRef.current;

    // Disable animation on mobile devices
    if (window.innerWidth < 768) return;

    const animation = gsap.fromTo(
      element,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill(); // clean up ScrollTrigger instance
      animation.kill(); // clean up GSAP animation
    };
  }, []);

  return (
    <div className="mt-10 mb-10">
      <h1 className="text-xl sm:text-3xl font-arimo uppercase text-center bg-gradient-to-r from-white to-purple-800 text-transparent bg-clip-text">
        Experience
      </h1>
      <div
        className="absolute rounded-full w-[300px] h-[300px] filter blur-[150px] opacity-40"
        style={{
          background: "linear-gradient(to right, #00416a, #e4e5e6)",
          zIndex: -1,
          right: "28%",
          top: "54%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
      <div
        ref={cardRef}
        className="mt-16 p-4 md:p-8 rounded-lg shadow-2xl md:max-w-lg w-[330px] md:w-[600px] mx-auto transform-gpu"
      >
        <div className="flex items-center mb-6">
          <img
            src="/ignite.png"
            alt="Ignite Skylabs"
            className="w-15 h-18 rounded-full mr-6 object-cover"
          />
          <p className="md:text-2xl text-xl font-medium text-white">
            Ignite Skylabs
          </p>
        </div>

        <p className="text-white text-base md:text-lg mb-6">
          Worked on exciting projects, contributing to web development and
          innovative solutions.
        </p>

        <div className="flex items-center space-x-4 mb-6">
          <a
            href="https://www.igniteskylabs.in/"
            target="_blank"
            className="text-white hover:text-blue-500"
          >
            <Globe size={32} />
          </a>
          <p className="text-sm md:text-base text-white">
            Location: Pondicherry, India • Type: Onsite Internship
          </p>
        </div>
        <div
          className="absolute rounded-full w-[300px] h-[300px] filter blur-[150px] opacity-40"
          style={{
            background: "linear-gradient(to right, #4776e6, #8e54e9)",
            zIndex: -1,
            right: "38%",
            top: "54%", // shifted left from center (50%)
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Experience;
