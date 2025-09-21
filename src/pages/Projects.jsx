"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, Github, GithubIcon, Globe, X } from "lucide-react";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null); // track modal
  const imageRefs = useRef([]);
  const containerRefs = useRef([]);

  const projectTitles = ["Food Ordering", "Netflix Clone", "RBAC", "Git-SH", "Portfolio"];
  const projectImages = [
    { src: "/food/food.png", alt: "Food Ordering App" },
    { src: "/netflix/netflix.png", alt: "Netflix Clone" },
    { src: "/rbac/rbac.png", alt: "RBAC" },
    { src: "/git-sh/gitsh.png", alt: "Git-SH" },
    { src: "/portfolio/portfolio.png", alt: "Portfolio" },
  ];

  // Scroll-based title fade
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
    handleScroll(); // initial call

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP hover animation
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
        gsap.to(overlay, { backgroundColor: "transparent", duration: 0.5, ease: "power3.out" });
        gsap.to(image, { scale: 1, duration: 0.5, ease: "power3.out", filter: "brightness(1)" });
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
    <div className="bg-black text-white py-16 px-4 sm:px-6 md:px-12 border-14  border-[#FAF9F6] rounded-[40px] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-arimo font-bold text-left mb-8 sm:mb-10 md:mb-12">
          Projects
        </h1>

        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10">
          {/* Titles */}
          <div className="md:w-1/3 hidden md:flex flex-col justify-start sticky top-20 md:top-32 h-fit space-y-2 sm:space-y-3 md:space-y-4">
            {projectTitles.map((title, index) => (
              <p
                key={index}
                className={`transition-all duration-500 font-semibold ${activeIndex === index
                  ? "opacity-100 text-white text-3xl sm:text-4xl md:text-6xl"
                  : "opacity-40 text-gray-400 text-3xl sm:text-4xl md:text-6xl"
                  }`}
              >
                {title}
              </p>
            ))}
          </div>

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
                onClick={() => setModalIndex(index)} // open modal
              >
                <div className="overlay absolute inset-0 rounded-lg pointer-events-none bg-transparent z-0"></div>

                <img
                  src={project.src}
                  alt={project.alt}
                  className="w-full h-auto rounded-lg transition-transform duration-500 relative z-10"
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-black p-2 rounded-xl flex flex-row justify-center items-center gap-2 sm:gap-3">
                    <p className="text-xl sm:text-2xl md:text-3xl text-white">{project.alt}</p>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* Modal */}
      {modalIndex !== null && (
        <div className="fixed inset-0 backdrop-blur-lg bg-white/20 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black rounded-xl p-6 max-w-3xl w-full shadow-xl">
            {/* Close button */}
            <button
              className="absolute top-3 right-1 text-white text-2xl hover:text-red-500 transition-colors"
              onClick={() => setModalIndex(null)}
            >
              <X />
            </button>

            {/* Project image */}
            <img
              src={projectImages[modalIndex].src}
              alt={projectImages[modalIndex].alt}
              className="w-full h-auto rounded-lg mb-4"
            />

            {/* Project title & description */}
            <h1 className="text-white text-2xl font-bold mb-2">{projectImages[modalIndex].alt}</h1>
            <p className="text-gray-300 mb-4">
              {modalIndex === 0 && "Food Ordering App using dummy JSON data, where users can browse menus, add items to the cart, and place orders. The project simulates a real-world food delivery platform, demonstrating ability to work with APIs, manage state, and build interactive user interfaces."}
              {modalIndex === 1 && "Netflix clone using React and Tailwind CSS, featuring a fully responsive design that adapts seamlessly to desktops, tablets, and mobile devices. The project replicates Netflix’s modern UI with dynamic layouts, smooth styling, and a user-friendly interface, showcasing your skills in frontend development and responsive web design."}
              {modalIndex === 2 && "MERN e-commerce website, role-based access control ensures that each type of user has specific permissions. Admins have full authority to manage the platform, including handling users, products, and orders. Sellers are restricted to managing only their own products and viewing orders related to them, giving them control over their shop but not the entire system. Users (customers) have the ability to browse products, add them to the cart, place orders, and manage their personal accounts. This separation of roles maintains security, prevents unauthorized actions, and ensures smooth operation of the platform."}
              {modalIndex === 3 && "MERN stack web application that combines multiple advanced features into one platform. The system includes secure authentication with OTP verification, ensuring that only verified users can access the app. It also supports a followers/following system, allowing users to connect with each other like a social network. For real-time communication, you integrated Socket.IO-based chat, enabling instant messaging between users. Additionally, you implemented WebRTC for video/audio calls, giving users the ability to connect beyond text chat. Altogether, this project demonstrates your skills in building secure, scalable, and interactive real-time web applications."}
              {modalIndex === 4 && "This portfolio website showcases my projects and skills with heavy GSAP animations and interactive video elements for a dynamic user experience. It includes a fully functional contact form using NodeMailer to send emails directly from the site. Built with React.js and Tailwind CSS, the portfolio demonstrates smooth scroll effects, hover animations, and responsive design, combining modern UI/UX with real-world functionality."}
            </p>

            <div className="mt-4">
              <div className="flex flex-wrap gap-4 w-full">
                {/* Modal 0 */}
                {modalIndex === 0 && (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      {[
                        { name: "React", img: "/skills/react.svg" },
                        { name: "Tailwind", img: "/skills/tailwind.svg" },
                      ].map((tech) => (
                        <div
                          key={tech.name}
                          className="flex flex-col items-center justify-center gap-1 bg-white p-1 md:px-3 md:py-2 rounded-xl"
                        >
                          <img src={tech.img} alt={tech.name} className="md:w-8 w-4 h-4 md:h-8 object-contain" />
                          <span className="text-black md:text-sm text-xs">{tech.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-row gap-2 items-center justify-center">
                      <a href="https://github.com/jeganxthan/food-app">
                        <Github className="md:w-8 md:h-8 text-white" />
                      </a>
                      <a href="https://food-app-eta-eight.vercel.app/">
                        <Globe className="md:w-8 md:h-8 text-white" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Modal 1 */}
                {modalIndex === 1 && (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      {[
                        { name: "React", img: "/skills/react.svg" },
                        { name: "Tailwind", img: "/skills/tailwind.svg" },
                      ].map((tech) => (
                        <div
                          key={tech.name}
                          className="flex flex-col items-center justify-center gap-1 bg-white p-1 md:px-3 md:py-2 rounded-xl"
                        >
                          <img src={tech.img} alt={tech.name} className="md:w-8 w-4 h-4 md:h-8 object-contain" />
                          <span className="text-black md:text-sm text-xs">{tech.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-row gap-2 items-center justify-center">
                      <a href="https://github.com/jeganxthan/Netflix">
                        <Github className="md:w-8 md:h-8 text-white" />
                      </a>
                      <a href="https://netflix-ashen-gamma.vercel.app/">
                        <Globe className="md:w-8 md:h-8 text-white" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Modal 2 */}
                {modalIndex === 2 && (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      {[
                        { name: "React", img: "/skills/react.svg" },
                        { name: "Tailwind", img: "/skills/tailwind.svg" },
                        { name: "Express", img: "/skills/express.svg" },
                        { name: "MongoDB", img: "/skills/MongoDB.svg" },
                        { name: "Node", img: "/skills/node.svg" },
                      ].map((tech) => (
                        <div
                          key={tech.name}
                          className="flex flex-col items-center justify-center gap-1 bg-white p-1 md:px-3 md:py-2 rounded-xl"
                        >
                         <img src={tech.img} alt={tech.name} className="md:w-8 w-4 h-4 md:h-8 object-contain" />
                          <span className="text-black md:text-sm text-xs">{tech.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-row gap-2 items-center justify-center">
                      <a href="https://github.com/jeganxthan/RBAC-Ecommerce">
                        <Github className="md:w-8 md:h-8 text-white" />
                      </a>
                      <a href="https://rbac-ecommerce.vercel.app/">
                        <Globe className="md:w-8 md:h-8 text-white" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Modal 3 */}
                {modalIndex === 3 && (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      {[
                        { name: "React", img: "/skills/react.svg" },
                        { name: "MongoDB", img: "/skills/MongoDB.svg" },
                        { name: "Socket IO", img: "/skills/socket.svg" },
                        { name: "TypeScript", img: "/skills/ts.svg" },
                      ].map((tech) => (
                        <div
                          key={tech.name}
                          className="flex flex-col items-center justify-center gap-1 bg-white p-1 md:px-3 md:py-2 rounded-xl"
                        >
                          <img src={tech.img} alt={tech.name} className="md:w-8 w-4 h-4 md:h-8 object-contain" />
                          <span className="text-black md:text-sm text-xs">{tech.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-row gap-2 items-center justify-center">
                      <a href="https://github.com/jeganxthan/Git-SH-react">
                        <Github className="md:w-8 md:h-8 text-white" />
                      </a>
                      <Globe className="md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                )}

                {/* Modal 4 */}
                {modalIndex === 4 && (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      {[
                        { name: "Next", img: "/skills/next.svg" },
                        { name: "Tailwind", img: "/skills/tailwind.svg" },
                        { name: "TypeScript", img: "/skills/ts.svg" },
                        { name: "Gsap", img: "/skills/gsap.png" },
                      ].map((tech) => (
                        <div
                          key={tech.name}
                          className="flex flex-col items-center justify-center gap-1 bg-white p-1 md:px-3 md:py-2 rounded-xl"
                        >
                          <img src={tech.img} alt={tech.name} className="md:w-8 w-4 h-4 md:h-8 object-contain" />
                          <span className="text-black md:text-sm text-xs">{tech.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-row gap-2 items-center justify-center">
                      <a href="https://github.com/jeganxthan/portfolio_next">
                        <Github className="md:w-8 md:h-8 text-white" />
                      </a>
                      <a href="https://portfolio-next-ten-theta.vercel.app/">
                        <Globe className="md:w-8 md:h-8 text-white" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>


          </div>
        </div>
      )}

    </div>
  );
};

export default Projects;
