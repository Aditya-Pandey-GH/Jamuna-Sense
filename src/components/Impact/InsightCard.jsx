import React from "react";

const InsightCard = ({ insight, number, animationDelay }) => {
  return (
    <div
      className="insight-card"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="insight-number">{number}</div>
      <h3 className="insight-title">{insight.title}</h3>
      <p className="insight-text">{insight.text}</p>
    </div>
  );
};

export default InsightCard;