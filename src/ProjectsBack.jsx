import { useEffect, useMemo, useState } from "react";
import Perspective from "perspectivejs";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function drawPerspective(canvasId, src, coords, width, height) {
  const canvas = document.querySelector(`[data-cid="${canvasId}"]`);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.src = src;
  img.onload = () => {
    const rect = canvas.getBoundingClientRect();
    const parentRect = canvas.parentElement?.getBoundingClientRect();
    const nextWidth = Math.max(1, rect.width || parentRect?.width || width);
    const nextHeight = Math.max(1, rect.height || parentRect?.height || height);

    canvas.style.width = `${nextWidth}px`;
    canvas.style.height = `${nextHeight}px`;
    canvas.width = nextWidth;
    canvas.height = nextHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const scaleX = nextWidth / width;
    const scaleY = nextHeight / height;
    const scaledCoords = coords.map(([x, y]) => [x * scaleX, y * scaleY]);

    new Perspective(ctx, img).draw(scaledCoords);
  };
}

function VideoOverlay({ video, draw, refWidth, refHeight, autoPlay = true }) {
  if (!video?.src || !draw?.length) return null;
  const [top, right, bottom, left] = draw[0];

  // For swiper-slide, use screenshot image instead of video
  const screenshotSrc = autoPlay ? null : video.screenshot;

  return (
    <div
      className="video-wrapper"
      style={{
        top: `${(top / refHeight) * 100}%`,
        right: `${(right / refWidth) * 100}%`,
        bottom: `${(bottom / refHeight) * 100}%`,
        left: `${(left / refWidth) * 100}%`,
      }}
    >
      {screenshotSrc ? (
        <img
          src={screenshotSrc}
          alt="video screenshot"
          className="item-video"
        />
      ) : (
        <video
          key={video.src}
          className="item-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video.src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

function ProjectsBak() {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState("");
  const [activeItemId, setActiveItemId] = useState(null);

  const items = useMemo(() => {
    const selectedGroup = groups.find((group) => group.name === activeGroup);
    return selectedGroup?.items || [];
  }, [groups, activeGroup]);

  const activeItem = useMemo(() => {
    if (items.length === 0) return null;
    return items.find((item) => item.id === activeItemId) || items[0] || null;
  }, [items, activeItemId]);

  useEffect(() => {
    fetch("/data/logo-data.json")
      .then((res) => {
        if (!res.ok)
          throw new Error(
            `Failed to load data: ${res.status} ${res.statusText}`,
          );
        return res.json();
      })
      .then((data) => {
        const groupedData = Array.isArray(data)
          ? [{ name: "Default", items: data }]
          : data.groups || [];
        const defaultGroup = data.defaultGroup || groupedData[0]?.name || "";
        setGroups(groupedData);
        setActiveGroup(defaultGroup);
      })
      .catch((err) => console.error("[Logos] data fetch error:", err));
  }, []);

  useEffect(() => {
    if (!activeItem && items.length === 0) return;

    const redraw = () => {
      if (activeItem) {
        drawPerspective(
          `c-${activeItem.id}-1`,
          activeItem["image-one"].src,
          activeItem["image-one"].draw,
          900,
          640,
        );
        drawPerspective(
          `c-${activeItem.id}-2`,
          activeItem["image-two"].src,
          activeItem["image-two"].draw,
          900,
          640,
        );
      }

      items.forEach((item, i) => {
        const base = i * 2 + 3;
        drawPerspective(
          `c${base}`,
          item["image-one"].src,
          item["image-one"]["draw-slide"],
          268,
          190,
        );
        drawPerspective(
          `c${base + 1}`,
          item["image-two"].src,
          item["image-two"]["draw-slide"],
          268,
          190,
        );
      });
    };

    const onResize = () => {
      window.requestAnimationFrame(redraw);
    };

    window.addEventListener("resize", onResize);

    const timeoutId = setTimeout(redraw, 0);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", onResize);
    };
  }, [activeItem, items]);

  useEffect(() => {
    if (items.length === 0) return;

    const swiper = new Swiper(".swiper", {
      modules: [Navigation],

      // default = mobile first
      slidesPerView: 2.2,
      spaceBetween: 12,
      slidesOffsetAfter: 20,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        640: {
          slidesPerView: 2.2,
          spaceBetween: 16,
          slidesOffsetAfter: 40,
        },
        1024: {
          slidesPerView: 3.3,
          spaceBetween: 20,
          slidesOffsetAfter: 100,
        },
      },
    });

    // Slide canvases — one pair per item
    items.forEach((item, i) => {
      const base = i * 2 + 3;
      drawPerspective(
        `c${base}`,
        item["image-one"].src,
        item["image-one"]["draw-slide"],
        270,
        203,
      );
      drawPerspective(
        `c${base + 1}`,
        item["image-two"].src,
        item["image-two"]["draw-slide"],
        270,
        203,
      );
    });

    return () => {
      swiper.destroy();
    };
  }, [items]);

  return (
    <>
      <section>
        <div className="col left">
          <h1 className="med-heading">Projects</h1>
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
        <div className="col right">
          <div className="section-inner">
            {activeItem && (
              <div className="hero-wrapper">
                <img
                  src={activeItem["base-img"]}
                  alt={activeItem.title}
                  onLoad={() => {
                    drawPerspective(
                      `c-${activeItem.id}-1`,
                      activeItem["image-one"].src,
                      activeItem["image-one"].draw,
                      900,
                      640,
                    );
                    drawPerspective(
                      `c-${activeItem.id}-2`,
                      activeItem["image-two"].src,
                      activeItem["image-two"].draw,
                      900,
                      640,
                    );
                  }}
                />
                <canvas data-cid={`c-${activeItem.id}-1`}></canvas>
                <canvas data-cid={`c-${activeItem.id}-2`}></canvas>
                <VideoOverlay
                  video={activeItem.video}
                  draw={activeItem.video?.draw}
                  refWidth={900}
                  refHeight={640}
                />
                <img src={activeItem["mask-img"]} alt="" className="mix" />
              </div>
            )}
          </div>

          <div className="swiper-wrapper-outer">
            <div className="swiper">
              <div className="swiper-wrapper">
                {items.map((item, i) => {
                  const base = i * 2 + 3;
                  return (
                    <div
                      key={`${activeGroup}-${item.id}-${i}`}
                      className={`swiper-slide${activeItem === item ? " active" : ""}`}
                      onClick={() => setActiveItemId(item.id)}
                    >
                      <div className="inner-slide">
                        <img
                          className="base-img-001"
                          src={item["base-img"]}
                          alt=""
                        />
                        <canvas data-cid={`c${base}`}></canvas>
                        <canvas data-cid={`c${base + 1}`}></canvas>
                        <VideoOverlay
                          video={item.video}
                          draw={item.video?.["draw-slide"]}
                          refWidth={268}
                          refHeight={190}
                          autoPlay={false}
                        />
                        <img src={item["mask-img"]} alt="" className="mix" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="partners-section">
        <div className="col left">
          <h3 className="heading">Partners</h3>
        </div>
        <div className="col right tiles-wrapper">
          <div className="tiles">
            {groups.map((group) => {
              const thumbnail =
                group.thumbnail || group.items?.[0]?.["base-img"] || "";

              return (
                <div key={group.name} className="tile-card">
                  <button
                    type="button"
                    className={`tile ${activeGroup === group.name ? "active" : ""}`}
                    onClick={() => setActiveGroup(group.name)}
                  >
                    {thumbnail && (
                      <img
                        src={thumbnail}
                        alt={group.name}
                        className="tile-thumb"
                      />
                    )}
                  </button>

                  <div className="tile-info">
                    <h3 className="name">{group.name}</h3>
                    <p className="count">{group.items?.length || 0} items</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProjectsBak;
