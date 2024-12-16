import styles from "../pages/Forside/Forside.module.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ProjectHighlight = () => {
  // State management
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Fetch project data on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("../../data/projectsData.json");
        if (!response.ok) throw new Error("Failed to fetch projects");
        
        const data = await response.json();
        setProjects(data);

        // Set latest project as default
        const latestProject = data.reduce((prev, current) => 
          parseInt(current.år) > parseInt(prev.år) ? current : prev
        );
        setSelectedProject(latestProject);
        setCurrentIndex(data.findIndex(p => p.id === latestProject.id));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
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
    setSelectedProject(project);
    setCurrentIndex(index);
    scrollToProject(index);
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

      if (newIndex >= 0 && newIndex < projects.length) {
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
          >
            {projects.map((project, index) => (
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
            ))}
          </motion.div>

          {/* Navigation dots */}
          <div className={styles["slider-dots"]}>
            {projects.map((_, index) => (
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
