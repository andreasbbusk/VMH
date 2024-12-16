import { motion as m } from "framer-motion";

import styles from "./Sponsor.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import logoSVG from "../../assets/VMHlover.svg";
// Billeder til sektionerne
import image1 from "../../assets/C-Beauty-and-Care.png";
import image2 from "../../assets/Yogilates.png";
import image3 from "../../assets/sparekassenkronjylland.png";
import image4 from "../../assets/engredo.png";
import newImage1 from "../../assets/tryksager.png";
import newImage2 from "../../assets/nemtilmeld.png";
import newImage3 from "../../assets/EY.png";
import newImage4 from "../../assets/NHfoto.png";
import extraImage1 from "../../assets/torveH.png";
import extraImage2 from "../../assets/østjysk.png";
import extraImage3 from "../../assets/blomsterSP.png";
import extraImage4 from "../../assets/slagterG.png";
import extraImage5 from "../../assets/dgihuset.png";
import extraImage6 from "../../assets/vanillaSP.png";
import extraImage7 from "../../assets/cloudcapital.png";
import extraImage8 from "../../assets/kaffebaren.png";
import extraImage9 from "../../assets/skærtoft.png";
import extraImage10 from "../../assets/megavin.png";
import extraImage11 from "../../assets/universalSP.png";
import extraImage12 from "../../assets/PHformula.png";
import extraImage13 from "../../assets/JesperM.png";
import extraImage14 from "../../assets/AuktionSP.png";
import extraImage15 from "../../assets/ThunSP.png";
import extraImage16 from "../../assets/KennethSP.png";
import extraImage17 from "../../assets/polyprint.png";
import extraImage18 from "../../assets/VMHSP.svg";
import { Link } from "react-router-dom";

const Sponsor = () => {
  return (
    <>
      <Breadcrumb />
      <div className={styles.sponsor_container}>
        {/* Header med hovedtekst og billede */}
        <div className={styles.SPHeader_container}>
          <div className={styles.SPText_container}>
            <h1 className={styles.SPMain_title}>
              <span className={styles.SPFirst_line}>
                <strong>VI KÆMPER SAMMEN</strong>
              </span>
              <br />
              <span className={styles.SPSecond_line}>
                MOD <span className={styles.underline}>HUDCANCER</span>
              </span>
            </h1>
            <div className={styles.SPSubtitle_container}>
              <p className={styles.SPSubtitle}>
                Når vi kæmper sammen, kan vi nå store resultater - og det har vi
                brug for, for at bekæmpe <br /> hudcancer. Disse sponsorer er
                allerede igang - er DU med?
              </p>
            </div>
          </div>
          <div className={styles.SPSvg_container}>
            {/* SVG billede */}
            <img src={logoSVG} alt="Logo" className={styles.SPLogo_image} />
          </div>
        </div>

        {/* Styregruppe Sektion */}
        <div className={styles.SPSection_container}>
          <h2 className={styles.SPSection_title}>
            <span className={styles.underline_yellow}>STYREGRUPPE</span>
          </h2>
          <div className={styles.SPImage_row}>
            <div className={styles.SPImage_item}>
              <img
                src={image1}
                alt="C-Beauty and Care"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>
                Christina Omann Clemmensen
              </span>
            </div>
            <div className={styles.SPImage_item}>
              <img src={image2} alt="Yogilates" className={styles.SPImage} />
              <span className={styles.SPImage_text}>Dorthe Maglehøj</span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={image3}
                alt="Sparekassen Kronjylland"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Susanne Skovbjerg</span>
            </div>
            <div className={styles.SPImage_item}>
              <img src={image4} alt="Engredo" className={styles.SPImage} />
              <span className={styles.SPImage_text}>Birgitte Busk</span>
            </div>
          </div>
        </div>

        <div className={styles.SPSection_container}>
          <h2 className={styles.SPSection_title}>
            <span className={styles.underline_yellow2}>
              Administration & presse
            </span>
          </h2>

          <div className={styles.SPImage_row}>
            <div className={styles.SPImage_item}>
              <img
                src={newImage1}
                alt="Nyt billede 1"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Tryksager</span>
            </div>

            <div className={styles.SPImage_item}>
              <img
                src={newImage2}
                alt="Nyt billede 2"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Tilmeldingshåndtering</span>
            </div>

            <div className={styles.SPImage_item}>
              <img
                src={newImage3}
                alt="Nyt billede 3"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Revision & Rådgivning</span>
            </div>

            <div className={styles.SPImage_item}>
              <img
                src={newImage4}
                alt="Nyt billede 4"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Foto</span>
            </div>
          </div>
        </div>
        <div className={styles.SPSection_container}>
          <h2 className={styles.SPSection_title}>
            <span className={styles.underline_yellow3}>
              Lokation & forplejning
            </span>
          </h2>

          <div className={styles.SPImage_row}>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage1}
                alt="Nyt billede 1"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>
                Gallamiddag & Lokation
              </span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage2}
                alt="Nyt billede 2"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>
                Borde, rød løber og duge mv.
              </span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage3}
                alt="Nyt billede 3"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Blomster</span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage6}
                alt="Nyt billede 4"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Dessert</span>
            </div>
          </div>

          <div className={styles.SPImage_row}>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage11}
                alt="Nyt billede 1"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Bar, Øl, Vand mm.</span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage9}
                alt="Nyt billede 2"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Kuvertbrød</span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage10}
                alt="Nyt billede 3"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Vinmenu</span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage8}
                alt="Nyt billede 4"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Kaffe og te</span>
            </div>
          </div>

          <div className={styles.SPImage_row3}>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage5}
                alt="Ekstra sponsor 9"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Råvarer</span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage4}
                alt="Ekstra sponsor 10"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Kød - Dansk Kalv</span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage7}
                alt="Ekstra sponsor 11"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Fisk</span>
            </div>
          </div>

          <h2 className={styles.SPSection_title}>
            <span className={styles.underline_yellow3}>
              Underholdning & gaver
            </span>
          </h2>

          <div className={styles.SPImage_row2}>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage12}
                alt="Nyt billede 1"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Velkomstgave</span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage13}
                alt="Nyt billede 2"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Konferencier</span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage14}
                alt="Nyt billede 3"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Auktionarius</span>
            </div>
          </div>

          <div className={styles.SPImage_row2}>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage15}
                alt="Nyt billede 1"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>
                DJ Velkomst, Middag & Afterparty
              </span>
            </div>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage16}
                alt="Nyt billede 2"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Underholdning</span>
            </div>
          </div>

          <h2 className={styles.SPSection_title}>
            <span className={styles.underline_yellow}>Torveevent</span>
          </h2>

          <div className={styles.SPImage_row4}>
            <div className={styles.SPImage_item}>
              <img
                src={extraImage17}
                alt="Nyt billede 1"
                className={styles.SPImage}
              />
              <span className={styles.SPImage_text}>Telte og Inventar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ny sektion med stort billede nederst */}
      <div className={styles.SPSection_container}>
        <div className={styles.LargeImageSection}>
          <img
            src={extraImage18}
            alt="Stort billede"
            className={styles.LargeImage}
          />
          <div className={styles.LargeImageText}>
            <h2 className={styles.LargeImageTitle}>
              BLIV SPONSOR <br />
              OG VÆR MED I KAMPEN <br />
              MOD HUDCANCER
            </h2>
            <p className={styles.LargeImageDescription}>
              Når vi kæmper sammen kommer vi tættere på at <br /> bekæmpe
              hudkræft.
              <br /> <br />
              Skulle du/i have lyst til at hjælpe et godt formål? Kontakt os,
              <br />
              så vi kan afholde et uforpligtende møde!
            </p>
            <Link to="/Kontakt" className={styles.buttonSP}>
              Kontakt os
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsor;
