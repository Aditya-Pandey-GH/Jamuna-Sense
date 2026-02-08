import React from "react";

const MetricCard = ({ label, value, type = "default" }) => {
  return (
    <div className="metric-item">
      <div className="metric-label">{label}</div>
      <div className={`metric-value ${type}`}>{value}</div>
    </div>
  );
};

export default MetricCard;