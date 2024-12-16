import styles from "../pages/Forside/Forside.module.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import Project2025 from "../assets/spyphi.png";
import Project2023 from "../assets/project-2023.jpg";
import Project2022 from "../assets/project-2022.jpg";
import Project2019 from "../assets/project-2019.jpeg";
import Project2018 from "../assets/404-error.jpg";
import Project2017 from "../assets/project-2017.png";

const ProjectHighlight = () => {
  const projectsData = [
    {
      id: 0,
      år: "2025",
      titel: "SPY-Phi infrarød scanner",
      beskrivelse: "I år går indsamlingen til den avanceret infrarøde SPY-Phi scanner fra Stryker - Et værktøj der hjælper kirurger med præcis identificering og behandling af kræftramte områder.",
      billede: Project2025,
      læsMereLink: "/projekter/projekt-2025"
    },
    {
      id: 1,
      år: "2023",
      titel: "Faciliteter til projekt 'Lys i Vejle året rundt'",
      beskrivelse: "I 2023 var projekt 'Lys i Vejle året rundt' en vigtig milepæl i arbejdet for bedre behandling af hudkræft. Projektet blev realiseret i tæt samarbejde med Vejle Sygehus, der arbejder for at være patienternes kræftsygehus med skånsomme, effektive og individuelt tilpassede behandlingstilbud.",
      billede: Project2023,
      læsMereLink: "/projekter/projekt-2023"
    },
    {
      id: 2,
      år: "2022",
      titel: "Scanner til optimering af kirurgi øjennært",
      beskrivelse: "Endnu engang er Vejle Sygehus first mover på et spændende hudkræft projekt. Som noget helt nyt vil man gøre det muligt, at scanne huden omkring øjet for hudkræft. Man har tidligere kunnet scanne øjet, men nu skal det være muligt at scanne huden omkring, så man skal operere mindst muligt (læs mere om det nedenfor). Projektet kræver indkøb af en scanner og det er her, vi kan gøre en forskel.",
      billede: Project2022,
      læsMereLink: "/projekter/projekt-2022"
    },
    {
      id: 3,
      år: "2019",
      titel: "Glaspavillon til dagslysbehandling",
      beskrivelse: "I 2019/2020 udbygger Vejle Sygehus deres hudkræftafdeling. I den forbindelse har vi fået mulighed for at tilføje en glaspavillon, som er med til at gøre hudkræftbehandlingen hurtigere, mindre smertefuld og ikke mindst merelokal.",
      billede: Project2019,
      læsMereLink: "/projekter/projekt-2019"
    },
    {
      id: 4,
      år: "2018",
      titel: "Beslutningsstøtte til patienter med hudcancer i ansigtet",
      beskrivelse: "Projektet ved plastikkirurgisk sektion på Vejle Sygehus forbedrer behandlingen af hudkræft ved at samle et tværfagligt team af specialister til første konsultation. Dette sikrer overblik over behandlingsmuligheder og styrker samarbejdet mellem patient, pårørende og læger.",
      billede: Project2018,
      læsMereLink: "/projekter/projekt-2018"
    },
    {
      id: 5,
      år: "2017",
      titel: "Pilotprojekt i teledermatologi", 
      beskrivelse: "Projektet ved plastikkirurgisk sektion på Vejle Sygehus forbedrer behandlingen af hudkræft ved at samle et tværfagligt team af specialister til første konsultation. Dette sikrer overblik over behandlingsmuligheder og styrker samarbejdet mellem patient, pårørende og læger.",
      billede: Project2017, 
      læsMereLink: "/projekter/projekt-2017"
    },
    {
      id: 6,
      år: "",
      titel: "",
      beskrivelse: "",
      billede: "",
      læsMereLink: "",
      isSpacerCard: true
    }
  ];

  // State management
  const [projects, setProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const dragControls = useDragControls();

  useEffect(() => {
    // Set latest project as default
    const latestProject = projects.reduce((prev, current) => 
      current.isSpacerCard ? prev : (parseInt(current.år) > parseInt(prev.år) ? current : prev)
    );
    setSelectedProject(latestProject);
    setCurrentIndex(projects.findIndex(p => p.id === latestProject.id));
  }, []);

  // Scroll handling with debounce for performance
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Handle project selection and scrolling
  const handleProjectClick = (project, index) => {
    if (!project.isSpacerCard) {
      setSelectedProject(project);
      setCurrentIndex(index);
      scrollToProject(index);
    }
  };

  // Scroll to selected project
  const scrollToProject = (index) => {
    if (!sliderRef.current) return;
    
    const itemWidth = sliderRef.current.firstChild?.offsetWidth || 0;
    const gap = 70; // 6rem gap between items
    sliderRef.current.scrollTo({
      left: index * (itemWidth + gap),
      behavior: "smooth"
    });
  };

  // Handle dot navigation click
  const handleDotClick = (index) => {
    handleProjectClick(projects[index], index);
  };

  // Handle slider scroll with snapping
  const handleScroll = () => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const itemWidth = container.firstChild?.offsetWidth || 0;
    const gap = 70;
    const scrollPosition = container.scrollLeft;
    const threshold = (itemWidth + gap) * 0.5;

    // Calculate scroll distance relative to current project
    const currentProjectPosition = currentIndex * (itemWidth + gap);
    const distanceScrolled = scrollPosition - currentProjectPosition;

    // Implement rigid snapping with limited scroll movement
    if (Math.abs(distanceScrolled) > threshold) {
      const direction = distanceScrolled > 0 ? 1 : -1;
      const newIndex = currentIndex + direction;

      if (newIndex >= 0 && newIndex < projects.length - 1) { // Exclude spacer card
        handleProjectClick(projects[newIndex], newIndex);
      } else {
        // Snap back if hitting boundaries
        scrollToProject(currentIndex);
      }
    } else {
      // Lock card by snapping back to current project
      scrollToProject(currentIndex);
    }
  };

  const debouncedScroll = debounce(handleScroll, 100);

  // Handle drag end
  const handleDragEnd = (event, info) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    if (Math.abs(velocity) > 500 || Math.abs(offset) > 100) {
      const direction = velocity < 0 || offset < 0 ? 1 : -1;
      const newIndex = currentIndex + direction;
      
      if (newIndex >= 0 && newIndex < projects.length - 1) { // Exclude spacer card
        handleProjectClick(projects[newIndex], newIndex);
      } else {
        scrollToProject(currentIndex);
      }
    } else {
      scrollToProject(currentIndex);
    }
  };

  return (
    <div className={styles["projekt-container"]}>
      <div className={styles["projekt-content"]}>
        {/* Project text content */}
        <div className={styles["projekt-text"]}>
          <AnimatePresence mode="wait">
            {selectedProject && (
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2>Projekt {selectedProject.år}</h2>
                <h1>{selectedProject.titel}</h1>
                <hr className={styles["hudcancer-divider"]} />
                <p>{selectedProject.beskrivelse}</p>
                <Link
                  to={selectedProject.læsMereLink}
                  className={styles["Forsidelasmereknap"]}
                  onClick={() => handleProjectClick(selectedProject, currentIndex)}
                >
                  Læs mere her
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Project image slider */}
        <div className={styles["projekt-image"]}>
          <motion.div
            ref={sliderRef}
            className={styles["slider-container"]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onScroll={debouncedScroll}
            drag="x"
            dragControls={dragControls}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {projects.map((project, index) => (
              !project.isSpacerCard && (
                <motion.div
                  key={project.id}
                  className={`${styles["slider-item"]} ${
                    project.id === selectedProject?.id ? styles["active"] : ""
                  }`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  onClick={() => handleProjectClick(project, index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleProjectClick(project, index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Vis projekt ${project.titel}`}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={project.billede}
                    alt={project.titel}
                    className={styles["projekt-slide-image"]}
                  />
                  <div className={styles["projekt-slide-text"]}>
                    <h4>{project.titel}</h4>
                  </div>
                </motion.div>
              )
            ))}
            {/* Add an empty div at the end to create space */}
            <div style={{ minWidth: '70px' }} />
          </motion.div>

          {/* Navigation dots */}
          <div className={styles["slider-dots"]}>
            {projects.filter(p => !p.isSpacerCard).map((_, index) => (
              <motion.button
                key={index}
                className={`${styles["slider-dot"]} ${
                  currentIndex === index ? styles["active"] : ""
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Gå til projekt ${index + 1}`}
                tabIndex={0}
                animate={{
                  scale: currentIndex === index ? 1.2 : 1,
                  backgroundColor: currentIndex === index ? "#e0a619" : "#ccc",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHighlight;
