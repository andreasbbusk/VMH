import { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import styles from "../../pages/Project/Project.module.css";
import ImageSlider from "./ImageSlider";

import Hands from "../../assets/support-hands2.svg";

const ProjectInfo = () => {
  const [activeSection, setActiveSection] = useState("hvorfor");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offset = 200; // Adjust this value as needed

        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(section.dataset.section);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
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
                SPY-PHI-scanneren giver kirurger mulighed for at arbejde med en
                præcision, som det blotte øje ikke kan opnå. <br />{" "}
                <strong>Scanneren gør det muligt at:</strong>
              </p>
              <ul className={styles.list}>
                <div className={styles.listItem}>
                  <p className={styles.listItemNumber}>01</p>
                  <li>
                    Afgrænse kræftknuder nøjagtigt, så kun det syge væv fjernes
                    under operationen.
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
                    resultater, især i synlige områder som ansigt, hals, arme og
                    ben.
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
              <p className={styles.introText}>
                SPY-Phi anvender en infrarød laser og et skånsomt kontraststof til præcist at fremhæve kræftvæv. 
                Denne teknologi muliggør:
              </p>
              <img src={Hands} alt="Holder af dig" />
              
              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <p>Præcis skelnen mellem sygt og raskt væv så patienten undgår unødvendige indgreb.</p>
                </div>
                
                <div className={styles.benefitItem}>
                  <p>Mindre omfattende operationer der reducerer ar og belastning for patienten.</p>
                </div>
                
                <div className={styles.benefitItem}>
                  <p>Behandling af lymfødem en alvorlig senfølge, der kan ramme op mod 35 % af kræftpatienter.</p>
                </div>
              </div>

              <div className={styles.highlightText}>
                <p>
                  Ved at have SPY-Phi på Vejle Sygehus kan patienter få en{' '}
                  <span className={styles.highlight}>hurtigere</span>, mere{' '}
                  <span className={styles.highlight}>sammenhængende</span> og{' '}
                  <span className={styles.highlight}>mindre belastende behandling</span>.
                  Dette sparer ikke kun tid og ressourcer, men gør også en stor forskel 
                  for patientens samlede oplevelse i en svær tid.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section data-section="3" className={styles.section}>
          <h2>Økonomiske mål</h2>
          {/* Indsæt indhold her */}
        </section>

        <section data-section="4" className={styles.section}>
          <h2>Sådan når vi målet</h2>
          {/* Indsæt indhold her */}
        </section>
      </div>
    </div>
  );
};

export default ProjectInfo;
