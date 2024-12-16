import styles from "./Forside.module.css";
import ForsideIntro from "../../assets/ForsideIntro.png";
import ForsideGallaVenstreEt from "../../assets/ForsideGallaVenstre1.png";
import ForsideGallaVenstreTo from "../../assets/ForsideGallaVenstre2.png";
import ForsideGallaHojreEt from "../../assets/ForsideGallaHojre1.png";
import ForsideGallaHojreTo from "../../assets/ForsideGallaHojre2.png";
import KnastBilledeVenstre from "../../assets/KnastBilledeVenstre.svg";
import KnastBilledeHojre from "../../assets/KnastBilledeHojre.svg";
import KnastPil from "../../assets/KnastPil.svg";
import IdeTilIndsats from "../../assets/FraIdeTilIndsats.png";
import { Link } from "react-router-dom";
import ProjectHighlight from "../../components/ProjectHighlight";
import SmallDonationForm from "../../components/SmallDonationForm";

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

const Forside = () => {
  return (
    <>
      <div className={styles["forside-intro-container"]}>
        <div className={styles["forside-intro-venstre"]}>
          <h1>
            <bold>VEJLE MOD HUDCANCER </bold> <br />
            STØTTER KAMPEN MOD <br /> HUDCANCER
          </h1>
          <hr className={styles["hudcancer-divider"]} />
          <p>
            Vejle Mod Hudcancer støtter hvert år et nyt lokalt projekt i kampen
            mod
            <br />
            hudcancer. Alle midler skaffes gennem lokale sponsorer i det
            Vejlensiske
            <br />
            erhvervsliv og alle opgaver udføres frivilligt, så det indsamlede
            beløb går
            <br /> ubeskåret til projektet. Vores støtte er til gavn for det
            samlede kræftcenter i Vejle.
          </p>
        </div>
        <div className={styles["forside-intro-hojre"]}>
          <img src={ForsideIntro} alt="" />
        </div>
      </div>

      <div className={styles["forside-stats-container"]}>
        <div className={styles["Forside-stats-content"]}>
          <div className={styles["Forside-stats-1"]}>
            <h1>50%</h1>
            <p>
              Af alle nye kræfttilfælde <br /> i Danmark er hudcancer
            </p>
          </div>
          <div className={styles["Forside-stats-2"]}>
            <h1>20.000</h1>
            <p>
              bliver diagnostiseret <br /> med hudcancer hvert år
            </p>
          </div>
          <div className={styles["Forside-stats-3"]}>
            <h1>+75%</h1>
            <p>
              Risiko for udviklingen af <br />
              hudcancer efter brug af solarie
            </p>
          </div>
        </div>
        <div className={styles["Forside-kildetekst"]}>
          <p>
            Kilde:{" "}
            <a href="https://www.cancer.dk/hudkraeft-hudcancer/">
              <bold>Kræftens bekæmpelse</bold>
            </a>{" "}
            &{" "}
            <a href="https://netdoktor.dk/kraeft/hudkraft/sygdomme/hudkraft/">
              <bold>Netdoktor.dk</bold>
            </a>
          </p>
        </div>
      </div>

      <div className={styles["forside-gallamiddag-container"]}>
        <div className={styles["forside-gallamiddag-content"]}>
          <div className={styles["forside-gallamiddag-billeder-container"]}>
            <div className={styles["forside-gallamiddag-billeder-venstre"]}>
              <img src={ForsideGallaVenstreEt} alt="Gallabilleder" />
              <img src={ForsideGallaVenstreTo} alt="Gallabilleder" />
            </div>
            <div className={styles["forside-gallamiddag-billeder-hojre"]}>
              <img src={ForsideGallaHojreEt} alt="Gallabilleder" />
              <img src={ForsideGallaHojreTo} alt="Gallabilleder" />
            </div>
          </div>
          <div className={styles["forside-gallamiddag-tekst-container"]}>
            <div className={styles["forside-gallamiddag-tekst"]}>
              <h1>
                GALLAMIDDAG <br />
                2025
              </h1>
              <p>
                Som en del af Vejle, inviteres du til at deltage i vores
                Gallaaften. <br />
                Her kan du byde på auktionen med masser af eksklusive gaver.{" "}
                <br />
                <br /> <br />
                Hele arrangementet er sponsoreret, så entré og auktionsprovenue
                går <br />
                ubeskåret til kampen mod hudcancer. <br />
                Lokalt forankrede virksomheder stiller med
                ekspertise/udstyr/faciliteter u/b.
              </p>
            </div>

            <div className={styles["Forside-knap-container"]}>
              <div className={styles["Forside-knaper"]}>
                <a
                  target="blank"
                  href="
                https://vejlemodhudcancer.nemtilmeld.dk/6/"
                >
                  <button className={styles["ForsideResever"]}>
                    Reservér plads
                  </button>
                </a>
              </div>
              <div className={styles["Forside-knaper"]}>
                <Link
                  to="/events/gallamiddag-2025"
                  className={styles["Forsidelasmereknap"]}
                >
                  Læs mere her
                </Link>
              </div>
            </div>

            <div className={styles["forside-gallamiddag-stats"]}>
              <div className={styles["forside-gallamiddag-stats-Gaver"]}>
                <h1>32</h1>
                <p>Gaver</p>
              </div>
              <div className={styles["forside-gallamiddag-stats-Indsamlet"]}>
                <h1>3,4 mio</h1>
                <p>Indsamlet D.D.</p>
              </div>
              <div className={styles["forside-gallamiddag-stats-Projekt"]}>
                <h1>100%</h1>
                <p>går til projektet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProjectHighlight />

      <div className={styles["Forside-knast-container"]}>
        <div className={styles["Forside-knast-billede-venstre"]}>
          <img src={KnastBilledeVenstre} alt="" />
        </div>
        <div className={styles["Forside-knast-tekst"]}>
          <h1>“KNAST, SÅR & PLET” - DAG </h1>
          <p>
            Få din hud tjekket af læger i teltet på torvet - Det er helt gratis
            og uforpligtende
            <br /> Ny dato for 2025 på vej
          </p>
          <div className={styles["Forside-knast-knap-container"]}>
            <div className={styles["KnastPil"]}>
              <img src={KnastPil} alt="" />
            </div>
            <div className={styles["KnastKnap"]}>
              <button className={styles["KnastLæsmereKnap"]}>
                <Link to="/events/torveevent-2025"> Læs mere her</Link>
              </button>
            </div>
          </div>
        </div>
        <div className={styles["Forside-knast-billede-hojre"]}>
          <img src={KnastBilledeHojre} alt="" />
        </div>
      </div>

      <div className={styles["FraIdeTilIndsats-container"]}>
        <div className={styles["FraIdeTilIndsats-content"]}>
          <div className={styles["FraIdeTilIndsats-venstre"]}>
            <h1>Fra idé til indsats</h1>
            <hr className={styles["FraIdeTilIndsats-divider"]} />
            <p>
              Vejle mod Hudcancer er et lokalt initiativ dedikeret til at
              bekæmpe
              <br /> hudkræft gennem oplysning, forebyggelse og tidlig
              diagnosticering. Med
              <br /> udgangspunkt i Vejle Sygehus’ ekspertise og et stærkt
              samarbejde med
              <br /> sundhedsorganisationer og lokalsamfundet arbejder vi for at
              reducere
              <br /> antallet af hudkræfttilfælde. <br />
              Vi fokuserer på at oplyse om solbeskyttelse, risikofaktorer og
              vigtigheden
              <br /> af regelmæssige hudtjek. Samtidig tilbyder vi konkrete
              events som gratis
              <br />
              hudscreeninger og en støtte-galla fest, hvor det er muligt at byde
              på
              <br />
              auktioner, hvor det samlede beløb går ubeskåret til årets
              projekter.
              <br /> <br />
              Sammen kan vi gøre en forskel og sikre, at færre rammes af denne
              alvorlige
              <br /> sygdom – for en sundere fremtid i Vejle og resten af
              Danmark. Din støtte
              <br /> kan hjælpe os med at nå endnu længere!
            </p>
            <div className={styles["Forside-knap-container"]}>
              <div className={styles["Forside-knaper"]}>
                <button className={styles["FraIdeTilIndsatsStotNu"]}>
                  <Link to="/stoet-nu">Støt nu</Link>
                </button>
              </div>
              <div className={styles["Forside-knaper"]}>
                <button className={styles["FraIdeTilIndsatsLasMere"]}>
                  <Link to="/om-os">Læs mere</Link>
                </button>
              </div>
            </div>
          </div>
          <div className={styles["FraIdeTilIndsats-hojre"]}>
            <img src={IdeTilIndsats} alt="" />
            <p>
              F.v. Christina Omann Clemmensen. Dorthe Maglehøj.
              <br />
              Birgitte Busk. Susanne Skovbjerg.{" "}
            </p>
          </div>
        </div>
      </div>

      <div className={styles["StotteFunktion-container"]}>
        <SmallDonationForm />
      </div>

      <div className={styles["galla-sponsor"]}>
        <h1>Sponsorer</h1>
        <hr className={styles["sponsor-divider"]} />
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
    </>
  );
};

export default Forside;
