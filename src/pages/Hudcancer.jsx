import styles from "./Hudcancer.module.css";
import { useState, useRef } from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import HudcancerIntro from "../assets/hudcancer-intro.jpg";
import Lotte from "../assets/LotteDamkjær.mp4";
import Play from "../assets/play-button.svg";
import thumbnail from "../assets/LotteThumbnail.png";

import parasol from "../assets/parasol.svg";
import linjeop from "../assets/linjeop.svg";
import solhat from "../assets/solhat.svg";
import solhatpil from "../assets/solhat-pil.svg";
import solcreme from "../assets/solcreme.svg";
import solcremepil from "../assets/solcreme-pil.svg";

const Hudcancer = () => {
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
      <div className={styles["hudcancer-intro-container"]}>
        <div className={styles["hudcancer-intro-tekst"]}>
          <h1>
            <strong>tidlig diagnose er vigtigt</strong> <br />
            undersøg din hud <br /> jævnligt
          </h1>
          <hr className={styles["hudcancer-divider"]} />
          <p>
            Flere og flere mennesker i Danmark får modermærkekræft, og det samme
            gælder almindelig hudcancer. Modermærkekræft er en alvorlig sygdom,
            som kan være dødelig, det er derfor meget vigtigt, at det opdages og
            behandles så tidligt som muligt.
          </p>
        </div>

        <div className={styles["hudcancer-intro-billede"]}>
          <img src={HudcancerIntro} alt="Hudcancer introduktion" />
        </div>
      </div>

      <div className={styles["pletter-sektion"]}>
        <div className={styles["hudcancer-pletter-container"]}>
          <div className={styles["hudcancer-pletter-se"]}>
            <h1>
              <strong>Se efter</strong>
              <br /> pletter som:
            </h1>
            <p>
              Søg læge hvis du er i tvivl <br />
              <a href="#">Klik her og lær, hvor du skal tjekke</a>
            </p>
          </div>

          <div className={styles["hudcancer-pletter-symptomer"]}>
            <h3>ændrer størrelse, farve og/eller form</h3>
            <hr className={styles["pletter-divider"]} />
            <h3>ser anderledes ud end dine andre pletter, er asymmetriske</h3>
            <hr className={styles["pletter-divider"]} />
            <h3>
              føles ru eller skæller - nogle gange kan
              <br />
              du mærke forandringerne før du kan se dem
            </h3>
            <hr className={styles["pletter-divider"]} />
            <h3>har mange farver, klør, bløder eller væsker</h3>
            <hr className={styles["pletter-divider"]} />
            <h3>
              har en skinnende overflade eller <br /> ligner et sår, som ikke
              vil hele.
            </h3>
            <hr className={styles["pletter-divider"]} />
            <div className={styles["pletter-kilde"]}>
              <p>
                Kilde: <a href="#">Euromelanoma</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["saar-container"]}>
        <div className={styles["saar-video"]}>
          <div className={styles["video-wrapper"]}>
            <video
              ref={videoRef}
              src={Lotte}
              controls={controlsVisible}
              poster={thumbnail}
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
        <div className={styles["saar-tekst"]}>
          <h1>
            <strong>Et sår der</strong> <br /> ikke ville hele
          </h1>
          <hr className={styles["saar-divider"]} />
          <p>
            Hør Lottes historie om hvordan et sår der ikke ville hele <br />
            kom tilbage igen og igen. I dag er hun ekstra opmærksom, <br />
            på at tjekke hele sin krop.
          </p>
        </div>
      </div>

      <div className={styles["forebygge-background"]}>
      <div className={styles["forebygge-overskrift-mobil"]}>
          <h1>
            sådan <bold> Forebygger du </bold> <br />
            udviklingen af hudkræft
          </h1>
          <p>
            Kilde: <a href="#">Kræftens bekæmpelse</a>
          </p>
        </div>
        <div className={styles["forebygge-skygge"]}>
          <img src={parasol} alt="" />
          <div className={styles["forebygge-skygge-tekst"]}>
            <h2>Skygge</h2>
            <p>
              Solens uv-stråling er stærkest mellem 12 og 15. Næsten <br />
              halvdelen af uv-strålingen falder i dette tidsrum. Derfor kan du
              <br />
              undgå rigtig meget uv-stråling ved at finde skygge midt på <br />
              dagen.
            </p>
          </div>
        </div>

        <div className={styles["linjeop"]}>
          <img src={linjeop} alt="" />
        </div>

        <div className={styles["forebygge-overskrift"]}>
          <h1>
            sådan <bold> Forebygger du </bold> <br />
            udviklingen af hudkræft
          </h1>
          <p>
            Kilde: <a href="#">Kræftens bekæmpelse</a>
          </p>
        </div>

<div className={styles['infographic-container']}>
            <div className={styles['solhat-container']}>
            <div className={styles['Solhat-billede-container']}>
            <img src={solhat} alt="" />
            <div className={styles['mobil-farvel-1']}>
            <img src={solhatpil} alt="" />
            </div>
            </div>
            <div className={styles['solhat-tekst']}>
            <h2>Solhat/tøj</h2>
            <p>
            Hvis du ikke har mulighed for at være i skyggen er en solhat med <br />
             bred skygge og en langærmet t-shirt den bedste beskyttelse mod <br /> solens uv-stråling.</p>
             </div>
            </div>


            <div className={styles['solcreme-container']}>
            <div className={styles['Solcreme-billede-container']}>
            <div className={styles['mobil-farvel']}>
            <img src={solcremepil} alt="" />
            </div>
            <img src={solcreme} alt="" />
            </div>
            <div className={styles['sol-creme-tekst']}>
            <h2>Solcreme</h2>
            <p>
          Husk altid rigeligt med solcreme. Efter badning og aftørring bør <br />
           du smøre igen. Brug faktor 15 eller mere i Danmark og faktor 30 <br />
            eller mere, når du er ude og rejse i lande, der har et varmere <br />
             klima. Solcremen skal være bredspektret, dvs. beskytte mod både <br />
              UVA- og UVB-stråling.</p>
              </div>
            </div>
            </div>
      </div>

      <div className={styles['yderlige-info-background']}>
      <div className={styles['yderlige-info-overkskrift']}>
      <h1>For Yderligere Information</h1>
      </div>
      <div className={styles['yderlige-info-container']}>
        <div className={styles['yderlige-info-links']}>
          <p>Kræftens Bekæmpelse:</p>
          <a href="">Hudkræft: Symptomer, behandling, undersøgelser, diagnose og årsager</a> <br />
          <a href="">Statistik om modermærkekræft</a> <br />
          <a href="">Statistik om basalcelle- og pladecellekræft samlet</a>
        </div>

        <div className={styles['yderlige-info-links']}>
          <p>Euromelanoma:</p>
          <a href="">Fakta om hudkræft</a> <br />
          <a href="">Forebyggelse af hudkræft</a> <br />
          <a href="">Hvad skal du kigge efter</a>
        </div>

        <div className={styles['yderlige-info-links']}>
          <a href="">Solkampagnen</a> <br />
        </div>
      </div>
      </div>
    </>
  );
};

export default Hudcancer;