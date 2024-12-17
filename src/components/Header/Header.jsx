import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion as m, AnimatePresence } from "framer-motion";
import Logo from "../../assets/VMH-vertical.svg";
import styles from "./Header.module.css";

const Header = () => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Hooks
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;

  // Theme handling
  useEffect(() => {
    const body = document.body;
    const theme =
      location.pathname === "/sponsorer" ||
      location.pathname === "/om-hudcancer"
        ? "light"
        : "beige";

    body.setAttribute("data-theme", theme);
    console.log(`Theme set to: ${theme}`);
  }, [location.pathname]);

  // Active state checks
  const isActive = (path) => location.pathname === path;

  const isEventActive = () => {
    const eventPaths = [
      "/events/gallamiddag-2025",
      "/events/gallamiddag-2025/auktion",
      "/events/torveevent-2025",
    ];
    return eventPaths.some((path) => isActive(path));
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
    return projectPaths.some((path) => isActive(path));
  };

  const isAboutActive = () => isActive("/om-os") || isActive("/kontakt");

  // Event handlers
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") handleMenuToggle();
  };

  const handleMouseEnter = (dropdown) => {
    if (!isMobile) setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setActiveDropdown(null);
  };

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSupportClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => setIsButtonClicked(false), 300);
  };

  // Animation variants
  const activeIndicatorProps = {
    className: styles["active-indicator"],
    initial: { scaleY: 0 },
    animate: { scaleY: 1 },
    exit: { scaleY: 0 },
    transition: { duration: 0.25 },
  };

  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.3, delay: 0.1 },
      },
    },
  };

  const navVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  // Render helpers
  const renderActiveIndicator = (isActiveCondition) =>
    isActiveCondition && !isMobile && <m.div {...activeIndicatorProps} />;

  const renderDesktopDropdownArrow = (isOpen) => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      style={{
        marginLeft: "4px",
        transform: isOpen ? "rotate(0)" : "rotate(-90deg)",
        transition: "transform 0.3s ease",
      }}
    >
      <path d="M2 4L6 8L10 4" />
    </svg>
  );

  const renderMobileDropdownArrow = (dropdownKey) => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={styles["dropdown-arrow-mobile"]}
      style={{
        transform:
          activeDropdown === dropdownKey ? "rotate(0)" : "rotate(-90deg)",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDropdownClick(dropdownKey);
      }}
    >
      <path d="M2 4L6 8L10 4" />
    </svg>
  );

  const renderNavLink = (
    to,
    label,
    isActiveCondition,
    children,
    showIndicator = true
  ) => (
    <Link
      to={to}
      tabIndex={0}
      aria-label={label}
      className={isMobile ? styles["nav-link-mobile"] : styles["nav-link"]}
      style={{ color: isActiveCondition ? "#E0A619" : "" }}
    >
      {children}
      {showIndicator && (
        <AnimatePresence>
          {renderActiveIndicator(isActiveCondition)}
        </AnimatePresence>
      )}
    </Link>
  );

  const renderDropdownItem = (to, text) => (
    <li
      key={to}
      className={
        isMobile ? styles["dropdown-item-mobile"] : styles["dropdown-item"]
      }
    >
      <div
        className={
          isMobile ? styles["dropdown-line-mobile"] : styles["dropdown-line"]
        }
      />
      {renderNavLink(to, text, isActive(to), text, false)}
    </li>
  );

  const renderDropdownButton = (label, dropdownKey, isActiveCheck, to) => (
    <Link
      to={
        isMobile
          ? dropdownKey === "projects"
            ? "/projekter"
            : dropdownKey === "about"
            ? "/om-os"
            : to
          : dropdownKey === "projects"
          ? "/projekter"
          : dropdownKey === "about"
          ? "/om-os"
          : to
      }
      aria-expanded={activeDropdown === dropdownKey}
      className={`${styles[`dropdown-toggle${isMobile ? "-mobile" : ""}`]} ${
        styles[`nav-link${isMobile ? "-mobile" : ""}`]
      }`}
      tabIndex={0}
      style={{ color: isActiveCheck() ? "#E0A619" : "" }}
      onClick={(e) => {
        if (isMobile) {
          if (dropdownKey === "events") {
            e.preventDefault();
            handleDropdownClick(dropdownKey);
          }
        }
      }}
    >
      {label}
      {isMobile
        ? renderMobileDropdownArrow(dropdownKey)
        : renderDesktopDropdownArrow(activeDropdown === dropdownKey)}
      {!isMobile && (
        <AnimatePresence>
          {renderActiveIndicator(isActiveCheck())}
        </AnimatePresence>
      )}
    </Link>
  );

  const renderDesktopNavItems = () => (
    <ul className={styles["nav-list"]}>
      {/* Events dropdown */}
      <li
        className={styles.dropdown}
        onMouseEnter={() => handleMouseEnter("events")}
        onMouseLeave={handleMouseLeave}
      >
        {renderDropdownButton(
          "Events",
          "events",
          isEventActive,
          "/events/gallamiddag-2025"
        )}
        {activeDropdown === "events" && (
          <ul className={styles["dropdown-menu"]}>
            {renderDropdownItem("/events/gallamiddag-2025", "Gallamiddag 2025")}
            {renderDropdownItem("/events/gallamiddag-2025/auktion", "Auktion")}
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
        {renderDropdownButton(
          "Projekter",
          "projects",
          isProjectActive,
          "/projekter/projekt-2025"
        )}
        {activeDropdown === "projects" && (
          <ul className={styles["dropdown-menu"]}>
            {[2025, 2023, 2022, 2019, 2018, 2017].map((year) =>
              renderDropdownItem(
                `/projekter/projekt-${year}`,
                `Projekt ${year}`
              )
            )}
          </ul>
        )}
      </li>

      {/* Regular nav items */}
      <li>
        {renderNavLink(
          "/sponsorer",
          "Go to sponsors",
          isActive("/sponsorer"),
          "Sponsorer"
        )}
      </li>
      <li>
        {renderNavLink(
          "/om-hudcancer",
          "Learn about skin cancer",
          isActive("/om-hudcancer"),
          "Hudcancer"
        )}
      </li>

      {/* About dropdown */}
      <li
        className={styles.dropdown}
        onMouseEnter={() => handleMouseEnter("about")}
        onMouseLeave={handleMouseLeave}
      >
        {renderDropdownButton("Hvem er vi", "about", isAboutActive, "/kontakt")}
        {activeDropdown === "about" && (
          <ul className={styles["dropdown-menu"]}>
            {renderDropdownItem("/kontakt", "Kontakt")}
          </ul>
        )}
      </li>

      <li>
        {renderNavLink(
          "/galleri",
          "View gallery",
          isActive("/galleri"),
          "Galleri"
        )}
      </li>
    </ul>
  );

  const renderMobileNavItems = () => (
    <ul className={styles["nav-list-mobile"]}>
      {/* Events dropdown */}
      <li className={styles["dropdown-mobile"]}>
        {renderDropdownButton(
          "Events",
          "events",
          isEventActive,
          "/events/gallamiddag-2025"
        )}
        <AnimatePresence>
          {activeDropdown === "events" && (
            <m.ul
              className={styles["dropdown-menu-mobile"]}
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              {renderDropdownItem(
                "/events/gallamiddag-2025",
                "Gallamiddag 2025"
              )}
              {renderDropdownItem(
                "/events/gallamiddag-2025/auktion",
                "Auktion"
              )}
              {renderDropdownItem("/events/torveevent-2025", "Torveevent 2025")}
            </m.ul>
          )}
        </AnimatePresence>
      </li>

      {/* Projects dropdown */}
      <li className={styles["dropdown-mobile"]}>
        {renderDropdownButton(
          "Projekter",
          "projects",
          isProjectActive,
          "/projekter/projekt-2025"
        )}
        <AnimatePresence>
          {activeDropdown === "projects" && (
            <m.ul
              className={styles["dropdown-menu-mobile"]}
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              {[2025, 2023, 2022, 2019, 2018, 2017].map((year) =>
                renderDropdownItem(
                  `/projekter/projekt-${year}`,
                  `Projekt ${year}`
                )
              )}
            </m.ul>
          )}
        </AnimatePresence>
      </li>

      {/* Regular nav items */}
      <li className={styles["nav-item-mobile"]}>
        {renderNavLink(
          "/sponsorer",
          "Go to sponsors",
          isActive("/sponsorer"),
          "Sponsorer"
        )}
      </li>
      <li className={styles["nav-item-mobile"]}>
        {renderNavLink(
          "/om-hudcancer",
          "Learn about skin cancer",
          isActive("/om-hudcancer"),
          "Hudcancer"
        )}
      </li>

      {/* About dropdown */}
      <li className={styles["dropdown-mobile"]}>
        {renderDropdownButton("Hvem er vi", "about", isAboutActive, "/kontakt")}
        <AnimatePresence>
          {activeDropdown === "about" && (
            <m.ul
              className={styles["dropdown-menu-mobile"]}
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              {renderDropdownItem("/kontakt", "Kontakt")}
            </m.ul>
          )}
        </AnimatePresence>
      </li>

      <li className={styles["nav-item-mobile"]}>
        {renderNavLink(
          "/galleri",
          "View gallery",
          isActive("/galleri"),
          "Galleri"
        )}
      </li>
    </ul>
  );

  return (
    <header
      className={styles.header}
      style={{ backgroundColor: "var(--header-bg-color)" }}
    >
      <div className={styles["header-content"]}>
        {/* Logo */}
        {renderNavLink(
          "/",
          "Go to homepage",
          isActive("/"),
          <img
            src={Logo}
            alt="Vejle mod hudcancer"
            className={styles["logo-image"]}
          />
        )}

        {/* Navigation */}
        <m.nav
          className={`${styles.nav} ${isMenuOpen ? styles["nav-open"] : ""}`}
          initial={false}
          animate={isMobile ? (isMenuOpen ? "open" : "closed") : {}}
          variants={navVariants}
        >
          {isMobile ? (
            <AnimatePresence>
              {isMenuOpen && (
                <m.div
                  onClick={() => setIsMenuOpen(false)}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={mobileMenuVariants}
                >
                  {renderMobileNavItems()}
                </m.div>
              )}
            </AnimatePresence>
          ) : (
            renderDesktopNavItems()
          )}
        </m.nav>

        {/* Support button */}
        <m.div
          className={styles["support-button-wrapper"]}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <Link
            to="/stoet-nu"
            className={`${styles["support-button"]} ${
              isButtonClicked ? styles["button-clicked"] : ""
            }`}
            onClick={handleSupportClick}
          >
            Støt nu
            {isMobile && (
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
            )}
          </Link>
        </m.div>

        {/* Mobile menu toggle */}
        <button
          className={styles["menu-toggle"]}
          onClick={handleMenuToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Luk menu" : "Åben menu"}
          tabIndex={0}
        >
          <m.svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e0a619"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <>
                <m.line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 0 : -4,
                  }}
                  transition={{ duration: 0.5, ease: "anticipate" }}
                />
                <m.line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? 0 : 4,
                  }}
                  transition={{ duration: 0.5, ease: "anticipate" }}
                />
              </>
            ) : (
              <>
                <m.line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 0 : -4,
                  }}
                  transition={{ duration: 0.5, ease: "anticipate" }}
                />
                <m.line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? 0 : 4,
                  }}
                  transition={{ duration: 0.5, ease: "anticipate" }}
                />
              </>
            )}
          </m.svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
