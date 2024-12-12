import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../pages/Project/Project.module.css";
import PropTypes from "prop-types";

const slideVariants = {
  enter: {
    x: "100%",
    opacity: 0
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut" 
    }
  }
};

const ProjectSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const sliderRef = useRef(null);
  const scrollAccumulatorRef = useRef(0);
  const SCROLL_THRESHOLD = 50;
  const lastScrollTime = useRef(Date.now());
  const SCROLL_COOLDOWN = 800;

  useEffect(() => {
    fetch("../../data/projectsData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error("Fejl ved hentning af projektdata:", error));
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      if (isScrolling) return;

      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;

      e.preventDefault();
      scrollAccumulatorRef.current += e.deltaY;

      if (Math.abs(scrollAccumulatorRef.current) >= SCROLL_THRESHOLD) {
        setIsScrolling(true);
        lastScrollTime.current = now;

        if (scrollAccumulatorRef.current > 0 && currentPage < projects.length - 1) {
          setCurrentPage(prev => prev + 1);
        } else if (scrollAccumulatorRef.current < 0 && currentPage > 0) {
          setCurrentPage(prev => prev - 1);
        }

        scrollAccumulatorRef.current = 0;

        setTimeout(() => {
          setIsScrolling(false);
        }, SCROLL_COOLDOWN);
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      slider.removeEventListener("wheel", handleWheel);
    };
  }, [currentPage, isScrolling, projects.length]);

  if (!projects || projects.length === 0) {
    return <div>Ingen projekter at vise</div>;
  }

  const currentProject = projects[currentPage];

  return (
    <div 
      className={styles.fullscreenSlider}
      ref={sliderRef}
      aria-label="Projekt slider"
    >
      {/* År navigation */}
      <div className={styles.yearNavigation} role="navigation">
        {projects.map((project, index) => (
          <motion.button
            key={project.år}
            className={styles.yearIndicator}
            onClick={() => setCurrentPage(index)}
            animate={{
              color: currentPage === index ? "#E0A619" : "#666",
              scale: currentPage === index ? 1.2 : 1
            }}
            whileHover={{ scale: 1.1 }}
            aria-label={`Gå til år ${project.år}`}
            aria-current={currentPage === index}
          >
            {project.år}
          </motion.button>
        ))}
      </div>

      {/* Projekt visning */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentPage}
          className={styles.projectSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <div className={styles.projectContent}>
            <motion.img
              src={currentProject?.billede || "/placeholder-image.jpg"}
              alt={currentProject?.titel || ""}
              className={styles.projectImage}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className={styles.projectInfo}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>{currentProject?.titel}</h2>
              <p>{currentProject?.beskrivelse}</p>
              {currentProject?.læsMereLink && (
                <Link
                  to={currentProject.læsMereLink}
                  className={styles.readMoreButton}
                  tabIndex={0}
                  aria-label={`Læs mere om ${currentProject.titel}`}
                >
                  Læs mere
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

ProjectSlider.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      år: PropTypes.string.isRequired,
      titel: PropTypes.string.isRequired,
      beskrivelse: PropTypes.string.isRequired,
      billede: PropTypes.string,
      læsMereLink: PropTypes.string,
    })
  ),
};

export default ProjectSlider;
