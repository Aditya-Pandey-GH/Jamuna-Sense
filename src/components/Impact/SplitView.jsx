import React from "react";
import MetricCard from "./MetricCard";

const SplitView = ({ viewMode, setViewMode }) => {
  const goalMetrics = [
    { label: "Target Dissolved Oxygen", value: "≥ 5 mg/L", type: "success" },
    { label: "Target BOD", value: "≤ 3 mg/L", type: "success" },
    { label: "Sewage Treatment Capacity", value: "100%", type: "success" },
    { label: "Total Investment (Since 1993)", value: "₹8,000+ Crore", type: "highlight" }
  ];

  const realityMetrics = [
    { label: "Actual Dissolved Oxygen", value: "< 1 mg/L", type: "danger" },
    { label: "Actual BOD", value: "> 50 mg/L", type: "danger" },
    { label: "Pollution Contribution", value: "76-80%", type: "danger" },
    { label: "Untreated Sewage Daily", value: "1,300 MLD", type: "danger" }
  ];

  return (
    <section className="split-section animate-on-scroll" id="split-section">
      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === "report" ? "active" : ""}`}
          onClick={() => setViewMode("report")}
        >
          The Report (Goals)
        </button>
        <button
          className={`toggle-btn ${viewMode === "response" ? "active" : ""}`}
          onClick={() => setViewMode("response")}
        >
          The Response (Reality)
        </button>
      </div>

      <div className="split-content-wrapper">
        {viewMode === "report" ? (
          <div className="split-content report-view fade-in-slide">
            <div className="split-card goal-card">
              <h2 className="split-title">
                Maili Se Nirmal Yamuna Action Plan
              </h2>
              <div className="goal-metrics">
                {goalMetrics.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>
              <p className="goal-description">
                The comprehensive action plan envisions a clean, flowing
                Yamuna with water quality suitable for bathing and supporting
                aquatic life. Multiple phases of investment have focused on
                building sewage treatment infrastructure and intercepting
                drains.
              </p>
            </div>
          </div>
        ) : (
          <div className="split-content response-view fade-in-slide">
            <div className="split-card reality-card">
              <h2 className="split-title">
                Ground Reality in Delhi's 22km Stretch
              </h2>
              <div className="reality-metrics">
                {realityMetrics.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>
              <p className="reality-description">
                Despite massive investment, Delhi's 22km stretch (only 2% of
                river length) contributes 76-80% of total Yamuna pollution.
                The primary challenge: 40% of Delhi's sewage flows untreated
                due to infrastructure gaps in unauthorized colonies and
                overloaded treatment plants.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SplitView;