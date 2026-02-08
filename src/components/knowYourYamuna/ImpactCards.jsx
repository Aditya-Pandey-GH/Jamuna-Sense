import React from "react";
import { impactCards } from "../../data/contentData";
import "./ImpactCards.css";

const ImpactCards = ({ activeCard, setActiveCard }) => {
  return (
    <div className="content-section impact-section">
      <h2 className="section-title">How We Are Polluting Yamuna</h2>
      <p className="section-intro">
        Every sector of society contributes to the crisis. Here's how our
        daily activities impact the river.
      </p>

      <div className="impact-grid">
        {impactCards.map((card) => (
          <div
            key={card.id}
            className={`impact-card ${activeCard === card.id ? "active" : ""}`}
            onMouseEnter={() => setActiveCard(card.id)}
            onMouseLeave={() => setActiveCard(null)}
            style={{ "--card-color": card.color }}
          >
            <div className="impact-header">
              <h3 className="impact-title">{card.title}</h3>
              <p className="impact-subtitle">{card.subtitle}</p>
            </div>
            <div className="impact-body">
              <p className="impact-description">{card.description}</p>
            </div>
            <div className="impact-footer">
              <div className="impact-stat">{card.stat}</div>
              <div className="impact-stat-label">{card.statLabel}</div>
            </div>
            <div className="impact-accent"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactCards;