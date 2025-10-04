import React, { useState } from "react";
import { Github, Linkedin } from "lucide-react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // Send data as JSON
      const res = await fetch(
        "https://portfolio-mail-x8y5.onrender.com/send_message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData), // Send the form data as JSON
        }
      );

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending message.");
    }

    setTimeout(() => setStatus(""), 5000); // Clear status after 5s
  };

  return (
    <div className="px-6 py-12" id="contact">
      <h1
        className="text-4xl md:text-5xl font-bold text-center mb-16 uppercase bg-gradient-to-r from-white to-purple-800 bg-clip-text text-transparent"
        style={{ fontFamily: "var(--font-arimo)" }}
      >
        Contact
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-gradient-to-r from-white to-purple-800 bg-clip-text text-transparent">
        <div
          className="absolute rounded-full w-[600px] h-[500px] filter blur-[200px] opacity-40"
          style={{
            background: "linear-gradient(to right, #00416a, #e4e5e6) ",
            right: "18%",
            top: "86%",
            zIndex: -1,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div className="flex flex-row md:flex-col gap-4">
          <a
            href="https://www.linkedin.com/in/jeganathan-i-430869258"
            target="_blank"
          >
            <Linkedin />
          </a>
          <a href="https://github.com/jeganxthan" target="_blank">
            <Github />
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 focus:border-white focus:outline-none placeholder-gray-500 focus:placeholder-transparent transition-all duration-300"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={formData.email || ""} // <-- ensure it's always a string
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 focus:border-b-white focus:outline-none transition-all duration-300 placeholder-gray-500"
          />

          <textarea
            placeholder="Your Message"
            rows={5}
            value={formData.message || ""} // <-- ensure it's always a string
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 focus:border-b-white focus:outline-none transition-all duration-300 placeholder-gray-500"
          />

          <button
            type="submit"
            className="border border-gray-500 text-gray-500 rounded-lg py-2 px-4 hover:bg-gray-50 transition-colors font-medium"
          >
            Send Message
          </button>
          {status && <p className="text-sm mt-2 text-gray-700">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Page;
