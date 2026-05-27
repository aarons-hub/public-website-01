import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Style.scss";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const navLinkClass = ({ isActive }) =>
    isActive ? "horizontal-nav-link active" : "horizontal-nav-link";

  return (
    <>
      <nav ref={menuRef} className="horizontal-nav" aria-label="Primary">
        <div className="horizontal-nav-brand">
          <a href="/">
            <img src="./ad-logo-01.svg" alt="Aaronline Design Logo" />
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
            <a href="/">
              <img src="./ad-logo-01.svg" alt="Aaronline Design Logo" />
            </a>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <img src="./menu-icon-01.svg" alt="Menu icon" />
          </button>
        </div>

        <nav className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a href="/projects-backup">Projects Backup</a>
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a className="contactBtn" href="/contact">
            Contact
          </a>
        </nav>
      </nav>
    </>
  );
}

export default Nav;
