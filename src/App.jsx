import ParticlesJs from "./components/ParticlesJs";
import About from "./pages/About";
import Hero from "./pages/Hero";
import Projects from "./pages/Projects";

function App() {
  return (
    <div className="bg-[#FAF9F6] selection:bg-slate-200">
      <Hero/>
      <About/>
      <Projects/>
    </div>
  );
}

export default App;
