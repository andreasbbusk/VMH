// Kodet af Andreas + Tilhørende CSS og Komponenter er kodet af Andreas

import { motion as m } from "framer-motion";
import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Project.module.css";
import Hands from "../../assets/support-hands2.svg";
import MoneyBag from "../../assets/money-bag.svg";
import TargetHit from "../../assets/target-hit.svg";
import ProjectImage from "../../assets/fed-printer.jpg";
import ProjectNavigation from "../../components/Project/ProjectNavigation";
import { Link } from "react-router-dom";

const Project2022 = () => {
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
    { id: "2", title: "Hvordan OCT-scanneren gør en forskel" },
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
                <strong>Projekt 2022</strong>
              </h1>
              <h1>scanner til optimering afkirurgi øjennært</h1>
              <div className={styles.horizontal_line_video}></div>

              <section className={styles.project_description}>
                <p>
                  Endnu engang er Vejle Sygehus first mover på et spændende
                  hudkræft projekt. Som noget helt nyt vil man gøre det muligt,
                  at scanne huden omkring øjet for hudkræft. Man har tidligere
                  kunnet scanne øjet, men nu skal det være muligt at scanne
                  huden omkring, så man skal operere mindst muligt (læs mere om
                  det nedenfor). Projektet kræver indkøb af en scanner og det er
                  her, vi kan gøre en forskel.
                </p>
                <p>
                  Med vores støtte, har projektgruppen indkøbt skanneren fra
                  Vivosight med en ekstra, særligt udviklet og præcist
                  skannerhoved til skanning helt ind ved tårekanalen.
                </p>
              </section>
            </div>

            <div className={styles.project_media}>
              <div className={styles.media_container_image}>
                <img src={ProjectImage} alt="Projekt 2022" />
              </div>
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
                    <strong>Belæg for at anskaffe en OCT-scanner:</strong>
                  </p>
                  <ul className={styles.list}>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>01</p>
                      <li>
                        OCT-scanning giver mulighed for at opdage alvorlige
                        øjensygdomme på et tidligt stadie, ofte før symptomer
                        opstår.
                      </li>
                    </div>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>02</p>
                      <li>
                        OCT er en ikke-invasiv metode, der giver detaljerede
                        billeder af øjets indre strukturer i høj opløsning.
                      </li>
                    </div>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>03</p>
                      <li>
                        Med billederne fra OCT-scanninger kan patienter få en
                        bedre forståelse af deres øjenhelbred.
                      </li>
                    </div>
                  </ul>
                </div>
                <p>
                  En OCT-scanner er en investering, der ikke kun forbedrer
                  kvaliteten af patientpleje, men også øger effektiviteten og
                  nøjagtigheden af diagnostik.
                </p>
              </div>
            </section>

            <section data-section="2" className={styles.section}>
              <h2>Hvordan kan OCT-scanneren gøre en forskel?</h2>
              <div className={styles.sectionContent}>
                <div className={styles.infoText}>
                  <div className={styles.introText}>
                    <p>
                      OCT er en scanner som vi som øjenlæger er vant til at
                      bruge da den har været brugt siden 90erne til at scanne
                      forandringer inde i øjet i nethinden. Den er non-invasiv
                      og er baseret på infrarødt lys. Scanningssvaret som ligner
                      et snit af det væv som scannes kan straks ses på en skærm.{" "}
                      <br /> <br />
                      Det nye er at scannerne nu er blevet så gode at man også
                      kan scanne huden. Der er lavet en del forskning hvor den
                      er blevet brugt til at scanne hudcancer på kroppen
                      generelt og det har vist sig at den både giver en billede
                      af hvilken slags hudkræft det er men også udbredelsen af
                      hudkræften. <br /> <br /> Vi får flere og flere patienter
                      med hudkræft øjennært og tilmed også yngre og yngre
                      patienter. Vi har således nu haft flere patienter som er
                      under 30 år. <br /> <br /> Kirurgi er førstevalget af
                      behandling af øjennære tumorer da det ikke er muligt at
                      give strålebehandling så tæt på øjet uden at øjet bliver
                      påvirket eller behandling med cremer og PDT (lysterapi).{" "}
                      <br /> <br /> Vi vil gerne bruge scanneren når vi fjerner
                      tumor i øjenomgivelserne da absolut hver millimeter væv
                      tæller her både i forhold til det funktionelle men også
                      det kosmetiske resultat efter operationen.
                    </p>

                    <img src={Hands} alt="Holder af dig" />
                  </div>
                </div>
              </div>
            </section>

            <section data-section="3" className={styles.section}>
              <h2>Økonomiske ramme</h2>
              <div className={styles.money_section}>
                <p>Til realiseringen af projektet blev der i 2022 indsamlet</p>
                <h1>1.021.600 kr.</h1>
                <img src={MoneyBag} alt="Pengepose" />
              </div>
              <div className={styles.money_list}>
                <h3>Beløbet gik til:</h3>
                <div className={styles.money_item}>
                  <h4>OCT til optimering af tumor kirurgi øjennært.</h4>
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
                    Vi kan altid bruge din hjælp til vores kommende projekter.
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

export default Project2022;
