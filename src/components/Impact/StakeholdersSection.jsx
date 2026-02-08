import React from "react";
import StakeholderCategory from "./StakeholderCategory";
import { stakeholdersData } from "../../data/Stakeholdersdata";

const StakeholdersSection = () => {
  return (
    <section
      className="stakeholders-section animate-on-scroll"
      id="stakeholders-section"
    >
      <h2 className="section-title">The Stakeholder Ecosystem</h2>
      <p className="section-description">
        Beyond government efforts, NGOs, corporations, and recyclers play
        crucial roles in the restoration effort.
      </p>

      <StakeholderCategory
        title="NGO Activism & Community Work"
        stakeholders={stakeholdersData.ngos}
        cardType="ngo-card"
      />

      <StakeholderCategory
        title="Corporate Social Responsibility"
        stakeholders={stakeholdersData.corporate}
        cardType="corporate-card"
      />

      <StakeholderCategory
        title="Waste Management & Recycling"
        stakeholders={stakeholdersData.recyclers}
        cardType="recycler-card"
      />
    </section>
  );
};

export default StakeholdersSection;