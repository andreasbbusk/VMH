import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import styles from "../../pages/Project/Project.module.css";
import PropTypes from "prop-types";

const slideVariants = {
  enter: (direction) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  exit: (direction) => ({
    y: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  }),
};

const ProjectSlider = ({ selectedYear }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [projects, setProjects] = useState([
    {
      id: 0,
      år: "2025",
      titel: "SPY-Phi infrarød scanner",
      beskrivelse: "I år går indsamlingen til den avanceret infrarøde SPY-Phi scanner fra Stryker - Et værktøj der hjælper kirurger med præcis identificering og behandling af kræftramte områder.",
      billede: "../../src/assets/spyphi.png",
      læsMereLink: "/projekter/projekt-2025"
    },
    {
      id: 1,
      år: "2023", 
      titel: "Faciliteter til projekt 'Lys i Vejle året rundt'",
      beskrivelse: "I 2023 var projekt 'Lys i Vejle året rundt' en vigtig milepæl i arbejdet for bedre behandling af hudkræft. Projektet blev realiseret i tæt samarbejde med Vejle Sygehus, der arbejder for at være patienternes kræftsygehus med skånsomme, effektive og individuelt tilpassede behandlingstilbud.",
      billede: "../../src/assets/project-2023.jpg",
      læsMereLink: "/projekter/projekt-2023"
    },
    {
      id: 2,
      år: "2022",
      titel: "Scanner til optimering af kirurgi øjennært",
      beskrivelse: "Endnu engang er Vejle Sygehus first mover på et spændende hudkræft projekt. Som noget helt nyt vil man gøre det muligt, at scanne huden omkring øjet for hudkræft. Man har tidligere kunnet scanne øjet, men nu skal det være muligt at scanne huden omkring, så man skal operere mindst muligt (læs mere om det nedenfor). Projektet kræver indkøb af en scanner og det er her, vi kan gøre en forskel.",
      billede: "../../src/assets/project-2022.jpg",
      læsMereLink: "/projekter/projekt-2022"
    },
    {
      id: 3,
      år: "2019",
      titel: "Glaspavillon til dagslysbehandling",
      beskrivelse: "I 2019/2020 udbygger Vejle Sygehus deres hudkræftafdeling. I den forbindelse har vi fået mulighed for at tilføje en glaspavillon, som er med til at gøre hudkræftbehandlingen hurtigere, mindre smertefuld og ikke mindst merelokal.",
      billede: "../../src/assets/project-2019.jpeg",
      læsMereLink: "/projekter/projekt-2019"
    },
    {
      id: 4,
      år: "2018",
      titel: "Beslutningsstøtte til patienter med hudcancer i ansigtet",
      beskrivelse: "Projektet ved plastikkirurgisk sektion på Vejle Sygehus forbedrer behandlingen af hudkræft ved at samle et tværfagligt team af specialister til første konsultation. Dette sikrer overblik over behandlingsmuligheder og styrker samarbejdet mellem patient, pårørende og læger.",
      billede: "../../src/assets/404-error.jpg",
      læsMereLink: "/projekter/projekt-2018"
    },
    {
      id: 5,
      år: "2017",
      titel: "Pilotprojekt i teledermatologi",
      beskrivelse: "Projektet ved plastikkirurgisk sektion på Vejle Sygehus forbedrer behandlingen af hudkræft ved at samle et tværfagligt team af specialister til første konsultation. Dette sikrer overblik over behandlingsmuligheder og styrker samarbejdet mellem patient, pårørende og læger.",
      billede: "../../src/assets/project-2017.png",
      læsMereLink: "/projekter/projekt-2017"
    }
  ]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState(0);
  const sliderRef = useRef(null);
  const scrollAccumulatorRef = useRef(0);
  const SCROLL_THRESHOLD = 50;
  const lastScrollTime = useRef(Date.now());
  const SCROLL_COOLDOWN = 800;

  // Handle selectedYear changes from chart clicks
  useEffect(() => {
    if (selectedYear && projects.length > 0) {
      const index = projects.findIndex(
        (project) => project.år === selectedYear.toString()
      );
      if (index !== -1) {
        setDirection(index > currentPage ? 1 : -1);
        setCurrentPage(index);
      }
    }
  }, [selectedYear, projects]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      if (isScrolling) return;

      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;

      // Only prevent default if we're not on the first project scrolling up
      if (!(currentPage === 0 && e.deltaY < 0)) {
        e.preventDefault();
      }

      scrollAccumulatorRef.current += e.deltaY;

      if (Math.abs(scrollAccumulatorRef.current) >= SCROLL_THRESHOLD) {
        setIsScrolling(true);
        lastScrollTime.current = now;

        if (
          scrollAccumulatorRef.current > 0 &&
          currentPage < projects.length - 1
        ) {
          setDirection(1);
          setCurrentPage((prev) => prev + 1);
        } else if (scrollAccumulatorRef.current < 0 && currentPage > 0) {
          setDirection(-1);
          setCurrentPage((prev) => prev - 1);
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

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScrollLock = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
          // Only disable scroll if not on first project
          if (currentPage !== 0) {
            disableBodyScroll(slider, {});
          }
        } else {
          enableBodyScroll(slider);
        }
      });
    };

    const observer = new IntersectionObserver(handleScrollLock, {
      threshold: 0.95,
    });

    observer.observe(slider);

    return () => {
      observer.disconnect();
      enableBodyScroll(slider);
    };
  }, [currentPage]);

  if (!projects || projects.length === 0) {
    return <div>Ingen projekter at vise</div>;
  }

  const currentProject = projects[currentPage];

  const handleYearClick = (index) => {
    setDirection(index > currentPage ? 1 : -1);
    setCurrentPage(index);
  };

  return (
    <>
      <div
        className={styles.fullscreenSlider}
        ref={sliderRef}
        aria-label="Projekt slider"
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            id={`slider-project-${currentProject?.år}`}
            key={currentPage}
            className={styles.projectSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className={styles.projectContent}>
              <div className={styles.imageContainer}>
                <motion.img
                  src={currentProject?.billede || "/placeholder-image.jpg"}
                  alt={currentProject?.titel || ""}
                  className={styles.projectImage}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className={styles.imageTitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3>{currentProject?.titel}</h3>
                </motion.div>
              </div>
              <motion.div
                className={styles.projectInfo}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className={styles.projectYear}>
                  Projekt {currentProject?.år}
                </h2>
                <h2 className={styles.projectTitle}>{currentProject?.titel}</h2>
                <p className={styles.projectDescription}>
                  {currentProject?.beskrivelse}
                </p>
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

        <div className={styles.yearNavigation} role="navigation">
          {projects.map((project, index) => (
            <div
              key={project.år}
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <motion.div
                style={{
                  height: "2px",
                  backgroundColor: currentPage === index ? "#E0A619" : "#666",
                  width: currentPage === index ? "30px" : "10px",
                }}
                animate={{
                  width: currentPage === index ? "30px" : "10px",
                  backgroundColor: currentPage === index ? "#E0A619" : "#666",
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.button
                className={styles.yearIndicator}
                onClick={() => handleYearClick(index)}
                animate={{
                  color: currentPage === index ? "#E0A619" : "#666",
                  scale: currentPage === index ? 1.2 : 1,
                }}
                whileHover={{ scale: 1.1 }}
                aria-label={`Gå til år ${project.år}`}
                aria-current={currentPage === index}
              >
                {project.år}
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </>
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
  selectedYear: PropTypes.string,
};

export default ProjectSlider;
