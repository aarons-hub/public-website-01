import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Apply magnetic effect to all matching children inside a container
export const useMagneticEffectForChildren = (
  childSelector = "a.nav-link",
  strength = 50,
  animateParentIfAnchor = true,
  additionalDeps = [],
) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Use GSAP matchMedia so this only runs for fine-pointer (mouse)
      // devices and screens wider than 540px. This avoids initializing
      // magnetic behavior on touch-first devices (iOS, Android).
      const mm = gsap.matchMedia();

      mm.add("(pointer: fine) and (min-width: 541px)", () => {
        const children = Array.from(container.querySelectorAll(childSelector));
        if (!children.length) return;

        const listeners = children.map((el) => {
          const animatedEl =
            animateParentIfAnchor && el.tagName === "A" && el.parentElement
              ? el.parentElement
              : el;

          const moveMagnet = (event) => {
            // Defensive: ignore non-mouse pointer types
            if (event.pointerType && event.pointerType !== "mouse") return;

            const rect = animatedEl.getBoundingClientRect();
            gsap.to(animatedEl, {
              duration: 1,
              x:
                ((event.clientX - rect.left) / animatedEl.offsetWidth - 0.5) *
                strength,
              y:
                ((event.clientY - rect.top) / animatedEl.offsetHeight - 0.5) *
                strength,
              ease: "power4.out",
            });
          };

          const resetMagnet = (event) => {
            const tgt = event.currentTarget || animatedEl;
            gsap.to(tgt, { duration: 1, x: 0, y: 0, ease: "power4.out" });
          };

          el.addEventListener("pointermove", moveMagnet);
          el.addEventListener("pointerleave", resetMagnet);

          return () => {
            el.removeEventListener("pointermove", moveMagnet);
            el.removeEventListener("pointerleave", resetMagnet);
          };
        });

        return () => listeners.forEach((off) => off());
      });

      return () => {
        try {
          mm.revert();
        } catch {
          // noop
        }
      };
    },
    {
      scope: containerRef,
      dependencies: [
        childSelector,
        strength,
        animateParentIfAnchor,
        ...additionalDeps,
      ],
    },
  );

  return containerRef;
};

// Ref-based button fill effect using GSAP scope
export const useButtonFillEffectWithRef = () => {
  const buttonRef = useRef(null);

  useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      const handleMouseEnter = () => {
        const fill = button.querySelector(".button-fill");

        if (fill) {
          gsap.killTweensOf(fill);
          gsap.fromTo(
            fill,
            { y: "120px" },
            {
              y: "0px",
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: "auto",
            },
          );
        }
      };

      const handleMouseLeave = () => {
        const fill = button.querySelector(".button-fill");

        if (fill) {
          gsap.killTweensOf(fill);
          gsap.to(fill, {
            y: "-120px",
            duration: 0.6,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup handled by useGSAP
      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: buttonRef },
  );

  return buttonRef;
};

// Button fill effect for multiple buttons (works like useMagneticEffectForChildren)
export const useButtonFillEffectForChildren = (
  buttonSelector = "button",
  duration = 0.6,
  additionalDeps = [],
) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const buttons = Array.from(container.querySelectorAll(buttonSelector));
      if (!buttons.length) return;

      const listeners = buttons.map((button) => {
        const handleMouseEnter = () => {
          const fill = button.querySelector(".button-fill");

          if (fill) {
            gsap.killTweensOf(fill);
            gsap.fromTo(
              fill,
              { y: "100%" },
              { y: "0%", duration, ease: "power2.inOut", overwrite: "auto" },
            );
          }
        };

        const handleMouseLeave = () => {
          const fill = button.querySelector(".button-fill");

          if (fill) {
            gsap.killTweensOf(fill);
            gsap.to(fill, {
              y: "-100%",
              duration,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          }
        };

        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          button.removeEventListener("mouseenter", handleMouseEnter);
          button.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

      // Cleanup all listeners
      return () => listeners.forEach((off) => off());
    },
    {
      scope: containerRef,
      dependencies: [buttonSelector, duration, ...additionalDeps],
    },
  );

  return containerRef;
};
