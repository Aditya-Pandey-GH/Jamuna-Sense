import React from "react";
import StakeholderCard from "./StakeholderCard";

const StakeholderCategory = ({ title, stakeholders, cardType }) => {
  return (
    <div className="stakeholder-category">
      <h3 className="category-title">{title}</h3>
      <div className="stakeholder-grid">
        {stakeholders.map((stakeholder, index) => (
          <StakeholderCard
            key={index}
            stakeholder={stakeholder}
            cardType={cardType}
            animationDelay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default StakeholderCategory;