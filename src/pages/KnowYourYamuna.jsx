import React, { useState } from "react";
import HeroSection from "../components/knowYourYamuna/Hero";
import CriticalWarning from "../components/knowYourYamuna/CriticalWarning";
import PollutionCharts from "../components/knowYourYamuna/PollutionCharts";
import ImpactCards from "../components/knowYourYamuna/ImpactCards";
import DidYouKnow from "../components/knowYourYamuna/DidyouKnow";
import ResourcesSection from "../components/knowYourYamuna/ResourcesSection";
import CallToAction from "../components/knowYourYamuna/CallToAction";
import "../components/knowYourYamuna/Global.css";

const KnowYourYamuna = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="yamuna-container">
      <HeroSection />
      <CriticalWarning />
      <PollutionCharts />
      <ImpactCards activeCard={activeCard} setActiveCard={setActiveCard} />
      <DidYouKnow />
      <ResourcesSection />
      {/* <CallToAction /> */}
    </div>
  );
};

export default KnowYourYamuna;