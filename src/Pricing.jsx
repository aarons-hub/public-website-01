import React from "react";

function Pricing() {
  return (
    <section className="pricing">
      <div className="col left">
        <h1 className="med-heading mt0">Pricing</h1>
      </div>
      <div className="col right mt10">
        <p>
          We use Google Analytics to collect information about how visitors use
          our website.
        </p>
        <p>
          This includes data such as pages visited, time spent on the site, and
          general location.
        </p>
        <p>
          This information helps us improve our website and user experience.
        </p>
        <p>Google may store this data on servers outside Australia.</p>
        <img src="./pricing-template.png" alt="Pricing page hero image" />
      </div>
    </section>
  );
}

export default Pricing;
