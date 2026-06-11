import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./HomePage.jsx";
import Projects from "./Projects.jsx";
import Services from "./Services.jsx";
import LogoDesign from "./LogoDesign.jsx";
import Photography from "./Photography.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import WebDesigner from "./WebDesigner.jsx";
import Privacy from "./Privacy.jsx";
import Pricing from "./Pricing.jsx";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import PerspectiveTest from "./PerspectiveTest.jsx";

const appBase = import.meta.env.BASE_URL;
const routerBasename = appBase === "/" ? undefined : appBase;

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
    const coverBgEl = document.querySelector(".cover-bg");
    if (!coverBgEl) return undefined;

    const selectorByPath = {
      "/": ".home-page section",
      "/projects": "section.projects-hero",
      "/services/web-services": "section.web-design",
      "/services/logo-design": "section.logo-design",
      "/services/photography": "section.photography",
      "/about": "section.about",
      "/contact": "section.contact",
      "/privacy": ".privacy-page section.privacy",
      "/pricing": ".pricing-page section.pricing",
      "/web-designer-brisbane": "section.web-designer-brisbane",
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

      coverBgEl.style.setProperty("max-height", `${totalHeight}px`);
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

function SiteStylesLoader() {
  const location = useLocation();

  useEffect(() => {
    import("./Style.scss");
  }, [location.pathname]);

  return null;
}

function SpaRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("p");
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, []);

  return null;
}

function AppLayout() {
  return (
    <>
      <SpaRedirectHandler />
      <CoverBgHeightSync />
      <div className="cover-bg"></div>
      <div className="app-shell">
        <Nav />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services/web-services" element={<Services />} />
            <Route path="/services/logo-design" element={<LogoDesign />} />
            <Route path="/services/photography" element={<Photography />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/web-designer-brisbane" element={<WebDesigner />} />
            <Route path="/map" element={<Map />} />
            <Route path="/perspective-test" element={<PerspectiveTest />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
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
    <BrowserRouter basename={routerBasename}>
      <RootPageClassName />
      <SiteStylesLoader />
      <AppLayout />
    </BrowserRouter>
  </StrictMode>,
);
