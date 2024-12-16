import { motion as m } from "framer-motion";
import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Project.module.css";
import Hands from "../../assets/support-hands2.svg";
import MoneyBag from "../../assets/money-bag.svg";
import TargetHit from "../../assets/target-hit.svg";
import ProjectImage from "../../assets/drivhus.png";
import ProjectNavigation from "../../components/Project/ProjectNavigation";
import { Link } from "react-router-dom";

const Project2019 = () => {
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
    { id: "2", title: "Hvordan en glaspavillion gør en forskel" },
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
                <strong>Projekt 2019</strong>
              </h1>
              <h1>Glaspavillion til dagslysbehandling</h1>
              <div className={styles.horizontal_line_video}></div>

              <section className={styles.project_description}>
                <p>
                  I 2019/2020 udbygger Vejle Sygehus deres hudkræftafdeling. I
                  den forbindelse har vi fået mulighed for at tilføje en
                  glaspavillon, som er med til at gøre hudkræftbehandlingen
                  hurtigere, mindre smertefuld og ikke mindst merelokal.
                </p>
              </section>
            </div>

            <div className={styles.project_media}>
              <div className={styles.media_container_image}>
                <img src={ProjectImage} alt="Projekt 2019" />
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
                    <strong>Belæg for at anskaffe en Glaspavillion:</strong>
                  </p>
                  <ul className={styles.list}>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>01</p>
                      <li>Optimal udnyttelse af naturligt lys</li>
                    </div>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>02</p>
                      <li>
                        En glaspavillon skaber et roligt og æstetisk miljø, der
                        gør dagslysbehandling mere behagelig
                      </li>
                    </div>
                    <div className={styles.listItem}>
                      <p className={styles.listItemNumber}>03</p>
                      <li>
                        En glaspavillon er ikke kun praktisk, men også en
                        langsigtet investering
                      </li>
                    </div>
                  </ul>
                </div>
                <p>
                  En glaspavillon kombinerer funktionalitet med æstetik og kan
                  gøre dagslysbehandling både mere effektiv og fornøjelig.
                </p>
              </div>
            </section>

            <section data-section="2" className={styles.section}>
              <h2>Hvordan kan en glaspavillion gøre en forskel?</h2>
              <div className={styles.sectionContent}>
                <div className={styles.infoText}>
                  <div className={styles.introText}>
                    <p>
                      Dagslys-PDT kan anvendes til behandling af såvel
                      enkeltstående solskader i huden (hudkræft), som store
                      områder, når det drejer sig om enten tynde eller moderat
                      tykke solskader. Behandlingen er især en fordel for
                      patienter med store områder med hudkræft, som er svært
                      afgrænselige mod normal hud, da belysningen med dagslys i
                      princippet er smertefri uafhængigt af behandlingsområdets
                      størrelse. <br /> <br /> Glaspavillonen placeres i en
                      gårdhave i forbindelse med de bygninger, som
                      hudkræftafdelingen overtager i 2019/2020. Billederne til
                      højre er fra den eksisterende gårdhave.
                    </p>

                    <img src={Hands} alt="Holder af dig" />
                  </div>
                </div>
              </div>
            </section>

            <section data-section="3" className={styles.section}>
              <h2>Økonomiske ramme</h2>
              <div className={styles.money_section}>
                <p>Til realiseringen af projektet blev der i 2019 indsamlet</p>
                <h1>748.866,50 kr.</h1>
                <img src={MoneyBag} alt="Pengepose" />
              </div>
              <div className={styles.money_list}>
                <h3>Beløbet gik til:</h3>
                <div className={styles.money_item}>
                  <h4>Glaspavillion til daglysbehandling</h4>
                </div>
              </div>
              <p> <br />
                Størrelsen og udformningen af bygningen var afhængig af
                donationens størrelse, da den alene finansierer glaspavillonen.
                Og med det fantastisk store beløb, er der blevet mulighed for en
                større og bedre indrettet pavillon end forventet.
              </p>
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
                    <strong>Vi kan altid bruge din hjælp til vores kommende projekter.</strong>
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

export default Project2019;
