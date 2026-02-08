import React from "react";

const StakeholderCard = ({ stakeholder, cardType, animationDelay }) => {
  const renderNGOCard = () => (
    <>
      <div className="stakeholder-header">
        <h4 className="stakeholder-name">{stakeholder.name}</h4>
        <span className="stakeholder-tag">{stakeholder.focus}</span>
      </div>
      <p className="stakeholder-description">{stakeholder.description}</p>
      <div className="stakeholder-footer">
        <div className="impact-badge">{stakeholder.impact}</div>
        <div className="year-badge">{stakeholder.year}</div>
      </div>
    </>
  );

  const renderCorporateCard = () => (
    <>
      <div className="stakeholder-header">
        <h4 className="stakeholder-name">{stakeholder.name}</h4>
        <span className="stakeholder-tag">{stakeholder.focus}</span>
      </div>
      <p className="stakeholder-description">{stakeholder.description}</p>
      <div className="participants-list">
        <strong>Key Participants:</strong>
        <div className="participant-tags">
          {stakeholder.participants.map((participant, idx) => (
            <span key={idx} className="participant-tag">
              {participant}
            </span>
          ))}
        </div>
      </div>
      <div className="stakeholder-footer">
        <div className="impact-badge">{stakeholder.impact}</div>
      </div>
    </>
  );

  const renderRecyclerCard = () => (
    <>
      <div className="stakeholder-header">
        <h4 className="stakeholder-name">{stakeholder.name}</h4>
        <span className="stakeholder-tag">{stakeholder.focus}</span>
      </div>
      <p className="stakeholder-description">{stakeholder.description}</p>
      <div className="locations-list">
        <strong>
          {stakeholder.zones ? "Focus Zones:" : "Key Locations:"}
        </strong>
        <div className="location-tags">
          {(stakeholder.zones || stakeholder.locations).map((location, idx) => (
            <span key={idx} className="location-tag">
              {location}
            </span>
          ))}
        </div>
      </div>
      <div className="stakeholder-footer">
        <div className="impact-badge">{stakeholder.impact}</div>
      </div>
    </>
  );

  const renderCardContent = () => {
    switch (cardType) {
      case "ngo-card":
        return renderNGOCard();
      case "corporate-card":
        return renderCorporateCard();
      case "recycler-card":
        return renderRecyclerCard();
      default:
        return null;
    }
  };

  return (
    <div
      className={`stakeholder-card ${cardType}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {renderCardContent()}
    </div>
  );
};

export default StakeholderCard;