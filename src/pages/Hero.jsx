"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import ParticlesJs from "../components/ParticlesJs";
import Nav from "../components/Nav";
import TiltedCard from "../components/TitledCard";

gsap.registerPlugin(TextPlugin);

const titles = [
  "Web Developer",
  "Backend Developer",
  "Automation",
  "Software Developer",
  "Frontend Developer",
];

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const preloaderRef = useRef(null);
  const typingRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (preloaderRef.current) {
      gsap.to(preloaderRef.current, {
        yPercent: -100,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => setLoading(false), // remove preloader from DOM
      });
    }

    // Blinking cursor
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power1.inOut",
    });

    // Typing animation
    let index = 0;
    const typeText = () => {
      if (!typingRef.current) return;

      gsap.to(typingRef.current, {
        duration: 1.5,
        text: titles[index],
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(typingRef.current, {
            duration: 0.5,
            text: "",
            delay: 1,
            onComplete: () => {
              index = (index + 1) % titles.length;
              typeText();
            },
          });
        },
      });
    };

    typeText();
  }, []);

  return (
    <div className="relative w-screen h-screen " id="home">
      {loading && (
        <div
          ref={preloaderRef}
          className="absolute top-0 left-0 w-full h-full bg-gray-300 z-50"
        />
      )}
      <div className="absolute top-0 left-0 w-full z-20">
        <Nav />
      </div>

      <div className="absolute z-10 flex flex-col justify-center w-full h-full px-8">
        <div className="relative w-full flex justify-center items-center">
          <div
            className="absolute rounded-full w-[300px] h-[300px] filter blur-[200px] opacity-60"
            style={{
              background: "linear-gradient(to right, #4776e6, #8e54e9)",
              zIndex: -1,
              top: "10%",
              left: "40%", // shifted left from center (50%)
              transform: "translate(-50%, -50%)",
            }}
          ></div>
          <p className="text-4xl md:text-8xl font-bold uppercase bg-gradient-to-r from-white to-purple-800 text-transparent bg-clip-text">
            Jeganathan
          </p>
          <div
            className="absolute rounded-full w-[300px] h-[300px] filter blur-[200px] opacity-60"
            style={{
              background: "linear-gradient(to right, #ffffff, #6B21A8)", // white to purple-800
              zIndex: -1,
              top: "100%",
              right: "20%", // shifted left from center (50%)
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>

        {/* Typing effect */}
        <p className="mt-4 text-xl md:text-3xl font-semibold uppercase flex items-center justify-center bg-gradient-to-r from-white to-purple-800 text-transparent bg-clip-text">
          <span ref={typingRef}></span>
          <span ref={cursorRef} className="ml-1">
            |
          </span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
