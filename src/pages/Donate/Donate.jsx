// Kodet af Andreas + Tilhørende CSS og Komponenter er kodet af Andreas

// React
import { useState } from "react";
import styles from "./Donate.module.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Components
import DonateForm from "./DonateForm";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

// Assets
import Together from "../../assets/together.svg";
import Earth from "../../assets/earth.svg";
import VMHmoneyStack2 from "../../assets/VMHmoney-stack2.svg";
import VMHIndsamling from "../../assets/VMHindsamling.mp4";

const Donate = () => {
  // State for success modal visibility
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handler for successful donation submission
  const handleDonationSuccess = () => {
    setShowSuccessModal(true);
    // Hide modal after 5 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 5000);
  };

  // Info card data for cleaner rendering
  const infoCards = [
    {
      icon: VMHmoneyStack2,
      alt: "Penge ikon",
      text: "MED DIN STØTTE KAN VI SAMLE IND TIL KAMPEN MOD HUDCANCER",
    },
    {
      icon: Together,
      alt: "Sammen ikon",
      text: "SAMMEN KAN VI OPNÅ STORE RESULTATER",
    },
    {
      icon: Earth,
      alt: "Verden ikon",
      text: "GENNEM LOKALE MIDLER KAN VI GAVNE KRÆFTCENTERET I VEJLE",
    },
  ];

  return (
    <>
      <Breadcrumb />
      <h1 className={styles.donate_title}>
        <strong>Din støtte</strong> hjælper <br /> i kampen mod hudcancer
      </h1>
      <hr className={styles["hudcancer-divider"]} />
      <div className={styles.donate_container}>
        {/* Donation form component */}
        <DonateForm onSuccess={handleDonationSuccess} />

        {/* Information section */}
        <div className={styles.info_section}>
          <div className={styles.main_info}>
            <video
              className={styles.video}
              src={VMHIndsamling}
              controls
              playsInline
            ></video>
            <h2>HJÆLP OS MED AT HJÆLPE</h2>
            <p>
              Styregruppen, herunder Christina Omann Clemmensen, Dorthe
              Maglehøj, Susanne Skovbjerg og Birgitte Busk, vælger hvert år et
              lokalt projekt, som bakker op om vores formål - at bekæmpe
              hudkræft. Vi har alle årene støttet projekter ved Vejle Sygehus,
              det gør vi igen i 2025.
            </p>
            <Link to="/projekter/projekt-2025" className={styles.project_link}>
              Se projekt 2025
            </Link>
          </div>

          {/* Info cards section */}
          <div className={styles.info_cards}>
            {infoCards.map((card, index) => (
              <div key={index} className={styles.info_card}>
                <img src={card.icon} alt={card.alt} />
                <h3>{card.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success modal with animation */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className={styles.success_modal}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <h3>Tak for din donation!</h3>
            <p>Din støtte gør en stor forskel i kampen mod hudcancer.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className={styles.close_button}
              aria-label="Luk besked"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Donate;
