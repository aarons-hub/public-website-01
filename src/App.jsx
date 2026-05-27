import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "./Style.scss";

function App() {
  const appBase = import.meta.env.BASE_URL;

  const form = useRef();
  const [done, setDone] = useState(false);

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
          [img02.current, img03.current],
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
  const p01 = useRef();
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
          p01.current,
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
    if (!swiperRootRef.current || !prevRef.current || !nextRef.current)
      return undefined;

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }

    swiperInstanceRef.current = new Swiper(swiperRootRef.current, {
      modules: [Navigation],
      slidesPerView: 3.5,
      spaceBetween: 30,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      centeredSlides: false,
      speed: 600,
      loop: true,
      navigation: {
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      },
    });

    return () => {
      swiperInstanceRef.current?.destroy(true, true);
      swiperInstanceRef.current = null;
    };
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-wrapper">
          <div ref={intro} className="col left">
            <h1 ref={heading01} className="lg-heading">
              Design that works <span>for you.</span>
            </h1>
            <p ref={p01} className="hero-subheading">
              We create custom websites and digital solutions that help your
              business thrive online. Our designs are tailored to your unique
              needs, ensuring a seamless user experience that drives results.
              Custom reports and analytics are available to track your website's
              performance and make data-driven decisions for your business
              growth.
            </p>

            <div ref={ctaWrapper} className="cta-wrapper">
              <a href="/projects" className="btn hero-btn projects-btn">
                View projects
              </a>
              <a href="#contact-form" className="btn hero-btn contact-btn">
                Get in touch
              </a>
            </div>
          </div>
          <div className="col right">
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
            </div>
          </div>
        </div>
        <div className="spacer"></div>
      </section>
      <section ref={featured} className="featured">
        <div className="row">
          <div className="col">
            <h1 className="med-heading mb0">
              Stories, tips and smart workflows.
            </h1>
          </div>
          <div className="col"></div>
        </div>
        <div className="row mb40">
          <div className="col">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
              facilis dolore laudantium molestiae incidunt quod eos consectetur.
            </p>
          </div>
          <div className="col">
            <div className="controls">
              <button ref={prevRef} className="prev">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="48" height="48" rx="8" fill="#9ACD32" />
                  <path
                    d="M16.4 24.6977L21.6526 30.0893C22.1451 30.6369 23.0068 30.6369 23.4993 30.0893C24.0327 29.5838 24.0327 28.6993 23.4993 28.1938L20.5036 25.0768H30.6869C31.4255 25.0768 32 24.4871 32 23.7289C32 22.9286 31.4255 22.381 30.6869 22.381H20.5036L23.4993 19.3062C24.0327 18.8007 24.0327 17.9161 23.4993 17.4107C23.0068 16.8631 22.1451 16.8631 21.6526 17.4107L16.4 22.8023C15.8667 23.3077 15.8667 24.1923 16.4 24.6977Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button ref={nextRef} className="next">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="48" height="48" rx="8" fill="#9ACD32" />
                  <path
                    d="M31.6 24.6977L26.3474 30.0893C25.8549 30.6369 24.9932 30.6369 24.5007 30.0893C23.9673 29.5838 23.9673 28.6993 24.5007 28.1938L27.4964 25.0768H17.3131C16.5745 25.0768 16 24.4871 16 23.7289C16 22.9286 16.5745 22.381 17.3131 22.381H27.4964L24.5007 19.3062C23.9673 18.8007 23.9673 17.9161 24.5007 17.4107C24.9932 16.8631 25.8549 16.8631 26.3474 17.4107L31.6 22.8023C32.1333 23.3077 32.1333 24.1923 31.6 24.6977Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
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
                      src={`${appBase}images/sticker-web-001.png`}
                      alt="Swiper slide 1"
                    />
                  </div>
                  <div className="description">
                    <h3>
                      How to create a website that converts visitors into
                      customers
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/uclean-bcard-001.png`}
                      alt="Swiper slide 2"
                    />
                  </div>
                  <div className="description">
                    <h3>
                      How to create a website that converts visitors into
                      customers
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/reclaim-web-006.png`}
                      alt="Swiper slide 3"
                    />
                  </div>
                  <div className="description">
                    <h3>
                      How to create a website that converts visitors into
                      customers
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/lime-web-002.png`}
                      alt="Swiper slide 4"
                    />
                  </div>
                  <div className="description">
                    <h3>
                      How to create a website that converts visitors into
                      customers
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/langford-web-001.png`}
                      alt="Swiper slide 5"
                    />
                  </div>
                  <div className="description">
                    <h3>
                      How to create a website that converts visitors into
                      customers
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="container">
                  <div className="content">
                    <img
                      src={`${appBase}images/langford-web-001.png`}
                      alt="Swiper slide 5"
                    />
                  </div>
                  <div className="description">
                    <h3>
                      How to create a website that converts visitors into
                      customers
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={contactForm} className="home-contact" id="contact-form">
        <h1 className="med-heading">
          Reach out
          <br />
          today.
        </h1>
        <div className="formwrapper">
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
