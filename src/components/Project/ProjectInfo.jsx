import { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "../../pages/Project/Project.module.css";
import ImageSlider from "./ImageSlider";
import ProjectNavigation from "./ProjectNavigation";

import Hands from "../../assets/support-hands2.svg";
import MoneyBag from "../../assets/money-bag.svg";
import TargetHit from "../../assets/target-hit.svg";

const ProjectInfo = () => {
  const [activeSection, setActiveSection] = useState("hvorfor");
  const [isHighlightVisible, setIsHighlightVisible] = useState(false);
  const [revealedChars, setRevealedChars] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      const highlightText = document.querySelector(`.${styles.highlightText}`);

      if (highlightText) {
        const rect = highlightText.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementTop = rect.top;

        // Show highlight text earlier and progress faster
        if (elementTop <= viewportHeight * 0.8) {
          // Trigger at 80% of viewport instead of at viewport
          const progress = Math.min(
            1,
            1.5 * (1 - elementTop / (viewportHeight * 0.8))
          ); // Faster progress
          setIsHighlightVisible(true);

          // Reveal characters faster
          const newRevealedChars = new Set(revealedChars);
          for (let i = 0; i < 50; i++) {
            if (progress > i * 0.015) {
              // Reduced from 0.02 to 0.015 for faster reveal
              newRevealedChars.add(i);
            }
          }
          setRevealedChars(newRevealedChars);
        }
      }

      // Optimize section detection with smaller offset
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offset = 150; // Reduced from 200 to 150

        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(section.dataset.section);
        }
      });
    };

    // Throttle scroll handler for better performance
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

  const sections = [
    { id: "1", title: "Hvorfor SPY-PHI?" },
    { id: "2", title: "Hvordan gør SPY-PHI en forskel?" },
    { id: "3", title: "Økonomiske mål" },
    { id: "4", title: "Sådan når vi målet" },
  ];

  const handleNavClick = (sectionId) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const highlightVariants = {
    hidden: {
      color: "#000000",
      opacity: 1,
    },
    visible: (charIndex) => ({
      color: revealedChars.has(charIndex) ? "#e0a619" : "#000000",
      opacity: 1,
      transition: {
        duration: 0.05, // Faster transition
      },
    }),
  };

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.stickyNav}>
          <div>
            {sections.map((section) => (
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
                      Undersøge lymfebaner og kun fjerne nødvendige lymfeknuder,
                      hvilket mindsker risikoen for komplikationer.
                    </li>
                  </div>
                  <div className={styles.listItem}>
                    <p className={styles.listItemNumber}>03</p>
                    <li>
                      Vurdere vævsforflytninger og sikre optimal heling af
                      rekonstrueret væv for bedre æstetiske og funktionelle
                      resultater, især i synlige områder som ansigt, hals, arme
                      og ben.
                    </li>
                  </div>
                </ul>
                <p>
                  SPY-Phi gør ikke kun en forskel for hudkræftpatienter, men kan
                  også anvendes til behandling af andre kræftformer som
                  brystkræft, tarmkræft og bindevævskræft. På et dedikeret
                  kræfthospital som Vejle Sygehus er dette apparat derfor en
                  vigtig investering, der kommer mange patientgrupper til gavn.
                </p>
              </div>
              <ImageSlider />
            </div>
          </section>

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
                    stor forskel for patientens samlede oplevelse i en svær tid.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section data-section="3" className={styles.section}>
            <h2>Økonomiske mål</h2>
            <div className={styles.money_section}>
              <p>For at realisere dette projekt har vi et indsamlingsmål på:</p>
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
                <Link to="/donate" className="support-button">
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
    </>
  );
};

export default ProjectInfo;
