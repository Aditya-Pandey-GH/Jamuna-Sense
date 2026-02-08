import React from "react";
import "./CallToAction.css";

const CallToAction = () => {
  return (
    <div className="cta-section">
      <h2 className="cta-title">Every Action Counts</h2>
      <p className="cta-text">
        Understanding the problem is just the beginning. Use eco-friendly
        detergents, dispose of waste properly, participate in river clean-up
        drives, and spread awareness. The Yamuna can be restored, but it
        requires collective effort from every citizen.
      </p>
      <div className="cta-actions">
        <button className="cta-button primary">
          Download Educational Materials
        </button>
        <button className="cta-button secondary">
          Share This Information
        </button>
      </div>
    </div>
  );
};

export default CallToAction;