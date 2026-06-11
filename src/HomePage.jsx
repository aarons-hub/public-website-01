import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

import {
  useMagneticEffectForChildren,
  useButtonFillEffectForChildren,
} from "./hooks/buttonEffects";

const GA_MEASUREMENT_ID = "G-56ZJCW1W79";

const appBase = import.meta.env.BASE_URL;
const isDev = import.meta.env.DEV;
const PAUSE_SWIPER_AUTOPLAY_IN_DEV = false;

function HomePage() {
  const ctaRef = useMagneticEffectForChildren(".magnetic-btn", 40, false);
  const ctaFillRef = useButtonFillEffectForChildren(".magnetic-btn", 0.6);
  const ctaTextRef = useMagneticEffectForChildren(
    ".magnetic-btn-text",
    20,
    false,
  );
  const submitBtnRef = useMagneticEffectForChildren(
    ".magnetic-submit, .magnetic-submit-text",
    40,
    false,
  );
  const submitFillRef = useButtonFillEffectForChildren(".magnetic-submit", 0.6);
  const location = useLocation();
  const formRef = useRef();
  const [done, setDone] = useState(false);
  const scrollContactFormRef = useRef();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: `${location.pathname}${location.search}${location.hash}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  const handleContactBtnClick = (e) => {
    e.preventDefault();
    scrollContactFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_g21pr8h", "template_4m4a8ys", formRef.current, {
        publicKey: "WEnSV56Aows6oYiBB",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setDone(true);
          toast.success("Message sent successfully!");
          formRef.current.reset();

          setTimeout(() => setDone(false), 5000);
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send message. Try again later.");
        },
      );
  };

  const stage = useRef();
  const img01 = useRef();
  const img02 = useRef();
  const img03 = useRef();
  const img04 = useRef();

  useEffect(() => {
    if (!stage.current) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(img01.current, {
        filter: "blur(30px)",
        scale: 0.1,
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
        .from(
          [img02.current, img03.current, img04.current],
          {
            scale: 0.1,
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.3,
          },
          "-=0.5",
        )
        .to(
          [img02.current, img03.current, img04.current],
          {
            scale: 1.0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
          },
          "-=0.2",
        )
        .to(
          stage.current,
          {
            borderColor: "transparent",
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5",
        );
    }, stage.current);

    return () => ctx.revert();
  }, []);

  const intro = useRef();
  const heading01 = useRef();
  const subheading = useRef();
  const ctaWrapper = useRef();
  const featured = useRef();
  const featuredSwiper = useRef();
  const contactForm = useRef();

  useEffect(() => {
    if (!intro.current) return undefined;

    const ctx = gsap.context(() => {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: intro.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl2
        .from(heading01.current, {
          filter: "blur(30px)",
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
        .from(
          subheading.current,
          {
            filter: "blur(30px)",
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .from(
          ctaWrapper.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .from(
          featured.current,
          {
            filter: "blur(30px)",
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .from(
          featuredSwiper.current,
          {
            filter: "blur(30px)",
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .from(
          contactForm.current,
          {
            filter: "blur(30px)",
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.3",
        );
    }, intro.current);

    return () => ctx.revert();
  }, []);

  const swiperRootRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const featuredSwiperInstanceRef = useRef(null);
  const swiperStageOne = useRef(null);
  const swiperStageTwo = useRef(null);
  const swiperStageThree = useRef(null);
  const stageOneSwiperInstanceRef = useRef(null);
  const stageTwoSwiperInstanceRef = useRef(null);
  const stageThreeSwiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!swiperRootRef.current) return undefined;

    const shouldAutoplay = !(isDev && PAUSE_SWIPER_AUTOPLAY_IN_DEV);
    const hasNavButtons = Boolean(prevRef.current && nextRef.current);

    if (featuredSwiperInstanceRef.current) {
      featuredSwiperInstanceRef.current.destroy(true, true);
      featuredSwiperInstanceRef.current = null;
    }

    featuredSwiperInstanceRef.current = new Swiper(swiperRootRef.current, {
      modules: [Navigation, Autoplay],
      autoplay: shouldAutoplay
        ? {
            delay: 0,
            disableOnInteraction: false,
          }
        : false,
      slidesPerView: 2.1,
      spaceBetween: 12,
      speed: 6000,
      loop: true,
      breakpoints: {
        480: {
          slidesPerView: 2.1,
          spaceBetween: 14,
        },
        768: {
          slidesPerView: 2.6,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 4.5,
          spaceBetween: 30,
        },
      },
      navigation: hasNavButtons
        ? {
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }
        : false,
    });

    return () => {
      featuredSwiperInstanceRef.current?.destroy(true, true);
      featuredSwiperInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!swiperStageOne.current) return undefined;

    const shouldAutoplay = !(isDev && PAUSE_SWIPER_AUTOPLAY_IN_DEV);

    if (stageOneSwiperInstanceRef.current) {
      stageOneSwiperInstanceRef.current.destroy(true, true);
      stageOneSwiperInstanceRef.current = null;
    }

    stageOneSwiperInstanceRef.current = new Swiper(swiperStageOne.current, {
      modules: [Autoplay],
      autoplay: shouldAutoplay
        ? {
            delay: 0,
            disableOnInteraction: true,
            reverseDirection: false,
          }
        : false,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 5000,
      loop: true,
      allowTouchMove: false,
    });

    return () => {
      stageOneSwiperInstanceRef.current?.destroy(true, true);
      stageOneSwiperInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!swiperStageTwo.current) return undefined;

    const shouldAutoplay = !(isDev && PAUSE_SWIPER_AUTOPLAY_IN_DEV);

    if (stageTwoSwiperInstanceRef.current) {
      stageTwoSwiperInstanceRef.current.destroy(true, true);
      stageTwoSwiperInstanceRef.current = null;
    }

    stageTwoSwiperInstanceRef.current = new Swiper(swiperStageTwo.current, {
      modules: [Autoplay],
      autoplay: shouldAutoplay
        ? {
            delay: 0,
            disableOnInteraction: true,
            reverseDirection: true,
          }
        : false,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 10000,
      loop: true,
      allowTouchMove: false,
    });

    return () => {
      stageTwoSwiperInstanceRef.current?.destroy(true, true);
      stageTwoSwiperInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!swiperStageThree.current) return undefined;

    const shouldAutoplay = !(isDev && PAUSE_SWIPER_AUTOPLAY_IN_DEV);

    if (stageThreeSwiperInstanceRef.current) {
      stageThreeSwiperInstanceRef.current.destroy(true, true);
      stageThreeSwiperInstanceRef.current = null;
    }

    stageThreeSwiperInstanceRef.current = new Swiper(swiperStageThree.current, {
      modules: [Autoplay],
      autoplay: shouldAutoplay
        ? {
            delay: 0,
            disableOnInteraction: true,
            reverseDirection: false,
          }
        : false,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 18000,
      loop: true,
      allowTouchMove: false,
    });

    return () => {
      stageThreeSwiperInstanceRef.current?.destroy(true, true);
      stageThreeSwiperInstanceRef.current = null;
    };
  }, []);

  return (
    <>
      <section ref={intro} className="hero-container">
        <div ref={heading01} className="heading">
          <h1 className="lg-heading mb20">
            <span className="opacity75">Your</span> website,
            <br />
            in <span className="opacity75">good</span> hands.
          </h1>
        </div>
        <div ref={subheading} className="subheading">
          <h2>
            We take care of your website,
            <span className="opacity75">
              &nbsp;so you can take&nbsp;care of your business
            </span>
            .
          </h2>
        </div>
        <div
          ref={(node) => {
            ctaRef.current = node;
            ctaFillRef.current = node;
          }}
          className="cta"
        >
          <div
            ref={(node) => {
              ctaWrapper.current = node;
              ctaTextRef.current = node;
            }}
            className="cta-wrapper"
          >
            <Link
              to="/projects"
              className="btn hero-btn projects-btn magnetic-btn js-fill"
            >
              <span className="btn-text magnetic-btn-text">View projects</span>
              <div className="button-fill"></div>
            </Link>
            <a
              href="#contact-form"
              className="btn hero-btn contact-btn magnetic-btn js-fill"
              onClick={handleContactBtnClick}
            >
              <span className="btn-text magnetic-btn-text">Get in touch</span>

              <div className="button-fill"></div>
            </a>
          </div>
        </div>
        <div ref={stage} className="stage">
          <img
            ref={img01}
            className="stage-img-01"
            src={`${appBase}homepage-images/iphone-001.png`}
            loading="lazy"
            alt="Decorative image"
          />
          <div className="stageContainer stageOneContainer" ref={img02}>
            <div className="swiper stage-one-swiper" ref={swiperStageOne}>
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="row align">
                    <div className="col icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12.84 9.78L11.42 8.36C12.11 7.68 13 7.02 14.36 6.57L14.85 8.51C13.96 8.83 13.35 9.28 12.84 9.78ZM18 11L22 7L18 3L18 6.02C17.19 6.04 16.46 6.1 15.83 6.21L16.32 8.15C16.8 8.08 17.37 8.03 18 8.02L18 11ZM18 21L22 17L18 13L18 15.99C14.32 15.89 13.25 14.71 12.12 13.45C11.68 12.95 11.2 12.44 10.57 12C11.06 11.66 11.45 11.27 11.81 10.87L10.4 9.46C9.55 10.39 8.86 11 7 11L2 11L2 13L7 13C9.02 13 9.66 13.71 10.63 14.79C11.87 16.17 13.41 17.87 18 17.99L18 21V21Z"
                          fill="#323232"
                        />
                      </svg>
                    </div>
                    <div className="col title">
                      <h3>Reports - Traffic sources</h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col card">
                      <p>Organic</p>
                      <h2>74%</h2>
                    </div>
                    <div className="col card">
                      <p>Referral</p>
                      <h2>18%</h2>
                    </div>
                    <div className="col card">
                      <p>Direct</p>
                      <h2>8%</h2>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row align">
                    <div className="col icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 12C10.93 12 12.5 10.43 12.5 8.5C12.5 6.57 10.93 5 9 5C7.07 5 5.5 6.57 5.5 8.5C5.5 10.43 7.07 12 9 12ZM9 7C9.83 7 10.5 7.67 10.5 8.5C10.5 9.33 9.83 10 9 10C8.17 10 7.5 9.33 7.5 8.5C7.5 7.67 8.17 7 9 7ZM9.05 17H4.77C5.76 16.5 7.47 16 9 16C9.11 16 9.23 16.01 9.34 16.01C9.68 15.28 10.27 14.68 10.98 14.2C10.25 14.07 9.56 14 9 14C6.66 14 2 15.17 2 17.5V19H9V17.5C9 17.33 9.02 17.16 9.05 17ZM16.5 14.5C14.66 14.5 11 15.51 11 17.5V19H22V17.5C22 15.51 18.34 14.5 16.5 14.5ZM17.71 12.68C18.47 12.25 19 11.44 19 10.5C19 9.12 17.88 8 16.5 8C15.12 8 14 9.12 14 10.5C14 11.44 14.53 12.25 15.29 12.68C15.65 12.88 16.06 13 16.5 13C16.94 13 17.35 12.88 17.71 12.68Z"
                          fill="#323232"
                        />
                      </svg>
                    </div>
                    <div className="col title">
                      <h3>Reports - Visitors</h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col card">
                      <p>Visitors</p>
                      <h2>18,340</h2>
                    </div>
                    <div className="col card">
                      <p>Avg. time</p>
                      <h2>3m 42s</h2>
                    </div>
                    <div className="col card">
                      <p>CVR</p>
                      <h2>6.1%</h2>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row align">
                    <div className="col icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 9.2H8V19H5V9.2ZM10.6 5H13.4V19H10.6V5V5ZM16.2 13H19V19H16.2V13Z"
                          fill="#323232"
                        />
                      </svg>
                    </div>
                    <div className="col title">
                      <h3>Reports - Analytics</h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col card">
                      <p>Views</p>
                      <h2>12,480</h2>
                    </div>
                    <div className="col card">
                      <p>Sessions</p>
                      <h2>9,200</h2>
                    </div>
                    <div className="col card">
                      <p>Bounce rate</p>
                      <h2>32%</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="stageContainer stageTwoContainer" ref={img03}>
            <div className="swiper stage-two-swiper" ref={swiperStageTwo}>
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="row align">
                    <h3>SEO audit complete</h3>
                  </div>
                  <div className="row">
                    <p>Jan 24</p>
                  </div>
                  <div className="row pill">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <circle cx="3" cy="3" r="3" fill="#5F5E5A" />
                    </svg>
                    <p className="completed">Done</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row align">
                    <h3>New feature brief</h3>
                  </div>
                  <div className="row">
                    <p>Jan 28</p>
                  </div>
                  <div className="row pill">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <circle cx="3" cy="3" r="3" fill="#185fa5" />
                    </svg>
                    <p className="in-review">In review</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row align">
                    <h3>Client onboarding call</h3>
                  </div>
                  <div className="row">
                    <p>Tomorrow</p>
                  </div>
                  <div className="row pill">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <circle cx="3" cy="3" r="3" fill="#854F0B" />
                    </svg>
                    <p className="medium-priority">Medium priority</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row align">
                    <h3>Redesign landing page</h3>
                  </div>
                  <div className="row">
                    <p>Due Friday</p>
                  </div>
                  <div className="row pill">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <circle cx="3" cy="3" r="3" fill="#A32D2D" />
                    </svg>
                    <p className="in-progress">In progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="stageContainer stageThreeContainer" ref={img04}>
            <div className="swiper stage-three-swiper" ref={swiperStageThree}>
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="row">
                    <div className="col icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3.5 18.49L9.5 12.48L13.5 16.48L22 6.92001L20.59 5.51001L13.5 13.48L9.5 9.48001L2 16.99L3.5 18.49Z"
                          fill="#323232"
                        />
                      </svg>
                    </div>
                    <div className="col title">
                      <h3>Revenue</h3>
                    </div>
                    <div className="col value">
                      <h2>+61%</h2>
                      <p>Month over month</p>
                    </div>
                  </div>
                  <div className="row mt10">
                    <p className="pill">Upsells</p>
                    <p className="pill">Renewals</p>
                    <p className="pill">New clients</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row">
                    <div className="col icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3.5 18.49L9.5 12.48L13.5 16.48L22 6.92001L20.59 5.51001L13.5 13.48L9.5 9.48001L2 16.99L3.5 18.49Z"
                          fill="#323232"
                        />
                      </svg>
                    </div>
                    <div className="col title">
                      <h3>Revenue</h3>
                    </div>
                    <div className="col value">
                      <h2>+61%</h2>
                      <p>Month over month</p>
                    </div>
                  </div>
                  <div className="row mt10">
                    <p className="pill">Upsells</p>
                    <p className="pill">Renewals</p>
                    <p className="pill">New clients</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row">
                    <div className="col icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3.5 18.49L9.5 12.48L13.5 16.48L22 6.92001L20.59 5.51001L13.5 13.48L9.5 9.48001L2 16.99L3.5 18.49Z"
                          fill="#323232"
                        />
                      </svg>
                    </div>
                    <div className="col title">
                      <h3>Revenue</h3>
                    </div>
                    <div className="col value">
                      <h2>+61%</h2>
                      <p>Month over month</p>
                    </div>
                  </div>
                  <div className="row mt10">
                    <p className="pill">Upsells</p>
                    <p className="pill">Renewals</p>
                    <p className="pill">New clients</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row">
                    <div className="col icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3.5 18.49L9.5 12.48L13.5 16.48L22 6.92001L20.59 5.51001L13.5 13.48L9.5 9.48001L2 16.99L3.5 18.49Z"
                          fill="#323232"
                        />
                      </svg>
                    </div>
                    <div className="col title">
                      <h3>Revenue</h3>
                    </div>
                    <div className="col value">
                      <h2>+61%</h2>
                      <p>Month over month</p>
                    </div>
                  </div>
                  <div className="row mt10">
                    <p className="pill">Upsells</p>
                    <p className="pill">Renewals</p>
                    <p className="pill">New clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={featured} className="featured">
        <div className="row">
          <div className="col">
            <h4 className="mt50">EXPERTISE</h4>
          </div>
          <div className="col">
            <h1 className="med-heading mt50 mb30">
              One team. <br />
              Every solution.
            </h1>
            <h2 className="mb60 fw400">
              Brisbane web designer helping small businesses build fast, modern
              websites that convert visitors into customers.
            </h2>
          </div>
        </div>
      </section>

      <section ref={featuredSwiper} className="featured-swiper">
        <div className="section-inner">
          <div className="swiper home-swiper" ref={swiperRootRef}>
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="container one">
                  <div className="content">
                    <img
                      src={`${appBase}homepage-images/lime-web-002-thumb.png`}
                      loading="lazy"
                      alt="Swiper slide 1"
                    />
                  </div>
                  <div className="description">
                    <h3>Web design</h3>
                    <p>
                      Professional, mobile-friendly websites built to impress
                      your customers from the very first click.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="container two">
                  <div className="content">
                    <img
                      src={`${appBase}images/web-reporting.jpg`}
                      loading="lazy"
                      alt="Swiper slide 2"
                    />
                  </div>
                  <div className="description">
                    <h3>Data Studio reporting</h3>
                    <p>
                      Monthly reports give you an overview of your website's
                      performance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="container three">
                  <div className="content">
                    <img
                      src={`${appBase}images/wordpress.jpg`}
                      loading="lazy"
                      alt="Swiper slide 4"
                    />
                  </div>
                  <div className="description">
                    <h3>WordPress experts</h3>
                    <p>
                      WordPress gives your website the speed, flexibility, and
                      reliability it needs — we just make sure it's set up
                      right.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="container four">
                  <div className="content">
                    <img
                      src={`${appBase}images/updates-tile.jpg`}
                      loading="lazy"
                      alt="Swiper slide 5"
                    />
                  </div>
                  <div className="description">
                    <h3>Content management</h3>
                    <p>
                      Need a refresh? We'll update your text, images, and pages
                      quickly so your site stays current.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="container six">
                  <div className="content">
                    <img
                      src={`${appBase}images/responsive.jpg`}
                      loading="lazy"
                      alt="Swiper slide 6"
                    />
                  </div>
                  <div className="description">
                    <h3>Responsive optimization</h3>
                    <p>
                      We make sure your site looks and works perfectly on every
                      device.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="container seven">
                  <div className="content">
                    <img
                      src={`${appBase}images/on-brand.jpg`}
                      loading="lazy"
                      alt="Swiper slide 7"
                    />
                  </div>
                  <div className="description">
                    <h3>On brand</h3>
                    <p>
                      We make sure your website honours your corporate image.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="container eight">
                  <div className="content">
                    <video
                      className="video"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source
                        src={`${appBase}images/hydromet-web-001.mp4`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <div className="description">
                    <h3>Web development</h3>
                    <p>Tailored sites to meet your business needs.</p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="container nine">
                  <div className="content">
                    <img
                      src={`${appBase}images/web-maintenance.jpg`}
                      loading="lazy"
                      alt="Swiper slide 3"
                    />
                  </div>
                  <div className="description">
                    <h3>Web maintenance</h3>
                    <p>
                      We keep your website running smoothly, securely, and up to
                      date — always.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gradient left"></div>
          <div className="gradient right"></div>
        </div>
      </section>

      <section
        ref={scrollContactFormRef}
        className="home-contact"
        id="contact-form"
      >
        <h1 className="med-heading">
          Reach out
          <br />
          today.
        </h1>
        <div ref={contactForm} className="formwrapper">
          <form ref={formRef} onSubmit={sendEmail}>
            <div
              ref={(node) => {
                submitBtnRef.current = node;
                submitFillRef.current = node;
              }}
              className="formgroup"
            >
              <label htmlFor="inputName" className="form-label">
                Name <span className="req-symbol">*</span>
              </label>
              <input
                placeholder="Your full name"
                type="text"
                name="from_name"
                className="form-control"
                id="inputName"
                required
              />

              <label htmlFor="inputEmail" className="form-label">
                Email <span className="req-symbol">*</span>
              </label>
              <input
                placeholder="Your email address"
                type="email"
                name="from_email"
                className="form-control"
                id="inputEmail"
                required
              />

              <label htmlFor="inputPhone" className="form-label">
                Phone <span className="req-symbol">*</span>
              </label>
              <input
                placeholder="Your phone number"
                type="tel"
                name="from_phone"
                className="form-control"
                id="inputPhone"
                required
              />

              <label htmlFor="inputSubject" className="form-label">
                Subject
              </label>
              <input
                placeholder="Subject"
                type="text"
                name="subject"
                className="form-control"
                id="inputSubject"
              />

              <label htmlFor="inputMessage" className="form-label">
                Message <span className="req-symbol">*</span>
              </label>
              <textarea
                placeholder="Type your message..."
                type="text"
                name="message"
                className="form-control message align-self-stretch"
                id="inputMessage"
                required
              />
              <button
                type="submit"
                className="btn contact-btn magnetic-submit js-fill"
                disabled={done}
              >
                <span className="magnetic-submit-text">
                  {done ? "Sent" : "Submit"}
                </span>
              </button>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
          </form>
        </div>
      </section>
    </>
  );
}

export default HomePage;
