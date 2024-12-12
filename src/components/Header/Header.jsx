import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion as m, AnimatePresence } from "framer-motion";
import Logo from "../../assets/VMH-vertical.svg";
import BurgerMenu from "../../assets/burgermenu.svg";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const location = useLocation();

  // Helper functions
  const isActive = (path) => location.pathname === path;
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMouseEnter = (dropdown) => setActiveDropdown(dropdown);
  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };
  const handleSubMenuEnter = (submenu) => setActiveSubDropdown(submenu);
  const handleSubMenuLeave = () => setActiveSubDropdown(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") handleMenuToggle();
  };

  // Active state checks
  const isEventActive = () => {
    const eventPaths = [
      "/events/gallamiddag-2025",
      "/events/gallamiddag-2025/auktion",
      "/events/torveevent-2025"
    ];
    return eventPaths.some(path => isActive(path));
  };

  const isProjectActive = () => {
    const projectPaths = [
      "/projekter",
      "/projekter/projekt-2025",
      "/projekter/projekt-2023",
      "/projekter/projekt-2022",
      "/projekter/projekt-2019",
      "/projekter/projekt-2018",
      "/projekter/projekt-2017",
    ];
    return projectPaths.some(path => isActive(path));
  };

  const isAboutActive = () => isActive("/om-os") || isActive("/kontakt");

  const handleSupportClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => setIsButtonClicked(false), 300);
  };

  // Animation props
  const activeIndicatorProps = {
    className: styles["active-indicator"],
    initial: { scaleY: 0 },
    animate: { scaleY: 1 },
    exit: { scaleY: 0 },
    transition: { duration: 0.25 },
  };

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.3 },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  // Render helpers
  const renderActiveIndicator = (isActiveCondition) =>
    isActiveCondition && window.innerWidth > 768 && (
      <m.div {...activeIndicatorProps} />
    );

  const renderNavLink = (to, label, isActiveCondition, children, showIndicator = true) => (
    <Link
      to={to}
      tabIndex={0}
      aria-label={label}
      className={styles["nav-link"]}
      style={{ color: isActiveCondition ? "#E0A619" : "" }}
    >
      {children}
      <AnimatePresence>
        {showIndicator && renderActiveIndicator(isActiveCondition)}
      </AnimatePresence>
    </Link>
  );

  const renderDropdownItem = (to, text, hasSubmenu = false) => (
    <li
      key={to}
      className={hasSubmenu ? styles.dropdown : ""}
      onMouseEnter={hasSubmenu ? () => handleSubMenuEnter(text) : undefined}
      onMouseLeave={hasSubmenu ? handleSubMenuLeave : undefined}
    >
      {renderNavLink(to, text, isActive(to), text, false)}
      {hasSubmenu && activeSubDropdown === text && (
        <ul className={`${styles["dropdown-menu"]} ${styles["sub-menu"]}`}>
          {renderDropdownItem(`${to}/auktion`, "Auktion")}
        </ul>
      )}
    </li>
  );

  const renderNavItems = () => (
    <ul className={styles["nav-list"]}>
      {/* Events dropdown */}
      <li
        className={styles.dropdown}
        onMouseEnter={() => handleMouseEnter("events")}
        onMouseLeave={handleMouseLeave}
      >
        <button
          aria-expanded={activeDropdown === "events"}
          className={`${styles["dropdown-toggle"]} ${styles["nav-link"]}`}
          tabIndex={0}
          style={{ color: isEventActive() ? "#E0A619" : "" }}
        >
          Events
          <AnimatePresence>
            {renderActiveIndicator(isEventActive())}
          </AnimatePresence>
        </button>
        {activeDropdown === "events" && (
          <ul className={styles["dropdown-menu"]}>
            {renderDropdownItem("/events/gallamiddag-2025", "Gallamiddag 2025", true)}
            {renderDropdownItem("/events/torveevent-2025", "Torveevent 2025")}
          </ul>
        )}
      </li>

      {/* Projects dropdown */}
      <li
        className={styles.dropdown}
        onMouseEnter={() => handleMouseEnter("projects")}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/projekter"
          aria-expanded={activeDropdown === "projects"}
          className={`${styles["dropdown-toggle"]} ${styles["nav-link"]}`}
          tabIndex={0}
          style={{ color: isProjectActive() ? "#E0A619" : "" }}
        >
          Projekter
          <AnimatePresence>
            {renderActiveIndicator(isProjectActive())}
          </AnimatePresence>
        </Link>
        {activeDropdown === "projects" && (
          <ul className={styles["dropdown-menu"]}>
            {[2025, 2023, 2022, 2019, 2018, 2017].map((year) =>
              renderDropdownItem(`/projekter/projekt-${year}`, `Projekt ${year}`)
            )}
          </ul>
        )}
      </li>

      {/* Regular nav items */}
      <li>
        {renderNavLink("/sponsorer", "Go to sponsors", isActive("/sponsorer"), "Sponsorer")}
      </li>
      <li>
        {renderNavLink("/om-hudcancer", "Learn about skin cancer", isActive("/om-hudcancer"), "Hudcancer")}
      </li>

      {/* About dropdown */}
      <li
        className={styles.dropdown}
        onMouseEnter={() => handleMouseEnter("about")}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/om-os"
          aria-expanded={activeDropdown === "about"}
          className={`${styles["dropdown-toggle"]} ${styles["nav-link"]}`}
          tabIndex={0}
          style={{ color: isAboutActive() ? "#E0A619" : "" }}
        >
          Hvem er vi
          <AnimatePresence>
            {renderActiveIndicator(isAboutActive())}
          </AnimatePresence>
        </Link>
        {activeDropdown === "about" && (
          <ul className={styles["dropdown-menu"]}>
            {renderDropdownItem("/kontakt", "Kontakt")}
          </ul>
        )}
      </li>

      <li>
        {renderNavLink("/galleri", "View gallery", isActive("/galleri"), "Galleri")}
      </li>
    </ul>
  );

  return (
    <header className={styles.header}>
      <div className={styles["header-content"]}>
        {renderNavLink(
          "/",
          "Go to homepage",
          isActive("/"),
          <img src={Logo} alt="Vejle mod hudcancer" className={styles["logo-image"]} />
        )}

        <nav className={`${styles.nav} ${isMenuOpen ? styles["nav-open"] : ""}`}>
          {window.innerWidth <= 768 ? (
            <AnimatePresence>
              {isMenuOpen && (
                <m.div
                  onClick={() => setIsMenuOpen(false)}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={mobileMenuVariants}
                >
                  <button
                    className={styles["close-button"]}
                    onClick={handleMenuToggle}
                    aria-label="Luk menu"
                    tabIndex={0}
                  />
                  {renderNavItems()}
                </m.div>
              )}
            </AnimatePresence>
          ) : (
            renderNavItems()
          )}
        </nav>

        <m.div
          className={styles["support-button-wrapper"]}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <Link
            to="/stoet-nu"
            className={`${styles["support-button"]} ${isButtonClicked ? styles["button-clicked"] : ""}`}
            onClick={handleSupportClick}
          >
            Støt nu
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.arrow_icon}
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </m.div>

        <button
          className={styles["menu-toggle"]}
          onClick={handleMenuToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Luk menu" : "Åben menu"}
          tabIndex={0}
        >
          <img src={BurgerMenu} alt="Menu" className={styles["menu-icon"]} />
        </button>
      </div>
    </header>
  );
};

export default Header;
