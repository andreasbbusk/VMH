// React
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";

// Assets
import styles from "./Donate.module.css";
import SupportHands from "../../assets/support-hands.svg";
import MobilePay from "../../assets/mobilepay.png";
import BS from "../../assets/bs.png";

const DonationForm = () => {
  // Form state for donation details
  const [amount, setAmount] = useState("");
  const [donationType, setDonationType] = useState("single");
  const [donationFrequency, setDonationFrequency] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("mobilepay");

  // Personal/Company information state
  const [donorType, setDonorType] = useState("personal");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [companyName, setCompanyName] = useState("");
  const [cvr, setCvr] = useState("");
  const [cvrValid, setCvrValid] = useState(false);

  // Tax deduction state
  const [taxDeduction, setTaxDeduction] = useState(false);
  const [cpr, setCpr] = useState("");

  // Bank information state
  const [bankInfo, setBankInfo] = useState({
    regNumber: "",
    accountNumber: "",
  });
  const [bankInfoValid, setBankInfoValid] = useState({
    regNumber: false,
    accountNumber: false,
  });

  // UI state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Load saved donation amount on component mount
  useEffect(() => {
    const storedAmount = localStorage.getItem("donationAmount");
    if (storedAmount) {
      setAmount(storedAmount);
      localStorage.removeItem("donationAmount");
    }
  }, []);

  // Validation helper functions
  const getValidationStyle = (value, isValid) => {
    if (!value) return {};
    return isValid
      ? { borderWidth: "2px", borderStyle: "solid", borderColor: "#4CAF50" }
      : { borderWidth: "2px", borderStyle: "solid", borderColor: "#f44336" };
  };

  const validateCPR = (cprNumber) => {
    const cleaned = cprNumber.replace(/[\s-]/g, "");
    if (!/^\d{10}$/.test(cleaned)) return false;
    
    const day = parseInt(cleaned.substring(0, 2));
    const month = parseInt(cleaned.substring(2, 4));
    
    return day >= 1 && day <= 31 && month >= 1 && month <= 12;
  };

  const validateCVR = (cvrNumber) => {
    const cleaned = cvrNumber.replace(/\s/g, "");
    return /^\d{8}$/.test(cleaned);
  };

  // Event handlers
  const handlePersonalInfoChange = (field) => (e) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleBankInfoChange = (field) => (e) => {
    const value = e.target.value;
    setBankInfo((prev) => ({ ...prev, [field]: value }));

    // Validate bank info based on field
    if (field === "regNumber") {
      setBankInfoValid((prev) => ({
        ...prev,
        regNumber: /^\d{4}$/.test(value),
      }));
    } else if (field === "accountNumber") {
      setBankInfoValid((prev) => ({
        ...prev,
        accountNumber: /^\d{10}$/.test(value),
      }));
    }
  };

  const handleTaxDeductionKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setTaxDeduction(!taxDeduction);
    }
  };

  // Form reset and submission handlers
  const resetForm = () => {
    // Reset donation details
    setAmount("");
    setDonationType("single");
    setDonationFrequency("monthly");
    setPaymentMethod("mobilepay");
    
    // Reset personal/company info
    setDonorType("personal");
    setPersonalInfo({ firstName: "", lastName: "", email: "", phone: "" });
    setCompanyName("");
    setCvr("");
    setCvrValid(false);
    
    // Reset tax and bank info
    setTaxDeduction(false);
    setCpr("");
    setBankInfo({ regNumber: "", accountNumber: "" });
    setBankInfoValid({ regNumber: false, accountNumber: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donationData = {
      amount,
      donationType,
      donationFrequency,
      personalInfo,
      paymentMethod,
      taxDeduction,
      cpr,
      bankInfo,
      donorType,
      cvr,
      companyName,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "donations"), donationData);
      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      console.error("Error submitting donation:", error);
      setShowErrorModal(true);
      setTimeout(() => setShowErrorModal(false), 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.donation_form}
      id="donationForm"
    >
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className={styles.modal_overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.success_modal}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className={styles.close_button}
                onClick={() => setShowSuccessModal(false)}
                aria-label="Luk besked"
              >
                ✕
              </button>

              <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                  <div className={styles.modal_header_text}>
                    <h2>Tak</h2>
                    <h3>for din støtte</h3>
                    <div className={styles.modal_header_text_line}></div>
                  </div>
                  <div className={styles.modal_header_image}>
                    <img src={SupportHands} alt="Support hands" />
                  </div>
                </div>

                <div className={styles.modal_body}>
                  <p>
                    Du er med til at hjælpe borgere til en hurtigere og nemmere
                    behandling, samt bedre forebyggelse mod hudcancer.
                  </p>
                  <p>
                    <strong>
                      Din donation går ubeskåret til årets projekt.
                    </strong>
                  </p>
                </div>

                <Link
                  to="/projekter/projekt-2025"
                  className={styles.modal_link}
                  tabIndex={0}
                >
                  Se projekt 2025
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            className={styles.error_modal}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <h3>Der opstod en fejl</h3>
            <p>Prøv venligst igen senere.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className={styles.donation_title}>
        <h2>
          GØR EN
          <br />
          <strong>FORSKEL</strong> I DAG
        </h2>
        <img src={SupportHands} alt="Support hands" />
      </div>

      {/* Amount Selection */}
      <div className={styles.amount_section}>
        <label>Vælg beløb</label>
        <div className={styles.amount_buttons}>
          {["50", "100", "200"].map((value) => (
            <button
              key={value}
              type="button"
              className={amount === `${value} kr.` ? styles.selected : ""}
              onClick={() => setAmount(`${value} kr.`)}
              aria-label={`Donér ${value} kroner`}
              id={`amount${value}`}
            >
              {value} kr.
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Indtast valgfrit beløb"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-label="Indtast valgfrit beløb"
          id="customAmount"
          name="customAmount"
        />
      </div>

      {/* Donation Type */}
      <div className={styles.donation_type_section}>
        <label>Enkelt eller fast donation?</label>
        <div className={styles.type_buttons}>
          {[
            { id: "single", label: "Enkelt donation" },
            { id: "fast", label: "Fast donation" },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`${styles.type_button} ${
                donationType === id ? styles.selected : ""
              }`}
              onClick={() => setDonationType(id)}
              aria-label={`Vælg ${label.toLowerCase()}`}
              id={`${id}Donation`}
            >
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {donationType === "fast" && (
            <motion.div
              className={styles.frequency_options}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.donor_type_group}>
                {[
                  { value: "monthly", label: "Månedlig" },
                  { value: "yearly", label: "Årlig" },
                ].map(({ value, label }) => (
                  <label key={value} className={styles.donor_type_label}>
                    <input
                      type="radio"
                      name="donationFrequency"
                      value={value}
                      checked={donationFrequency === value}
                      onChange={(e) => setDonationFrequency(e.target.value)}
                      aria-label={`Vælg ${label.toLowerCase()} donation`}
                      id={`${value}Frequency`}
                    />
                    <span className={styles.donor_type_radio}></span>
                    {label}
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Personal Information */}
      <div className={styles.personal_info_section}>
        <label>Dine oplysninger</label>
        <div className={styles.donor_type_group}>
          {[
            { value: "personal", label: "Personlig" },
            { value: "company", label: "Virksomhed" },
          ].map(({ value, label }) => (
            <label key={value} className={styles.donor_type_label}>
              <input
                type="radio"
                name="donorType"
                value={value}
                checked={donorType === value}
                onChange={(e) => setDonorType(e.target.value)}
                aria-label={`Vælg ${label.toLowerCase()} donation`}
                id={`${value}Donation`}
              />
              <span className={styles.donor_type_radio}></span>
              {label}
            </label>
          ))}
        </div>

        <AnimatePresence>
          {donorType === "company" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Virksomhedsnavn"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                aria-label="Indtast virksomhedsnavn"
                required={donorType === "company"}
                id="companyName"
                name="companyName"
              />
              <input
                type="text"
                placeholder="CVR nummer"
                value={cvr}
                onChange={(e) => {
                  const value = e.target.value;
                  setCvr(value);
                  setCvrValid(validateCVR(value));
                }}
                style={getValidationStyle(cvr, cvrValid)}
                aria-label="Indtast CVR nummer"
                required={donorType === "company"}
                pattern="\d{8}"
                maxLength="8"
                title="CVR nummer skal være 8 cifre"
                id="cvrNumber"
                name="cvrNumber"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.name_inputs_container}>
          <input
            type="text"
            placeholder="Fornavn"
            value={personalInfo.firstName}
            onChange={handlePersonalInfoChange("firstName")}
            aria-label="Indtast fornavn"
            required
            id="firstName"
            name="firstName"
          />
          <input
            type="text"
            placeholder="Efternavn"
            value={personalInfo.lastName}
            onChange={handlePersonalInfoChange("lastName")}
            aria-label="Indtast efternavn"
            required
            id="lastName"
            name="lastName"
          />
        </div>

        <input
          type="text"
          placeholder="Email"
          value={personalInfo.email}
          onChange={handlePersonalInfoChange("email")}
          aria-label="Indtast email"
          required
          id="email"
          name="email"
        />
        <input
          type="text"
          placeholder="Telefonnummer"
          value={personalInfo.phone}
          onChange={handlePersonalInfoChange("phone")}
          aria-label="Indtast telefonnummer"
          required
          pattern="(\+?45)?[0-9]{8}"
          maxLength="8"
          title="Telefonnummer skal være 8 cifre, evt. med +45 eller 45 foran"
          id="phone"
          name="phone"
        />
      </div>

      {/* Payment Method */}
      <div className={styles.payment_method_section}>
        <label>Vælg betaling</label>
        <div className={styles.payment_options_group}>
          {[
            { id: "mobilepay", label: "MobilePay", logo: MobilePay },
            { id: "betalingsservice", label: "Betalingsservice", logo: BS },
          ].map(({ id, label, logo }) => (
            <label
              key={id}
              className={`${styles.payment_option_label} ${
                paymentMethod === id ? styles.selected : ""
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={id}
                checked={paymentMethod === id}
                onChange={() => setPaymentMethod(id)}
                aria-label={`Vælg ${label}`}
                id={id}
              />
              <span className={styles.payment_radio}></span>
              {label}
              <img src={logo} alt={label} className={styles.payment_logo} />
            </label>
          ))}
        </div>
      </div>

      {/* Tax Deduction */}
      <div className={styles.tax_deduction_section}>
        <label>Benyt skattefradrag</label>
        <div>
          <label className={styles.tax_checkbox_label}>
            <input
              type="checkbox"
              checked={taxDeduction}
              onChange={() => setTaxDeduction(!taxDeduction)}
              aria-label="Vælg skattefradrag"
              tabIndex={0}
              onKeyDown={handleTaxDeductionKeyDown}
              id="taxDeduction"
              name="taxDeduction"
            />
            <span className={styles.tax_checkbox}></span>
            Jeg ønsker skattefradrag
          </label>
          <AnimatePresence>
            {taxDeduction && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.tax_deduction_container}
              >
                <input
                  type="text"
                  placeholder="CPR nr."
                  value={cpr}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length === 6 && !value.includes("-")) {
                      setCpr(value + "-");
                    } else {
                      setCpr(value);
                    }
                  }}
                  aria-label="Indtast CPR nummer"
                  required
                  pattern="\d{6}-\d{4}"
                  maxLength="11"
                  title="CPR nummer skal være i formatet: DDMMÅÅ-XXXX"
                  id="cprNumber"
                  name="cprNumber"
                  style={getValidationStyle(cpr, validateCPR(cpr))}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bank Information */}
      <AnimatePresence>
        {paymentMethod === "betalingsservice" && (
          <motion.div
            className={`${styles.bank_info_section} ${styles.bank_info_container}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label>Betalingsserviceoplysninger</label>
            <div className={styles.name_inputs_container}>
              <input
                type="text"
                placeholder="Reg. nr."
                value={bankInfo.regNumber}
                onChange={handleBankInfoChange("regNumber")}
                style={getValidationStyle(
                  bankInfo.regNumber,
                  bankInfoValid.regNumber
                )}
                aria-label="Indtast registreringsnummer"
                required
                id="regNumber"
                name="regNumber"
                pattern="\d{4}"
                maxLength="4"
                title="Registreringsnummer skal være 4 cifre"
              />
              <input
                type="text"
                placeholder="Kontonummer"
                value={bankInfo.accountNumber}
                onChange={handleBankInfoChange("accountNumber")}
                style={getValidationStyle(
                  bankInfo.accountNumber,
                  bankInfoValid.accountNumber
                )}
                aria-label="Indtast kontonummer"
                required
                id="accountNumber"
                name="accountNumber"
                pattern="\d{10}"
                maxLength="10"
                title="Kontonummer skal være 10 cifre"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <button
        type="submit"
        className={styles.submit_button}
        aria-label="Bekræft donation"
        id="submitButton"
      >
        Bekræft donation
      </button>
      <div className={styles.button_subtext}>
        Din donation går ubeskåret til formålet.
        <br />
        Der er ingen adm. gebyrer.
      </div>
    </form>
  );
};

export default DonationForm;
