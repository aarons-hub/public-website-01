import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

function Photography() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className="photography pb40">
      <div className="col left">
        <h1 className="med-heading mt0">Services</h1>
        <h2>Photography</h2>
        <p>
          We offer a range of services to help businesses grow and succeed
          online.
        </p>
        <p>
          This includes data such as pages visited, time spent on the site, and
          general location.
        </p>
        <p>
          This information helps us improve our website and user experience.
        </p>
        <p>Google may store this data on servers outside Australia.</p>
        <div className="services-list">
          <Link to="/services" className="service-btn">
            Web Design
          </Link>
          <Link to="/logo-design" className="service-btn">
            Logo design
          </Link>
          <Link to="/photography" className="service-btn active">
            Photography
          </Link>
        </div>
      </div>
      <div className="col right mt10">
        <div className="hero-outer">
          <Swiper
            loop={false}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiperOne"
          >
            <SwiperSlide>
              <img src="./images/DSC1862.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/lime-web-005.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/hydromet-web-004.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/hydromet-web-005.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/ksg-web-002.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/ksg-web-003.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/langford-web-002.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/langford-web-003.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/reclaim-web-004.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/reclaim-web-005.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/aquinas-college-web-01.png" />
            </SwiperSlide>
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={false}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiperOneThumbs"
          >
            <SwiperSlide>
              <img src="./images/DSC1862.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/lime-web-005.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/hydromet-web-004.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/hydromet-web-005.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/ksg-web-002.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/ksg-web-003.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/langford-web-002.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/langford-web-003.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/reclaim-web-004.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/reclaim-web-005.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/aquinas-college-web-01.png" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Photography;
