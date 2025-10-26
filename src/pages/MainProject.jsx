import React, { useState, useEffect, useRef } from "react";
import PlusLine from "../components/PlusLine";
import { ArrowLeft, Github, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
const projects = [
  {
    title: "Food Ordering App",
    image: "/frontend/food.png",
    description:
      "Food Ordering App using dummy JSON data, where users can browse menus, add items to the cart, and place orders. The project simulates a real-world food delivery platform, demonstrating ability to work with APIs, manage state, and build interactive user interfaces.",
    techStack: [
      { name: "React", img: "/skills/react.svg" },
      { name: "Tailwind CSS", img: "/skills/tailwind.svg" },
    ],
    github: "https://github.com/jeganxthan/food-app",
    live: "https://food-app-eta-eight.vercel.app/",
    category: "Frontend",
  },
  {
    title: "Netflix Clone",
    image: "/frontend/netflix.png",
    description:
      "Netflix clone using React and Tailwind CSS, featuring a fully responsive design that adapts seamlessly to desktops, tablets, and mobile devices. The project replicates Netflix’s modern UI with dynamic layouts, smooth styling, and a user-friendly interface, showcasing your skills in frontend development and responsive web design.",
    techStack: [
      { name: "React", img: "/skills/react.svg" },
      { name: "Tailwind CSS", img: "/skills/tailwind.svg" },
    ],
    github: "https://netflix-ashen-gamma.vercel.app/",
    live: "https://netflix-ashen-gamma.vercel.app/",
    category: "Frontend",
  },
  {
    title: "Portfolio Website",
    image: "/frontend/portfolio.png",
    description:
      "This portfolio website showcases my projects and skills with heavy GSAP animations and interactive video elements for a dynamic user experience. It includes a fully functional contact form using NodeMailer to send emails directly from the site. Built with React.js and Tailwind CSS, the portfolio demonstrates smooth scroll effects, hover animations, and responsive design, combining modern UI/UX with real-world functionality.",
    techStack: [
      { name: "React", img: "/skills/react.svg" },
      { name: "Tailwind CSS", img: "/skills/tailwind.svg" },
      { name: "GSAP", img: "/skills/gsap.png" },
      { name: "TypeScript", img: "/skills/ts.svg" },
    ],
    github: "https://github.com/jeganxthan/portfolio_next",
    live: "https://portfolio-next-orcin-rho.vercel.app/",
    category: "Frontend",
  },
  {
    title: "Git-SH",
    image: "/fullstack/gitsh.png",
    description:
      "MERN stack web application that combines multiple advanced features into one platform. The system includes secure authentication with OTP verification, ensuring that only verified users can access the app. It also supports a followers/following system, allowing users to connect with each other like a social network. For real-time communication, you integrated Socket.IO-based chat, enabling instant messaging between users. Additionally, you implemented WebRTC for video/audio calls, giving users the ability to connect beyond text chat. Altogether, this project demonstrates your skills in building secure, scalable, and interactive real-time web applications.",
    techStack: [
      { name: "React", img: "/skills/react.svg" },
      { name: "MongoDB", img: "/skills/MongoDB.svg" },
      { name: "Web socket", img: "/skills/websocket.svg" },
      { name: "TypeScript", img: "/skills/ts.svg" },
    ],
    github: "https://github.com/jeganxthan/Git-SH-react",
    category: "Fullstack",
  },
  {
    title: "RBAC-Ecommerce",
    image: "/fullstack/rbac.png",
    description:
      "MERN e-commerce website, role-based access control ensures that each type of user has specific permissions. Admins have full authority to manage the platform, including handling users, products, and orders. Sellers are restricted to managing only their own products and viewing orders related to them, giving them control over their shop but not the entire system. Users (customers) have the ability to browse products, add them to the cart, place orders, and manage their personal accounts. This separation of roles maintains security, prevents unauthorized actions, and ensures smooth operation of the platform.",
    techStack: [
      { name: "React", img: "/skills/react.svg" },
      { name: "Tailwind", img: "/skills/tailwind.svg" },
      { name: "Express", img: "/skills/express.svg" },
      { name: "MongoDB", img: "/skills/MongoDB.svg" },
      { name: "Node", img: "/skills/node.svg" },
    ],
    github: "https://github.com/jeganxthan/RBAC-Ecommerce",
    live: "https://rbac-ecommerce.vercel.app/",
    category: "Fullstack",
  },
  {
    title: "canvas",
    image: "/fullstack/canvas.png",
    description:
      "This project is a real-time collaborative drawing board built with React, TailwindCSS, Socket.IO, Express, and MongoDB. Users can draw on a shared canvas with customizable tools like pencil, eraser, color picker, brush size, undo/redo, and clear options. Every stroke is broadcasted instantly to all connected users via WebSockets, ensuring a smooth, synchronized experience. Drawings are also stored in MongoDB, so when a new user joins, they can see the existing canvas history. This makes the app useful for brainstorming, sketching ideas, online classrooms, or collaborative design sessions.",
    techStack: [
      { name: "React", img: "/skills/react.svg" },
      { name: "Tailwind", img: "/skills/tailwind.svg" },
      { name: "TypeScript", img: "/skills/ts.svg" },
      { name: "Node", img: "/skills/gsap.png" },
      { name: "Socket IO", img: "/skills/socket.svg" },
    ],
    github: "https://github.com/jeganxthan/canvas",
    category: "Fullstack",
  },
  {
    title: "LoadBalance",
    image: "/backend/Load.png",
    description:
      "This project is a real-time WebSocket communication system with Redis Pub/Sub and Nginx load balancing. It allows multiple clients to send and receive messages instantly, even when connected to different servers. When a client sends a message, the WebSocket server publishes it to Redis, which then distributes it to all other subscribed WebSocket servers. Each server broadcasts the message to its connected clients, ensuring that all users stay in sync. Nginx acts as a load balancer to distribute client connections across multiple WebSocket servers, enabling horizontal scalability and preventing a single server from being overloaded. This architecture makes the system fault-tolerant, scalable, and efficient for building real-time applications like chat apps, notifications, or collaborative tools.",
    techStack: [
      { name: "Express", img: "/skills/express.svg" },
      { name: "Redis", img: "/skills/redis.svg" },
      { name: "Ngnix", img: "/skills/ngnix.svg" },
      { name: "Node", img: "/skills/node.svg" },
      { name: "Socket IO", img: "/skills/socket.svg" },
    ],
    github: "https://github.com/jeganxthan/Loadbalance",
    category: "Backend And Automation",
  },
  {
    title: "Resume Bot",
    image: "/backend/resume.png",
    description:
      "I developed a Resume Bot web application using Flask to streamline resume management and job applications. Users can upload resumes in various formats (PDF, DOCX, TXT), which are then parsed to extract key details like contact information, education, skills, work experience, and certifications. The platform leverages the Google Gemini API for AI-powered Q&A, allowing users to interact dynamically with their resumes. It features JWT-based authentication, email verification with Flask-Mail, and secure data storage via PostgreSQL and SQLAlchemy. Real-time messaging is supported with Flask-SocketIO and Eventlet. The application offers a responsive UI and optimized backend for fast resume processing, making it a comprehensive career tool for job seekers.",
    techStack: [
      { name: "Flask", img: "/skills/flask.svg" },
      { name: "Socket IO", img: "/skills/socket.svg" },
      { name: "PostgreSQL", img: "/skills/postgresql.svg" },
    ],
    github: "https://github.com/jeganxthan/resume_bot",
    category: "Backend And Automation",
  },
  {
    title: "Auto Napkin",
    image: "/backend/napkin.png",
    description:
      "AutoNapkin is an intelligent browser automation project built with Python and Selenium (using undetected-chromedriver) that streamlines the Napkin AI sign-up and verification process. It automatically generates a temporary email, fills out registration details, handles navigation between tabs, retrieves the verification code, and completes the onboarding flow—all while supporting manual CAPTCHA solving when required. Designed for reliability, it uses dynamic wait conditions, iframe handling, and ad-closing logic to ensure smooth execution across different sessions. AutoNapkin demonstrates advanced web automation techniques with strong focus on stability, human-like interactions, and multi-tab coordination using the Brave browser.",
    techStack: [
      { name: "Python", img: "/skills/python.svg" },
      { name: "Selenium", img: "/skills/selenium.svg" },
    ],
    github: "https://github.com/jeganxthan/Autonapkin",
    category: "Backend And Automation",
  },
];

const categories = ["Frontend", "Backend And Automation", "Fullstack"];

const MainProject = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const buttonsRef = useRef([]);
  const cardsRef = useRef([]);

  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory
  );

  // Animate title + buttons only once (on mount)
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      buttonsRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.2,
      }
    );
  }, []); // 👈 empty dependency → runs only once

  // Animate cards every time category changes
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-16 py-12 ">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md uppercase text-white hover:bg-purple-400 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-6xl font-arimo font-bold uppercase bg-gradient-to-r from-white to-purple-800 bg-clip-text text-transparent"
        >
          Projects
        </h1>
      </div>

      <PlusLine />

      {/* Category Buttons */}
      <div className="flex flex-row flex-wrap gap-3 justify-center items-center text-black mb-10 text-xs md:text-base">
        {categories.map((category, idx) => (
          <button
            key={category}
            ref={(el) => (buttonsRef.current[idx] = el)}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 md:py-3 rounded-xl font-semibold uppercase transition-all duration-300 shadow-md
        ${
          activeCategory === category
            ? "text-white bg-gradient-to-r from-[#4776e6] to-[#8e54e9] shadow-lg scale-105"
            : "bg-gray-300 text-black hover:bg-gray-500 hover:text-white"
        }
      `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project List */}
      <div className="max-w-9xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="rounded-xl shadow-lg overflow-hidden border border-transparent"
            >
              {/* Image */}
              <div className="w-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div
                className="absolute rounded-full w-[500px] h-[500px] filter blur-[150px] opacity-30"
                style={{
                  background: "linear-gradient(to right, #4776e6, #8e54e9)",
                  zIndex: -1,
                  bottom: "-70%",
                  right: "-10%", // shifted left from center (50%)
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-white to-purple-800 bg-clip-text text-transparent">
                  {project.title}
                </h2>
                <p className="mb-4 bg-gradient-to-r from-white to-purple-800 bg-clip-text text-transparent">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    {project.techStack.map((tech, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <img
                          src={tech.img}
                          alt={tech.name}
                          className="h-6 w-6 object-contain"
                        />
                        <span className="text-sm text-white">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-6 mt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-black transition"
                  >
                    <Github size={20} />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-black transition"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainProject;
