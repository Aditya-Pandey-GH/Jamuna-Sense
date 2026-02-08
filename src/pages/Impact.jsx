import React, { useState, useEffect } from "react";
import "./Impact.css";
import Header from "../components/Impact/Header";
import SplitView from "../components/Impact/SplitView";
import TimelineChart from "../components/Impact/TimelineChart";
import BudgetAllocation from "../components/Impact/BudgetAllocation";
import GovernmentInitiatives from "../components/Impact/GovernmentInitiatives";
import StakeholdersSection from "../components/Impact/StakeholdersSection";
import KeyInsights from "../components/Impact/KeyInsights";
import { useScrollAnimation } from "../Hooks/useScrollAnimation";

const Impact = () => {
  const [viewMode, setViewMode] = useState("report");
  
  // Use scroll animation hook
  useScrollAnimation();

  return (
    <div className="impact-container">
      <Header />
      
      <SplitView viewMode={viewMode} setViewMode={setViewMode} />
      
      <TimelineChart />
      
      <BudgetAllocation />
      
      <GovernmentInitiatives />
      
      <StakeholdersSection />
      
      <KeyInsights />
    </div>
  );
};

export default Impact;