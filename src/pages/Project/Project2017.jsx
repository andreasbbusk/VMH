import { motion as m } from "framer-motion";
import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Project.module.css";
import Hands from "../../assets/support-hands2.svg";
import MoneyBag from "../../assets/money-bag.svg";
import TargetHit from "../../assets/target-hit.svg";
import ProjectNavigation from "../../components/Project/ProjectNavigation";
import { Link } from "react-router-dom";

const Project2017 = () => {
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

        if (elementTop <= viewportHeight * 0.8) {
          const progress = Math.min(
            1,
            1.5 * (1 - elementTop / (viewportHeight * 0.8))
          );
          setIsHighlightVisible(true);

          const newRevealedChars = new Set(revealedChars);
          for (let i = 0; i < 50; i++) {
            if (progress > i * 0.015) {
              newRevealedChars.add(i);
            }
          }
          setRevealedChars(newRevealedChars);
        }
      }

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offset = 150;

        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(section.dataset.section);
        }
      });
    };

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
    { id: "1", title: "Mål med projektet" },
    { id: "2", title: "Hvordan projektet gør en forskel" },
    { id: "3", title: "Økonomisk ramme" },
    { id: "4", title: "Sådan nåede vi målet" },
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
        duration: 0.05,
      },
    }),
  };

  return (
    <>
      <Breadcrumb />
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.project_container}>
          <div className={styles.project_content}>
            <div className={styles.project_text}>
              <h1>
                <strong>Projekt 2017</strong>
              </h1>
              <h1>Projekt 2017 pilotprojekt i teledermatologi</h1>
              <div className={styles.horizontal_line_video}></div>

              <section className={styles.project_description}>
                <p>
                  Flere og flere mennesker i Danmark får modermærkekræft, og det
                  samme gælder almindelig hudkræft. Modermærkekræft er en
                  alvorlig sygdom, som kan være dødelig, det er derfor meget
                  vigtigt, at det opdages og behandles så tidligt som mulig
                </p>
              </section>
            </div>
          </div>
        </div>

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
              <h2>Mål med projektet</h2>
              <div className={styles.sectionContent}>
                <div className={styles.textContent}>
                  <p>
                    <strong>Belæg for pilotprojekt: </strong>
                  </p>
                  <ul className={styles.list}>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>01</p>
                      <li>
                        Effektiv og patientcentreret behandling af hudkræft
                      </li>
                    </div>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>02</p>
                      <li>
                        Aktiv patient inddragelse i beslutninger om deres
                        behandling
                      </li>
                    </div>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>03</p>
                      <li>
                        Forbedre kvaliteten af samarbejdet mellem specialister
                        og gøre behandlingsforløbet mere overskueligt og
                        tilgængeligt for både patienter og pårørende
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </section>

            <section data-section="2" className={styles.section}>
              <h2>Hvordan kan projektet gøre en forskel?</h2>
              <div className={styles.sectionContent}>
                <div className={styles.infoText}>
                  <div className={styles.introText}>
                    <p>
                      Projektet gør en forskel ved at samle specialister, så
                      patienter får en helhedsorienteret behandling allerede ved
                      første besøg. Gennem fælles beslutningstagning bliver
                      behandlingen skræddersyet til patientens behov, hvilket
                      skaber mere tryghed og bedre resultater. Pårørende kan
                      også lettere deltage i processen, hvilket styrker støtten
                      omkring patienten.
                    </p>

                    <img src={Hands} alt="Holder af dig" />
                  </div>
                </div>
              </div>
            </section>

            <section data-section="3" className={styles.section}>
              <h2>Økonomiske ramme</h2>
              <div className={styles.money_section}>
                <p>Til realiseringen af projektet blev der i 2017 indsamlet</p>
                <h1>355.400 kr.</h1>
                <img src={MoneyBag} alt="Pengepose" />
              </div>
              <div className={styles.money_list}>
                <h3>Beløbet gik til:</h3>
                <div className={styles.money_item}>
                  <h4>
                    Udvikle og forbedre behandlingen af hudkræft på Vejle
                    Sygehus
                  </h4>
                </div>
                <div className={styles.money_item}>
                  <h4>
                    Bidragelse til at samle et tværfagligt team af specialister,
                    styrke samarbejdet mellem afdelinger og udvikle værktøjer
                    til fælles beslutningstagning
                  </h4>
                </div>
                <div className={styles.money_item}>
                  <h4>
                    Sikre bedre information og inddragelse af patienter og
                    pårørende i behandlingsforløbet
                  </h4>
                </div>
              </div>
            </section>

            <section
              data-section="4"
              style={{ borderTop: "none" }}
              className={styles.section}
            >
              <div className={styles.target_section}>
                <h2>Sådan nåede vi målet</h2>
                <img src={TargetHit} alt="Target hit" />
              </div>
              <div className={styles.target_section_text}>
                <div className={styles.target_section_content}>
                  <p>
                    Midlerne blev indsamlet gennem donationer fra lokale
                    borgere, virksomheder og organisationer, der ønskede at
                    bidrage til bedre kræftbehandling i Vejle.{" "}
                  </p>
                  <p>
                    {" "}
                    <m.span initial="hidden" animate="visible">
                      {"Hver donation – stor som lille – bringer os tættere på målet."
                        .split("")
                        .map((char, i) => (
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
                    </m.span>{" "}
                    Ved at støtte vores projekter er du med til at sikre, at
                    kræftpatienter kan få hurtigere og mere præcis behandling.
                  </p>
                  <p>
                    <strong>
                      Vi kan altid bruge din hjælp til vores kommende projekter.
                    </strong>
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
      </m.main>
    </>
  );
};

export default Project2017;
