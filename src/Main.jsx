import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  HashRouter,
} from "react-router-dom";
import App from "./App.jsx";
import Projects from "./Projects.jsx";
import Services from "./Services.jsx";
import LogoDesign from "./LogoDesign.jsx";
import Photography from "./Photography.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Privacy from "./Privacy.jsx";
import Pricing from "./Pricing.jsx";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

import PerspectiveTest from "./PerspectiveTest.jsx";

const appBase = import.meta.env.BASE_URL;

export function RootPageClassName() {
  const location = useLocation();

  const pathname = location.pathname === "/" ? "home" : location.pathname;
  const pageClass = `${pathname.replace(/^\//, "").replace(/\//g, "-")}-page`;

  const rootEl = document.getElementById("root");
  if (rootEl) {
    rootEl.className = pageClass;
  }

  return null;
}

function CoverBgHeightSync() {
  const location = useLocation();

  useEffect(() => {
    const horizontalNavEl = document.querySelector(".horizontal-nav");
    const coverBgEl = document.querySelector("img.cover-bg");
    if (!coverBgEl) return undefined;

    const selectorByPath = {
      "/": ".home-page section",
      "/projects": "section.projects-hero",
      "/services": "section.services",
      "/logo-design": "section.logo-design",
      "/photography": "section.photography",
      "/about": "section.about",
      "/contact": "section.contact",
      "/privacy": ".privacy-page section.privacy",
      "/pricing": ".pricing-page section.pricing",
      "/test-canvas": ".test-canvas-page section",
    };

    const getTargetSection = () => {
      const routeSelector = selectorByPath[location.pathname];
      return (
        (routeSelector && document.querySelector(routeSelector)) ||
        document.querySelector(".app-main section")
      );
    };

    let animationFrameId = 0;
    let delayedSyncTimer = 0;

    const applyHeight = () => {
      const targetSection = getTargetSection();
      if (!targetSection) return;

      const sectionHeight = Math.ceil(
        targetSection.getBoundingClientRect().height,
      );
      const navHeight = Math.ceil(
        horizontalNavEl?.getBoundingClientRect().height || 0,
      );
      const totalHeight = sectionHeight + navHeight + 40;

      if (totalHeight <= 0) return;

      coverBgEl.style.setProperty(
        "max-height",
        `${totalHeight}px`,
        "important",
      );
    };

    const syncOnNextFrame = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(applyHeight);
    };

    const targetSection = getTargetSection();
    const observer =
      targetSection && "ResizeObserver" in window
        ? new ResizeObserver(syncOnNextFrame)
        : null;

    if (observer && targetSection) {
      observer.observe(targetSection);
    }

    syncOnNextFrame();
    delayedSyncTimer = window.setTimeout(syncOnNextFrame, 120);
    window.addEventListener("resize", syncOnNextFrame);

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(delayedSyncTimer);
      window.removeEventListener("resize", syncOnNextFrame);
    };
  }, [location.pathname]);

  return null;
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const existingRoot = window.__appRoot;
const appRoot = existingRoot || createRoot(rootElement);
window.__appRoot = appRoot;

appRoot.render(
  <StrictMode>
    <HashRouter basename={appBase}>
      <RootPageClassName />
      <CoverBgHeightSync />
      <img
        src={`${appBase}images/cover.jpg`}
        alt="decorative background"
        className="cover-bg"
      />
      <div className="app-shell">
        <Nav />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/logo-design" element={<LogoDesign />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/test-canvas" element={<PerspectiveTest />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  </StrictMode>,
);
