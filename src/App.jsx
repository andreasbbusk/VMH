import { Routes, Route } from "react-router-dom";
import { motion as m } from "framer-motion";

// Components
import Header from "./components/Header/Header";
import Projects from "./pages/Project/Projects";
import Project2025 from "./pages/Project/Project2025";
import Project2023 from "./pages/Project/Project2023";
import Donate from "./pages/Donate/Donate";
import Sponsor from "./pages/Sponsor/Sponsor";
import Project2022 from "./pages/Project/Project2022";
import Project2019 from "./pages/Project/Project2019";
import Project2018 from "./pages/Project/Project2018";
import Project2017 from "./pages/Project/Project2017";
import Galleri from "./pages/Galleri/Galleri";
import Kontakt from "./pages/About/Kontakt";
import Footer from "./components/Footer/Footer";
import Gallamiddag from "./pages/Events/Gallamiddag";
import Torveevent from "./pages/Events/Torveevent";
import Auktion from "./pages/Events/Auktion";
import Hudcancer from "./pages/Hudcancer";
import OmOs from "./pages/OmOs";
import Forside from "./pages/Forside/Forside";

const App = () => {
  return (
    <>
      <Header />
      <m.main
        className="page-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Forside />} />
          <Route path="/Projekter" element={<Projects />} />
          <Route path="/Projekter/Projekt-2025" element={<Project2025 />} />
          <Route path="/Projekter/Projekt-2023" element={<Project2023 />} />
          <Route path="/Projekter/Projekt-2022" element={<Project2022 />} />
          <Route path="/Projekter/Projekt-2019" element={<Project2019 />} />
          <Route path="/Projekter/Projekt-2018" element={<Project2018 />} />
          <Route path="/Projekter/Projekt-2017" element={<Project2017 />} />
          <Route path="/Events/Gallamiddag-2025" element={<Gallamiddag />} />
          <Route
            path="/Events/Gallamiddag-2025/Auktion"
            element={<Auktion />}
          />
          <Route path="/Events/Torveevent-2025" element={<Torveevent />} />
          <Route path="/Om-hudcancer" element={<Hudcancer />} />
          <Route path="/Om-os" element={<OmOs />} />
          <Route path="/Kontakt" element={<Kontakt />} />
          <Route path="/Galleri" element={<Galleri />} />
          <Route path="/Stoet-nu" element={<Donate />} />
          <Route path="/Sponsorer" element={<Sponsor />} />
        </Routes>
      </m.main>
      <Footer />
    </>
  );
};

export default App;
