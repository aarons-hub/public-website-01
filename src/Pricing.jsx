import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing | Aaronline Design</title>
        <meta
          name="description"
          content="Explore Aaronline Design's flexible pricing plans for web design, development, and digital marketing services in Brisbane."
        />
        <link rel="canonical" href="https://aaronlinedesign.au/pricing" />
      </Helmet>
      <section className="pricing">
        <div className="row">
          <div className="col left">
            <h1 className="med-heading">Pricing</h1>
            <h2>Flexible plans for every stage of growth.</h2>
            <Link to="/contact" className="btn">
              Contact us
            </Link>
          </div>
          <div className="col right mt10">
            <div className="row pricing-wrapper">
              <div className="row pricing-section">
                <div className="col card starter">
                  <div className="row item-title">
                    <div className="col left">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="48" height="48" rx="8" fill="#D6FD70" />
                        <path
                          d="M18.9307 22.4785C19.2102 17.6587 21.3412 11 23.5222 11C25.7032 11 27.8342 17.6587 28.1137 22.4785C28.3787 27.048 26.7362 33.8422 25.244 33.8422H21.8004C20.3081 33.8422 18.6657 27.048 18.9307 22.4785Z"
                          fill="#1A1A1A"
                        />
                        <path
                          d="M19.368 32.8091C18.2451 30.754 17.8706 29.2934 17.6462 26.1516C17.6462 26.1516 16.9225 26.1548 15.8096 27.529C13.6002 30.257 16.6131 36.4822 16.6131 36.4822L19.368 32.8091Z"
                          fill="#1A1A1A"
                        />
                        <path
                          d="M27.632 32.8091C28.7549 30.754 29.1294 29.2934 29.3538 26.1516C29.3538 26.1516 30.0775 26.1548 31.1904 27.529C33.3998 30.257 30.3869 36.4822 30.3869 36.4822L27.632 32.8091Z"
                          fill="#1A1A1A"
                        />
                        <ellipse
                          cx="23.4948"
                          cy="21.5604"
                          rx="1.8366"
                          ry="1.83656"
                          fill="#D6FD70"
                        />
                      </svg>
                    </div>
                    <div className="col right">
                      <h3>Starter</h3>
                    </div>
                  </div>
                  <p className="description">
                    Perfect for small businesses just getting started online.
                  </p>
                  <div className="row price">
                    <h2>$1,000</h2>
                    <p>+ $100/month</p>
                  </div>
                  <p className="details">
                    Everything you need to launch with confidence:
                  </p>
                  <ul className="features">
                    <li>Custom designed website (up to 5 pages)</li>
                    <li>Mobile optimised</li>
                    <li>Contact form</li>
                    <li>Basic SEO setup</li>
                    <li>6 month support plan included</li>
                  </ul>
                </div>

                <div className="col card growth recommended">
                  <div className="row item-title">
                    <div className="col left">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="48" height="48" rx="8" fill="#1A1A1A" />
                        <path
                          d="M22.9793 31.606C23.299 31.411 23.701 31.411 24.0207 31.606L29.1951 34.7619C29.9512 35.2231 30.8894 34.5462 30.6902 33.6833L29.3096 27.7031C29.2267 27.3441 29.348 26.9685 29.6253 26.7258L34.2317 22.6933C34.8951 22.1125 34.5369 21.0198 33.6584 20.9445L27.6153 20.4264C27.2447 20.3946 26.9224 20.1598 26.7785 19.8168L24.4222 14.1987C24.0792 13.3811 22.9208 13.3811 22.5778 14.1987L20.2215 19.8168C20.0776 20.1598 19.7553 20.3946 19.3847 20.4264L13.3416 20.9445C12.4631 21.0198 12.1049 22.1125 12.7683 22.6933L17.3747 26.7258C17.652 26.9685 17.7733 27.3441 17.6904 27.7031L16.3098 33.6833C16.1106 34.5462 17.0488 35.2231 17.8049 34.7619L22.9793 31.606Z"
                          fill="#D6FD70"
                        />
                      </svg>
                    </div>
                    <div className="col right">
                      <h3>Growth</h3>
                    </div>
                  </div>
                  <p className="description">
                    For businesses ready to stand out and scale.
                  </p>
                  <div className="row price">
                    <h2>$2,000</h2>
                    <p className="details">+ $150/month</p>
                  </div>
                  <p className="details">Everything in Starter, plus:</p>
                  <ul className="features">
                    <li>Up to 10 pages</li>
                    <li>Logo design</li>
                    <li>Google Analytics setup</li>
                    <li>Monthly performance report</li>
                    <li>Priority support</li>
                  </ul>
                </div>

                <div className="col card enterprise">
                  <div className="row item-title">
                    <div className="col left">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="48" height="48" rx="8" fill="#D6FD70" />
                        <path
                          d="M20.2993 12C21.887 13.2214 23.7191 17.6182 19.078 20.4272C19.01 20.4684 18.9429 20.5099 18.8766 20.5515C11.7559 25.0372 15.1129 36.1446 23.5238 36.4289C23.6283 36.4323 23.7332 36.4341 23.8387 36.4341C28.8976 36.4341 32.9207 32.3325 32.9988 27.2742C33.0683 22.7623 30.1922 17.4961 30.1922 17.4961C30.5585 20.4272 27.8716 21.7707 27.8716 21.7707C27.9909 12.1164 20.6658 12 20.3124 12C20.3038 12 20.2993 12 20.2993 12ZM17.8318 30.1937C16.7913 27.0425 18.5023 23.6441 21.6538 22.6037C21.6538 22.6037 18.5176 26.1383 20.685 29.2518C20.685 29.2518 20.403 27.2364 22.2166 26.2921C22.2166 26.2921 20.2485 32.2745 25.8025 33.8903L25.4222 34.0159C24.7969 34.2224 24.1614 34.3205 23.5369 34.3205C21.0145 34.3206 18.6658 32.7199 17.8318 30.1937Z"
                          fill="#1A1A1A"
                        />
                      </svg>
                    </div>
                    <div className="col right">
                      <h3>Enterprise</h3>
                    </div>
                  </div>
                  <p className="description">
                    For businesses that need a complete digital solution.
                  </p>
                  <div className="row price">
                    <h2>Custom</h2>
                    <p className="details">Tailored to your needs</p>
                  </div>
                  <p className="details">Everything in Growth, plus:</p>
                  <ul className="features">
                    <li>Unlimited pages</li>
                    <li>Product photography</li>
                    <li>Data studio analytics dashboard</li>
                    <li>Content updates included</li>
                    <li>Custom integrations</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="disclaimer">
              <i>
                All plans require a minimum 6 month term. A 50% deposit is
                required before work begins, with the remaining balance due on
                launch day. After your minimum term, plans continue month to
                month with 30 days notice to cancel.
              </i>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pricing;
