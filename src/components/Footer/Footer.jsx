// Kodet af Oliver + Tilhørende CSS og Komponenter er kodet af Oliver

import styles from "./Footer.module.css";
import FooterLogo from "../../assets/FooterLogo.svg";

// Ikoner
import EmailIcon from "../../assets/Mail.svg";
import AddressIcon from "../../assets/location.svg";

// Socials
import Facebook from "../../assets/Facebook.svg";
import Instagram from "../../assets/Instagram.svg";
import LinkedIn from "../../assets/LinkedIn.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumn}>
        <img src={FooterLogo} alt="Logo" className={styles.footerImage} />
      </div>

      <div className={`${styles.footerColumn} ${styles.footerMiddle}`}>
        <div className={styles.row}>
          <div className={styles.iconWrapper}>
            <img src={EmailIcon} alt="Email" className={styles.icon} />
          </div>
          <p>kontakt@vejlemodhudcancer.dk</p>
        </div>

        <div className={styles.row}>
          <div className={styles.separator}></div>
        </div>

        <div className={styles.row}>
          <img src={AddressIcon} alt="Address" className={styles.icon} />
          <p>Torvegade 8D, 7100 Vejle, Denmark</p>
        </div>
        <div className={styles.footer_copyright}>
          <p>
            COPYRIGHT © ALLE RETTIGHEDER FORBEHOLDES <br />
            INDSAMLINGEN KONTROLLERES AF ERNST & YOUNG, VEJLE
          </p>
        </div>
      </div>

      <div className={`${styles.footerColumn} ${styles.footerRight}`}>
        <div className={styles.row}>
          <a href="https://www.facebook.com/Vejlemodhudcancer" target="blank">
            <img src={Facebook} alt="Facebook" className={styles.socialIcon} />
          </a>
          <a href="https://www.instagram.com/vejlemodhudcancer/" target="blank">
            <img
              src={Instagram}
              alt="Instagram"
              className={styles.socialIcon}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/vejle-mod-hudcancer/"
            target="blank"
          >
            <img src={LinkedIn} alt="LinkedIn" className={styles.socialIcon} />
          </a>
        </div>
        <div className={styles.row}>
          <div className={styles.separator}></div>
        </div>
        <div className={styles.row}>
          <p>@VejleModHudcancer</p>
        </div>
        <div className={styles.footer_copyright2}>
          <p>
            COPYRIGHT © ALLE RETTIGHEDER FORBEHOLDES <br />
            INDSAMLINGEN KONTROLLERES AF ERNST & YOUNG, VEJLE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
