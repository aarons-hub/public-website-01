import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "./Style.scss";

const GA_MEASUREMENT_ID = "G-56ZJCW1W79";

const appBase = import.meta.env.BASE_URL;
const isDev = import.meta.env.DEV;
const PAUSE_SWIPER_AUTOPLAY_IN_DEV = false;

function App() {
  const location = useLocation();
  const form = useRef();
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
      .sendForm("service_g21pr8h", "template_4m4a8ys", form.current, {
        publicKey: "WEnSV56Aows6oYiBB",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setDone(true);
          toast.success("Message sent successfully!");
          form.current.reset();

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
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!swiperRootRef.current) return undefined;

    const shouldAutoplay = !(isDev && PAUSE_SWIPER_AUTOPLAY_IN_DEV);
    const hasNavButtons = Boolean(prevRef.current && nextRef.current);

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }

    swiperInstanceRef.current = new Swiper(swiperRootRef.current, {
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
      swiperInstanceRef.current?.destroy(true, true);
      swiperInstanceRef.current = null;
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
            We take care of your website,{" "}
            <span className="opacity75">
              so you can take&nbsp;care of your business
            </span>
            .
          </h2>
        </div>
        <div className="cta">
          <div ref={ctaWrapper} className="cta-wrapper">
            <Link to="/projects" className="btn hero-btn projects-btn">
              View projects
            </Link>
            <a
              href="#contact-form"
              className="btn hero-btn contact-btn"
              onClick={handleContactBtnClick}
            >
              Get in touch
            </a>
          </div>
        </div>
        <div ref={stage} className="stage">
          <img
            ref={img01}
            className="stage-img-01"
            src={`${appBase}homepage-images/iphone-001.png`}
            alt="Decorative image"
          />
          <img
            ref={img02}
            className="stage-img-02"
            src={`${appBase}homepage-images/iphone-panel-001.png`}
            alt="Decorative image"
          />
          <img
            ref={img03}
            className="stage-img-03"
            src={`${appBase}homepage-images/iphone-panel-002.png`}
            alt="Decorative image"
          />
          <img
            ref={img04}
            className="stage-img-04"
            src={`${appBase}homepage-images/iphone-panel-003.png`}
            alt="Decorative image"
          />
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
            <h4 className="mb60 fw400">
              From your first website to ongoing support, we handle everything —
              so&nbsp;you never have to juggle multiple agencies or wonder who
              to call.
            </h4>
          </div>
        </div>
      </section>

      <section ref={featuredSwiper} className="featured-swiper">
        <div className="section-inner">
          <div className="swiper home-swiper" ref={swiperRootRef}>
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/lime-web-002.png`}
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
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/web-reporting.jpg`}
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
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/wordpress.jpg`}
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
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/updates-tile.jpg`}
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
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/responsive.jpg`}
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
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/on-brand.jpg`}
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
                <div className="container">
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
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/web-maintenance.jpg`}
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
          <form ref={form} onSubmit={sendEmail}>
            <div className="formgroup">
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
              <button type="submit" className="btn contact-btn" disabled={done}>
                {done ? "Sent" : "Submit"}
              </button>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
