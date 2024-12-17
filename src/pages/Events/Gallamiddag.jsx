// Kodet af Oliver + Tilhørende CSS og Komponenter er kodet af Oliver

import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Events.module.css";
import GallaIntro from "../../assets/prove.png";
import Menu from "../../assets/menu.jpg";
import AuktionTeaser from "../../assets/auktionteaser.png";
import AuktionTeaser2 from "../../assets/auktionteaser2.png";
import AuktionTeaser3 from "../../assets/auktionteaser3.png";
import Munkebjerg from "../../assets/Mukebjerg.png";
import Kollagen from "../../assets/kollagen.png";
import Nutrinic from "../../assets/nutrinic.png";
import JellingIMG from "../../assets/Jelling.png";
import JellingTekst from "../../assets/jellingtekst.png";

// Billede slideshow
import GallaImage1 from "../../assets/Auktion.jpg";
import GallaImage2 from "../../assets/dessert.jpg";
import GallaImage3 from "../../assets/Servering.jpg";
import GallaImage4 from "../../assets/SmilMand.png";
import GallaImage5 from "../../assets/musik.jpg";
import { Link } from "react-router-dom";

const Gallamiddag = () => {
  const GallaSlider = () => {
    const images = [
      GallaImage1,
      GallaImage2,
      GallaImage3,
      GallaImage4,
      GallaImage5,
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Skift billede hver 5. sekund (5000 ms)

      return () => clearInterval(interval); // Ryd op, når komponenten afmonteres
    }, [images.length]);

    const handleDotClick = (index) => {
      setCurrentImageIndex(index);
    };

    return (
      <div className={styles["galla-program-slider"]}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Galla Image ${index + 1}`}
            className={`${styles["galla-slider-image"]} ${
              currentImageIndex === index ? styles.active : ""
            }`}
          />
        ))}

        {/* Dots under billedet */}
        <div className={styles["galla-slider-dots"]}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles["galla-slider-dot"]} ${
                currentImageIndex === index ? styles.activeDot : ""
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    );
  };

  const SponsorsCarousel = () => {
    const sponsors = [
      "C Beayty and Care",
      "Yogilates",
      "Engredo",
      "Sparekassen Kronjylland",
      "Trekantens Lyntryk",
      "NemTilmeld",
      "Ernst & Young",
      "NH Foto & Film",
      "Torvehallerne",
      "Østjysk Serviceudlejning",
      "Det kreative Gartneri",
      "JE-RA Holding/Cloud Capital",
      "Slagter Grønvall",
      "DGI Huset Vejle",
      "Vanilla",
      "Kaffebaren",
      "Skærtoft",
      "Megavin.dk",
      "Universal transport",
      "PH Formula",
      "Jesper Maigaard",
      "Pia Liltorp",
      "Thunderpower",
      "Kenneth Dupont",
      "Polyprint",
    ];

    return (
      <div className={styles["carousel-container"]}>
        <div className={styles["carousel"]}>
          {/* Duplicér sponsorerne for kontinuerlig effekt */}
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <div key={index} className={styles["carousel-item"]}>
              {sponsor}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Breadcrumb />

      <div className={styles["intro-container"]}>
        <div className={styles["image-container"]}>
          <img
            src={GallaIntro}
            alt="Baggrundsbillede"
            className={styles["background-image"]}
          />
          <div className={styles["overlay"]}>
            <h1 className={styles["overlay-text"]}>
              Støtte <br /> Gallafest
            </h1>
            <p className={styles["overlay-description"]}>
              Torsdag 10. April 2025
            </p>
            <a href="https://vejlemodhudcancer.nemtilmeld.dk/6/">
              <button className={styles["overlay-button"]}>
                Resevér plads
              </button>
            </a>
          </div>
        </div>

        <div className={styles["intro-tekst"]}>
          <h1>
            {" "}
            <bold>Gallamiddag</bold> <br />
            Kampen mod hudcancer <br />
            gennem lokale midler
          </h1>
          <hr className={styles["intro-divider"]} />
          <p>
            Som en del af lokalsamfundet, inviteres du til at deltage i vores
            Gallaaften. Her kan du byde på auktionen med masser af eksklusive
            gaver <br /> <br />
            Hele arrangementet er sponsoreret, så entré og auktionsprovenue går
            ubeskåret til kampen mod hudcancer. Lokalt forankrede virksomheder
            stiller med ekspertise,udstyr og faciliteter uden beregning.
          </p>
          <button className={styles["intro-button"]}>
            <Link to="/sponsorer">Se sponsorer</Link>
          </button>
        </div>
      </div>

      <div className={styles["galla-program-container"]}>
        <div className={styles["galla-program-tekst"]}>
          <h1>Program</h1>
          <hr className={styles["divider"]} />
          <p>
            18:00 VelkomstDrink & Foto
            <br />
            18:30 Konferencier byder til bords
            <br />
            19:00 Forret
            <br />
            19:45 Præsentation af projekt
            <br />
            20:15 hovedret
            <br />
            21:00 underholdning
            <br />
            21:30 dessert & kaffe
            <br />
            22:00 ekslusiv auktion - byd på ekslusive sponsorgaver
            <br />
            23:00 Afterparty
          </p>

          <div className={styles["galla-program-dresscode"]}>
            <p>Dresscode: Festligt</p>
          </div>
          <p className={styles["galla-program-lille-tekst"]}>
            <p>
              Der fotograferes i løbet af aftenen. Billederne kan blive brugt{" "}
              <br />
              til markedsføring af Vejle mod hudcancer.{" "}
            </p>
          </p>
        </div>

        <GallaSlider />
      </div>

      <div className={styles["galla-menu-container"]}>
        <div className={styles["galla-menu-billede"]}>
          <img src={Menu} alt="Menu" />
        </div>

        <div className={styles["galla-menu-tekst"]}>
          <h1>Menu 2025</h1>
          <hr className={styles["galla-menu-divider"]} />
          <h3>Forret:</h3>
          <p>
            Seared yellowfin <br />
            Ravioli med spinat & ricotta <br />
            Hummercréme
          </p>
          <br />
          <h3>Hovedret:</h3>
          <p>
            Filet mignon <br />
            pommes parma <br />
            dampede asparges <br />
            jordskok - kantarelcréme
          </p>
          <br />
          <h3>Dessert:</h3>
          <p>Vanilla dessert triologi</p>
        </div>
      </div>

      <div className={styles["galla-sponsor"]}>
        <h1>Sponsorer</h1>
        <hr className={styles["sponsor-divider"]} />
        <p>Af Gallamiddagen</p>
      </div>

      <SponsorsCarousel />

      <div className={styles["sponsorknap-container"]}>
        <div className={styles["sponsorknaper"]}>
          <button className={styles["allesponsor"]}>
            <Link to="/sponsorer">Alle sponsorer</Link>
          </button>
        </div>
        <div className={styles["sponsorknaper"]}>
          <button className={styles["blivsponsor"]}>
            <Link to="/Kontakt">Bliv sponsor</Link>
          </button>
        </div>
      </div>

      <div className={styles["auktion-teaser-container"]}>
        <div className={["auktion-teaser-tekst"]}>
          <h1>Ekslusiv Auktion</h1>
          <hr className={styles["teaser-divider"]} />
          <p>
            Alle midler der indsamles går ubeskåret til årets projekt, så vær
            med til at give en <br />
            gave til alle i Vejle. En gave, der kan give mange vejlensere et
            bedre liv, gennem <br />
            en hurtigere, meget mindre smertefuld og mere tryg behandling af
            hudcancer. <br />
            <bold> Så lad os kæmpe sammen</bold> og lave et brag af en
            indsamling - så vi kan hjælpe flest <br />
            muligt godt og hurtigt igennem en sygdomsperiode med hudcancer.
          </p>
        </div>

        <div className={styles["auktion-teaser-billeder"]}>
          <img src={AuktionTeaser3} />
          <img src={AuktionTeaser2} />
        </div>

        <div className={styles["auktion-teaser-billede-tre"]}>
          <img src={AuktionTeaser} />
        </div>
      </div>

      <div className={styles["auktions-gaver-teaser"]}>
        <h1>Auktionsgaver 2025</h1>
        <hr className={styles["gaver-divider"]} />
      </div>

      <div className={styles["gallacard-container"]}>
        <div className={styles.Gallacard}>
          <img
            src={Munkebjerg}
            alt="Card image"
            className={styles.GallacardImageTop}
          />
          <h2 className={styles.GallacardHeadline}>Gavekort</h2>
          <hr className={styles["card-divider"]} />
          <p className={styles.GallacardText}>
            Lækker loungestol fra Natures Collection.
          </p>
          <div className={styles.GallacardBottom}>
            <img
              src={Munkebjerg}
              alt="Bottom image"
              className={styles.GallacardImageBottom}
            />
            <div className={styles.GallacardPrice}>Værdi: 5.593 kr.</div>
          </div>
        </div>

        <div className={styles.Gallacard}>
          <img
            src={Kollagen}
            alt="Card image"
            className={styles.GallacardImageTop}
          />
          <h2 className={styles.GallacardHeadline}>Kollagen+/pure</h2>
          <hr className={styles["card-divider"]} />
          <p className={styles.GallacardText}>
            Et årsforbrug af Kollagen+/pure fra nutrinic.
          </p>
          <div className={styles.GallacardBottom}>
            <img
              src={Nutrinic}
              alt="Bottom image"
              className={styles.GallacardImageBottom}
            />
            <div className={styles.GallacardPrice}>Værdi: 3.588 kr.</div>
          </div>
        </div>

        <div className={styles.Gallacard2}>
          <img
            src={JellingIMG}
            alt="Card image"
            className={styles.GallacardImageTop2}
          />
          <h2 className={styles.GallacardHeadline2}>2x Partourbillet</h2>
          <hr className={styles["card-divider"]} />
          <p className={styles.GallacardText2}>
            2 partoutbilletter til Jelling Musikfestival.
          </p>
          <div className={styles.GallacardBottom2}>
            <img
              src={JellingTekst}
              alt="Bottom image"
              className={styles.GallacardImageBottom2}
            />
            <div className={styles.GallacardPrice2}>Værdi: 6.500 kr.</div>
          </div>
        </div>
      </div>

      <div className={styles["teaser-auktion-tekst-for-knapper"]}>
        <p>
          Ønsker du at bidrage med en gave til støttegalla 2025, <br />
          er du meget velkommmen til at kontakte os på nedestående link.
        </p>
      </div>

      <div className={styles["teaser-auktion-knap-container"]}>
        <div className={styles["teaser-auktion-knaper"]}>
          <Link
            to="/Events/Gallamiddag-2025/Auktion"
            className={styles["teaser-auktion-alle"]}
          >
            Alle auktionsgaver
          </Link>
        </div>
        <div className={styles["teaser-auktion-knaper"]}>
          <Link to="/Kontakt" className={styles["teaser-auktion-kontakt"]}>
            Kontakt os her
          </Link>
        </div>
      </div>
    </>
  );
};

export default Gallamiddag;
