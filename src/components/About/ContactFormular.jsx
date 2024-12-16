import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "../../pages/About/Kontakt.module.css";

const ContactFormular = () => {
  const [formData, setFormData] = useState({
    navn: "",
    email: "",
    besked: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      navn: "",
      email: "",
      besked: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), formData);
      console.log("Form submitted:", formData);
      resetForm();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 10000);
    }
  };

  return (
    <motion.div
      className={styles.form_container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1>Kontakt</h1>
        <h2>Formular</h2>
      </div>
      <div className={styles.contact_content}>
        <motion.form
          className={styles.contact_formular}
          onSubmit={handleSubmit}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.form_group}>
            <label htmlFor="navn">Navn / virksomhed</label>
            <input
              type="text"
              id="navn"
              name="navn"
              value={formData.navn}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="Indtast dit fulde navn eller virksomhed"
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="Indtast din email"
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="besked">Besked</label>
            <textarea
              id="besked"
              name="besked"
              rows="15"
              value={formData.besked}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="Skriv din besked her..."
              style={{ resize: "none" }}
            />
          </div>

          <motion.button
            type="submit"
            className={styles.submit_button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Besked
          </motion.button>
        </motion.form>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className={styles.success_modal}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <p>Tak for din besked! Vi vender tilbage hurtigst muligt.</p>
            </motion.div>
          )}
          {showError && (
            <motion.div
              className={styles.error_modal}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <p>Der opstod en fejl. Prøv venligst igen senere.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ContactFormular;
