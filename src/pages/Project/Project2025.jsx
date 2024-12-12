import { motion as m } from "framer-motion";
import { useState, useRef } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ProjectInfo from "../../components/Project/ProjectInfo";
import styles from "./Project.module.css";
import PlayButton from "../../assets/play-button.svg";

import StrykerVideo from "../../assets/StrykerVideo.mp4";

const Project2025 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
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
                {!isPlaying && (
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
        <section className={styles.project_info}>
          <ProjectInfo />
        </section>
      </m.main>
    </>
  );
};

export default Project2025;
