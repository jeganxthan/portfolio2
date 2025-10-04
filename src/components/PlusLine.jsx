"use client"; // if using Next.js app router
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PlusLine = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { width: "0%" },
        {
          width: "95%",
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: lineRef.current, // animate when the line is in view
            start: "top 80%", // when top of element hits 80% of viewport
            toggleActions: "play none none none", // play on enter, reverse on leave back
          },
        }
      );
    }
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2 mt-2">
      <div className="md:text-xl text-base font-extralight bg-gradient-to-r from-white to-purple-800 text-transparent bg-clip-text">+</div>
      <div
        ref={lineRef}
        className="bg-gradient-to-r from-white to-purple-800"
        style={{ transform: "scaleY(0.5)", height: "1px", width: "0%" }}
      ></div>
      <div className="md:text-xl text-base font-extralight bg-gradient-to-r from-white to-purple-800 text-transparent bg-clip-text">+</div>
    </div>
  );
};

export default PlusLine;
