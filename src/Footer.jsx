import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import "./Style.scss";

function Footer() {
  const utilityLinkClass = ({ isActive }) =>
    isActive ? "site-footer-link active" : "site-footer-link";
  const year = new Date().getFullYear();

  const scrollBtnRef = useRef();
  const scrollFooterRef = useRef();

  useEffect(() => {
    if (!scrollFooterRef.current || !scrollBtnRef.current) return undefined;

    let ctx;
    const timeoutId = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          scrollBtnRef.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: scrollFooterRef.current,
              start: "top bottom",
              end: "bottom bottom",
              toggleActions: "play none none reverse",
              scrub: false,
              markers: false,
            },
          },
        );
      }, scrollFooterRef);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      ctx?.revert();
    };
  }, []);

  return (
    <>
      <footer
        ref={scrollFooterRef}
        className="site-footer"
        aria-label="Site footer"
      >
        <img
          className="footer-icon"
          src="./ad-footer-logo-01.svg"
          alt="Decorative footer logo"
        />
        <div className="site-footer-inner">
          <div className="site-footer-links" aria-label="Footer links">
            <NavLink to="/services" className={utilityLinkClass}>
              <span className="footer-link-prefix"></span>
              Web services
            </NavLink>
            <NavLink to="/logo-design" className={utilityLinkClass}>
              <span className="footer-link-prefix"></span>
              Logo design
            </NavLink>
            <NavLink to="/photography" className={utilityLinkClass}>
              <span className="footer-link-prefix"></span>
              Photography
            </NavLink>
            <NavLink to="/projects" className={utilityLinkClass}>
              <span className="footer-link-prefix"></span>
              Projects
            </NavLink>
            <NavLink to="/web-designer-brisbane" className={utilityLinkClass}>
              <span className="footer-link-prefix"></span>
              About us
            </NavLink>
            <NavLink to="/contact" className={utilityLinkClass}>
              <span className="footer-link-prefix"></span>
              Contact
            </NavLink>
            <NavLink to="/privacy" className={utilityLinkClass}>
              <span className="footer-link-prefix"></span>
              Privacy
            </NavLink>
          </div>

          <div className="site-footer-brand-wrap">
            <img src="./ad-logo-03.svg" alt="Aaronline Design Logo" />
          </div>
        </div>
      </footer>
      <div className="below-footer">
        <button
          ref={scrollBtnRef}
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <svg
            width="110"
            height="48"
            viewBox="0 0 110 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="110" height="48" rx="24" fill="#9ACD32" />
            <path
              d="M54.3023 16.4L48.9107 21.6526C48.3631 22.1451 48.3631 23.0068 48.9107 23.4993C49.4162 24.0327 50.3007 24.0327 50.8062 23.4993L53.9232 20.5036L53.9232 30.6869C53.9232 31.4255 54.5129 32 55.2711 32C56.0714 32 56.619 31.4255 56.619 30.6869L56.619 20.5036L59.6938 23.4993C60.1993 24.0327 61.0839 24.0327 61.5893 23.4993C62.1369 23.0068 62.1369 22.1451 61.5893 21.6526L56.1977 16.4C55.6923 15.8667 54.8077 15.8667 54.3023 16.4Z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Footer;
