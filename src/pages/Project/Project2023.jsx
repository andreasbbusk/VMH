import { motion as m } from "framer-motion";
import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Project.module.css";
import Hands from "../../assets/support-hands2.svg";
import MoneyBag from "../../assets/money-bag.svg";
import TargetHit from "../../assets/target-hit.svg";
import ProjectImage from "../../assets/lysivejle.png";
import ImageSlider from "../../components/Project/ImageSlider";
import ProjectNavigation from "../../components/Project/ProjectNavigation";
import { Link } from "react-router-dom";

const Project2023 = () => {
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
    { id: "1", title: "Faciliteterne" },
    { id: "2", title: "Hvordan lysbehandling gør en forskel" },
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
                <strong>Projekt 2023</strong>
              </h1>
              <h1>
                Faciliteter til projekt <br /> “Lys i Vejle året rundt”
              </h1>
              <div className={styles.horizontal_line_video}></div>

              <section className={styles.project_description}>
                <p>
                  I 2023 var projekt “Lys i Vejle året rundt” en vigtig milepæl
                  i arbejdet for bedre behandling af hudkræft. Projektet blev
                  realiseret i tæt samarbejde med Vejle Sygehus, der arbejder
                  for at være patienternes kræftsygehus med skånsomme, effektive
                  og individuelt tilpassede behandlingstilbud.
                </p>
                <p>
                  Derfor havde Vejle Sygehus en vision om at etablere et center
                  for hudkræft, hvor multidisciplinære teams af specialister fra
                  blandt andet dermatologi, plastikkirurgi, onkologi og
                  øjenkirurgi kunne sikre en sammenhængende behandling af høj
                  kvalitet for patienter i regionen.
                </p>
              </section>
            </div>

            <div className={styles.project_media}>
              <div className={styles.media_container_image}>
                <img src={ProjectImage} alt="Projekt 2023" />
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
              <h2>Faciliteterne</h2>
              <div className={styles.sectionContent}>
                <div className={styles.textContent}>
                  <p>
                    Faciliteterne skal sikre patienter med forstadier til
                    hudkræft og mindre hudkræftknuder, kunne modtage behandling
                    uden lange ventetider eller transport til andre sygehuse.{" "}
                    <br />{" "}
                    <strong>Projektets mål var at indsamle midler til:</strong>
                  </p>
                </div>
                <ImageSlider projectYear="2023" />
              </div>
            </section>

            <section data-section="2" className={styles.section}>
              <h2>Hvordan Lysbehandling gør en forskel</h2>
              <div className={styles.sectionContent}>
                <div className={styles.infoText}>
                  <div className={styles.introText}>
                    <p>
                      Fotodynamisk terapi (PDT) er en behandlingsform, hvor
                      kræftforandringer på huden først påføres en creme og
                      derefter bestråles med lys – enten fra dagslys eller
                      særlige lamper. <br /> <br /> Lyset aktiverer stoffer i
                      cremen, som dræber kræftcellerne. Dagslys-PDT er en
                      smertefri løsning, men den kan kun udføres i
                      sommerhalvåret (april-oktober) <br /> <br /> Med projektet
                      blev det muligt at tilbyde kunstlys-PDT hele året, hvilket
                      giver patienterne:
                    </p>

                    <img src={Hands} alt="Holder af dig" />
                  </div>

                  <div className={styles.benefitsList}>
                    <div className={styles.benefitItem}>
                      <p>Kontinuerlig behandling uden sæsonbegrænsninger.</p>
                    </div>

                    <div className={styles.benefitItem}>
                      <p>
                        Lokal adgang, så patienter slipper for lange rejser.
                      </p>
                    </div>

                    <div className={styles.benefitItem}>
                      <p>
                        Øget fleksibilitet og effektivitet i
                        behandlingstilbuddene.
                      </p>
                    </div>
                  </div>
                  <p>
                    <br /> Projektet introducerede også en CO2-laser, som øger
                    behandlingseffekten ved at sikre dybere penetration af
                    cremen og samtidig gør det muligt at forbedre senfølger som
                    ar og kartegninger i huden.
                  </p>
                </div>
              </div>
            </section>

            <section data-section="3" className={styles.section}>
              <h2>Økonomiske ramme</h2>
              <div className={styles.money_section}>
                <p>Til realiseringen af projektet blev der i 2023 indsamlet</p>
                <h1>813.800 kr.</h1>
                <img src={MoneyBag} alt="Pengepose" />
              </div>
              <div className={styles.money_list}>
                <h3>Beløbet gik til:</h3>
                <div className={styles.money_item}>
                  <h4>Anskaffelse af PDT-lamper til kunstlysbehandling.</h4>
                </div>
                <div className={styles.money_item}>
                  <h4>
                    Indkøb af behandlerstole, som kan tilpasses den enkelte
                    patients behov.
                  </h4>
                </div>
                <div className={styles.money_item}>
                  <h4>
                    Udbygning af faciliteter, så behandlingen kan gennemføres
                    hele året.
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
                    Vi kan altid bruge din hjælp til vores kommende projekter.
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

export default Project2023;
