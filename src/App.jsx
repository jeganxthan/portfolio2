import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ClickSpark from "./components/ClickSpark";
import ParticlesJs from "./components/ParticlesJs";
import PlusLine from "./components/PlusLine";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Footer from "./pages/Footer";
import Hero from "./pages/Hero";
import Projects from "./pages/Projects";
import MainProject from "./pages/MainProject";

function App() {
  return (
    <Router>
      <div className="bg-[#FAF9F6] selection:bg-slate-200">
        <ClickSpark
          sparkColor='#000000'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Routes>
            {/* ✅ Define your routes here */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <PlusLine />
                  <About />
                  <PlusLine />
                  <Experience />
                  <PlusLine />
                  <Projects />
                  <PlusLine />
                  <Contact />
                  <PlusLine />
                  <Footer />
                </>
              }
            />

            <Route path="/main-project" element={<MainProject />} />
          </Routes>
        </ClickSpark>
      </div>
    </Router>
  );
}

export default App;
