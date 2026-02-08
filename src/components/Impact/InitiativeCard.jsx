import React from "react";

const InitiativeCard = ({ initiative, animationDelay }) => {
  return (
    <div
      className="initiative-card"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="initiative-badge">{initiative.status}</div>
      <h3 className="initiative-name">{initiative.name}</h3>
      <div className="initiative-funding">
        <span className="funding-label">Funded by:</span>
        <span className="funding-source">{initiative.funding}</span>
      </div>
      <div className="initiative-budget">{initiative.budget}</div>
      <p className="initiative-scope">{initiative.scope}</p>
      <div className="initiative-timeline">
        Target: {initiative.completion}
      </div>
    </div>
  );
};

export default InitiativeCard;