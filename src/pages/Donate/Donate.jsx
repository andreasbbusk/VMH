import styles from "./Donate.module.css";

import DonateForm from "./DonateForm";

import Together from "../../assets/together.svg";
import Earth from "../../assets/earth.svg";
import VMHmoneyStack2 from "../../assets/VMHmoney-stack2.svg";

import { Link } from "react-router-dom";

const Donate = () => {
  return (
    <>
    <h1>Din støtte hjælper i kampen mod hudcancer</h1>
    <div className={styles.donate_container}>
      <DonateForm />

      {/* Info section */}
      <div className={styles.info_section}>
        <div className={styles.main_info}>
          <video src=""></video>
          <h2>HJÆLP OS MED AT HJÆLPE</h2>
          <p>
            Styregruppen, herunder Christina Omann Clemmensen, Dorthe Maglehøj,
            Susanne Skovbjerg og Birgitte Busk, vælger hvert år et lokalt
            projekt, som bakker op om vores formål - at bekæmpe hudkræft. Vi har
            alle årene støttet projekter ved Vejle Sygehus, det gør vi igen i
            2025.
          </p>
          <Link to="/projekter/projekt-2025" className={styles.project_link}>
            Se projekt 2025
          </Link>
        </div>

        <div className={styles.info_cards}>
          <div className={styles.info_card}>
            <img src={VMHmoneyStack2} alt="Penge ikon" />
            <h3>MED DIN STØTTE KAN VI SAMLE IND TIL KAMPEN MOD HUDCANCER</h3>
          </div>

          <div className={styles.info_card}>
            <img src={Together} alt="Sammen ikon" />
            <h3>SAMMEN KAN VI OPNÅ STORE RESULTATER</h3>
          </div>

          <div className={styles.info_card}>
            <img src={Earth} alt="Verden ikon" />
            <h3>GENNEM LOKALE MIDLER KAN VI GAVNE KRÆFTCENTERET I VEJLE</h3>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Donate;
