import React from "react";
import { resources } from "../../data/contentData";
import "./ResourcesSection.css";

const ResourcesSection = () => {
    return (
        <div className="content-section resources-section">
            <h2 className="section-title">Learn More: Articles & Resources</h2>
            <p className="section-intro">
                Explore official data, research reports, and educational content to
                deepen your understanding.
            </p>

            <div className="resources-grid">
                {resources.map((resource, index) => (
                    <div key={index} className="resource-card">
                        <div className={`resource-type type-${resource.type}`}>
                            {resource.type === "article" ? "Article" : "Video"}
                        </div>
                        <h3 className="resource-title">{resource.title}</h3>
                        <p className="resource-description">{resource.description}</p>
                        {resource.type === "article" ? (
                            <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resource-link"
                            >
                                Visit Resource →
                            </a>
                        ) : (
                            <div className="video-placeholder">
                                <div className="play-icon">▶</div>
                                <p className="video-note">Video content available</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesSection;