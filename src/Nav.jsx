import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Style.scss";
import { useMagneticEffectForChildren } from "./hooks/buttonEffects";

const appBase = import.meta.env.BASE_URL;

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const horizontalNavRef = useMagneticEffectForChildren(
    ".horizontal-nav-link",
    20,
    false,
  );

  const navLinkClass = ({ isActive }) =>
    isActive ? "horizontal-nav-link active" : "horizontal-nav-link";

  const servicesNavLinkClass = ({ isActive }) => {
    const isServiceSubRoute =
      location.pathname.includes("logo-design") ||
      location.pathname.includes("photography");

    return isActive || isServiceSubRoute
      ? "horizontal-nav-link active"
      : "horizontal-nav-link";
  };

  return (
    <>
      <nav
        ref={horizontalNavRef}
        className="horizontal-nav"
        aria-label="Primary"
      >
        <div className="horizontal-nav-brand">
          <NavLink to="/" end>
            <img src={`${appBase}ad-logo-03.svg`} alt="Aaronline Design logo" />
          </NavLink>
        </div>
        <div className="horizontal-nav-links">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/services/web-services" className={servicesNavLinkClass}>
            Services
          </NavLink>
          <NavLink to="/projects" className={navLinkClass}>
            Projects
          </NavLink>
          <NavLink to="/web-designer-brisbane" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/pricing" className={navLinkClass}>
            Pricing
          </NavLink>
        </div>
        <div className="horizontal-nav-cta">
          <NavLink
            to="/contact"
            className={({ isActive }) => `${navLinkClass({ isActive })} navBtn`}
          >
            Contact
          </NavLink>
        </div>
      </nav>

      <nav className="mobile-nav" aria-label="Mobile Primary">
        <div className="mobile-nav-inner">
          <div className="horizontal-nav-brand mobile">
            <NavLink to="/" end>
              <img
                src={`${appBase}ad-logo-03.svg`}
                alt="Aaronline Design Logo"
              />
            </NavLink>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <img src={`${appBase}menu-icon-01.svg`} alt="Menu icon" />
          </button>
        </div>

        <nav className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <NavLink
            className="contactBtn"
            to="/contact"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink to="/" end onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/services/web-services" onClick={() => setIsOpen(false)}>
            Web services
          </NavLink>
          <NavLink to="/services/logo-design" onClick={() => setIsOpen(false)}>
            Logo design
          </NavLink>
          <NavLink to="/services/photography" onClick={() => setIsOpen(false)}>
            Photography
          </NavLink>
          <NavLink to="/projects" onClick={() => setIsOpen(false)}>
            Projects
          </NavLink>
          <NavLink to="/web-designer-brisbane" onClick={() => setIsOpen(false)}>
            About
          </NavLink>
          <NavLink to="/pricing" onClick={() => setIsOpen(false)}>
            Pricing
          </NavLink>
        </nav>
      </nav>
    </>
  );
}

export default Nav;
