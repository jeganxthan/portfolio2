// Footer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Show scroll-to-top button when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="text-white py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-3">About Me</h3>
          <p className="text-gray-400 text-sm">
            I am Jegan, a passionate developer building modern web applications.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact</h3>
          <a
            href="mailto:jega4044@gmail.com"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            jega4044@gmail.com
          </a>
        </div>

        {/* Quick Navigation Section */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Navigation</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <button
                onClick={() => scrollToSection("home")}
                className="hover:text-white transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-white transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("projects")}
                className="hover:text-white transition-colors"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-white transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Socials Section */}
        <div>
          <h3 className="text-lg font-bold mb-3">Socials</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <a href="https://www.linkedin.com/in/jeganathan-i-430869258" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/jeganxthan" className="hover:text-white transition-colors">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Extra Section */}
        <div>
          <h3 className="text-lg font-bold mb-3">More</h3>
          <p className="text-gray-400 text-sm">
            Thanks for visiting my portfolio. Feel free to reach out!
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} Jegan. All rights reserved.
      </div>

      {/* Scroll To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors z-50"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
