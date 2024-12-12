import { motion as m } from "framer-motion";
import styles from "./Sponsor.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const Sponsor = () => {
  return (
    <>
      <Breadcrumb />
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.sponsor_container}>
          {/* Content her */}
        </div>
      </m.main>
    </>
  );
};

export default Sponsor;
