import React from "react";
import { didYouKnowFacts } from "../../data/contentData";
import "./DidyouKnow.css";

const DidyouKnow = () => {
  return (
    <div className="content-section dyk-section">
      <h2 className="section-title">Did You Know?</h2>
      <p className="section-intro">
        Fascinating and alarming facts about the Yamuna that every student
        should know.
      </p>

      <div className="dyk-grid">
        {didYouKnowFacts.map((item, index) => (
          <div key={index} className="dyk-card">
            <div className="dyk-number">{index + 1}</div>
            <p className="dyk-fact">{item.fact}</p>
            <div className="dyk-source">{item.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DidyouKnow;