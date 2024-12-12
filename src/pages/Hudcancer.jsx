import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./Hudcancer.module.css";

const Hudcancer = () => {
  return (
    <>
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <div className={styles.container}>
        <section className={styles.project_video}>
            <div className={styles.project_video_text}>
              <h2>
                Projekterne bidrager til <strong>forskning og udvikling</strong>
              </h2>
              <div className={styles.horizontal_line_video}></div>
              <p>
                Hør Justins historie om hvordan rigtig og hurtig hjælp gav ham
                livsglæden tilbage efter kræft. Vi ønsker at hjælpe borgere i
                vores område til en bedre forebyggelse mod hudcancer og til en
                hurtigere og nemmere behandling, hvis de har fået hudcancer.{" "}
                <strong>Med din støtte kan vi hjælpe endnu flere</strong>
              </p>
              <Link className={['support-button']} to="/Stoet-nu">
                Støt nu
              </Link>
            </div>
            <div>
              <video src="" autoPlay muted loop></video>
            </div>
          </section>
        </div>
      </m.main>
    </>
  );
};

export default Hudcancer;
