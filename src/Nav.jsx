import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Style.scss";

const appBase = import.meta.env.BASE_URL;

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const navLinkClass = ({ isActive }) =>
    isActive ? "horizontal-nav-link active" : "horizontal-nav-link";

  return (
    <>
      <nav ref={menuRef} className="horizontal-nav" aria-label="Primary">
        <div className="horizontal-nav-brand">
          <a href={appBase}>
            <img src={`${appBase}ad-logo-01.svg`} alt="Aaronline Design Logo" />
          </a>
        </div>
        <div className="horizontal-nav-links">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            Services
          </NavLink>
          <NavLink to="/projects" className={navLinkClass}>
            Projects
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
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
            <a href={appBase}>
              <img
                src={`${appBase}ad-logo-01.svg`}
                alt="Aaronline Design Logo"
              />
            </a>
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
          <a className="contactBtn" href={`${appBase}contact`}>
            Contact
          </a>
          <a href={appBase}>Home</a>
          <a href={`${appBase}services`}>Services</a>
          <a href={`${appBase}projects`}>Projects</a>
          <a href={`${appBase}about`}>About</a>
        </nav>
      </nav>
    </>
  );
}

export default Nav;
