import { Link, useLocation } from "react-router-dom";
import { motion as m } from "framer-motion";
import styles from "./Breadcrumb.module.css";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <m.nav 
      className={styles.breadcrumb}
      aria-label="breadcrumb"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={breadcrumbVariants}
    >
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link 
            to="/"
            className={styles.link}
            tabIndex={0}
            aria-label="Gå til forside"
          >
            Hjem
          </Link>
        </li>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <li key={name} className={styles.item}>
              <span className={styles.separator}>/</span>
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {name}
                </span>
              ) : (
                <Link 
                  to={routeTo}
                  className={styles.link}
                  tabIndex={0}
                  aria-label={`Gå til ${name}`}
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </m.nav>
  );
};

export default Breadcrumb;
