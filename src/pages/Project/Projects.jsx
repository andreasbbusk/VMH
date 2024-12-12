import { motion as m, animate } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Project.module.css";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VMHmoneyStack from "../../assets/VMHmoney-stack.svg";
import Chart2023 from "../../assets/2023-chart.svg";
import Chart2022 from "../../assets/2022-chart.svg";
import Chart2019 from "../../assets/2019-chart.svg";
import Chart2018 from "../../assets/2018-chart.svg";
import Chart2017 from "../../assets/2017-chart.svg";

import DoctorIcon from "../../assets/doctor-icon.svg";
import BarIcon from "../../assets/bar-icon.svg";
import PlaceIcon from "../../assets/place-icon.svg";
import PuzzleIcon from "../../assets/puzzle-icon.svg";

import ProjectSlider from "../../components/Project/ProjectSlider";

const Projects = () => {
  const ref = useRef(null);
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    // Start from 0 and animate up to final amount for more dramatic effect
    const animation = animate(0, 3403966.5, {
      duration: 1.5, // Longer duration for more dramatic effect
      ease: "easeInOut",
      onUpdate: (value) => {
        // Round to nearest 100 during animation
        setAnimatedNumber(Math.round(value / 100) * 100);
      },
      onComplete: () => {
        // Ensure we show the exact final amount
        setAnimatedNumber(3403966.5);
      },
    });

    return () => animation.stop();
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("da-DK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Animation variants for timeline entries
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      x: "-100%",
    },
    show: {
      x: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  // Combined variants for chart animations
  const combinedChartVariants = {
    ...itemVariants,
    hover: {
      filter: "saturate(1.1)",
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Breadcrumb />
        <div className={styles.projects_container}>
          <section className={styles.projects_intro}>
            <div className={styles.projects_intro_text}>
              <h1>
                <strong>Vejle mod hudcancer</strong> støtter hvert år et nyt
                lokalt hudcancer-projekt
              </h1>
            </div>
            <div className={styles.projects_intro_text_content}>
              <div>
                <div className={styles.horizontal_line}></div>
                <p>
                  Styregruppen udvælger hvert år et nyt projekt, som støttes med
                  de midler, der indsamles gennem donationer fra borgere og det
                  lokale erhvervsliv.{" "}
                  <strong>
                    Alle indsamlede midler fra året går ubeskåret til projektet.
                  </strong>
                </p>
              </div>
              <img src={VMHmoneyStack} alt="Mønte stak" />
            </div>
          </section>

          <section className={styles.projects_timeline}>
            <div className={styles.total_amount} ref={ref}>
              <m.h2>
                <m.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  {`${formatAmount(animatedNumber)} kr.`}
                </m.span>
              </m.h2>
              <p>
                Vejle mod hudcancer har siden 2017 indsamlet over 3,4 millioner
                kroner, som er gået til en lang række formål.
              </p>
            </div>

            <m.div
              className={styles.timeline_entries}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <m.div className={styles.timeline_entry} variants={itemVariants}>
                <m.img
                  src={Chart2023}
                  alt="2023 projekt statistik"
                  variants={combinedChartVariants}
                  whileHover="hover"
                />
                <div className={styles.project_info}>
                  <h3>PROJEKT 2023</h3>
                  <p>
                    Faciliteter til projekt <br /> &quot;Lys i Vejle året
                    rundt&quot;
                  </p>
                </div>
              </m.div>

              <m.div className={styles.timeline_entry} variants={itemVariants}>
                <m.img
                  src={Chart2022}
                  alt="2022 projekt statistik"
                  variants={combinedChartVariants}
                  whileHover="hover"
                />
                <div className={styles.project_info}>
                  <h3>PROJEKT 2022</h3>
                  <p>Scanner til optimering af kirurgi øjennært</p>
                </div>
              </m.div>

              <m.div className={styles.timeline_entry} variants={itemVariants}>
                <m.img
                  src={Chart2019}
                  alt="2019 projekt statistik"
                  variants={combinedChartVariants}
                  whileHover="hover"
                />
                <div className={styles.project_info}>
                  <h3>PROJEKT 2019</h3>
                  <p>Scanner til optimering af kirurgi øjennært</p>
                </div>
              </m.div>

              <m.div className={styles.timeline_entry} variants={itemVariants}>
                <m.img
                  src={Chart2018}
                  alt="2018 projekt statistik"
                  variants={combinedChartVariants}
                  whileHover="hover"
                />
                <div className={styles.project_info}>
                  <h3>PROJEKT 2018</h3>
                  <p>Scanner til optimering af kirurgi øjennært</p>
                </div>
              </m.div>

              <m.div className={styles.timeline_entry} variants={itemVariants}>
                <m.img
                  src={Chart2017}
                  alt="2017 projekt statistik"
                  variants={combinedChartVariants}
                  whileHover="hover"
                />
                <div className={styles.project_info}>
                  <h3>PROJEKT 2017</h3>
                  <p>Scanner til optimering af kirurgi øjennært</p>
                </div>
              </m.div>
            </m.div>

            <div className={styles.contact_info}>
              <div className={styles.horizontal_line_contact}></div>
              <p>
                Har du et relevant hudcancer-projekt, som vi kan tage i
                betragtning, er du velkommen til at kontakte os på{" "}
                <a
                  href="mailto:kontakt@vejlemodhudcancer.dk"
                  tabIndex={0}
                  aria-label="Send email til Vejle mod hudcancer"
                >
                  kontakt@vejlemodhudcancer.dk
                </a>
              </p>
            </div>
          </section>
          <section className={styles.support_criteria}>
            <div className={styles.criteria_left}>
              <h2>HVORDAN VÆLGER VI STØTTESAGER?</h2>
              <div className={styles.horizontal_line_criteria}></div>
              <p>Der er et sæt kriterier for udvælgelsen af nye projekter</p>
            </div>
            <div className={styles.criteria_right}>
              <div className={styles.criteria_item}>
                <img
                  src={DoctorIcon}
                  alt="Ikon for forebyggelse og behandling"
                  className={styles.criteria_icon}
                />
                <div className={styles.criteria_item_text}>
                  <h3>FOREBYGGELSE & BEHANDLING</h3>
                  <p>
                    Projektet skal være til gavn for det samlede kræftcenter i
                    Vejle, så det kan styrke sin indsats inden for forebyggelse,
                    behandling og oplysning om cancer for hele regionen.
                  </p>
                </div>
              </div>
              <div className={styles.criteria_item}>
                <img
                  src={BarIcon}
                  alt="Ikon for målbarhed"
                  className={styles.criteria_icon}
                />
                <div className={styles.criteria_item_text}>
                  <h3>MÅLBARHED</h3>
                  <p>
                    Det skal bidrage til at øge kendskabet til hudcancer i
                    Region Syddanmark. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Asperiores voluptatum deleniti aspernatur
                    ipsam optio deserunt impedit commodi error repellat autem.
                    Illo quidem optio, necessitatibus recusandae libero
                    inventore vero cum id?
                  </p>
                </div>
              </div>
              <div className={styles.criteria_item}>
                <img
                  src={PlaceIcon}
                  alt="Ikon for lokal forankring"
                  className={styles.criteria_icon}
                />
                <div className={styles.criteria_item_text}>
                  <h3>LOKAL FORANKRING</h3>
                  <p>
                    Projektet skal styrke samarbejdet mellem sundhedspersonale
                    og borgere i Region Syddanmark. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Libero maxime voluptates
                    corporis omnis! Asperiores excepturi corrupti quos atque
                    ullam repudiandae nihil nemo tempora! Numquam facere fugit
                    accusamus, aliquam perspiciatis unde.
                  </p>
                </div>
              </div>
              <div className={styles.criteria_item}>
                <img
                  src={PuzzleIcon}
                  alt="Ikon for samarbejde"
                  className={styles.criteria_icon}
                />
                <div className={styles.criteria_item_text}>
                  <h3>SAMARBEJDE</h3>
                  <p>
                    Projektet skal styrke samarbejdet mellem sundhedspersonale
                    og borgere i Region Syddanmark. Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Consequuntur repellat quaerat
                    eaque laborum veniam quis quia. Magni, atque libero. Illo
                    natus ipsam iste illum, delectus voluptatem consequatur
                    eveniet officiis culpa?
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.projects_slider}>
            <ProjectSlider projects={projectsData} />
          </section>
        </div>
      </m.main>
    </>
  );
};

export default Projects;