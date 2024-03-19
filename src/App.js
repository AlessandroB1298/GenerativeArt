import Navbar from "./components/navbar";
import Fractal from "./pages/fractal";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Shade from "./pages/shade";
import Patterns from "./pages/patterns";
import Polar from "./pages/polar_coordinate";
import ParticleBackground from "./components/particleBackground";
import WebCamPage from "./pages/mandelbot";

function App() {
  return (
    <>
      <Navbar />
      <ParticleBackground />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fractal" element={<Fractal />} />
          <Route path="/mandelbot" element={<WebCamPage />} />
          <Route path="/shade" element={<Shade />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/polar" element={<Polar />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
