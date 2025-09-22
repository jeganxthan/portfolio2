import React, { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';

const Page = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            const res = await fetch("https://portfolio-next-ten-theta.vercel.app/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

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
        <div className="px-6 py-12" id='contact'>
            <h1
                className="text-4xl md:text-5xl font-bold text-center mb-16 uppercase text-gray-800"
                style={{ fontFamily: 'var(--font-arimo)' }}
            >
                Contact
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                <div className='flex flex-row md:flex-col gap-4'>
                    <a href='https://www.linkedin.com/in/jeganathan-i-430869258' target="_blank"><Linkedin /></a>
                    <a href='https://github.com/jeganxthan' target="_blank"><Github /></a>
                </div>

              
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name || ""} // <-- ensure it's always a string
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-b-2 border-gray-300 py-2 px-1 text-gray-800 text-lg focus:border-black focus:outline-none transition-all duration-300"
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email || ""} // <-- ensure it's always a string
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border-b-2 border-gray-300 py-2 px-1 text-gray-800 text-lg focus:border-black focus:outline-none transition-all duration-300"
                    />

                    <textarea
                        placeholder="Your Message"
                        rows={5}
                        value={formData.message || ""} // <-- ensure it's always a string
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border-b-2 border-gray-300 py-2 px-1 text-gray-800 text-lg focus:border-black focus:outline-none resize-none transition-all duration-300"
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
