"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import ParticlesJs from "../components/ParticlesJs";
import Nav from "../components/Nav";

gsap.registerPlugin(TextPlugin);

const titles = [
  "Backend Developer",
  "Web Developer",
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
      {/* Preloader */}
      {loading && (
        <div
          ref={preloaderRef}
          className="absolute top-0 left-0 w-full h-full bg-cyan-500 z-50"
        />
      )}

      {/* Main content */}
      {/* 👇 disable clicks on particles */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticlesJs />
      </div>

      <div className="absolute top-0 left-0 w-full z-20">
        <Nav />
      </div>

      {/* Hero Content */}
      <div className="absolute z-10 flex flex-col justify-center w-full h-full px-8">
        {/* Container for "I'm" + Name */}
        <div className="relative w-full flex justify-center">
          <p className="text-white text-2xl font-light absolute -top-8">I'm</p>
          <p className="text-4xl md:text-8xl font-bold text-white uppercase">
            Jeganathan
          </p>
        </div>

        {/* Typing effect */}
        <p className="mt-4 text-xl md:text-3xl text-white uppercase flex items-center justify-center">
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
