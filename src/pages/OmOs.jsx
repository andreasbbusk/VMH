import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

import styles from "./OmOS.module.css";

import OmOsVideo from "../assets/OmOsVideo.mp4";
import { useState, useRef } from "react";
import Play from "../assets/play-button.svg";
import Ideenbag1 from "../assets/Ideenbag1.png";
import Ideenbag2 from "../assets/IdeenBag2.svg";
import Ideenbag3 from "../assets/IdeenBag3.svg";
import VMVStotte from "../assets/VMVStotte.svg";
import VMVSammen from "../assets/VMVSammen.svg";
import VMVLokale from "../assets/VMVLokale.svg";

const OmOs = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true); // Styrer overlay-knappen
  const [controlsVisible, setControlsVisible] = useState(false); // Skjuler kontroller initialt
  const videoRef = useRef(null); // Reference til videoelementet

  const handleOverlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play(); // Starter videoen
      setControlsVisible(true); // Gør kontrollerne synlige
    }
    setIsOverlayVisible(false); // Fjerner overlay
  };
  return (
    <>
      <Breadcrumb />

      <div className={styles["omos-intro-container"]}>
        <div className={styles["omos-intro-venstre"]}>
          <h1>
            Vi skaber <br /> <bold>Forandring</bold> Sammen
          </h1>
          <div className={styles["omos-divider"]} />
          <p>
            Vores indsats bunder i fællesskab og nærområdets opbakning.
            Sponsorer fra Vejles erhvervsliv bidrager med lokale midler, og
            frivillige sørger for, at hver opgave bliver løst med engagement og
            hjerte. Det betyder, at vi sammen skaber forandring og styrke det
            samlede kræftcenter i Vejle. <br /> Ved at stå sammen kan vi skabe
            en lysere fremtid uden hudcancer. Vi tror på, at fællesskab gør en
            forskel - og sammen kan vi skabe en verden med færre kræfttilfælde.
          </p>
        </div>

        <div className={styles["omos-intro-hojre"]}>
          <div className={styles["video-wrapper"]}>
            <video
              ref={videoRef}
              src={OmOsVideo}
              controls={controlsVisible}
            ></video>{" "}
            {/* Tilføjer controls kun når videoen spiller */}
            {isOverlayVisible && (
              <div
                className={styles["video-overlay"]}
                onClick={handleOverlayClick}
                role="button"
                tabIndex={0}
                aria-label="Afspil video"
              >
                <img src={Play} alt="Play Button" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles["omos-citat"]}>
        <h1>
          "Vi har startet vejle mod hudcancer, <br />
          fordi hudcancer er et større problem <br />
          og det skal der endnu mere fokus på" <br />
        </h1>
        <p>-Dorthe, Susanne, Christina, Birgitte </p>
      </div>

      <div className={styles["ideenbag-container"]}>
        <div className={styles["ideenbag-billede-container"]}>
          <div className={styles["ideenbag-billede-et-container"]}>
            <img src={Ideenbag1} alt="" />
            <img src={Ideenbag2} alt="" />
          </div>
          <div className={styles["ideenbag-billede-to-container"]}>
            <img src={Ideenbag3} alt="" />
          </div>
        </div>
        <div className={styles["ideenbag-tekst"]}>
          <h1>
            {" "}
            <bold>Ideen bag</bold> <br />
            Vejle mod hudcancer
          </h1>
          <hr className={styles["ideenbag-divider"]} />
          <p>
            Vejle mod hudcancer blev skabt ud fra en simpel idé: At bidrage til
            kampen mod hudcancer, gennem lokale midler. Visionen er at skabe
            opmærksomhed om sygdommen og gøre en konkret forskel gennem støtte
            til lokale initiativer, der fremmer forebyggelse, behandling,
            forskning og udvikling. Alt vi gør, er baseret på frivillighed og
            lokal opbakning. Midlerne indsamles gennem det Vejlensiske
            erhvervsliv, som støtter de forskellige projekter, og fordi alle
            opgaver udføres af frivillige, går alle indsamlede midler til det
            pågældende projekt. Bag vores indsats ligger en stor tro på, at
            sammen kan vi bidrage til at bekæmpe hudcancer og samtidig skabe
            større bevidsthed om hudcancer. Det er gennem styrke fra
            lokalsamfundet og dets sammenhold, der gør vores arbejde muligt.
          </p>
        </div>
      </div>

      <div className={styles["VMV-container"]}>
        <h1>vision, mission & værdier</h1>
        <div className={styles["VMV-content"]}>
          <div className={styles["VMV-stotte"]}>
            <img src={VMVStotte} alt="" />
            <div className={styles["VMV-stotte-tekst"]}>
              <p>
                <strong>Mission:</strong> <br />
                Bekæmpe hudcancer gennem lokale midler
              </p>
            </div>
          </div>
          <div className={styles["VMV-sammen"]}>
            <img src={VMVSammen} alt="" />
            <div className={styles["VMV-stotte-tekst"]}>
              <p>
                {" "}
                <strong>Vision:</strong> <br />
                Skabe oplysning omkring forebyggelse, behandling og forskning
              </p>
            </div>
          </div>
          <div className={styles["VMV-lokale"]}>
            <img src={VMVLokale} alt="" />
            <div className={styles["VMV-stotte-tekst"]}>
              <p>
                <strong>Værdier:</strong> <br />
                Fællesskab, gennemsigtighed og lokal støtte
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["omos-kontakt-container"]}>
        <div className={styles["omos-kontakt-tekst"]}>
          <h1>Har du et spørgsmål?</h1>
          <p>
            Du er velkommen til at kontakte os og finde ud af hvordan du <br />
            kan være med i kampen mod hudcancer
          </p>
          <button className={styles["intro-button"]}>Kontakt os</button>
        </div>
        <div className={styles["omos-kontakt-knap"]}></div>
      </div>
    </>
  );
};

export default OmOs;
