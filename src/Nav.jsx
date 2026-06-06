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
            <svg className="logo" viewBox="0 0 70 39">
              <path
                d="M50.25 27.75C54 27.75 58.5 24.75 58.5 19.5C58.5 14.25 54 11.25 50.25 11.25H45.375H39.375L36 6H50.25C57.7058 6 63.75 12.0442 63.75 19.5C63.75 26.9558 57.7058 33 50.25 33H39L42.75 39H50.25C61.0196 39 69.75 30.2696 69.75 19.5C69.75 8.73045 61.0196 0 50.25 0H25.5L36 17.25H46.875H50.25C51.4926 17.25 52.5 18.2574 52.5 19.5C52.5 20.7426 51.4926 21.75 50.25 21.75H32.625L29.25 27.75H50.25Z"
                fill="white"
              />
              <path d="M25.5 0L33.75 0L8.25 39H0L25.5 0Z" fill="white" />
              <path
                d="M43.7656 39H36.2812L29.25 27.75L22.2188 39H14.7344L29.25 16.5L43.7656 39Z"
                fill="white"
              />
            </svg>
            <span className="sr-only">Aaronline Design</span>
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
              <svg className="logo" viewBox="0 0 70 39">
                <path
                  d="M50.25 27.75C54 27.75 58.5 24.75 58.5 19.5C58.5 14.25 54 11.25 50.25 11.25H45.375H39.375L36 6H50.25C57.7058 6 63.75 12.0442 63.75 19.5C63.75 26.9558 57.7058 33 50.25 33H39L42.75 39H50.25C61.0196 39 69.75 30.2696 69.75 19.5C69.75 8.73045 61.0196 0 50.25 0H25.5L36 17.25H46.875H50.25C51.4926 17.25 52.5 18.2574 52.5 19.5C52.5 20.7426 51.4926 21.75 50.25 21.75H32.625L29.25 27.75H50.25Z"
                  fill="white"
                />
                <path d="M25.5 0L33.75 0L8.25 39H0L25.5 0Z" fill="white" />
                <path
                  d="M43.7656 39H36.2812L29.25 27.75L22.2188 39H14.7344L29.25 16.5L43.7656 39Z"
                  fill="white"
                />
              </svg>
              <span className="sr-only">Aaronline Design</span>
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
