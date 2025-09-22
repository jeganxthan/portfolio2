"use client";
import { Globe } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });
    }, cardRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="mt-10 mb-10">
      <h1 className="text-xl sm:text-3xl md:text-1xl font-arimo uppercase text-center">
        Experience
      </h1>

      <div
        ref={cardRef}
        className="bg-white mt-16 p-4 md:p-8 rounded-lg shadow-2xl md:max-w-lg mx-auto"
      >
        <div className="flex items-center mb-6">
          <img
            src="/ignite.png"
            alt="Ignite Skylabs"
            className="w-20 h-25 rounded-full mr-6"
          />
          <p className="text-2xl text-black font-medium">Ignite Skylabs</p>
        </div>

        <p className="text-black text-lg mb-6">
          Worked on exciting projects, contributing to web development and
          innovative solutions.
        </p>

        <div className="flex items-center space-x-4 mb-6">
          <a href="#" className="text-black hover:text-blue-500">
            <Globe size={32} />
          </a>
          <p className="text-base text-gray-600">
            Location: Pondicherry, India • Type: Onsite Internship
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
