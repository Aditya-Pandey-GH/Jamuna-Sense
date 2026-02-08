import React from "react";
import InsightCard from "./InsightCard";
import { insightsData } from "../../data/Insightsdata";

const KeyInsights = () => {
  return (
    <section
      className="insights-section animate-on-scroll"
      id="insights-section"
    >
      <h2 className="section-title">
        Critical Insights: Why the Gap Persists
      </h2>
      <div className="insights-grid">
        {insightsData.map((insight, index) => (
          <InsightCard
            key={index}
            insight={insight}
            number={`0${index + 1}`}
            animationDelay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default KeyInsights;