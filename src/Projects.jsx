import { useEffect, useMemo, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

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

function VideoOverlay({
  movieFile,
  autoPlay = true,
  useStaticThumbnail = false,
  thumbnailSrc = "",
}) {
  if (!movieFile?.src) return null;

  if (useStaticThumbnail) {
    const resolvedThumbnail = thumbnailSrc || movieFile.thumbnail || "";
    if (!resolvedThumbnail) return null;

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
        <img
          src={withBase(resolvedThumbnail)}
          alt=""
          className="item-video-thumb"
          loading="lazy"
        />
      </div>
    );
  }

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
      console.warn(`[Projects] data load attempt failed: ${url}`, error);
    }
  }

  const reason =
    lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Unable to load ${requestedPath}. Last failure: ${reason}`);
}

function Projects() {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeItemId, setActiveItemId] = useState(null);
  const swiperRootRef = useRef(null);
  const swiperPrevRef = useRef(null);
  const swiperNextRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const heroWrapperRef = useRef(null);
  const swiperWrapperOuterRef = useRef(null);

  const categories = useMemo(() => {
    const nextCategories = new Set();

    groups.forEach((group) => {
      group.items?.forEach((item) => {
        if (item.category) nextCategories.add(item.category);
      });
    });

    return ["All", ...nextCategories];
  }, [groups]);

  const groupMatchesCategory = (group, category) => {
    if (category === "All") return true;
    return group.items?.some((item) => item.category === category);
  };

  const getFilteredItems = (groupName, category) => {
    const selectedGroup = groups.find((group) => group.name === groupName);
    const nextItems = selectedGroup?.items || [];

    if (category === "All") return nextItems;
    return nextItems.filter((item) => item.category === category);
  };

  const getFirstMatchingItemId = (groupName, category) => {
    return getFilteredItems(groupName, category)[0]?.id ?? null;
  };

  const items = getFilteredItems(activeGroup, activeCategory);

  const activeItem = useMemo(() => {
    if (!items.length) return null;
    return items.find((item) => item.id === activeItemId) || items[0];
  }, [items, activeItemId]);

  const handleGroupChange = (groupName) => {
    setActiveGroup(groupName);
    setActiveItemId(getFirstMatchingItemId(groupName, activeCategory));
  };

  const handleCategoryChange = (category) => {
    const nextVisibleGroups = groups.filter((group) =>
      groupMatchesCategory(group, category),
    );
    const nextActiveGroup = nextVisibleGroups.some(
      (group) => group.name === activeGroup,
    )
      ? activeGroup
      : nextVisibleGroups[0]?.name || "";

    setActiveCategory(category);
    setActiveGroup(nextActiveGroup);
    setActiveItemId(getFirstMatchingItemId(nextActiveGroup, category));
  };

  useEffect(() => {
    loadProjectsData()
      .then(({ data }) => {
        const nextGroups = Array.isArray(data)
          ? [{ name: "Default", items: data }]
          : data.groups || [];
        const defaultGroup = data.defaultGroup || nextGroups[0]?.name || "";
        const defaultGroupItems =
          nextGroups.find((group) => group.name === defaultGroup)?.items || [];

        setGroups(nextGroups);
        setActiveGroup(defaultGroup);
        setActiveItemId(defaultGroupItems[0]?.id ?? null);
      })
      .catch((err) => {
        console.error("[Projects] data fetch error:", {
          message: err instanceof Error ? err.message : String(err),
          appBase,
          location: window.location.href,
        });
      });
  }, []);

  useEffect(() => {
    if (!items.length || !swiperRootRef.current) return undefined;

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }

    swiperInstanceRef.current = new Swiper(swiperRootRef.current, {
      modules: [Navigation, Autoplay],
      slidesPerView: 3.5,
      spaceBetween: 12,
      slidesOffsetAfter: 20,
      speed: 3000,
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      navigation: {
        enabled: false,
        nextEl: swiperNextRef.current,
        prevEl: swiperPrevRef.current,
      },
      breakpoints: {
        640: {
          slidesPerView: 3.5,
          spaceBetween: 16,
          slidesOffsetAfter: 40,
        },
        1024: {
          slidesPerView: 4.5,
          spaceBetween: 20,
          slidesOffsetAfter: 100,
        },
      },
    });

    return () => {
      swiperInstanceRef.current?.destroy(true, true);
      swiperInstanceRef.current = null;
    };
  }, [items]);

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
  }, [activeItem?.id]);

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
      <section ref={section} className="projects-hero">
        <div className="col left">
          <h1 className="med-heading mt20">Projects</h1>
          <div className="item-details">
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
          <div ref={heroWrapperRef} className="hero-outer">
            {activeItem && (
              <div
                className="hero-wrapper"
                key={`${activeGroup}-${activeItem.id}`}
              >
                <img
                  src={withBase(activeItem["base-img"])}
                  alt={activeItem.title}
                />
                <TransformLayer layer={activeItem["image-one"]} />
                <TransformLayer layer={activeItem["image-two"]} />
                <VideoOverlay movieFile={activeItem.movieFile} />
                {activeItem["mask-img"] && (
                  <img
                    src={withBase(activeItem["mask-img"])}
                    alt={`${activeItem.id} mask`}
                    className="mix"
                  />
                )}
              </div>
            )}
          </div>
          <div className="swiper-wrapper-outer" ref={swiperWrapperOuterRef}>
            <div className="swiper" ref={swiperRootRef}>
              <div className="swiper-wrapper">
                {items.map((item, index) => (
                  <div
                    key={`${activeGroup}-${item.id}-${index}`}
                    className={`swiper-slide${activeItem?.id === item.id ? " active" : ""}`}
                    onClick={() => setActiveItemId(item.id)}
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
                    <div className="inner-slide">
                      <img
                        className="base-img-001"
                        src={withBase(item["base-img"])}
                        alt={item.id}
                      />
                      <TransformLayer layer={item["image-one"]} />
                      <TransformLayer layer={item["image-two"]} />
                      <VideoOverlay
                        movieFile={item.movieFile}
                        autoPlay={false}
                        useStaticThumbnail
                        thumbnailSrc={
                          item.movieFile?.thumbnail ||
                          item["image-one"]?.src ||
                          item["base-img"] ||
                          ""
                        }
                      />
                      {item["mask-img"] && (
                        <img
                          src={withBase(item["mask-img"])}
                          alt={`${item.id} mask`}
                          className="mix"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="swiper-button-prev" ref={swiperPrevRef}></div>
              <div className="swiper-button-next" ref={swiperNextRef}></div>
            </div>
          </div>
        </div>
      </section>
      <section className="partners-section">
        <div className="partners-inner">
          <div className="row">
            <h3 className="heading">Partners</h3>
          </div>
          <div className="tiles-wrapper">
            <div className="tiles">
              {groups.map((group) => {
                const thumbnail =
                  group.thumbnail || group.items?.[0]?.["base-img"] || "";
                const matchingItemCount =
                  activeCategory === "All"
                    ? group.items?.length || 0
                    : group.items?.filter(
                        (item) => item.category === activeCategory,
                      ).length || 0;
                const isHidden = !groupMatchesCategory(group, activeCategory);

                return (
                  <div
                    key={group.name}
                    className={`tile-card${isHidden ? " hideme" : ""}`}
                  >
                    <button
                      type="button"
                      className={`tile ${activeGroup === group.name ? "active" : ""}`}
                      onClick={() => handleGroupChange(group.name)}
                      aria-hidden={isHidden}
                      tabIndex={isHidden ? -1 : 0}
                    >
                      <span className="badge">
                        <svg
                          width="16"
                          height="16"
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
                      {thumbnail && (
                        <img
                          src={withBase(thumbnail)}
                          alt={group.name}
                          className="tile-thumb"
                        />
                      )}
                    </button>

                    <div className="tile-info">
                      <h3 className="name">{group.name}</h3>
                      <p className="count">{matchingItemCount} items</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row">
            <div className="filters">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`filter-button ${activeCategory === category ? "active" : ""}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;
