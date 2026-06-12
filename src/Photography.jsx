import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

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

function getPhotographyThumbnailItems(group) {
  const groupItems = group.items || [];

  const featuredByFlag = groupItems.filter(
    (item) =>
      item.featuredPhotoItem === true || item.featuredPhotoItem === "true",
  );
  return featuredByFlag;
}

async function loadProjectsData() {
  const requestedPath = "data/projects-data.json";
  const candidateUrls = [
    `${appBase}data/projects-data.json`,
    "/data/projects-data.json",
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
      console.warn(`[Photography] data load attempt failed: ${url}`, error);
    }
  }

  const reason =
    lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Unable to load ${requestedPath}. Last failure: ${reason}`);
}

function Photography() {
  const [groups, setGroups] = useState([]);
  const [activeThumbUid, setActiveThumbUid] = useState("");
  const swiperRootRef = useRef(null);
  const swiperPrevRef = useRef(null);
  const swiperNextRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const heroWrapperRef = useRef(null);
  const swiperWrapperOuterRef = useRef(null);
  const servicesListRef = useMagneticEffectForChildren(
    ".service-btn",
    20,
    false,
  );

  const photographyItems = useMemo(() => {
    return groups.flatMap((group) => {
      const selectedItems = getPhotographyThumbnailItems(group);

      return selectedItems.map((selectedItem, index) => ({
        ...selectedItem,
        groupName: group.name,
        groupThumbnail: group.thumbnail || selectedItem["base-img"] || "",
        uid: `${group.name}-${selectedItem.id}-${index}`,
      }));
    });
  }, [groups]);

  const activeItem = useMemo(() => {
    if (!photographyItems.length) return null;
    return (
      photographyItems.find((item) => item.uid === activeThumbUid) ||
      photographyItems[0]
    );
  }, [photographyItems, activeThumbUid]);

  useEffect(() => {
    loadProjectsData()
      .then(({ data }) => {
        const nextGroups = Array.isArray(data)
          ? [{ name: "Default", items: data }]
          : data.groups || [];

        setGroups(nextGroups);

        const initialPhotographyItems = nextGroups.flatMap((group) => {
          const selectedItems = getPhotographyThumbnailItems(group);

          return selectedItems.map((selectedItem, index) => ({
            ...selectedItem,
            groupName: group.name,
            groupThumbnail: group.thumbnail || selectedItem["base-img"] || "",
            uid: `${group.name}-${selectedItem.id}-${index}`,
          }));
        });

        setActiveThumbUid(initialPhotographyItems[0]?.uid ?? "");
      })
      .catch((err) => {
        console.error("[Photography] data fetch error:", {
          message: err instanceof Error ? err.message : String(err),
          appBase,
          location: window.location.href,
        });
      });
  }, []);

  useEffect(() => {
    if (!photographyItems.length || !swiperRootRef.current) return undefined;

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }

    swiperInstanceRef.current = new Swiper(swiperRootRef.current, {
      modules: [Navigation, Autoplay],
      slidesPerView: 3.5,
      spaceBetween: 12,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 20,
      speed: 600,
      loop: false,
      autoplay: {
        enabled: false,
        delay: 0,
        disableOnInteraction: false,
      },
      navigation: {
        enabled: true,
        nextEl: swiperNextRef.current,
        prevEl: swiperPrevRef.current,
      },
      breakpoints: {
        640: {
          slidesPerView: 3.5,
          spaceBetween: 16,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 20,
        },
        1024: {
          slidesPerView: 4.5,
          spaceBetween: 20,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 20,
        },
      },
    });

    return () => {
      swiperInstanceRef.current?.destroy(true, true);
      swiperInstanceRef.current = null;
    };
  }, [photographyItems]);

  useEffect(() => {
    let animationFrameId = 0;

    const syncSwiperOuterWidth = () => {
      const heroWrapperEl = heroWrapperRef.current;
      const swiperOuterEl = swiperWrapperOuterRef.current;
      if (!heroWrapperEl || !swiperOuterEl) return false;

      const heroWidth = heroWrapperEl.getBoundingClientRect().width;
      if (heroWidth > 0) {
        swiperOuterEl.style.width = `${heroWidth}px`;
        return true;
      }

      return false;
    };

    const syncWidthWithRetry = (attempt = 0) => {
      const applied = syncSwiperOuterWidth();
      if (applied || attempt >= 8) return;

      animationFrameId = window.requestAnimationFrame(() => {
        syncWidthWithRetry(attempt + 1);
      });
    };

    const handleResize = () => {
      syncWidthWithRetry();
      swiperInstanceRef.current?.update();
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            syncSwiperOuterWidth();
            swiperInstanceRef.current?.update();
          })
        : null;

    if (heroWrapperRef.current && resizeObserver) {
      resizeObserver.observe(heroWrapperRef.current);
    }

    syncWidthWithRetry();
    window.addEventListener("resize", handleResize);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  return (
    <>
      <Helmet>
        <title>Photography | Aaronline Design</title>
        <meta
          name="description"
          content="Explore Aaronline Design's photography services in Brisbane, capturing powerful and persuasive images for your brand."
        />
        <link
          rel="canonical"
          href="https://aaronlinedesign.au/services/photography"
        />
      </Helmet>
      <section ref={section} className="photography pb40">
        <div className="col left">
          <h1 className="med-heading mt10">Services</h1>
          <h2>Photography</h2>
          <p>Not pretty pictures but powerful persuaders.</p>
          <p>
            We believe great photography does both. Our product images are
            crafted to stop the scroll, build trust, and give your customers
            every reason to say yes.
          </p>
          <div ref={servicesListRef} className="services-list">
            <Link to="/services/web-services" className="service-btn">
              Web services
            </Link>
            <Link to="/services/logo-design" className="service-btn">
              Logo design
            </Link>
            <Link to="/services/photography" className="service-btn active">
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
            <div ref={heroWrapperRef} className="hero-outer">
              {activeItem && (
                <div className="hero-wrapper" key={activeItem.uid}>
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
          <div ref={swiperWrapperOuterRef} className="swiper-wrapper-outer">
            <div className="swiper swiperOneThumbs" ref={swiperRootRef}>
              <div className="swiper-wrapper">
                {photographyItems.map((item) => (
                  <div
                    key={item.uid}
                    className={`swiper-slide${activeItem?.uid === item.uid ? " active" : ""}`}
                    onClick={() => setActiveThumbUid(item.uid)}
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
                          fill="#9acd32"
                        />
                        <path
                          d="M9.33333 19.3332L4 13.9998L6 11.9998L9.33333 15.3332L18 6.6665L20 8.6665L9.33333 19.3332Z"
                          fill="#000"
                        />
                      </svg>
                    </span>
                    <div className="inner-slide">
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
                  </div>
                ))}
              </div>
              <div className="swiper-btns">
                <div className="swiper-button-prev" ref={swiperPrevRef}></div>
                <div className="swiper-button-next" ref={swiperNextRef}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Photography;
