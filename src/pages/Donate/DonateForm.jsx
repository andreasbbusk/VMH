import { useState } from "react";
import styles from "./Donate.module.css";
import SupportHands from "../../assets/support-hands.svg";
import MobilePay from "../../assets/mobilepay.png";
import BS from "../../assets/bs.png";
import { motion, AnimatePresence } from "framer-motion";

const DonationForm = () => {
  // Form state
  const [amount, setAmount] = useState("");
  const [donationType, setDonationType] = useState("single");
  const [donationFrequency, setDonationFrequency] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("mobilepay");
  const [taxDeduction, setTaxDeduction] = useState(false);
  const [cpr, setCpr] = useState("");
  const [bankInfoValid, setBankInfoValid] = useState({
    regNumber: false,
    accountNumber: false,
  });
  const [donorType, setDonorType] = useState("personal");
  const [cvr, setCvr] = useState("");
  const [cvrValid, setCvrValid] = useState(false);
  const [companyName, setCompanyName] = useState("");

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [bankInfo, setBankInfo] = useState({
    regNumber: "",
    accountNumber: "",
  });

  // Helper function for validation styling
  const getValidationStyle = (value, isValid) => {
    if (!value) return {};
    return isValid ? {
      borderWidth: "2px",
      borderStyle: "solid", 
      borderColor: "#4CAF50"
    } : {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "#f44336"
    };
  };

  // Add validation function
  const validateCPR = (cprNumber) => {
    // Remove any spaces or hyphens
    const cleaned = cprNumber.replace(/[\s-]/g, "");

    // Basic format check (10 digits)
    if (!/^\d{10}$/.test(cleaned)) return false;

    // Extract date parts
    const day = parseInt(cleaned.substring(0, 2));
    const month = parseInt(cleaned.substring(2, 4));

    // Basic date validation
    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;

    return true;
  };

  // Add CVR validation
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

    // Validate bank info
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
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
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.donation_form}
      id="donationForm"
    >
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
                style={getValidationStyle(bankInfo.regNumber, bankInfoValid.regNumber)}
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
                style={getValidationStyle(bankInfo.accountNumber, bankInfoValid.accountNumber)}
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

      {/* Submit */}
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
