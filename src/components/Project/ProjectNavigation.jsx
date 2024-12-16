import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../../pages/Project/Project.module.css";

const ProjectNavigation = () => {
  const location = useLocation();
  const projectPaths = [
    "/projekter/projekt-2025",
    "/projekter/projekt-2023", 
    "/projekter/projekt-2022",
    "/projekter/projekt-2019",
    "/projekter/projekt-2018",
    "/projekter/projekt-2017",
  ];

  const projectTitles = {
    "/projekter/projekt-2025": "Projekt 2025",
    "/projekter/projekt-2023": "Projekt 2023",
    "/projekter/projekt-2022": "Projekt 2022", 
    "/projekter/projekt-2019": "Projekt 2019",
    "/projekter/projekt-2018": "Projekt 2018",
    "/projekter/projekt-2017": "Projekt 2017",
  };

  const currentIndex = projectPaths.indexOf(location.pathname);
  const previousProject = projectPaths[currentIndex - 1];
  const nextProject = projectPaths[currentIndex + 1];

  const containerVariants = {
    initial: { opacity: 1 },
    hover: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Håndterer navigation og scroll til toppen
  const handleNavigation = () => {
    window.scrollTo(0, 0);
  };

  return (
    <motion.div 
      className={styles.navigation}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {previousProject && (
        <motion.div 
          className={styles.former_project}
        >
          <motion.div
            initial="initial"
            whileHover="hover"
            variants={containerVariants}
          >
            <Link 
              to={previousProject} 
              className={styles.navLink}
              onClick={handleNavigation}
            >
              <motion.svg
                width="75"
                height="21"
                viewBox="0 0 75 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.arrow}
                variants={{
                  initial: { x: 0 },
                  hover: { x: -10 }
                }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M73.4398 7.6782C70.4115 7.71854 70.3043 7.71996 56.7531 7.89941C46.6648 8.033 33.631 8.42718 17.5012 8.95009L17.6982 1.50854C17.7161 0.838207 17.2802 0.283614 16.7247 0.269829C16.5686 0.265954 16.4134 0.306003 16.2715 0.386805L1.18239 8.97824C0.677516 9.26569 0.456714 9.98976 0.689246 10.5955C0.780246 10.8328 0.932952 11.0272 1.12452 11.1495L15.736 20.4779C16.2249 20.79 16.8356 20.5619 17.1 19.9685C17.1743 19.8017 17.2156 19.6168 17.2207 19.4284L17.423 11.8601C34.1397 11.6388 44.5689 11.5007 58.4744 11.3165C72.38 11.1324 67.5131 11.1973 73.423 11.119C73.7702 11.1534 74.8145 10.814 74.8199 9.72268C74.8268 8.30541 73.9495 7.67127 73.4398 7.6782Z"
                  fill="#E0A619"
                />
              </motion.svg>
              <motion.span 
                variants={{
                  initial: { color: "#000" },
                  hover: { color: "#E0A619" }
                }}
                transition={{ duration: 0.3 }}
              >
                Næste projekt
              </motion.span>
            </Link>
          </motion.div>
          <motion.div 
            className={styles.current_project}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {projectTitles[previousProject]}
          </motion.div>
        </motion.div>
      )}
      {nextProject && (
        <motion.div 
          className={styles.former_project}
          style={{ marginLeft: 'auto' }}
        >
          <motion.div
            initial="initial"
            whileHover="hover"
            variants={containerVariants}
          >
            <Link 
              to={nextProject} 
              className={styles.navLink}
              onClick={handleNavigation}
            >
              <motion.span 
                variants={{
                  initial: { color: "#000" },
                  hover: { color: "#E0A619" }
                }}
                transition={{ duration: 0.3 }}
              >
                Forrige projekt
              </motion.span>
              <motion.svg
                width="75"
                height="21"
                viewBox="0 0 75 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.arrow}
                variants={{
                  initial: { x: 0 },
                  hover: { x: 10 }
                }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M1.56022 7.6782C4.58853 7.71854 4.69573 7.71996 18.2469 7.89941C28.3352 8.033 41.369 8.42718 57.4988 8.95009L57.3018 1.50854C57.2839 0.838207 57.7198 0.283614 58.2753 0.269829C58.4314 0.265954 58.5866 0.306003 58.7285 0.386805L73.8176 8.97824C74.3225 9.26569 74.5433 9.98976 74.3108 10.5955C74.2198 10.8328 74.067 11.0272 73.8755 11.1495L59.264 20.4779C58.7751 20.79 58.1644 20.5619 57.9 19.9685C57.8257 19.8017 57.7844 19.6168 57.7793 19.4284L57.577 11.8601C40.8603 11.6388 30.4311 11.5007 16.5256 11.3165C2.62002 11.1324 7.4869 11.1973 1.57704 11.119C1.22981 11.1534 0.18549 10.814 0.180133 9.72268C0.173177 8.30541 1.05052 7.67127 1.56022 7.6782Z"
                  fill="#E0A619"
                />
              </motion.svg>
            </Link>
          </motion.div>
          <motion.div 
            className={styles.current_project}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {projectTitles[nextProject]}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectNavigation;
