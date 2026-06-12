import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useMagneticEffectForChildren } from "./hooks/buttonEffects";

function Footer() {
  const utilityLinkClass = ({ isActive }) =>
    isActive ? "site-footer-link active" : "site-footer-link";
  const year = new Date().getFullYear();

  const scrollBtnRef = useRef();
  const scrollFooterRef = useRef();

  const footerLinksRef = useMagneticEffectForChildren(
    ".site-footer-link",
    20,
    false,
  );

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
        <div className="site-footer-inner">
          <div
            ref={footerLinksRef}
            className="site-footer-links"
            aria-label="Footer links"
          >
            <NavLink to="/services/web-services" className={utilityLinkClass}>
              <span className="footer-link-prefix"></span>
              Web services
            </NavLink>
            <NavLink to="/services/logo-design" className={utilityLinkClass}>
              <span className="footer-link-prefix"></span>
              Logo design
            </NavLink>
            <NavLink to="/services/photography" className={utilityLinkClass}>
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
