import { motion as m } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ImageSlider from "../../components/Project/ImageSlider";
import ProjectNavigation from "../../components/Project/ProjectNavigation";
import styles from "./Project.module.css";

// Assets
import PlayButton from "../../assets/play-button.svg";
import StrykerVideo from "../../assets/StrykerVideo.mp4";
import Hands from "../../assets/support-hands2.svg";
import MoneyBag from "../../assets/money-bag.svg";
import TargetHit from "../../assets/target-hit.svg";

// Navigation sections configuration
const SECTIONS = [
  { id: "1", title: "Hvorfor SPY-PHI?" },
  { id: "2", title: "Hvordan gør SPY-PHI en forskel?" },
  { id: "3", title: "Økonomiske mål" },
  { id: "4", title: "Sådan når vi målet" },
];

const Project2025 = () => {
  // State management
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState("hvorfor");
  const [isHighlightVisible, setIsHighlightVisible] = useState(false);
  const [revealedChars, setRevealedChars] = useState(new Set());
  const videoRef = useRef(null);

  // Animation variants for text highlighting
  const highlightVariants = {
    hidden: {
      color: "#000000",
      opacity: 1,
    },
    visible: (charIndex) => ({
      color: revealedChars.has(charIndex) ? "#e0a619" : "#000000",
      opacity: 1,
      transition: { duration: 0.05 },
    }),
  };

  // Video playback handler
  const handlePlayVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.play();
    setHasStartedPlaying(true);
  };

  // Navigation click handler
  const handleNavClick = (sectionId) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll effect for section highlighting and text reveal
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      const highlightText = document.querySelector(`.${styles.highlightText}`);

      // Handle text reveal animation
      if (highlightText) {
        const rect = highlightText.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementTop = rect.top;

        if (elementTop <= viewportHeight * 0.8) {
          const progress = Math.min(
            1,
            1.5 * (1 - elementTop / (viewportHeight * 0.8))
          );
          setIsHighlightVisible(true);

          // Reveal characters progressively
          const newRevealedChars = new Set(revealedChars);
          for (let i = 0; i < 50; i++) {
            if (progress > i * 0.015) {
              newRevealedChars.add(i);
            }
          }
          setRevealedChars(newRevealedChars);
        }
      }

      // Update active section based on scroll position
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offset = 150;

        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(section.dataset.section);
        }
      });
    };

    // Implement scroll throttling for performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [revealedChars]);

  return (
    <>
      <Breadcrumb />
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Hero section with video */}
        <div className={styles.project_container}>
          <div className={styles.project_content}>
            <div className={styles.project_text}>
              <h1>
                <strong>Projekt 2025</strong>
              </h1>
              <h1>SPY-Phi infrarød scanner</h1>
              <div className={styles.horizontal_line_video}></div>

              <section className={styles.project_description}>
                <p>
                  Hos Vejle mod hudcancer arbejder vi for at styrke behandlingen
                  og forebyggelsen af hudcancer.
                </p>
                <p>
                  Vi samler nu ind til årets projekt, SPY-Phi fra Stryker - en
                  avanceret infrarød scanner, der kan hjælpe kirurger med at
                  identificere og behandle kræftramte områder mere præcist.
                </p>
                <p>
                  Teknologien har potentiale til at forbedre både operationernes
                  kvalitet og patienternes healing, og så kan den bruges på
                  tværs af flere kræftformer.
                </p>
              </section>
            </div>

            <div className={styles.project_media}>
              <div className={styles.media_container}>
                <video
                  ref={videoRef}
                  src={StrykerVideo}
                  onClick={handlePlayVideo}
                  controls
                ></video>
                {!hasStartedPlaying && (
                  <div
                    className={styles.play_button_overlay}
                    onClick={handlePlayVideo}
                    role="button"
                    tabIndex={0}
                    aria-label="Afspil video"
                  >
                    <img src={PlayButton} alt="Afspil" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content sections */}
        <div className={styles.container}>
          {/* Sticky navigation */}
          <nav className={styles.stickyNav}>
            <div>
              {SECTIONS.map((section) => (
                <m.p
                  key={section.id}
                  className={`${styles.navItem} ${
                    activeSection === section.id ? styles.active : ""
                  }`}
                  onClick={() => handleNavClick(section.id)}
                  style={{
                    opacity: activeSection === section.id ? 1 : 0.5,
                    color: activeSection === section.id ? "#000" : "inherit",
                  }}
                >
                  <button
                    className={styles.navButton}
                    aria-current={activeSection === section.id}
                  >
                    {section.title}
                  </button>
                </m.p>
              ))}
            </div>
          </nav>

          <div className={styles.content}>
            {/* Why SPY-PHI section */}
            <section data-section="1" className={styles.section}>
              <h2>Hvorfor SPY-PHI?</h2>
              <div className={styles.sectionContent}>
                <div className={styles.textContent}>
                  <p>
                    SPY-PHI-scanneren giver kirurger mulighed for at arbejde med
                    en præcision, som det blotte øje ikke kan opnå. <br />{" "}
                    <strong>Scanneren gør det muligt at:</strong>
                  </p>
                  <ul className={styles.list}>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>01</p>
                      <li>
                        Afgrænse kræftknuder nøjagtigt, så kun det syge væv
                        fjernes under operationen.
                      </li>
                    </div>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>02</p>
                      <li>
                        Undersøge lymfebaner og kun fjerne nødvendige
                        lymfeknuder, hvilket mindsker risikoen for
                        komplikationer.
                      </li>
                    </div>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>03</p>
                      <li>
                        Vurdere vævsforflytninger og sikre optimal heling af
                        rekonstrueret væv for bedre æstetiske og funktionelle
                        resultater, især i synlige områder som ansigt, hals,
                        arme og ben.
                      </li>
                    </div>
                  </ul>
                  <p>
                    SPY-Phi gør ikke kun en forskel for hudkræftpatienter, men
                    kan også anvendes til behandling af andre kræftformer som
                    brystkræft, tarmkræft og bindevævskræft. På et dedikeret
                    kræfthospital som Vejle Sygehus er dette apparat derfor en
                    vigtig investering, der kommer mange patientgrupper til
                    gavn.
                  </p>
                </div>
                <ImageSlider projectYear="2025" />
              </div>
            </section>

            {/* How SPY-PHI makes a difference section */}
            <section data-section="2" className={styles.section}>
              <h2>Hvordan gør SPY-PHI en forskel?</h2>
              <div className={styles.sectionContent}>
                <div className={styles.infoText}>
                  <div className={styles.introText}>
                    <p>
                      SPY-Phi anvender en infrarød laser og et skånsomt
                      kontraststof til præcist at fremhæve kræftvæv. Denne
                      teknologi muliggør:
                    </p>
                    <img src={Hands} alt="Holder af dig" />
                  </div>

                  <div className={styles.benefitsList}>
                    <div className={styles.benefitItem}>
                      <p>
                        Præcis skelnen mellem sygt og raskt væv så patienten
                        undgår unødvendige indgreb.
                      </p>
                    </div>

                    <div className={styles.benefitItem}>
                      <p>
                        Mindre omfattende operationer der reducerer ar og
                        belastning for patienten.
                      </p>
                    </div>

                    <div className={styles.benefitItem}>
                      <p>
                        Behandling af lymfødem, en alvorlig senfølge, der kan
                        ramme op mod 35 % af kræftpatienter.
                      </p>
                    </div>
                  </div>

                  <div className={styles.highlightText}>
                    <p>
                      Ved at have SPY-Phi på Vejle Sygehus kan patienter få en{" "}
                      {isHighlightVisible && (
                        <m.span
                          className={styles.highlight}
                          initial="hidden"
                          animate="visible"
                        >
                          {"hurtigere".split("").map((char, i) => (
                            <m.span
                              key={i}
                              initial="hidden"
                              animate="visible"
                              custom={i}
                              variants={highlightVariants}
                            >
                              {char}
                            </m.span>
                          ))}
                        </m.span>
                      )}
                      , mere{" "}
                      {isHighlightVisible && (
                        <m.span
                          className={styles.highlight}
                          initial="hidden"
                          animate="visible"
                        >
                          {"sammenhængende".split("").map((char, i) => (
                            <m.span
                              key={i}
                              initial="hidden"
                              animate="visible"
                              custom={i + 10}
                              variants={highlightVariants}
                            >
                              {char}
                            </m.span>
                          ))}
                        </m.span>
                      )}{" "}
                      og{" "}
                      {isHighlightVisible && (
                        <m.span
                          className={styles.highlight}
                          initial="hidden"
                          animate="visible"
                        >
                          {"mindre belastende behandling"
                            .split("")
                            .map((char, i) => (
                              <m.span
                                key={i}
                                initial="hidden"
                                animate="visible"
                                custom={i + 22}
                                variants={highlightVariants}
                              >
                                {char}
                              </m.span>
                            ))}
                        </m.span>
                      )}
                      . Dette sparer ikke kun tid og ressourcer, men gør også en
                      stor forskel for patientens samlede oplevelse i en svær
                      tid.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Financial goals section */}
            <section data-section="3" className={styles.section}>
              <h2>Økonomiske mål</h2>
              <div className={styles.money_section}>
                <p>
                  For at realisere dette projekt har vi et indsamlingsmål på:
                </p>
                <h1>1.072.300 kr.</h1>
                <img src={MoneyBag} alt="Pengepose" />
              </div>
              <div className={styles.money_list}>
                <h3>Dette beløb dækker:</h3>
                <div className={styles.money_item}>
                  <h4>SPY-Phi-scanner</h4>
                  <p>648.000 kr.</p>
                </div>
                <div className={styles.money_item}>
                  <h4>Installation og integration</h4>
                  <p>75.000 kr.</p>
                </div>
                <div className={styles.money_item}>
                  <h4>Pilotprojekt med to patientgrupper.</h4>
                  <p>350.000 kr.</p>
                </div>
              </div>
            </section>

            {/* How to reach the goal section */}
            <section
              data-section="4"
              style={{ borderTop: "none" }}
              className={styles.section}
            >
              <div className={styles.target_section}>
                <h2>Sådan når vi målet</h2>
                <img src={TargetHit} alt="Target hit" />
              </div>
              <div className={styles.target_section_text}>
                <div className={styles.target_section_content}>
                  <p>
                    For at gøre dette til virkelighed har vi brug for{" "}
                    <m.span initial="hidden" animate="visible">
                      {"din hjælp".split("").map((char, i) => (
                        <m.span
                          key={i}
                          initial="hidden"
                          animate="visible"
                          custom={i}
                          variants={highlightVariants}
                        >
                          {char}
                        </m.span>
                      ))}
                    </m.span>
                    .{" "}
                  </p>
                  <p>
                    SPY-Phi er en langsigtet investering, der kræver en{" "}
                    <m.span initial="hidden" animate="visible">
                      {"samlet indsats".split("").map((char, i) => (
                        <m.span
                          key={i}
                          initial="hidden"
                          animate="visible"
                          custom={i}
                          variants={highlightVariants}
                        >
                          {char}
                        </m.span>
                      ))}
                    </m.span>
                    . Midlerne vil gå til anskaffelse af scanneren, som kan
                    integreres i cancerbehandlingen på Vejle Sygehus. Ved at
                    støtte projektet bidrager du til at skabe bedre rammer for
                    behandling og pleje af kræftpatienter.
                  </p>
                  <p>
                    <strong>
                      Hver donation – stor som lille – bringer os tættere på
                      målet.
                    </strong>{" "}
                    Ved at støtte projektet er du med til at sikre, at
                    kræftpatienter kan få hurtigere og mere præcis behandling.
                  </p>
                  <Link to="/stoet-nu" className="support-button">
                    Støt nu
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.arrow_icon}
                    >
                      <path
                        d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
        <ProjectNavigation />
      </m.main>
    </>
  );
};

export default Project2025;
