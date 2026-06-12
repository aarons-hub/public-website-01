import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { Helmet } from "react-helmet-async";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useMagneticEffectForChildren } from "./hooks/buttonEffects";

const appBase = import.meta.env.BASE_URL;

function withBase(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;

  const base = appBase.endsWith("/") ? appBase : `${appBase}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}

function TransformLayer({ layer }) {
  if (!layer?.src) return null;

  return (
    <div
      style={{
        perspective: "2000px",
        position: "absolute",
        pointerEvents: "none",
        top: layer.parentWrapper?.top || "0",
        left: layer.parentWrapper?.left || "0",
        width: layer.parentWrapper?.width || "100%",
        height: layer.parentWrapper?.height || "100%",
        transform: layer.parentWrapper?.transform || "none",
      }}
    >
      <img
        src={withBase(layer.src)}
        alt=""
        style={{
          pointerEvents: "none",
          width: layer.imageTransform?.width || "100%",
          transform: layer.imageTransform?.transform || "none",
          display: "block",
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        }}
      />
    </div>
  );
}

function VideoOverlay({ movieFile, autoPlay = true }) {
  if (!movieFile?.src) return null;

  return (
    <div
      className="video-wrapper"
      style={{
        top: movieFile.videoWrapper?.top || "0",
        left: movieFile.videoWrapper?.left || "0",
        width: movieFile.videoWrapper?.width || "100%",
        height: movieFile.videoWrapper?.height || "100%",
      }}
    >
      <video
        key={movieFile.src}
        className="item-video"
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <source src={withBase(movieFile.src)} type="video/mp4" />
      </video>
    </div>
  );
}

function getWebThumbnailItems(group) {
  const groupItems = group.items || [];

  const featuredByFlag = groupItems.filter(
    (item) => item.featuredWebItem === true || item.featuredWebItem === "true",
  );
  return featuredByFlag;
}

const masonryBreakpoints = {
  default: 5,
  1170: 4,
  640: 3,
};

async function loadProjectsData() {
  const requestedPath = "data/projects-data.json";
  const candidateUrls = [
    `${appBase}data/projects-data.json`,
    `/data/projects-data.json`,
    "./data/projects-data.json",
  ].filter((value, index, array) => array.indexOf(value) === index);

  let lastError = null;

  for (const url of candidateUrls) {
    try {
      const response = await fetch(url, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return { data, loadedFrom: url };
    } catch (error) {
      lastError = error;
      console.warn(`[Web] data load attempt failed: ${url}`, error);
    }
  }

  const reason =
    lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Unable to load ${requestedPath}. Last failure: ${reason}`);
}

function Services() {
  const [groups, setGroups] = useState([]);
  const [activeThumbUid, setActiveThumbUid] = useState("");
  const [thumbHeights, setThumbHeights] = useState({});
  const [isCompactThumbLayout, setIsCompactThumbLayout] = useState(false);
  const heroOuterRef = useRef(null);
  const heroWrapperRef = useRef(null);
  const servicesListRef = useMagneticEffectForChildren(
    ".service-btn",
    20,
    false,
  );
  const thumbSlideRefs = useRef(new Map());

  const webItems = useMemo(() => {
    return groups.flatMap((group) => {
      const selectedItems = getWebThumbnailItems(group);

      return selectedItems.map((selectedItem, index) => ({
        ...selectedItem,
        groupName: group.name,
        groupThumbnail: group.thumbnail || selectedItem["base-img"] || "",
        uid: `${group.name}-${selectedItem.id}-${index}`,
      }));
    });
  }, [groups]);

  const activeItem = useMemo(() => {
    if (!webItems.length) return null;
    return webItems.find((item) => item.uid === activeThumbUid) || webItems[0];
  }, [webItems, activeThumbUid]);

  useEffect(() => {
    loadProjectsData()
      .then(({ data }) => {
        const nextGroups = Array.isArray(data)
          ? [{ name: "Default", items: data }]
          : data.groups || [];

        setGroups(nextGroups);

        const initialWebItems = nextGroups.flatMap((group) => {
          const selectedItems = getWebThumbnailItems(group);

          return selectedItems.map((selectedItem, index) => ({
            ...selectedItem,
            groupName: group.name,
            groupThumbnail: group.thumbnail || selectedItem["base-img"] || "",
            uid: `${group.name}-${selectedItem.id}-${index}`,
          }));
        });

        setActiveThumbUid(initialWebItems[0]?.uid ?? "");
      })
      .catch((err) => {
        console.error("[Web] data fetch error:", {
          message: err instanceof Error ? err.message : String(err),
          appBase,
          location: window.location.href,
        });
      });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const updateLayoutMode = () => {
      setIsCompactThumbLayout(mediaQuery.matches);
    };

    updateLayoutMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateLayoutMode);
      return () => mediaQuery.removeEventListener("change", updateLayoutMode);
    }

    mediaQuery.addListener(updateLayoutMode);
    return () => mediaQuery.removeListener(updateLayoutMode);
  }, []);

  useEffect(() => {
    if (!webItems.length) return undefined;

    let animationFrameId = 0;
    const assetListeners = [];

    const measureThumbHeights = () => {
      const nextHeights = {};

      webItems.forEach((item) => {
        const slideElement = thumbSlideRefs.current.get(item.uid);
        if (!slideElement) return;

        const height = slideElement.getBoundingClientRect().height;
        if (height > 0) {
          nextHeights[item.uid] = height;
        }
      });

      setThumbHeights((currentHeights) => {
        const currentKeys = Object.keys(currentHeights);
        const nextKeys = Object.keys(nextHeights);

        const sameLength = currentKeys.length === nextKeys.length;
        const sameValues =
          sameLength &&
          nextKeys.every(
            (key) =>
              Math.abs((currentHeights[key] ?? 0) - nextHeights[key]) < 0.5,
          );

        return sameValues ? currentHeights : nextHeights;
      });
    };

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = window.requestAnimationFrame(measureThumbHeights);
      });
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleMeasure)
        : null;

    const observeSlideAssets = () => {
      thumbSlideRefs.current.forEach((slideElement) => {
        slideElement.querySelectorAll("img, video").forEach((asset) => {
          const onAssetReady = scheduleMeasure;

          asset.addEventListener("load", onAssetReady);
          asset.addEventListener("loadedmetadata", onAssetReady);

          assetListeners.push([asset, onAssetReady]);
        });
      });
    };

    thumbSlideRefs.current.forEach((slideElement) => {
      resizeObserver?.observe(slideElement);
    });

    scheduleMeasure();
    observeSlideAssets();
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", scheduleMeasure);
      assetListeners.forEach(([asset, onAssetReady]) => {
        asset.removeEventListener("load", onAssetReady);
        asset.removeEventListener("loadedmetadata", onAssetReady);
      });
      resizeObserver?.disconnect();
    };
  }, [webItems]);

  useEffect(() => {
    let animationFrameId = 0;

    const syncHeroScale = () => {
      const heroOuterEl = heroOuterRef.current;
      const heroWrapperEl = heroWrapperRef.current;
      if (!heroOuterEl || !heroWrapperEl) return;

      // offsetWidth/Height reflect the unscaled CSS layout dimensions
      const naturalWidth = heroWrapperEl.offsetWidth; // 900px from CSS
      const naturalHeight = heroWrapperEl.offsetHeight; // aspect-ratio-driven
      const outerWidth = heroOuterEl.offsetWidth;

      if (naturalWidth <= 0 || naturalHeight <= 0 || outerWidth <= 0) return;

      const scale = outerWidth / naturalWidth;
      heroWrapperEl.style.transform = `scale(${scale})`;
      heroOuterEl.style.height = `${naturalHeight * scale}px`;
    };

    const scheduleSync = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(syncHeroScale);
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleSync)
        : null;

    // Observe the outer for width changes; observe wrapper for image-load height changes
    if (heroOuterRef.current) {
      resizeObserver?.observe(heroOuterRef.current);
    }
    if (heroWrapperRef.current) {
      resizeObserver?.observe(heroWrapperRef.current);
    }

    scheduleSync();
    window.addEventListener("resize", scheduleSync);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", scheduleSync);
      resizeObserver?.disconnect();
    };
  }, [activeItem?.uid]);

  const section = useRef(null);

  useEffect(() => {
    if (!section.current) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(section.current, {
        filter: "blur(30px)",
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }, section.current);

    return () => ctx.revert();
  }, []);

  const handleThumbSelect = (uid) => {
    setActiveThumbUid(uid);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    heroWrapperRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const thumbsBreakpointCols = isCompactThumbLayout ? 3 : masonryBreakpoints;

  return (
    <>
      <Helmet>
        <title>Services | Aaronline Design</title>
        <meta
          name="description"
          content="Explore Aaronline Design's web design, website development, branding, and digital marketing services in Brisbane."
        />
        <link
          rel="canonical"
          href="https://aaronlinedesign.au/services/web-services"
        />
      </Helmet>
      <section ref={section} className="web-design pb40">
        <div className="col left">
          <h1 className="med-heading mt20">Services</h1>
          <h2>Web services</h2>
          <p>
            We build and manage WordPress websites that are fast, secure, and
            easy to update.
          </p>
          <p>
            Whether you need a simple refresh or ongoing care, we keep your site
            running smoothly — so you never have to worry about the technical
            side.
          </p>

          <div ref={servicesListRef} className="services-list">
            <Link to="/services/web-services" className="service-btn active">
              Web services
            </Link>
            <Link to="/services/logo-design" className="service-btn">
              Logo design
            </Link>
            <Link to="/services/photography" className="service-btn">
              Photography
            </Link>
          </div>

          <div className="item-details mt40">
            <h4 className="heading">{activeItem?.title}</h4>
            <p className="description">{activeItem?.description}</p>
            {Array.isArray(activeItem?.tags) && activeItem.tags.length > 0 && (
              <div className="tag-list" aria-label="Project tags">
                {activeItem.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col right mt10">
          <div className="section-inner">
            <div className="hero-outer" ref={heroOuterRef}>
              {activeItem && (
                <div
                  className="hero-wrapper"
                  key={activeItem.uid}
                  ref={heroWrapperRef}
                >
                  <img
                    src={withBase(activeItem["base-img"])}
                    alt={`id-${activeItem.id}`}
                  />
                  <TransformLayer layer={activeItem["image-one"]} />
                  <TransformLayer layer={activeItem["image-two"]} />
                  <VideoOverlay movieFile={activeItem.movieFile} />
                  {activeItem["mask-img"] && (
                    <img
                      src={withBase(activeItem["mask-img"])}
                      alt={`id-${activeItem.id}-mask`}
                      className="mix"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="thumbs-outer-container">
            <div className="thumbs-inner-container">
              <Masonry
                breakpointCols={thumbsBreakpointCols}
                className="thumbs"
                columnClassName="thumbs-column"
              >
                {webItems.map((item) => (
                  <button
                    key={item.uid}
                    type="button"
                    className={`thumb-item${activeItem?.uid === item.uid ? " active" : ""}`}
                    style={
                      thumbHeights[item.uid]
                        ? { height: `${thumbHeights[item.uid]}px` }
                        : undefined
                    }
                    onClick={() => handleThumbSelect(item.uid)}
                  >
                    <span className="badge">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
                          fill="#9ACD32"
                        />
                        <path
                          d="M9.33333 19.3332L4 13.9998L6 11.9998L9.33333 15.3332L18 6.6665L20 8.6665L9.33333 19.3332Z"
                          fill="#000"
                        />
                      </svg>
                    </span>
                    <div
                      className="inner-slide"
                      ref={(node) => {
                        if (node) {
                          thumbSlideRefs.current.set(item.uid, node);
                        } else {
                          thumbSlideRefs.current.delete(item.uid);
                        }
                      }}
                    >
                      <img
                        className="base-img-001"
                        src={withBase(item["base-img"])}
                        alt={`id-${item.id}-thumb`}
                        loading="lazy"
                      />
                      <TransformLayer layer={item["image-one"]} />
                      <TransformLayer layer={item["image-two"]} />
                      <VideoOverlay
                        movieFile={item.movieFile}
                        autoPlay={false}
                      />
                      {item["mask-img"] && (
                        <img
                          src={withBase(item["mask-img"])}
                          alt={`id-${item.id}-mask`}
                          className="mix"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </button>
                ))}
              </Masonry>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
