import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Galleri.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Album from "../../assets/album.svg";

const Galleri = () => {
  // State for managing gallery images and active image
  const [aktivtBillede, setAktivtBillede] = useState(null);
  const [aktivtIndex, setAktivtIndex] = useState(0);
  const [billeder, setBilleder] = useState({});

  // State for filtering and displaying images
  const [valgtÅr, setValgtÅr] = useState("vis_alle");
  const [visAlleÅr, setVisAlleÅr] = useState(true);
  const [dropdownÅben, setDropdownÅben] = useState(false);
  const [antalVisteIndlæg, setAntalVisteIndlæg] = useState(16);
  const [årAntalViste, setÅrAntalViste] = useState({});

  // Loading states
  const [indlæser, setIndlæser] = useState(true);
  const [indlæserFlere, setIndlæserFlere] = useState(false);

  // Fetch gallery data on component mount
  useEffect(() => {
    const hentGalleriData = async () => {
      try {
        setIndlæser(true);
        const response = await fetch("/vmh/data/galleryImages.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Received non-JSON response");
        }

        const data = await response.json();
        setBilleder(data);
        
        // Initialize number of shown images per year
        const initialÅrAntal = {};
        Object.keys(data).forEach(år => {
          initialÅrAntal[år] = 12;
        });
        setÅrAntalViste(initialÅrAntal);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setIndlæser(false);
      }
    };

    hentGalleriData();
  }, []);

  // Image click handlers
  const handleBilledeKlik = (billede, index) => {
    setAktivtBillede(billede);
    setAktivtIndex(index);
  };

  const handleLuk = () => {
    setAktivtBillede(null);
    setAktivtIndex(0);
  };

  // Year selection handler
  const handleÅrValg = (værdi) => {
    if (værdi === "vis_alle") {
      setVisAlleÅr(true);
    } else {
      setVisAlleÅr(false);
      setValgtÅr(værdi);
    }
    setAntalVisteIndlæg(12); // Reset number of shown images when year changes
    setDropdownÅben(false);
  };

  // Load more images handlers
  const handleIndlæsFlereBillederForÅr = (år) => {
    setIndlæserFlere(true);
    setÅrAntalViste(prev => ({
      ...prev,
      [år]: prev[år] + 12
    }));
    setIndlæserFlere(false);
  };

  const handleIndlæsFlereBilleder = () => {
    setIndlæserFlere(true);
    setAntalVisteIndlæg(prev => prev + 12);
    setIndlæserFlere(false);
  };

  // Image navigation handlers
  const handleNæsteBillede = (e) => {
    e.stopPropagation();
    const aktuelleSamling = visAlleÅr ? billeder[valgtÅr] : billeder[valgtÅr];
    const nyIndex = (aktivtIndex + 1) % aktuelleSamling.length;
    setAktivtIndex(nyIndex);
    setAktivtBillede(aktuelleSamling[nyIndex]);
  };

  const handleForrigeBillede = (e) => {
    e.stopPropagation();
    const aktuelleSamling = visAlleÅr ? billeder[valgtÅr] : billeder[valgtÅr];
    const nyIndex = aktivtIndex === 0 ? aktuelleSamling.length - 1 : aktivtIndex - 1;
    setAktivtIndex(nyIndex);
    setAktivtBillede(aktuelleSamling[nyIndex]);
  };

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!aktivtBillede) return;

      switch(e.key) {
        case "ArrowRight":
          handleNæsteBillede(e);
          break;
        case "ArrowLeft":
          handleForrigeBillede(e);
          break;
        case "Escape":
          handleLuk();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aktivtBillede, aktivtIndex]);

  return (
    <>
      <Breadcrumb />
      <section className={styles.gallery_intro}>
        <div className={styles.gallery_intro_text}>
          <h1>
            Hvert andet år afholdes en gallamiddag{" "}
            <strong>mod hudcancer</strong>
          </h1>
          <div className={styles.horizontal_line}></div>
          <p>
            Gennem smukke øjeblikke og stærke fællesskaber støtter vi sammen
            kampen mod hudcancer.
          </p>
        </div>
        <img src={Album} alt="Album" />
      </section>

      {/* Main gallery section */}
      <motion.section
        className={styles.galleri_container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1>Galleri{!visAlleÅr ? ` - ${valgtÅr}` : ""}</h1>

        {/* Year selection dropdown */}
        <div className={styles.custom_dropdown}>
          <motion.button
            className={styles.dropdown_toggle}
            onClick={() => setDropdownÅben(!dropdownÅben)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-expanded={dropdownÅben}
            aria-haspopup="listbox"
          >
            {visAlleÅr ? "Alle billeder" : valgtÅr}
            <motion.svg
              className={styles.dropdown_arrow}
              width="12"
              height="10"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: dropdownÅben ? 0 : 180 }}
              transition={{ duration: 0.05, ease: "easeInOut" }}
            >
              <path
                d="M1 6L6 1L11 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.button>

          <AnimatePresence>
            {dropdownÅben && (
              <motion.ul
                className={styles.dropdown_menu}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                role="listbox"
              >
                <motion.li
                  onClick={() => handleÅrValg("vis_alle")}
                  className={visAlleÅr ? styles.aktiv : ""}
                  whileHover={{ backgroundColor: "#f0f0f0" }}
                  role="option"
                  aria-selected={visAlleÅr}
                >
                  Alle billeder
                </motion.li>
                <motion.li
                  onClick={() => handleÅrValg("2023")}
                  className={!visAlleÅr && valgtÅr === "2023" ? styles.aktiv : ""}
                  whileHover={{ backgroundColor: "#f0f0f0" }}
                  role="option"
                  aria-selected={!visAlleÅr && valgtÅr === "2023"}
                >
                  2023
                </motion.li>
                <motion.li
                  onClick={() => handleÅrValg("2022")}
                  className={!visAlleÅr && valgtÅr === "2022" ? styles.aktiv : ""}
                  whileHover={{ backgroundColor: "#f0f0f0" }}
                  role="option"
                  aria-selected={!visAlleÅr && valgtÅr === "2022"}
                >
                  2022
                </motion.li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Loading state */}
        {indlæser ? (
          <motion.div 
            className={styles.loading_container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={styles.loading_spinner}></div>
            <p>Indlæser billeder...</p>
          </motion.div>
        ) : visAlleÅr ? (
          // Display all years
          Object.keys(billeder)
            .sort((a, b) => b - a)
            .map((år) => (
              <div key={år}>
                <motion.h2
                  className={styles.år_overskrift}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {år}
                </motion.h2>
                <div className={styles.galleri_grid}>
                  {billeder[år]?.slice(0, årAntalViste[år]).map((billede, index) => (
                    <motion.div
                      key={index}
                      className={styles.galleri_item}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.img
                        src={billede.src}
                        alt={billede.alt}
                        onClick={() => handleBilledeKlik(billede, index)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className={styles.galleri_billede}
                        tabIndex={0}
                        role="button"
                        aria-label={`Åbn ${billede.alt}`}
                      />
                    </motion.div>
                  ))}
                </div>
                {billeder[år]?.length > årAntalViste[år] && (
                  <>
                    {indlæserFlere ? (
                      <motion.div 
                        className={styles.loading_container}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className={styles.loading_spinner}></div>
                        <p>Indlæser flere billeder...</p>
                      </motion.div>
                    ) : (
                      <motion.button
                        className={styles.indlæs_flere_knap}
                        onClick={() => handleIndlæsFlereBillederForÅr(år)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        aria-label={`Indlæs flere billeder fra ${år}`}
                      >
                        {`Indlæs flere billeder fra ${år}`}
                      </motion.button>
                    )}
                  </>
                )}
              </div>
            ))
        ) : (
          // Display filtered year
          <div className={styles.galleri_grid}>
            {billeder[valgtÅr]?.slice(0, antalVisteIndlæg).map((billede, index) => (
              <motion.div
                key={index}
                className={styles.galleri_item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.img
                  src={billede.src}
                  alt={billede.alt}
                  onClick={() => handleBilledeKlik(billede, index)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={styles.galleri_billede}
                  tabIndex={0}
                  role="button"
                  aria-label={`Åbn ${billede.alt}`}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Load more button for filtered view */}
        {!visAlleÅr && billeder[valgtÅr]?.length > antalVisteIndlæg && (
          <>
            {indlæserFlere ? (
              <motion.div 
                className={styles.loading_container}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className={styles.loading_spinner}></div>
                <p>Indlæser flere billeder...</p>
              </motion.div>
            ) : (
              <motion.button
                className={styles.indlæs_flere_knap}
                onClick={handleIndlæsFlereBilleder}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                aria-label="Indlæs flere billeder"
              >
                Indlæs flere billeder
              </motion.button>
            )}
          </>
        )}

        {/* Image modal */}
        <AnimatePresence>
          {aktivtBillede && (
            <div
              className={styles.modal_overlay}
              onClick={handleLuk}
              role="dialog"
              aria-label="Billede visning"
            >
              <motion.button
                className={`${styles.nav_knap} ${styles.forrige_knap}`}
                onClick={handleForrigeBillede}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Forrige billede"
              >
                ‹
              </motion.button>

              <motion.img
                src={aktivtBillede.src}
                alt={aktivtBillede.alt}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              <motion.button
                className={`${styles.nav_knap} ${styles.næste_knap}`}
                onClick={handleNæsteBillede}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Næste billede"
              >
                ›
              </motion.button>

              <motion.button
                className={styles.luk_knap}
                onClick={handleLuk}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Luk billede"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                ✕
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
};

export default Galleri;
