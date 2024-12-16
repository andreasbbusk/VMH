import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../pages/Forside/Forside.module.css";
import ForsideLogo from "../assets/forside-logo.svg";

const SmallDonationForm = () => {
  // State for donation amount and navigation
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  // Predefined donation amounts
  const PRESET_AMOUNTS = [
    { value: "50", label: "50 kr." },
    { value: "100", label: "100 kr." }, 
    { value: "200", label: "200 kr." }
  ];

  // Handle form submission - store amount and redirect
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("donationAmount", amount);
    navigate("/Stoet-nu");
  };

  // Only allow numbers in custom amount input
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/[^0-9]/g, "");
    setAmount(numbersOnly);
  };

  // Render preset amount button with active state
  const renderPresetButton = ({ value, label }) => (
    <button
      key={value}
      className={`${styles.small_donation_form_button} ${
        amount === value ? styles.small_donation_form_button_active : ""
      }`}
      type="button"
      onClick={() => setAmount(value)}
      aria-label={`Donér ${label}`}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className={styles.donation_form_container}>
        <form onSubmit={handleSubmit} className={styles.small_donation_form}>
          <img src={ForsideLogo} alt="Forside Logo" />

          {/* Form header section */}
          <div className={styles.small_donation_form_header}>
            <h2>Når vi kæmper sammen kan vi opnå store resultater</h2>
            <p>
              Din støtte er med til at hjælpe flest muligt godt og hurtigt
              igennem en sygdomsperiode med hudcancer. Alle midler der indsamles
              går ubeskåret til årets projekt.
            </p>
          </div>

          {/* Donation amount selection section */}
          <div className={styles.small_donation_form_buttons}>
            <div className={styles.small_donation_form_preset_amounts}>
              {PRESET_AMOUNTS.map(renderPresetButton)}
            </div>

            {/* Custom amount input */}
            <div className={styles.small_donation_form_custom_amount}>
              <input
                type="text"
                placeholder="Indtast valgfrit beløb"
                value={amount ? `${amount} kr.` : ""}
                onChange={handleCustomAmountChange}
                aria-label="Indtast valgfrit donationsbeløb"
                inputMode="numeric"
              />
            </div>

            {/* Submit button */}
            <div>
              <button
                className={styles.small_donation_form_submit}
                type="submit"
                aria-label="Bekræft donation"
              >
                Støt nu
              </button>
            </div>
          </div>
        </form>

        {/* Link to projects page */}
        <Link to="/projekter" className={styles.donation_form_link}>
          Se hvad din støtte går til
        </Link>
      </div>
    </>
  );
};

export default SmallDonationForm;
