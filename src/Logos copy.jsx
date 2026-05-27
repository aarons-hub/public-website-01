import { useEffect, useState } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import Perspective from "perspectivejs";
import "swiper/css";
import "swiper/css/navigation";
import "./Style.scss";

function drawPerspective(canvasId, src, coords, width, height) {
  const canvas = document.querySelector(`[data-cid="${canvasId}"]`);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Guard against image-load races when users click quickly between slides.
  const drawNonce = String((Number(canvas.dataset.drawNonce || "0") || 0) + 1);
  canvas.dataset.drawNonce = drawNonce;

  const parentRect = canvas.parentElement?.getBoundingClientRect();
  const nextWidth = Math.max(1, Math.round(parentRect?.width || width));
  const nextHeight = Math.max(1, Math.round(parentRect?.height || height));
  const dpr = window.devicePixelRatio || 1;

  const img = new Image();
  img.src = src;
  img.onload = () => {
    if (canvas.dataset.drawNonce !== drawNonce) return;

    canvas.style.width = `${nextWidth}px`;
    canvas.style.height = `${nextHeight}px`;
    canvas.width = Math.max(1, Math.round(nextWidth * dpr));
    canvas.height = Math.max(1, Math.round(nextHeight * dpr));

    // Clear using identity transform, then switch to CSS-pixel space.
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const scaleX = nextWidth / width;
    const scaleY = nextHeight / height;
    const scaledCoords = coords.map(([x, y]) => [x * scaleX, y * scaleY]);

    new Perspective(ctx, img).draw(scaledCoords);
  };
}

function Logos() {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState("");
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    fetch("/data/logo-data.json")
      .then((res) => res.json())
      .then((data) => {
        const groupedData = Array.isArray(data)
          ? [{ name: "Default", items: data }]
          : data.groups || [];
        const defaultGroup = data.defaultGroup || groupedData[0]?.name || "";
        setGroups(groupedData);
        setActiveGroup(defaultGroup);
      });
  }, []);

  useEffect(() => {
    if (!activeGroup) return;
    const selected = groups.find((group) => group.name === activeGroup);
    const nextItems = selected?.items || [];
    setItems(nextItems);
    setActiveItem(nextItems[0] || null);
  }, [groups, activeGroup]);

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

    // Defer initial draw to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      onResize();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", onResize);
    };
  }, [activeItem, items]);

  useEffect(() => {
    if (items.length === 0) return;

    const swiper = new Swiper(".swiper", {
      slidesPerView: 3.2,
      spaceBetween: 20,
      modules: [Navigation],
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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
        <div className="wrapper-outer">
          {activeItem && (
            <div className="wrapper">
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
              <img src={activeItem["mask-img"]} alt="" className="mix" />
            </div>
          )}

          <div className="swiper-wrapper-outer">
            <div className="swiper">
              <div className="swiper-wrapper">
                {items.map((item, i) => {
                  const base = i * 2 + 3;
                  return (
                    <div
                      key={`${activeGroup}-${item.id}-${i}`}
                      className="swiper-slide"
                      onClick={() => setActiveItem(item)}
                    >
                      <img
                        className="base-img-001"
                        src={item["base-img"]}
                        alt=""
                      />
                      <canvas data-cid={`c${base}`}></canvas>
                      <canvas data-cid={`c${base + 1}`}></canvas>
                      <img src={item["mask-img"]} alt="" className="mix" />
                    </div>
                  );
                })}
              </div>

              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>

          <div className="tiles">
            {groups.map((group) => {
              const thumbnail =
                group.thumbnail || group.items?.[0]?.["base-img"] || "";
              return (
                <button
                  key={group.name}
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
                  <div className="tile-copy">
                    <h3 className="name">{group.name}</h3>
                    <p className="count">{group.items?.length || 0} items</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <video autoPlay muted loop playsInline>
          <source src="./public/images/vid.mp4" type="video/mp4" />
        </video>
      </section>
    </>
  );
}

export default Logos;
