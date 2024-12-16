import { motion as m } from "framer-motion";
import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Project.module.css";
import Hands from "../../assets/support-hands2.svg";
import MoneyBag from "../../assets/money-bag.svg";
import TargetHit from "../../assets/target-hit.svg";
import ProjectNavigation from "../../components/Project/ProjectNavigation";
import { Link } from "react-router-dom";

const Project2018 = () => {
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
                <strong>Projekt 2018</strong>
              </h1>
              <h1>Beslutningsstøtte til patienter med hudkræft i ansigtet</h1>
              <div className={styles.horizontal_line_video}></div>

              <section className={styles.project_description}>
                <p>
                  Projektet ved plastikkirurgisk sektion på Vejle Sygehus
                  forbedrer behandlingen af hudkræft ved at samle et tværfagligt
                  team af specialister til første konsultation. Dette sikrer
                  overblik over behandlingsmuligheder og styrker samarbejdet
                  mellem patient, pårørende og læger. Fokus er på fælles
                  beslutningstagning, hvor behandling tilpasses den enkelte
                  patients behov og præferencer. Samlingen af konsultationer
                  reducerer tidsforbrug og gør det lettere for pårørende at
                  deltage. Målet er en mere personlig og effektiv behandling.
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
                    <strong>
                      Belæg for beslutningsstøtte til patienter med hudkræft:
                    </strong>
                  </p>
                  <ul className={styles.list}>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>01</p>
                      <li>
                        Effektiv og patientcentreret behandlingsforløb for
                        hudkræft ved at samle specialister, reducere
                        konsultationer og inddrage patienter i
                        beslutningsprocessen.
                      </li>
                    </div>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>02</p>
                      <li>
                        Sikre at behandling tilpasses den enkelte patients behov
                        og livssituation
                      </li>
                    </div>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>03</p>
                      <li>Forbedring af kvalitet og tilgængelighed</li>
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
                      Projektet gør en forskel ved at samle specialister til én
                      konsultation, så patienter hurtigt får overblik over deres
                      behandlingsmuligheder. Gennem fælles beslutningstagning
                      inddrages patienten aktivt, og behandlingen tilpasses
                      deres behov. Dette skaber et mere effektivt og trygt
                      forløb med bedre støtte til både patienter og pårørende
                    </p>

                    <img src={Hands} alt="Holder af dig" />
                  </div>
                </div>
              </div>
            </section>

            <section data-section="3" className={styles.section}>
              <h2>Økonomiske ramme</h2>
              <div className={styles.money_section}>
                <p>Til realiseringen af projektet blev der i 2018 indsamlet</p>
                <h1>464.300 kr.</h1>
                <img src={MoneyBag} alt="Pengepose" />
              </div>
              <div className={styles.money_list}>
                <h3>Beløbet gik til:</h3>
                <div className={styles.money_item}>
                  <h4>
                    Styrke behandlingen af hudkræft, ved at udvikle et
                    tværfagligt samarbejde på Vejle Sygehus
                  </h4>
                </div>
                <div className={styles.money_item}>
                  <h4>
                    Samle specialister fra plastikkirurgi, onkologi og
                    øjenafdelingen, så patienterne får adgang til en mere
                    effektiv og sammenhængende behandling
                  </h4>
                </div>
                <div className={styles.money_item}>
                  <h4>
                    Udvikling af værktøjer til fælles beslutningstagning, som
                    hjælper patienterne med at vælge den behandling, der passer
                    bedst til deres behov og livssituation
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

export default Project2018;
