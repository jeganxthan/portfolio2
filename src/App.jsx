import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainProject from "./pages/MainProject";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main-project" element={<MainProject />} />
      </Routes>
    </Router>
  );
}

export default App;
