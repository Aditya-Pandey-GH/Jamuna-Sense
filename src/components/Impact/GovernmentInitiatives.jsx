import React from "react";
import InitiativeCard from "./InitiativeCard";
import { govInitiativesData } from "../../data/Initiativesdata";

const GovernmentInitiatives = () => {
  return (
    <section
      className="initiatives-section animate-on-scroll"
      id="initiatives-section"
    >
      <h2 className="section-title">Major Government Projects & Funding</h2>
      <div className="initiatives-grid">
        {govInitiativesData.map((initiative, index) => (
          <InitiativeCard
            key={index}
            initiative={initiative}
            animationDelay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default GovernmentInitiatives;