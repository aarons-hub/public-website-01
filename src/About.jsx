import React from "react";

function About() {
  return (
    <section className="about">
      <div className="popoverContainer">
        <button popovertarget="popoverinfo-1" className="popoverBtn">
          Toggle
        </button>

        <div id="popoverinfo-1" popover="auto" className="popover">
          <p>
            Anchored popover. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
        </div>
      </div>

      <div>
        <h1>About</h1>
        <h2>Look good</h2>
        <h2>Feel good</h2>
        <h2>Do good</h2>
        <p>
          Our About include web development, graphic design, and digital
          marketing.
        </p>
        <h2>Web Development</h2>
        <p>
          We build responsive and user-friendly websites using the latest
          technologies.
        </p>
        <h2>Graphic Design</h2>
        <p>
          Our graphic design About include logo design, branding, and marketing
          materials.
        </p>
        <h2>Digital Marketing</h2>
        <p>
          We offer digital marketing About such as SEO, social media management,
          and email marketing.
        </p>
      </div>
    </section>
  );
}

export default About;
