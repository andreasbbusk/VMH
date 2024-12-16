import ContactFormular from "../../components/About/ContactFormular";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { motion } from "framer-motion";
import styles from "./Kontakt.module.css";

import LogoDownload from "../../assets/download-logo.svg";
import PaperPlane from "../../assets/paper-plane.svg";
import Emblem from "../../assets/emblem.png";

const Kontakt = () => {
  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = Emblem;
    link.download = 'virksomheds-emblem.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Breadcrumb />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.main_container}
      >
        <section className={styles.contact_section}>
          <div className={styles.contact_text}>
            <h1>
              <strong>Kæmp med</strong> i kampen <br /> mod hudcancer
            </h1>
            <div className={styles.horizontal_line}></div>
            <p>
              Kontakt os og find ud af hvordan du kan være med til at kæmpe mod
              hudcancer.
            </p>
            <p>
              Støtter du allerede Vejle mod hudcancer, kan du downloade et
              digitalt logo her.
            </p>
            <p>
              Du er også velkommen til at kontakte os på
              kontakt@vejlemodhudcancer.dk, hvis du har brug for andet
              materiale.
            </p>
          </div>
          <div 
            className={styles.logo_download}
            onClick={handleDownload}
            onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
            role="button"
            tabIndex={0}
            aria-label="Download logo pakke"
            style={{ cursor: 'pointer' }}
          >
            <img src={LogoDownload} alt="Download logo" />
            <h4>Logo pakke</h4>
          </div>
        </section>
        <section className={styles.contact_formular_section}>
          <img src={PaperPlane} alt="Paper plane" />
          <ContactFormular />
        </section>
      </motion.main>
    </>
  );
};

export default Kontakt;
