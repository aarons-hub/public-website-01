import { NavLink } from "react-router-dom";
import "./Style.scss";

function VerticalNav() {
  const navLinkClass = ({ isActive }) =>
    isActive ? "vertical-nav-link active" : "vertical-nav-link";

  return (
    <nav className="vertical-nav" aria-label="Primary">
      <div className="vertical-nav-brand">A</div>
      <div className="vertical-nav-links">
        <NavLink to="/" className={navLinkClass} end>
          Home
        </NavLink>
        <NavLink to="/projects" className={navLinkClass}>
          Projects
        </NavLink>
        <NavLink to="/services" className={navLinkClass}>
          Services
        </NavLink>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default VerticalNav;
